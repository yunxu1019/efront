var userdata = require("../efront/userdata");
var encode62 = require("../crypt/encode62");
module.exports = function (c, sign) {
    if (!c) return false;
    c = encode62.timedecode(c);
    var a = encode62.geta(sign);
    c = c.replace(/^[\w]*\s+/, '');
    var b = encode62.ca2b(c, a)
    return userdata.checkPasswordB(b);
}