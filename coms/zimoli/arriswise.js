var reflect = {
    Width: "Height",
    Height: "Width",
    width: "height",
    height: "width",
    X: "Y",
    Y: "X",
    Top: "Left",
    Left: "Top",
    top: "left",
    left: "top",
    Right: "Bottom",
    Bottom: "Right",
    right: "bottom",
    bottom: "right"
};
var regkeys = keys(reflect);
var regexps = new RegExp(regkeys.join("|"), "g");
function arriswise(func, argumentsList = [], thisObj) {
    var newf = String(func).replace(regexps, function (matched) {
        var searched = reflect[matched];
        if (searched) return searched;
        return matched;
    });
    return Function.apply(null, argumentsList.slice(0, argumentsList.length >> 1).concat("return " + newf)).apply(thisObj, argumentsList.slice(argumentsList.length >> 1))
}