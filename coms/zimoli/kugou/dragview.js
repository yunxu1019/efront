var disableClassName = "disable";
var dragview = function (event) {
    var { page, pages, menu } = dragview;
    if (isTargetOf(pages, event.target) && pages.index !== 0 && !page.offsetLeft) return;
    var savedX = event.touches[0].clientX;
    var savedY = event.touches[0].clientY;
    var moving = null;
    var offtouchmove = ontouchmove(event.target, function (event) {
        if (event.touches.length !== 1) return;
        if (event.moveLocked) return;
        var deltaX = savedX - event.touches[0].clientX;
        var deltaY = savedY - event.touches[0].clientY;

        if (!moving) {
            if (Math.abs(deltaX) < MOVElOCK_DELTA && Math.abs(deltaY) < MOVElOCK_DELTA) return;
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
        var left = event.touches[0].clientX + moving.restX;
        page.style.left = left + "px";
        var scale = ((page.offsetWidth - left / 2.6) / page.offsetWidth);
        page.style.transform = "scale(" + scale + ")";
        menu.style.transform = "scale(" + (1.72 - scale) + ")";
    });
    var cancelevents = function () {
        if (moving && moving !== -1) {
            var left = parseInt(page.style.left);
            if (moving.deltaX < 0 && left > page.offsetWidth * 0.3 || moving.deltaX > 0 && left > page.offsetWidth * 0.7 || !moving.deltaX && left > page.offsetWidth >> 1) {
                dragview.toLeft();
            } else {
                dragview.toRight();
            }
        }
        offtouchmove();
        offtouchcancel();
        offtouchend();
    };
    var offtouchend = ontouchend(event.target, cancelevents);
    var offtouchcancel = ontouchcancel(event.target, cancelevents);
}
dragview.toRight = function () {
    var { page, menu } = dragview;
    dragview.isRight = true;
    transition(page, `marginLeft:-72px;left:90%;transform:scale(.72);`, true);
    transition(menu, `transform:scale(1);`, true);
    addClass(page, disableClassName);
    removeClass(menu, disableClassName);
};
dragview.toLeft = function () {
    dragview.isRight = false;
    var { page, menu } = dragview;
    addClass(menu, disableClassName);
    removeClass(page, disableClassName);
    transition(menu, `transform:scale(.72);`, true);
    transition(page, "marginLeft:0;left:0;transform:scale(1);", true);
};
dragview.toChange = function () {
    if (!dragview.isRight) {
        dragview.toRight();
    } else {
        dragview.toLeft();
    }
}