var acmebase = `https://acme-v02.api.letsencrypt.org/`;
var data1 = data.enrich(parseYML(`
${acmebase}:
  directory: get directory
${acmebase}acme/ Content-Type=application/jose+json:
  key-change: get key-change
  new-account: post:^efront-location new-acct
  get-account: get acct/:aid
  new-order: post:^efront-location new-order
  get-order|: get order/:aid/:oid
  new-nonce: head:^Replay-Nonce new-nonce
  revert-cert: post:^efront-location revert-cert
`));
var publicKey, privateKey;
var private_key, public_key;
var RSASSA_PKCS1_v1_5 = "RSASSA-PKCS1-v1_5";
var base64url = function (params) {
    var data = JSON.stringify(params);
    return toBase64(encodeUTF8(data), true);
};
var accountApi = await data1.getApi('get-account');
var orderApi = await data1.getApi('get-order');
var wrapParams = async function (url, params, usejwk = false) {
    var protected = {
        url
    };
    var jwk = await subtle.exportKey("jwk", publicKey);
    protected.alg = jwk.alg;
    if (usejwk) {
        protected.jwk = {
            e: jwk.e,
            kty: jwk.kty,
            n: jwk.n
        };
    }
    else {
        protected.kid = acme2.kid;
    }
    protected.nonce = await data1.from("new-nonce");
    protected = base64url(protected);
    var payload = isHandled(params) ? base64url(params) : '';
    var params = {
        protected,
        payload,
        signature: toBase64(new Uint8Array(await subtle.sign({ name: RSASSA_PKCS1_v1_5, saltLength: 32 }, privateKey, new Uint8Array(encodeUTF8([protected, '.', payload].join(''))))), true)
    };
    return params;
}
var request = async function (id, params) {
    var api = await data1.getApi(id);
    if (/^(get|head)$/i.test(api.method)) return data1.from(id, params);
    var [url, rest] = data.prepareURL(api.base + api.path, params);
    var restparams = {};
    rest.forEach(k => { restparams[k] = params[k]; delete params[k]; });
    var params = await wrapParams(url, params, /new-account|revert-cert/i.test(id));
    extend(params, restparams);
    var account = await data1.from(id, params);
    return account;
};
var ASN1 = function (type) {
    var length = 0;
    var bytesarr = [];
    for (var cx = 1, dx = arguments.length; cx < dx; cx++) {
        var bytes = arguments[cx];
        if (bytes.constructor !== Array) {
            bytes = Array.apply(null, bytes);
        }
        bytesarr.push(bytes);
        length += bytes.length;
    }
    var asn1 = [type];
    if (length === (2 << 8 | 36)) console.log(arguments)
    if (length > 127) {
        var nums = [];
        while (length > 0) {
            nums.unshift(length & 0xff);
            length = length >>> 8;
        }
        asn1.push(0x80 | nums.length, ...nums);
    }
    else {
        asn1.push(length);
    }
    asn1 = asn1.concat(...bytesarr);
    return asn1;
};
var packUint = function (bytes) {
    if (bytes[0] & 0x80) {
        return ASN1(0x02, [0], bytes);
    }
    return ASN1(0x02, bytes);
};
var packBits = function (bytes) {
    return ASN1(0x03, [0x00], bytes);
};
var packPublicKey = function (jwk) {
    var n = packUint(fromBase64(jwk.n));
    var e = packUint(fromBase64(jwk.e));
    var p = ASN1(0x30, n, e);
    return ASN1(0x30, ASN1(0x30,
        ASN1(0x06, [0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01]),
        ASN1(0x05),
    ), packBits(p));
};
var packCSR = function (asn1pubkey, domains) {
    return ASN1(0x30,
        packUint([0x00]),
        ASN1(0x30, ASN1(0x31, ASN1(0x30,
            ASN1(0x06, [0x55, 0x04, 0x03]),
            ASN1(0x0c, encodeUTF8(domains[0]))
        ))),
        asn1pubkey,
        ASN1(0xa0, ASN1(0x30,
            ASN1(0x06, [0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x09, 0x0e]),
            ASN1(0x31, ASN1(0x30, ASN1(0x30,
                ASN1(0x06, [0x55, 0x1d, 0x11]),
                ASN1(0x04, ASN1(0x30,
                    ...domains.map(d => ASN1(0x82, encodeUTF8(d)))
                ))
            )))
        ))
    )
}

