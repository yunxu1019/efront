var icons = {
    file: shapes$file,
    folder: shapes$folder,
};
class Fileitem {
    icons = icons;
}
var e = Fileitem.prototype;
e.startMarquee = function (sp) {
    if (sp.scrollWidth <= sp.clientWidth) return;
    clearInterval(sp.mq);
    sp.mq = setInterval(function () {
        clearInterval(sp.mq);
        sp.mq = setInterval(function () {
            var scrollLeft = sp.scrollLeft;
            sp.scrollLeft += 1;
            if (sp.scrollLeft === scrollLeft) sp.scrollLeft = 0;
        }, 16);
    }, 400);
    sp.setAttribute("marquee", '');
    sp.scrollLeft = sp.clientWidth - parseFloat(getComputedStyle(sp).paddingLeft);
};
e.stopMarquee = function (sp) {
    clearInterval(sp.mq);
    sp.removeAttribute("marquee");
    sp.scrollLeft = 0;
};

function fileitem(elem) {
    elem.innerHTML = template;
    var c = elem.children[0];
    var cs = new Fileitem;
    $scoped.set(c, cs);
    var es = $scoped.get(elem);
    var ext = /\.([^\.]+)$/.exec(es.d.name);
    if (ext) cs.ext = ext[1];
    else cs.ext = '';
    extend(cs, es);
    return c;
}