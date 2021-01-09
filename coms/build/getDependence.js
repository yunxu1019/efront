"use strict";
var getRequired = require("../compile/required");
var getArgs = require("./getArgs");
function getInitReferenced(dependence, args, argNames, data) {
    var requires = ["init"].map(a => dependence.indexOf(a)).filter(a => ~a);
    if (!requires.length) return [];
    var initReg = new RegExp(`\\b(?:${requires.map(a => args[a]).join("|")})${/\s*\((['"`]|)([_$\w\/\\\.\-]+)\1\s*[,\)]/.source}`, 'g');
    var required = [];
    args = args.slice(args.length - argNames.length);
    data.replace(initReg, function (match, quote, refer) {
        if (quote) {

            required.push(refer);
        } else {
            var index = args.indexOf(refer);
            if (~index) {
                required.push(argNames[index]);
            }
        }
        return match;
    });
    return required;
}
var get_relatives = function (name, required, dependence) {
    var required_base = name.replace(/[^\/\$]+$/, "");
    required_base = required_base.replace(/^\.?[\/\$]+/, "");
    var is_page = /^\//.test(name);
    var map = dependence.requiredMap = Object.assign(Object.create(null), dependence.requiredMap);

    return required.map(r => {
        var r1 = r;
        var base = required_base;
        if (/^\.*[\/]/.test(r1)) {
            r1 = r1.replace(/^\.\//, '');
            while (/\.\.[\/\$]/.test(r1)) {
                if (/^[\\\/\$\.]*$/.test(base)) {
                    break;
                }
                base = base.replace(/[^\/\$]*[\/\$]$/, '');
                r1 = r1.slice(3);
            }
            base = base.replace(/^[\/\$]/, '');
            if (/^\//.test(r1)) {
                base = '';
                r1 = r1.slice(1);
            }
            if (is_page) {
                base = "/" + base;
            } else {
                base = base.replace(/\$/g, "/");
                r1 = r1.replace(/\$/g, '/');
            }
            var r2 = base + r1;
            if (!/^\.*\//.test(r2)) {
                r2 = "./" + r2;
            }
        } else {
            var r2 = r1.replace(/\//g, '$');
        }
        map[r] = r2;
        return r2;
    });
};
function getDependence(response) {
    if (!response.realpath) return [];
    if (response.type !== "" && response.type !== "/" && response.type !== "\\") return [];
    var { data = "" } = response;
    var ext = /\.([^\.]+)$/.exec(response.realpath);
    if (ext && !/([jt]sx?|vuex?)/i.test(ext)) return [];

    var startTime = new Date;
    data = String(data);
    if (response.type !== "\\") {
        var [argNames, functionBody, argsList, required, strs, offset] = getArgs(data);
        var dependence = argsList;
        dependence.args = argNames;
        var required1 = getInitReferenced(dependence, dependence.args, strs, functionBody);
        dependence.offset = offset;
        if (required) {
            required = required.split(";");
            required = get_relatives(response.url, required, dependence);
        }
        if (required1 && required1.length) {
            required1 = get_relatives(response.url, required1, dependence);
        }
        dependence.require = required1.concat(required || []);
    } else {
        var dependence = [];
        console.info("正在分析", response.realpath);
        var required = getRequired(data, required);
        required = get_relatives(response.url.slice(1), required, dependence);
        dependence.require = required || [];
    }
    response.time += new Date - startTime;
    return response.dependence = dependence;
}

module.exports = getDependence;