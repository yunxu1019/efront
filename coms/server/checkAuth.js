var userdata = require("./userdata");
var encode62 = require("../crypt/encode62");
var message = require('../message');
module.exports = async function (req, roles) {
    var auth = getHeader(req.headers, 'authorization');
    var sign = remoteAddress(req);
    if (!auth) return false;
    auth = auth.split(/\s+/);
    var c = encode62.timedecode(auth.pop());
    var uid = auth.pop();
    c = await userdata.unsign(c);
    var a = encode62.geta(sign);
    var b = encode62.ca2b(c, a);
    if (uid) {
        var u = await message.invoke("dbLoad", ['用户', uid]);
        if (!u || !await userdata.checkPasswordB(b, u)) return false;
        req.socket.user = u;
        return checkroles(u.roles, roles);
    }
    return userdata.checkPasswordB(b);
}