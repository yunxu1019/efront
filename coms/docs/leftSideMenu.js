var downTimmer;
onmouseup(window, function () {
    clearTimeout(downTimmer);
});
function leftSideMenu() {
    var banner = list(function (index) {
        var coms = banner.src;
        if (index >= coms.length) return;
        var com = coms[index];
        var _div = button(com.name);
        addClass(_div, "tab" + com.tab);
        css(_div, {
            "padding-left": com.tab * 10 * renderPixelRatio + 'pt'
        });
        onmousedown(_div, function (event) {
            clearTimeout(downTimmer);
            var _div = this;
            downTimmer = setTimeout(function () {
                if (onclick.preventClick) {
                    return;
                }
                var clone = cloneVisible(_div);
                var position = getScreenPosition(_div);
                css(clone, `position:absolute;z-index:${0x7fffffff};left:${position.left}px;top:${position.top}px;`);
                appendChild(document.body, clone);
                drag(clone, event);
            }, 300);
        });
        return _div;
    });
    return banner;
}