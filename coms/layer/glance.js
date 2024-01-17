var dragview = function (dragview) {
    var savedX, savedY, moving, offsetWidth;
    var { page, menu } = dragview;
    preventOverflowScrolling(page);
    moveupon(page, {
        start(event) {
            savedX = event.clientX;
            savedY = event.clientY;
            offsetWidth = menu.offsetWidth;
            moving = null;
        },
        move(event) {
            if (moving === false) return;
            if (event.moveLocked) return;
            if (
                /resize/i.test(getComputedStyle(document.body).cursor)
            ) return;
            var deltaX = savedX - event.clientX;
            var deltaY = savedY - event.clientY;
            event.preventDefault();
            if (!moving) {
                if (!onclick.preventClick) return;
                if (Math.abs(deltaY) >= Math.abs(deltaX)) {
                    moving = -1;
                } else {
                    moving = {
                        restX: freeOffset(page.style.left || 0) - savedX
                    };
                    page.style.transition = 'none';
                }
            }
            if (moving === -1) return;

            event.moveLocked = true;
            moving.deltaX = deltaX;
            var left = event.clientX + moving.restX;
            page.style.left = fromOffset(left);
        },
        end() {
            page.style.transition = '';
            if (moving && moving !== -1) {
                var left = freeOffset(page.style.left || 0);
                if (moving.deltaX < 0 && left > offsetWidth * 0.3 || moving.deltaX > 0 && left > offsetWidth * 0.7 || !moving.deltaX && left > offsetWidth >> 1) {
                    page.style.left = 0;
                    dragview.toRight();
                } else {
                    dragview.toLeft();
                    page.style.left = 0;
                }
            }
        }
    });
}


/**
 * 左侧为菜单
 * 菜单在小屏上收起，可以点击按钮打开
 */
function main(mainPath, historyName = "") {
    var layer = div();
    layer.innerHTML = glance;
    if (mainPath instanceof Object) {
        var { left: leftPath, top: topPath, main: mainPath } = mainPath;
    }
    var [leftLayer, topLayer] = layer.children;
    on("append")(layer, function () {
        var index = 2;
        zimoli.switch(historyName, layer, mainPath);
        var hook = function () {
            if (--index !== 0) return;
            if (leftPath) {
                var page = zimoli.create(leftPath);
                page.setAttribute('layer', 'left');
                appendChild.replace(leftLayer, page);
                leftLayer = page;
                dragview({ page: layer, toLeft: layer.closeLeft, toRight: layer.openLeft, menu: leftLayer });
            }
            if (topPath) {
                var page = zimoli.create(topPath);
                page.setAttribute('layer', 'top');
                appendChild.replace(topLayer, page);
                topLayer = page;
            }
            zimoli();
        };
        if (typeof leftPath === 'string') {
            zimoli.prepare(leftPath, hook);
        } else hook();
        if (typeof topPath === 'string') {
            zimoli.prepare(topPath, hook);
        } else hook();
    });
    var closed = false;
    var isClosed = function () {
        var computed = getScreenPosition(leftLayer);
        var delta = computed.left + computed.width;
        return delta <= 0;
    };
    var bindClass = function () {
        if (closed) {
            if (hasClass(layer, "open")) {
                removeClass(layer, 'open');
            }
            else {
                addClass(layer, 'close');
            }
        }
        else {
            if (hasClass(layer, 'close')) {
                removeClass(layer, 'close');
            }
            else {
                addClass(layer, 'open');
            }
        }
    };
    var update = function (event) {
        if (event.target !== this) return;
        dispatch(window, 'resize');
    };
    on("transitionrun")(layer, update);
    on("transitionend")(layer, update);
    layer.closeLeft = function () {
        closed = true;
        bindClass();
    };
    layer.openLeft = function () {
        closed = false;
        bindClass();
    };
    layer.switchLeft = function () {
        closed = !isClosed();
        bindClass();
    };
    return layer;
}