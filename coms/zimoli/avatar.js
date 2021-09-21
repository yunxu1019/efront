function main(elem) {
    if (!isElement(elem)) {
        elem = document.createElement("img");
    }
    if (!/^img$/i.test(elem.tagName)) {
        care(elem, function (src) {
            console.log(elem);
            css(elem, { backgroundImage: `url('${src}')` });
        })
    }
    var size = +elem.getAttribute('size');
    if (size) {
        css(elem, {
            width: fromPixel(size),
            height: fromPixel(size)
        });
    }
    return elem;
}
main.toString = template.toString;