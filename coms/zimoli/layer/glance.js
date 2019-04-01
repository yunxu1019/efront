var dragview = function (event) {
    var { page, pages, menu } = dragview;
    if (isTargetOf(pages, event.target) && pages.index !== 0 && !page.offsetLeft) return;
    var savedX = event.clientX;
    var savedY = event.clientY;
    var moving = null;
    moveupon(event.target, {
        move(event) {
            if (event.moveLocked) return;
            var deltaX = savedX - event.clientX;
            var deltaY = savedY - event.clientY;

            if (!moving) {
                if (Math.abs(deltaX) < MOVELOCK_DELTA && Math.abs(deltaY) < MOVELOCK_DELTA) return;
                if (deltaX > 0 && !parseInt(page.style.left) || Math.abs(deltaY) >= Math.abs(deltaX)) {
                    moving = -1;
                } else {
                    moving = {
                        restX: page.offsetLeft - savedX
                    };
                }
            }
            if (moving === -1) return;
            event.moveLocked = true;
            page.style.marginLeft = 0;
            moving.deltaX = deltaX;
            var left = event.clientX + moving.restX;
            page.style.left = left + "px";
            var scale = ((page.offsetWidth - left / 2.6) / page.offsetWidth);
            page.style.transform = "scale(" + scale + ")";
            menu.style.transform = "scale(" + (1.72 - scale) + ")";
        },
        end() {
            if (moving && moving !== -1) {
                var left = parseInt(page.style.left);
                if (moving.deltaX < 0 && left > page.offsetWidth * 0.3 || moving.deltaX > 0 && left > page.offsetWidth * 0.7 || !moving.deltaX && left > page.offsetWidth >> 1) {
                    dragview.toRight();
                } else {
                    dragview.toLeft();
                }
            }
        }
    }, event);
}


/**
 * 左侧为菜单
 * 菜单在小屏上收起，可以点击按钮打开
 */
function main(mainPath, historyName = "glance") {
    var layer = div();
    layer.innerHTML = glance;
    if (mainPath instanceof Object) {
        var { left: leftPath, top: topPath, main: mainPath } = mainPath;
    }
    var [leftLayer, topLayer] = layer.children;
    once("append")(layer, function () {
        zimoli.switch(historyName, layer, mainPath);
        zimoli();
        if (leftPath) {
            zimoli.prepare(leftPath, function () {
                var page = zimoli.go(leftPath, null, leftLayer);
                page.setAttribute('layer', 'left');
                appendChild.replace(leftLayer, page);
                leftLayer = page;
            });
        }
        if (topPath) {
            zimoli.prepare(topPath, function (page) {
                var page = zimoli.go(topPath, null, topLayer);
                page.setAttribute('layer', 'top');
                appendChild.replace(topLayer, page);
                topLayer = page;
            });
        }
    });
    var closed = false;
    var isClosed = function () {
        var computed = getScreenPosition(leftLayer);
        var delta = computed.left + computed.width;
        return delta <= 0;
    };
    var bindClass = function () {
        if (isClosed() === closed) return;
        if (closed) {
            var collapse = parseInt(getComputedStyle(layer).paddingLeft) === 0;
            addClass(layer, 'close');
            removeClass(layer, 'open');
            css(layer, `margin-left:0`);
            if (collapse) {
                removeClass(layer, 'close open');
            }
        } else {
            addClass(layer, 'open');
            removeClass(layer, 'close');
            css(layer, `margin-left:${fromOffset(leftLayer.offsetWidth)}`);
            setTimeout(function () {
                var collapse = parseInt(getComputedStyle(layer).paddingLeft) === 0;
                if (!collapse) {
                    css(layer, 'margin-left:0');
                }
            },20);
        }
    };
    layer.closeLeft = function () {
        closed = true;
        bindClass();
    };
    layer.openLeft = function () {
        closed = false;
        bindClass();
    };
    onmousedown(layer, e => dragview(e, { menu: leftLayer, page: layer }))
    layer.switchLeft = function () {
        closed = !isClosed();
        bindClass();
    };
    return layer;
}