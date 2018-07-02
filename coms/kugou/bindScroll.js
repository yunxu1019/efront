cross.digest = render.digest;
function bindScroll(titlebar, page) {
    var labelarea = div();
    var [label, back] = titlebar.children;
    css(back, "height:50px;");
    appendChild.after(label, labelarea);
    css(labelarea, "height:100%;width:100%;position:absolute;background:#000;left:0;top:0;z-index:-1");
    onappend(page, function () {
        css(titlebar, "min-height:50px;");
        opacity(labelarea, 0);
        opacity(label, 0);
    });
    var refresh = function () {
        var image = page.children[0];
        if (!image) return;
        if (!image.style.backgroundImage) image = page.children[1] || image;
        opacity(image, 0);
        image.style.opacity = 0;
        var scrollTop = page.scrollTop;
        var offsetHeight = image.offsetHeight;
        var height = offsetHeight + image.offsetTop - scrollTop;
        if (height > offsetHeight) {
            height = offsetHeight;
        }
        if (height < 50) {
            height = 50;
        }
        css(titlebar, `background: center ${image.style.backgroundImage};background-size:cover;height:${height}px;`);
        opacity(labelarea, (1 - (titlebar.offsetHeight + offsetHeight) / offsetHeight / 2));
        opacity(label, 1 - (titlebar.offsetHeight - 50) / (offsetHeight - 50));
        return {};
    };
    page.setAttribute("ng-class", "refresh()");
    render(page, { refresh });
    page.onscroll = refresh;
}