var createCSR = async function (domains, private_key) {
    var privateKey = await subtle.importKey("pkcs8", new Uint8Array(fromBase64(private_key)), {
        name: RSASSA_PKCS1_v1_5,
        hash: "SHA-256",
    }, true, ["sign"]);
    var jwk = await subtle.exportKey("jwk", privateKey);
    var pubkey = packPublicKey(jwk);
    var request = packCSR(pubkey, domains);
    var sign = new Uint8Array(await subtle.sign({ name: RSASSA_PKCS1_v1_5, saltLength: 32 }, privateKey, new Uint8Array(request)));
    var sty = ASN1(0x30,
        ASN1(0x06, [0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x0b]),
        ASN1(0x05)
    );
    return ASN1(0x30, request,
        sty,
        packBits(sign)
    );
};
var makeKeyPair = async function (modulusLength = 2048) {
    //https://www.w3.org/TR/WebCryptoAPI/ 第20章 只有RSASSA-PKCS1-v1_5的jwk的alg才是rs256
    var k = await subtle.generateKey({
        name: RSASSA_PKCS1_v1_5,
        modulusLength,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
    }, true, ["sign", "verify"]);
    var { publicKey, privateKey } = k;
    var private_key = await subtle.exportKey("pkcs8", privateKey);
    var public_key = await subtle.exportKey("spki", publicKey);
    private_key = toBase64(new Uint8Array(private_key));
    public_key = toBase64(new Uint8Array(public_key));
    return [private_key, public_key];
};
var subtle = globalThis.crypto?.subtle;
var acme2 = new class {
    email = '';
    kid = '';
    aid = '';
    oid = '';
    domain = '';
    termsOfServiceAgreed = false;
    orders = [];
    schadulePeriod = 90
    nextUpdateTime = "";
    lastUpdateTime = '';
    schaduleEnabled = false;
    enabled = !!subtle;
    public_key = '';
    get enabled() {
        return !!subtle;
    }
    async requestURL(url, params) {
        params = await wrapParams(url, params);
        var res = data.postURL(url, params);
        if (res.loading) res.loading.setRequestHeader("Content-Type", "application/jose+json");
        return res;
    }
    async initUnique() {
        [private_key, public_key] = await makeKeyPair(4096);
        var unique = [private_key, public_key].join(',');
        await acme2.makeUnique(unique);
    }
    async updateTime(update) {
        if (!acme2.nextUpdateTime || update) {
            if (!acme2.lastUpdateTime || new Date(acme2.lastUpdateTime) + 86400000 + acme2.schadulePeriod * 86400000 < Date.now()) {
                acme2.nextUpdateTime = parseDate(Date.now() + +acme2.schadulePeriod * 86400000);
            }
            else {
                acme2.nextUpdateTime = parseDate(new Date(acme2.lastUpdateTime) + +acme2.schadulePeriod * 86400000);
            }
        }
        return new Date(acme2.nextUpdateTime);
    }
    async makeUnique(unique) {
        if (!unique) return;
        var acme2 = this;
        var extra;
        [private_key, public_key, extra] = unique.split(',');
        if (extra) {
            extra = JSON.parse(decodeUTF8(fromBase64(extra)));
            acme2.email = extra.email;
            acme2.kid = extra.kid;
            if (extra.kid) {
                var account = data.getUrlParamsForApi(accountApi, extra.kid);
                acme2.aid = account.aid;
            }
            acme2.domain = extra.domain;
            acme2.termsOfServiceAgreed = extra.termsOfServiceAgreed;
            acme2.orders = extra.orders;
            acme2.lastUpdateTime = parseDate(extra.lastUpdateTime);
            acme2.nextUpdateTime = parseDate(extra.nextUpdateTime);
            acme2.schadulePeriod = +extra.schadulePeriod || 80;
            acme2.schaduleEnabled = extra.schaduleEnabled;
            this.updateTime();
        }
        if (!this.enabled) {
            public_key = null;
            private_key = null;
            return;
        }
        try {
            privateKey = await subtle.importKey("pkcs8", new Uint8Array(fromBase64(private_key)), {
                name: RSASSA_PKCS1_v1_5,
                hash: "SHA-256",
            }, true, ["sign"]);
            publicKey = await subtle.importKey("spki", new Uint8Array(fromBase64(public_key)), {
                name: RSASSA_PKCS1_v1_5,
                hash: "SHA-256",
            }, true, ["verify"]);
            acme2.public_key = public_key;
        } catch (e) { alert("加载服务器公钥异常！", "error"); throw e }
    }
    pickUnique() {
        var acme2 = this;
        var extra = {
            kid: acme2.kid,
            email: acme2.email,
            domain: acme2.domain,
            orders: acme2.orders,
            schadulePeriod: acme2.schadulePeriod,
            nextUpdateTime: acme2.nextUpdateTime && +new Date(acme2.nextUpdateTime),
            lastUpdateTime: acme2.lastUpdateTime && +new Date(acme2.lastUpdateTime),
            schaduleEnabled: acme2.schaduleEnabled,
            termsOfServiceAgreed: acme2.termsOfServiceAgreed
        };
        return [private_key, public_key, base64url(extra)].join(",");
    }
    async getTermsOfService() {
        var data = await data1.from("directory");
        var termsOfService = data?.meta?.termsOfService;
        return termsOfService;
    }
    async newAccount(params) {
        var account = await request("new-account", {
            "contact": [
                "mailto:" + params.email
            ],
            // onlyReturnExisting: false,// 可选
            // externalAccountBinding: {},// 可选
            "termsOfServiceAgreed": params.termsOfServiceAgreed
        });
        this.email = params.email;
        this.termsOfServiceAgreed = params.termsOfServiceAgreed;
        this.kid = account;
        var a = data.getUrlParamsForApi(accountApi, account);
        this.aid = a.aid;
        alert('创建成功！', 'success');
        return account;
    }
    async newOrder(params) {
        if (!this.orders) this.orders = [];
        if (this.orders.length > 20) return alert("请删除一些订单后再试！", "error");
        var params = {
            "identifiers": params.domain.trim().split(/[,;+，；\r\n\u2029\u2028\s]+/).map(n => {
                if (/^\d+(\.\d+){3}$/.test(n)) return { type: "ipv4", value: n };
                return { type: "dns", value: n };
            })
        };
        var order = await request("new-order", params);
        this.domain = params.domain;
        var i = this.orders.indexOf(order);
        if (i >= 0) this.orders.splice(i, 1);
        this.orders = [order].concat(this.orders);
        return this.parseOrder(order);
    }
    parseOrder(o) {
        if (typeof o !== 'string') return o;
        var order = data.getUrlParamsForApi(orderApi, o);
        order.url = o;
        order.name = order.oid;
        return order;
    }
    async getOrder(o) {
        var r = await data.fromURL(o.url);
        if (r.expires) r.expires = new Date(r.expires);
        r = extend({}, o, r);
        return r;
    }
    async thumbprint() {
        var jwk = await subtle.exportKey('jwk', publicKey);
        jwk = `{"e":"${jwk.e}","kty":"${jwk.kty}","n":"${jwk.n}"}`;
        var thumb = await subtle.digest("SHA-256", new Uint8Array(encodeUTF8(jwk)));
        thumb = toBase64(new Uint8Array(thumb), true);
        return thumb;
    }
    async createKeyPair() {
        return makeKeyPair(2048);
    }
    async createCSR(domains, private_key) {
        var csr = await createCSR(domains, private_key);
        return toBase64(csr, true);
    }
    async waitStatus(o) {
        if (!/ing$/i.test(o.status)) return o;
        o = await this.getOrder(o);
        while (/ing$/i.test(o.status)) {
            wait(600);
            o = await this.getOrder(o);
        }
        return o;
    }
    async auditOrder(o, setauth) {
        if (o.status !== 'pending') return o;
        a: for (var a of o.authorizations) {
            var b = await data.fromURL(a);
            if (b.challenges) {
                for (var c of b.challenges) {
                    if (c.type === 'http-01') {
                        if (c.status !== 'pending') continue a;
                        await setauth(`/.well-known/acme-challenge/${c.token}`, c.token + "." + await acme2.thumbprint());
                        await acme2.requestURL(c.url, {});
                        continue a;
                    }
                }
            }
        }
        o = await this.waitStatus(o);
        return o;
    }
    async finalizeOrder(o, upload) {
        if (o.status !== 'ready') return o;
        var domains = o.identifiers.map(d => d.value);
        var kp = await this.createKeyPair();
        var csr = await this.createCSR(domains, kp[0]);
        var order = await this.requestURL(o.finalize, { csr });
        o = extend({}, o, order);
        upload(o, { oid: o.oid, private: kp[0], public: kp[1] });
        return o;
    }
    async autoUpdate(domain, setauth, upload) {
        if (!domain.length) return;
        if (acme2.orders.length >= 20) acme2.orders.pop();
        this.lastUpdateTime = parseDate(Date.now());
        this.updateTime();
        var o = await acme2.newOrder({ domain });
        o = await acme2.getOrder(o);
        if (o.status === 'pending') {
            o = await acme2.auditOrder(o, setauth);
        }
        if (o.status === 'ready') {
            await this.finalizeOrder(o, upload);
            o = await this.waitStatus();
        }
        if (o.status === 'valid') {
            var cert = await data.fromURL(o.certificate);
            upload(o, { cert });
        }
        return o;
    }
}