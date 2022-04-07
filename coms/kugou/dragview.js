var disableClassName = "disable";
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
                if (!onclick.preventClick) return;
                if (deltaX > 0 && !freeOffset(page.style.left || 0) || Math.abs(deltaY) >= Math.abs(deltaX)) {
                    moving = -1;
                } else {
                    moving = {
                        restX: page.offsetLeft - savedX || 0
                    };
                }
            }
            if (moving === -1) return;
            event.moveLocked = true;
            page.style.marginLeft = 0;
            moving.deltaX = deltaX;
            var left = event.clientX + moving.restX;
            page.style.left = fromOffset(left);
            var scale = ((page.offsetWidth - left / 2.6) / page.offsetWidth);
            page.style.transform = "scale(" + scale + ")";
            menu.style.transform = "scale(" + (1.72 - scale) + ")";
        },
        end() {
            if (moving && moving !== -1) {
                var left = freeOffset(page.style.left || 0);
                if (moving.deltaX < 0 && left > page.offsetWidth * 0.3 || moving.deltaX > 0 && left > page.offsetWidth * 0.7 || !moving.deltaX && left > page.offsetWidth >> 1) {
                    dragview.toRight();
                } else {
                    dragview.toLeft();
                }
            }
        }
    }, event);
}
dragview.toRight = function () {
    var { page, menu } = dragview;
    dragview.isRight = true;
    transition(page, `marginLeft:-72px;left:90%;transform:scale(.72);`, true);
    transition(menu, `transform:scale(1);`, true);
    addClass(page, disableClassName);
    removeClass(menu, disableClassName);
    dragview.onchange instanceof Function && dragview.onchange();
};
dragview.toLeft = function () {
    dragview.isRight = false;
    var { page, menu } = dragview;
    addClass(menu, disableClassName);
    removeClass(page, disableClassName);
    transition(menu, `transform:scale(.72);`, true);
    transition(page, "marginLeft:0;left:0;transform:scale(1);", true);
    dragview.onchange instanceof Function && dragview.onchange();
};
dragview.toChange = function () {
    if (!dragview.isRight) {
        dragview.toRight();
    } else {
        dragview.toLeft();
    }
};