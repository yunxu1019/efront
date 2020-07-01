function mergeToElement(node, src) {
    if (!src) return;
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
    if (!(src instanceof Object)) {
        return src;
    }
    if (isElement(dst)) {
        mergeToElement(dst, src);
    } else if (isDate(src)) {
        dst = new Date(src);
    } else if (dst instanceof Array) {
        if (src instanceof Array) {
            dst.splice(0, dst.length);
            dst.push.apply(dst, src);
        } else {
            dst.forEach(d => merge(d, src));
        }
    } else if (dst instanceof Object) {
        if (src instanceof Array) {
            src.forEach(s => merge(dst, s));
        } else {
            for (var k in src) {
                dst[k] = merge(dst[k], src[k]);
            }
        }
    } else {
        return merge(src instanceof Array ? [] : {}, src);
    }
    return dst;
}
