var acmebase = `https://acme-v02.api.letsencrypt.org/`;
// <!-- acmebase=`https://acme-staging-v02.api.letsencrypt.org/` -->
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
var subtle = this.crypto?.subtle;
var acme2 = new class {
    email = '';
    kid = '';
    aid = '';
    oid = '';
    domain = '';
    termsOfServiceAgreed = false;
    orders = [];
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
    async makeUnique(unique) {
        if (!unique) return;
        var avme2 = this;
        var extra;
        [private_key, public_key, extra] = unique.split(',');
        if (extra) {
            extra = JSON.parse(decodeUTF8(fromBase64(extra)));
            avme2.email = extra.email;
            avme2.kid = extra.kid;
            if (extra.kid) {
                var account = data.getUrlParamsForApi(accountApi, extra.kid);
                avme2.aid = account.aid;
            }
            avme2.domain = extra.domain;
            avme2.termsOfServiceAgreed = extra.termsOfServiceAgreed;
            avme2.orders = extra.orders;
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

            avme2.public_key = public_key;
        } catch (e) { alert("加载服务器公钥异常！", "error"); throw e }
    }
    pickUnique() {
        var avme2 = this;
        var extra = {
            kid: avme2.kid,
            email: avme2.email,
            domain: avme2.domain,
            orders: avme2.orders,
            termsOfServiceAgreed: avme2.termsOfServiceAgreed
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
        return order;
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
    async audit(url) {
        return data.fromURL(url);
    }
}