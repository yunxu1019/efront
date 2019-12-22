"use strict";
// var path = require("path");
// function getInitReferenced(dependence, args, data, sliceFrom, realpath) {
//     var requires = ["init", "require"].map(a => dependence.indexOf(a)).filter(a => ~a);
//     if (!requires.length) return [];
//     var initReg = new RegExp(`(?:${requires.map(a => args[a]).join("|")})${/\s*\((['"`])([_$\w\/\\\.\-]+)\1\s*[,\)]/.source}`, 'g');
//     var required = [];
//     var map = dependence.requiredMap = Object.create(null);
//     data.slice(sliceFrom).replace(initReg, function (match, quote, refer) {
//         if (/^[\.\/]/.test(refer)) {
//             var reference = path.resolve(path.dirname(realpath), refer);
//         } else {
//             reference = refer;
//         }
//         map[refer] = reference;
//         required.push(reference);
//         return match;
//     });
//     return required;
// }
var get_relatives = function (name, required, dependence) {
    var required_base = name.replace(/[^\/\$]+$/, "");
    required_base = required_base.replace(/^\.?[\/\$]+/, "");
    var is_page = /^\//.test(name);
    var map = dependence.requiredMap = Object.create(null);

    return required.map(r => {
        var r1 = r;
        var base = required_base;
        if (/^\.*[\/]/.test(r1)) {
            r1 = r1.replace(/^\.\//, '');
            while (/\.\.[\/\$]/.test(r1)) {
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
                base = base.replace(/\//g, "$");
                r1 = r1.replace(/\//g, '$');
            }
            var r2 = base + r1;
        } else {
            var r2 = r1.replace(/\//g, '$');
        }
        map[r] = r2;
        return r2;
    });
};


function getDependence(responseData) {
    if (responseData.type !== "" && responseData.type !== "/") return [];
    var { data = "" } = responseData;
    data = String(data);
    var functionArgs;
    //依赖项名称部分的长度限制为36*36*18=23328
    var doublecount = parseInt(data.slice(0, 3), 36);
    if (doublecount >> 1 << 1 === doublecount) {
        var dependencesCount = doublecount >> 1;
        var dependenceNamesOffset = 3 + dependencesCount;
        var dependenceNames = data.slice(3, dependenceNamesOffset);
        functionArgs = dependenceNames ? dependenceNames.split(",") : [];
    } else {
        functionArgs = [];
    }
    var argslength = functionArgs.length >> 1;
    var dependence = functionArgs.slice(0, argslength);
    dependence.args = functionArgs.slice(argslength, argslength << 1);
    var required = functionArgs[argslength << 1];
    dependence.offset = dependenceNamesOffset || 0;
    dependence.require = required ? get_relatives(responseData.url, required.split(";"), dependence) : [];
    return responseData.dependence = dependence;
};

module.exports = getDependence;