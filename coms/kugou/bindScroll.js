function bindScroll(titlebar, page) {
    var labelarea = titlebar.children[0];
    css(labelarea, "height:100%;width:100%;position:absolute;left:0;top:0;background-color:rgb(44,162,249);");
    css(titlebar.children[1], "height:50px;box-shadow:none;");
    onappend(page, function () {
        css(titlebar, "background:transparent;min-height:50px;box-shadow:none");
        opacity(labelarea, 0);
    });
    page.onscroll = function () {
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
        css(titlebar, `background: center ${image.style.backgroundImage};background-size:cover;height:${height}px;`);
        opacity(labelarea, 1 - titlebar.offsetHeight / offsetHeight);
    }
}