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

var request = async function (id, params) {
    var api = await data1.getApi(id);
    if (/^(get|head)$/i.test(api.method)) return data1.from(id, params);
    var protected = {
        url: api.base + api.path,
    };
    var rest;
    [protected.url, rest] = data.prepareURL(protected.url, params);
    var restparams = {};
    rest.forEach(k => { restparams[k] = params[k]; delete params[k]; });
    var jwk = await subtle.exportKey("jwk", publicKey);
    protected.alg = jwk.alg;
    if (/new-account|revert-cert/i.test(id)) {
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
    var payload = isEmpty(params) ? '' : base64url(params);
    protected = base64url(protected);
    var params = {
        protected,
        payload,
        signature: toBase64(new Uint8Array(await subtle.sign({ name: RSASSA_PKCS1_v1_5, saltLength: 32 }, privateKey, new Uint8Array(encodeUTF8([protected, '.', payload].join(''))))), true)
    };
    extend(params, restparams);
    var account = await data1.from(id, params);
    return account;
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
    async initUnique() {
        //https://www.w3.org/TR/WebCryptoAPI/ 第20章 只有RSASSA-PKCS1-v1_5的jwk的alg才是rs256
        var k = await subtle.generateKey({
            name: RSASSA_PKCS1_v1_5,
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        }, true, ["sign", "verify"]);
        var { publicKey, privateKey } = k;
        private_key = await subtle.exportKey("pkcs8", privateKey);
        public_key = await subtle.exportKey("spki", publicKey);
        private_key = toBase64(new Uint8Array(private_key));
        public_key = toBase64(new Uint8Array(public_key));
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
        var params = {
            "identifiers": params.domain.trim().split(/[,;+，；\r\n\u2029\u2028\s]+/).map(n => {
                if (/^\d+(\.\d+){3}$|^\[[\da-f\:]+\]$|^[\da-f\:]+$/i.test(n)) return { type: "ipv4", value: n };
                return { type: "dns", value: n };
            })
        };
        var order = await request("new-order", params);
        this.domain = params.domain;
        if (!this.orders) this.orders = [];
        if (this.orders.indexOf(order) < 0) this.orders.unshift(order);
        return order;
    }
    parseOrder(o) {
        if (typeof o !== 'string') return o;
        var order = data.getUrlParamsForApi(orderApi, o);
        order.name = order.oid;
        return order;
    }
    async getOrder(o) {
        var r = await data.from(orderApi, o);
        if (r.expires) r.expires = new Date(r.expires);
        return r;
    }
    async thumbprint() {
        var jwk = await subtle.exportKey('jwk', publicKey);
        jwk = `{"e":"${jwk.e}","kty":"${jwk.kty}","n":"${jwk.n}"}`;
        console.log(JSON.parse(jwk))
        var thumb = await subtle.digest("SHA-256", new Uint8Array(encodeUTF8(jwk)));
        thumb = toBase64(new Uint8Array(thumb), true);
        return thumb;
    }
    async audit(url) {
        return data.fromURL(url);
    }
}