// 一个简化版的list，不支持回弹，且每行高度一致
function list(elem) {
    var g = getGenerator(elem);
    var s = [];
    care(elem, function (src, old) {
        s = src;
        if (src !== old) remove(this.children);
        if (isMounted(elem)) refresh();
    });
    var refresh = function () {
        var fsize = parseFloat(getComputedStyle(elem).lineHeight);
        var { top, height } = getScreenPosition(elem);
        var sheight = screen.height;
        var i = 0;
        var childrenMap = Object.create(null);
        for (var c of elem.children) {
            if (isFinite(c.index)) childrenMap[c.index] = c;
        }
        if (top < -sheight) {
            i = (-top - sheight) / fsize | 0;
        }
        css(elem, { paddingTop: i * 1.36 + 'em' });
        top += i * fsize;
        sheight += sheight;
        var p = null;
        while (top < sheight) {
            var e = childrenMap[i];
            if (!e) e = g(i, s[i]);
            else delete childrenMap[i];
            if (!e) break;
            e.index = i;
            top += fsize;
            i++;
            if (isMounted(e) && (!p || e.previousSibling === p));
            else if (p) appendChild.after(p, e);
            else appendChild(elem, e);
            p = e;
        }
        for (var k in childrenMap) remove(childrenMap[k]);
    };
    on("mounted")(elem, refresh);
    elem.refresh = refresh;
    return elem;
}