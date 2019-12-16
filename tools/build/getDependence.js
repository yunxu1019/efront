"use strict";
var path = require("path");
function getInitReferenced(dependence, args, data, sliceFrom, realpath) {
    var requires = ["init", "require"].map(a => dependence.indexOf(a)).filter(a => ~a);
    if (!requires.length) return [];
    var initReg = new RegExp(`(?:${requires.map(a => args[a]).join("|")})${/\s*\((['"`])([_$\w\/\\\.\-]+)\1\s*[,\)]/.source}`, 'g');
    var required = [];
    var map = dependence.requiredMap = Object.create(null);
    data.slice(sliceFrom).replace(initReg, function (match, quote, refer) {
        if (/^[\.\/]/.test(refer)) {
            var reference = path.resolve(path.dirname(realpath), refer);
        } else {
            reference = refer;
        }
        map[refer] = reference;
        required.push(reference);
        return match;
    });
    return required;
}

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
    var dependence = functionArgs.slice(0, functionArgs.length >> 1);
    dependence.args = functionArgs.slice(functionArgs.length >> 1);
    dependence.offset = dependenceNamesOffset || 0;
    dependence.require = getInitReferenced(dependence, dependence.args, data, dependenceNamesOffset, responseData.realpath) || [];
    return responseData.dependence = dependence;
};

module.exports = getDependence;