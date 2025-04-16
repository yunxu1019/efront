// 一个简化版的list，不支持回弹，且每行高度一致
function list(elem) {
    var g = getGenerator(elem);
    var src = [];
    var childrenMap = [];
    var collectChildren = function (src, old) {
        var children = Array.apply(null, elem.children);
        childrenMap = [];
        var inc = 0;
        for (var cx = 0, dx = src.length; cx < dx; cx++) {
            switch (old[cx]) {
                case old[inc]:
                    childrenMap[cx] = children[inc];
                    delete children[inc];
                    inc++;
                    continue;
                case old[inc + 1]:
                    childrenMap[cx] = children[++inc];
                    delete children[inc];
                    inc++;
                    continue;
            }
        }
        remove(children.filter(a => !!a));
        console.log(src)
    }
    care(elem, function (src1, old) {
        src = src1;
        if (src1 !== old) remove(elem.children);
        else collectChildren(src, old);
        if (isMounted(elem)) mount();
        remove(childrenMap.filter(a => !!a));
    });
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
    elem.refresh = refresh;
    return elem;
}