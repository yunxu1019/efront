var encode62 = require("../crypt/encode62");
var userdata = require("./userdata");
module.exports = async function (a, sign) {
    a = encode62.timedecode(a);
    var b = await userdata.checkPasswordA(a);
    if (!b) return;
    var a1 = encode62.geta(sign);
    var c = encode62.ab2c(a1, b);
    c = await userdata.sign(c);
    return encode62.timeencode(c);
};