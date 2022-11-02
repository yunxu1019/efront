cross.digest = render.digest;
var topHeight = 44;
function bindScroll(titlebar, page) {
    var labelarea = div();
    var [label, back] = titlebar.children;
    css(back, `height:${fromPixel(topHeight)}`);
    var img = document.createElement("png");
    css(labelarea, "backdrop-filter:blur(20px);height:100%;width:100%;background:inherit;position:absolute;left:0;top:0;z-index:-1");
    css(img, 'position:absolute;left:0;top:0;width:100%;height:100%;filter:brightness(.8) saturate(.6);z-index:-1');
    var init = function (image) {
        if (image) {
            appendChild.after(label, labelarea);
            appendChild.after(label, img);
            setOpacity(image, 0);
            css(img, `background:${image.style.backgroundImage}no-repeat center;background-size:cover;`);
        }
        else {
            remove(img);
            remove(labelarea);
        }
    };
    var getImage = function () {
        var image = page.children[0];
        if (!image) return;
        if (!image.style.backgroundImage && !/img/i.test(image.className)) image = page.children[1] || image;
        if (!image.style.backgroundImage && !/img/i.test(image.className)) return;
        return image;
    }

    onmounted(page, function () {
        css(titlebar, `min-height:${fromPixel(topHeight)}`);
        var image = getImage();
        init(image);
        refresh();
    });
    var refresh = function () {
        var image = getImage();
        if (!image) return;
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
            css(image, { paddingBottom: fromOffset(height) });
        }
        css(titlebar, `height:${fromOffset(height)}`);
        setOpacity(labelarea, 1 - (titlebar.offsetHeight) / offsetHeight);
        setOpacity(label, 1 - (titlebar.offsetHeight - topHeight) / (offsetHeight - topHeight));
        return {};
    };
    if (!page.renders) page.renders = [];
    page.onscroll = refresh;
}