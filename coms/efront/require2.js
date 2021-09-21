var detectWithExtension = require("../build/detectWithExtension");
var commbuilder = require("./commbuilder");
var comspath = require("./inCom").comms_root;
var fs = require('fs');
var required_cache = Object.create(null);
var initcom = function (__require, pathname) {
    return new Promise(function (ok, oh) {
        fs.readFile(pathname, function (error, data) {
            if (error) return oh(error);
            var content = String(data);
            var { params, imported, required, data } = commbuilder.parse(content, pathname, pathname);
            var func = Function.apply(null, params.concat(data));
            if (!(imported instanceof Array)) imported = [];
            imported = imported.map(a => __require(required, a));
            Promise.all(imported).then(function (imported) {
                var res = func.apply(func, imported);
                ok(res);
            }, oh);
        });

    });
};
function require2(pathname, __require) {
    if (global[pathname]) return global[pathname];
    if (required_cache[pathname]) return required_cache[pathname];
    return required_cache[pathname] = detectWithExtension(pathname, ['', '.js', '.mjs', '.ts', '.json'], comspath).then(initcom.bind(null, __require), function (e) {
        return require(pathname);
    }).then(function (res) {
        return required_cache[pathname] = res;
    })

}
module.exports = require2;