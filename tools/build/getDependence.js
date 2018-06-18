"use strict";
function getDependence(responseData) {
    var { data = "" } = responseData;
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
    return responseData.dependence = dependence;
};

module.exports = getDependence;