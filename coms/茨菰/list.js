// 一个简化版的list，不支持回弹，且每行高度一致
function list(elem) {
    var g = getGenerator(elem);
    var src = [];
    var childrenMap = [];
    care(elem, function (src1, old) {
        src = src1;
        remove(elem.children);
        if (isMounted(elem)) mount();
    });
    var at = function (i) {
        var s = elem.start;
        if (i < s) return;
        var e = elem.end;
        if (i >= e) return;
        return elem.children[i + s];
    }
    var mount = function () {
        var fsize = parseFloat(getComputedStyle(elem).lineHeight);
        var { top, height } = getScreenPosition(elem);
        var sheight = screen.height;
        var i = 0;
        if (top < -sheight) {
            i = (-top - sheight) / fsize | 0;
        }
        elem.start = i;
        css(elem, { paddingTop: i * 1.36 + 'em' });
        top += i * fsize;
        sheight += sheight;
        var p = null;
        while (top < sheight) {
            var e = childrenMap[i];
            if (!e) e = g(i, src[i]);
            else delete childrenMap[i];
            if (!e) break;
            top += fsize;
            e.i = i;
            i++;
            if (isMounted(e) && (!p || e.previousSibling === p));
            else if (p) appendChild.after(p, e);
            else appendChild(elem, e);
            p = e;
        }
        elem.end = i;
    };
    var refresh = function () {
        childrenMap = Array.apply(null, elem.children);
        mount();
        remove(childrenMap.filter(a => !!a));
        childrenMap = [];
    }
    on("mounted")(elem, refresh);
    elem.at = at;
    elem.refresh = refresh;
    return elem;
}