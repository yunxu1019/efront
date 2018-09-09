function font_test(src) {
    var style = createElement("style");
    var src = "data/iconfont-kugou";
    style.innerHTML = (`@font-face{font-family: "iconfont";
    src: url('${src}.eot?t=1496068931776'); /* IE9*/
    src: url('${src}.eot?t=1496068931776#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('${src}.woff?t=1496068931776') format('woff'), /* chrome, firefox */
    url('${src}.ttf?t=1496068931776') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('${src}.svg?t=1496068931776#iconfont') format('svg'); /* iOS 4.1- */}`);
    appendChild(document.head, style);
    var divStyle = div();
    var fontName = "font-" + (+new Date).toString(36);
    divStyle = new Array(0xffff).fill(0).map(function (a, cx) {
        var d = div();
        var code = cx.toString(16);
        d.innerHTML = "0".repeat(4 - code.length) + code + ":&#" + cx + ";";
        css(d, "display:inline-block");
        return d;
    });
    var layer = lattice(divStyle, 60, 320);
    css(layer, "font-family:iconfont;");
    addClass(layer, fontName);
    layer.style.height = "100%";
    onappend(layer, e => layer.go(0));
    return layer;
}