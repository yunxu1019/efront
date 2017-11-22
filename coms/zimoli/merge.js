function mergeToElement(node, src) {
    if(!src)return;
    var dst_o = getNamedElements(node);
    for (var k in dst_o) {
        var elem = dst_o[k];
        if (k in src) {
            val(elem, src[k]);
        }
    }
}
function getNamedElements(node, result = {}) {
    var save = function (key, node) {
        if (!result[key]) {
            result[key] = node;
        } else if (result[key] instanceof Array) {
            result[key].push(node);
        } else {
            result[key] = [result[key], node];
        }
    };
    if (node.length) {
        for (var cx = 0, dx = node.length; cx < dx; cx++) {
            var nod = node[cx];
            var key = nod && (nod.name || nod.getAttribute && nod.getAttribute("name"));
            if (key) save(key, nod);
            else getNamedElements(node.children, result);
        }
    } else {
        var key = node && (node.name || node.getAttribute && node.getAttribute("name"));
        if (key) result[key] = node;
    }
    return result;
}
function merge(dst, src) {
    if (isFunction(src)) {
        src = src();
    }
    if (isElement(dst)) {
        mergeToElement(dst,src);
    } else if (isDate(src)) {
        dst = new Date(src);
    } else if (src instanceof Object) {
        for (var k in src) {
            var v = src[k];
            dst[k] = v;
        }
    }
}
