var getArgs = function (text) {
    var args, functionBody;
    var argStart = +text.charAt(0);
    if (argStart > 1) {
        var dependencesCount = parseInt(text.slice(1, argStart), 36);
        var dependenceNamesOffset = argStart + dependencesCount;
        var dependenceNames = text.slice(argStart, dependenceNamesOffset);
        args = dependenceNames ? dependenceNames.split(",") : [];
        functionBody = text.slice(dependenceNamesOffset);
        var strstart = +functionBody.charAt(0);
        if (strstart > 1) {
            var strlength = parseInt(functionBody.slice(1, strstart), 36);
            var strend = strstart + strlength;
            var strs = functionBody.slice(strstart, strend);
            strs = global.eval(strs);
            functionBody = functionBody.slice(strend);
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