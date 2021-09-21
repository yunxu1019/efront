var message = require("../../coms/message");
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