"use strict";
var i18n_data;
var i18n_file = require("path").join(__dirname, "../../data/i18n/zh-cn.json");
var parse = function (value) {
    var target = require("./loadjson")(i18n_file);
    var regexps = [];
    for (var k in target) {
        if (/\(.+\)/g.test(k)) {
            regexps.push(k);
        }
    }
    var regexp = new RegExp(regexps.map(a => `(${a.replace(/([^\\])\(/g, "$1(?:")})`).join("|"), "g");
    return {
        target,
        regexp,
        regexps: regexps
    };
}
var reload = function () {
    var {
        target,
        regexp,
        regexps
    } = parse();
    var parseArgs = function (args) {
        return [].map.call(args, a => target.hasOwnProperty(a) ? target[a] : String(a).replace(regexp, function (matched) {
            regexps.forEach((reg, x) => arguments[x + 1] && (matched = matched.replace(new RegExp(reg), function () {
                var args = parseArgs([].slice.call(arguments, 1, arguments.length - 2));
                return target[reg].replace(/\$(\d+)/g, (m, d) => args[d - 1]);
            })));
            return matched;
        }));
    };

    i18n_data = new Proxy(function i18n() {
        return parseArgs(arguments).join("\r\n");
    }, {
            get: function (i18n, i18n_path) {
                if (target.hasOwnProperty(i18n_path)) {
                    return function i18nReader() {
                        var args = parseArgs(arguments);
                        return target[i18n_path].replace(/%(\d+)/g, (i, d) => args[d - 1] || "");
                    };
                } else {
                    return function i18nAdapter() {
                        var args = parseArgs(arguments);
                        return i18n_path.replace(/_/g, " ").trim().replace(/%(\d+)/g, (i, d) => args[d - 1] || "");
                    };
                }
            }
        });
};
require("../server/watch")(i18n_file, reload);
reload();
module.exports = function i18n(language) {
    return i18n_data;
};