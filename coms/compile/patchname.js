var { QUOTED, unshort } = require("./common");
var { recode } = require("../basic/strings");
var patchname = function (prefix, node, alias) {
    if (node.isprop && node.short) {
        unshort(node);
    }
    var t = node.text;
    var hasdot = /^\.\.\./.test(t);
    if (hasdot) t = t.slice(3);
    if (alias) t = t.replace(/^[^\.\[]+/, alias);
    if (prefix && !/\.$/.test(prefix) && !/^[\[\.]/.test(t)) {
        var aftfix = t.replace(/^[^\.\[]+/, "");
        t = prefix + `[${recode(t.slice(0, t.length - aftfix.length))}]` + aftfix;
    }
    else t = prefix + t;
    if (hasdot) t = "..." + t;
    node.text = t;
};
module.exports = patchname;