var getArgs = function (text) {
    var args, functionBody;
    //依赖项名称部分的长度限制为36*36*18=23328
    var doublecount = parseInt(text.slice(0, 3), 36);
    if (doublecount >> 1 << 1 === doublecount) {
        var dependencesCount = doublecount >> 1;
        var dependenceNamesOffset = 3 + dependencesCount;
        var dependenceNames = text.slice(3, dependenceNamesOffset);
        args = dependenceNames ? dependenceNames.split(",") : [];
        functionBody = text.slice(dependenceNamesOffset);
        var strreg = /^(\w{1,6})(?=\[)/;
        var match = strreg.exec(functionBody);
        if (match) {
            var str = match[1];
            var strlength = parseInt(str, 36);
            if (strlength >> 1 << 1 === strlength) {
                strlength = strlength >> 1;
                var strstart = str.length;
                var strend = strstart + strlength;
                var strs = functionBody.slice(strstart, strend);
                strs = global.eval(strs);
                functionBody = functionBody.slice(strend);
            }
        }
        var argsstart = (args.length - (strs ? strs.length : 0)) >> 1;
        var argsend = (argsstart << 1) + (strs ? strs.length : 0);
        var argNames = args.slice(argsstart, argsend);
        var required = args[argsend];
        args = args.slice(0, argsstart);
    } else {
        functionBody = text;
    }
    return Object.assign([argNames || [], functionBody, args || [], required || '', strs || [], (dependenceNamesOffset || 0) + (strend || 0), dependenceNamesOffset], {
        argNames, functionBody, args, required, strs, dependenceNamesOffset, strend: strend + dependenceNamesOffset
    });
};
module.exports = getArgs;