var message = require("../../../efront/message");
function userLogin({ path }) {
    return new Promise(function (ok, oh) {
        message.count({
            path: path || "/",
            isupdate: false
        }, function (count) {
            ok(count);
        });
    });
}
module.exports = userLogin;