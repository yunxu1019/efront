var setupenv = require("../efront/setupenv");
var liveload = require("./liveload");
var proxy = require('./url-proxy');
var onreload = function () {
    liveload.reload(this);
};
async function getRequestEnv(req) {
    var referer = getHeader(req.headers, 'referer');
    if (!referer) return null;
    try {
        referer = decodeURI(referer);
    } catch {
        referer = unescape(referer);
    }
    referer = await proxy(req, referer);
    var appname = parseURL(referer).pathname || '/';
    appname = appname.replace(/^\/|\/[^\/]*$/g, '');
    var env = setupenv(appname);
    if (!env.reload) env.reload = onreload;
    return env;
}
module.exports = getRequestEnv;