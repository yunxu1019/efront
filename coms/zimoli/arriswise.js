var reflect = {
    Width: "Height",
    Height: "Width",
    width: "height",
    height: "width",
    X: "Y",
    Y: "X",
    "px": "px",
    "deltax": "deltay",
    Top: "Left",
    Left: "Top",
    top: "left",
    left: "top",
    Right: "Bottom",
    Bottom: "Right",
    right: "bottom",
    bottom: "right"
};
var regkeys = keys(reflect).map(a => /^[xy]$/.test(a) ? `\\b${a}|${a}\\b` : a);
var regexps = new RegExp(regkeys.join("|"), "g");
var rep = function (matched) {
    var searched = reflect[matched];
    if (searched) return searched;
    return matched;
};
var replaceArg = function (arg) {
    if (isString(arg)) {
        return arg.replace(regexps, rep);
    }
    return arg;
};
function build(func, argNames, argsArr) {
    var newf = String(func).replace(regexps, rep);
    return Function.apply(null, argNames.map(replaceArg).concat("return " + newf))
        .apply(this, argsArr.map(replaceArg));
}
var arriswise = function (func, args = []) {
    if (isFunction(args.slice)) {
        // 兼容老方法
        return build.call(arguments[2] || this, func, args.slice(0, args.length >> 1), args.slice(args.length >> 1));
    }
    var allArgumentsNames = args[args.length - 1];
    return build.call(this, func, allArgumentsNames, [].slice.call(args, 0));
};