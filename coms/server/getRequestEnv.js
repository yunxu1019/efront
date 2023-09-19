var setupenv = require("../efront/setupenv");
var liveload = require("./liveload");
var onreload = function () {
    liveload.reload(this);
};
function getRequestEnv(req) {
    var referer = getHeader(req.headers, 'referer');
    if (!referer) return null;
    var appname = parseURL(referer).pathname;
    appname = appname.replace(/^\/|\/[^\/]*$/g, '');
    var env = setupenv(appname);
    if (!env.reload) env.reload = onreload;
    return env;
}
module.exports = getRequestEnv;