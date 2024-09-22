var userdata = require("./userdata");
var encode62 = require("../crypt/encode62");
var message = require('../message');
module.exports = async function (req, roles) {
    var c = getHeader(req.headers, 'authorization');
    var sign = remoteAddress(req);
    if (!c) return false;
    c = encode62.timedecode(c);
    c = await userdata.unsign(c);
    var a = encode62.geta(sign);
    c = c.split(/\s+/);
    var b = encode62.ca2b(c.pop(), a);
    var uid = c.pop();
    if (uid) {
        var u = await message.invoke("dbLoad", ['用户', uid]);
        if (!u || !await userdata.checkPasswordB(b, u)) return false;
        return checkroles(u.roles, roles);
    }
    return userdata.checkPasswordB(b);
}