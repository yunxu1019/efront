var { QUOTED, unshort } = common;
var patchname = function (prefix, node, alias) {
    if (node.isprop && node.short) {
        unshort(node);
    }
    var t = node.text;
    var hasdot = /^\.\.\./.test(t);
    if (hasdot) t = t.slice(3);
    if (alias) t = t.replace(/^[^\.\[]+/, alias);
    t = prefix + t;
    if (hasdot) t = "..." + t;
    node.text = t;
};
