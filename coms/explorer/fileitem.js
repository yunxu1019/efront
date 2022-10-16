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
    sp.mq = setInterval(function () {
        clearInterval(sp.mq);
        sp.mq = setInterval(function () {
            var scrollLeft = sp.scrollLeft;
            sp.scrollLeft += 1;
            if (sp.scrollLeft === scrollLeft) sp.scrollLeft = 0;
        }, 16);
    }, 400);
    sp.setAttribute("marquee", '');
    sp.scrollLeft = sp.clientWidth;
};
e.stopMarquee = function (sp) {
    clearInterval(sp.mq);
    sp.removeAttribute("marquee");
    sp.scrollLeft = 0;
};

function fileitem(elem) {
    elem.innerHTML = template;
    var e = elem.children[0];
    e.$scope = new Fileitem;
    extend(e.$scope, elem.$scope);
    return e;
}