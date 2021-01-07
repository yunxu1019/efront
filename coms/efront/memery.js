var reg = /^(0|false|null|uset|none|undefined|nil|unset)$/i;
var test = a => !!a && !reg.test(a);
var env = process.env;
var istest = test(env.IN_TEST_MODE) || test(env.IS_TEST_MODE) || test(env.TEST_MODE);
var noproxy;
module.exports = {
    compress: !istest,
    get noproxy() {
        if (noproxy !== undefined) {
            return noproxy;
        }
        if (env.NOPROXY) {
            noproxy = !reg.test(env.NOPROXY);
        } else if (env.PROXY) {
            noproxy = !test(env.PROXY);
        } else {
            noproxy = this.compress;
        }
        return noproxy;
    }
};