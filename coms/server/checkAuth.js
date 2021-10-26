var userdata = require("../efront/userdata");
var encode62 = require("../crypt/encode62");
module.exports = function (b) {
    if (!b) return false;
    b = b.replace(/^[\w]*\s+/, '');
    b = encode62.timedecode(b);
    return userdata.checkPasswordB(b);
}