cross.digest = render.digest;
var topHeight = 44;
function bindScroll(titlebar, page) {
    var labelarea = div();
    var [label, back] = titlebar.children;
    css(back, `height:${topHeight}px;`);
    appendChild.after(label, labelarea);
    css(labelarea, "height:100%;width:100%;position:absolute;left:0;top:0;z-index:-1");
    onappend(page, function () {
        css(titlebar, `min-height:${topHeight}px;`);
        // setOpacity(labelarea, 0);
        // setOpacity(label, 0);
        refresh();
    });
    var refresh = function () {
        var image = page.children[0];
        if (!image) return;
        if (!image.style.backgroundImage) image = page.children[1] || image;
        if (!image.style.backgroundImage) return;
        setOpacity(image, 0);
        image.style.opacity = 0;
        var scrollTop = page.scrollTop;
        var offsetHeight = image.offsetHeight;
        var height = offsetHeight + image.offsetTop - scrollTop;
        if (height > offsetHeight) {
            height = offsetHeight;
        }
        if (height < topHeight) {
            height = topHeight;
        }
        css(titlebar, `background: center ${image.style.backgroundImage};background-size:cover;height:${height}px;`);
        setOpacity(labelarea, (1 - (titlebar.offsetHeight + offsetHeight) / offsetHeight / 2));
        setOpacity(label, 1 - (titlebar.offsetHeight - topHeight) / (offsetHeight - topHeight));
        return {};
    };
    page.setAttribute("ng-class", "refresh()");
    page.onscroll = refresh;
}