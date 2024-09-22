var encode62 = require("../crypt/encode62");
var userdata = require("./userdata");
var message = require("../message");
module.exports = async function (a, sign, uid) {
    if (uid) var u = await message.invoke('dbLoad', ['用户', uid]);
    a = encode62.timedecode(a);
    var b = await userdata.checkPasswordA(a, u);
    if (!b) return;
    var a1 = encode62.geta(sign);
    var c = encode62.ab2c(a1, b);
    c = await userdata.sign(c);
    c = encode62.timeencode(c);
    return uid ? uid + " " + c : c;
};