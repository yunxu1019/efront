var encode62 = require("../crypt/encode62");
var userdata = require("../efront/userdata");
module.exports = async function(a) {
    a = encode62.timedecode(a);
    var b = await userdata.checkPasswordA(a);
    if (b) return encode62.timeencode(b);
};