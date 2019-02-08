"use strict";
function getInitReferenced(dependence, args, data, sliceFrom) {
    var indexOfInit = dependence.indexOf("init");
    if (indexOfInit < 0) return;
    var initRef = args[indexOfInit];
    var initReg = new RegExp(`${initRef}${/\s*\((['"`])([_$\w]+)\1\s*[,\)]/.source}`, 'g');
    var required = [];
    data.slice(sliceFrom).replace(initReg, function (match, quote, reference) {
        required.push(reference);
        return match;
    });
    return required;
}

function getDependence(responseData) {
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
    dependence.require = getInitReferenced(dependence, dependence.args, data, dependenceNamesOffset) || [];
    return responseData.dependence = dependence;
};

module.exports = getDependence;