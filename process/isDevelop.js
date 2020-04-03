var reg = /^(0|false|null|uset|none|undefined|nil|unset)$/i;
var env = process.env;
module.exports = reg.test(env.IN_TEST_MODE) || reg.test(env.IS_TEST_MODE) || reg.test(env.TEST_MODE);
