var detectWithExtension = require("../build/detectWithExtension");
var commbuilder = require("./commbuilder");
var comspath = require("./inCom").comms_root;
var fs = require('fs');
var required_cache = Object.create(null);
var initcom = function (pathname) {
    return new Promise(function (ok, oh) {
        fs.readFile(pathname, function (error, data) {
            if (error) return oh(error);
            var content = String(data);
            var { params, imported, required, data } = commbuilder.parse(content);
            var func = Function.apply(null, params.concat(data));
            imported = imported.map(a => require2(a, required));
            Promise.all(imported).then(function () {
                var res = func.apply(func, imported);
                ok(res);
            })
        });

    });
};
function require2(pathname, required) {
    if (typeof pathname === 'number') {
        pathname = required[pathname];
    }
    if (global[pathname]) return global[pathname];
    if (required_cache[pathname]) return required_cache[pathname];
    return required_cache[pathname] = detectWithExtension(pathname, ['', '.js', '.mjs', '.ts', '.json'], comspath).then(initcom, function (e) {
        return require(pathname);
    });

}
module.exports = require2;