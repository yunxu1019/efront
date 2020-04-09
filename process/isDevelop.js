var reg = /^(0|false|null|uset|none|undefined|nil|unset)$/i;
var test = a => !!a && !reg.test(a);
var env = process.env;
module.exports = test(env.IN_TEST_MODE) || test(env.IS_TEST_MODE) || test(env.TEST_MODE);
