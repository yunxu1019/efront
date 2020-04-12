cross.digest = render.digest;
var topHeight = 44;
function bindScroll(titlebar, page) {
    var labelarea = div();
    var [label, back] = titlebar.children;
    css(back, `height:${fromPixel(topHeight)}`);
    appendChild.after(label, labelarea);
    var init=function(){
        init=function(){};
        css(labelarea, "height:100%;width:100%;background:#000;position:absolute;left:0;top:0;z-index:-1");
    };
    onappend(page, function () {
        css(titlebar, `min-height:${fromPixel(topHeight)}`);
        setTimeout(refresh);
    });
    var refresh = function () {
        var image = page.children[0];
        if (!image) return;
        if (!image.style.backgroundImage && !/img/i.test(image.className)) image = page.children[1] || image;
        if (!image.style.backgroundImage && !/img/i.test(image.className)) return;
        init();
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
        if (height > page.offsetHeight >> 1) {
            height = page.offsetHeight >> 1;
            css(image, { paddingBottom: fromOffset(height) })
        }
        css(titlebar, `background: center ${image.style.backgroundImage};background-size:cover;height:${fromOffset(height)}`);
        setOpacity(labelarea, (1 - (titlebar.offsetHeight + offsetHeight) / offsetHeight / 2));
        setOpacity(label, 1 - (titlebar.offsetHeight - topHeight) / (offsetHeight - topHeight));
        return {};
    };
    if (!page.renders) page.renders = [];
    page.onscroll = refresh;
}