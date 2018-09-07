var dragview = function (event) {
    var { page, pages, menu } = dragview;
    if (!isTargetOf(this, event.target)) return;
    var savedX = event.touches[0].clientX;
    var savedY = event.touches[0].clientY;
    var moving = null;
    var offtouchmove = ontouchmove(event.target, function (event) {
        if (pages.index !== 0) return;
        if (event.touches.length !== 1) return;
        var deltaX = savedX - event.touches[0].clientX;
        var deltaY = savedY - event.touches[0].clientY;

        if (!moving) {
            if (Math.abs(deltaX) < 3 && Math.abs(deltaY) < 3) return;
            if (deltaX > 0 && !parseInt(page.style.left) || Math.abs(deltaY) >= Math.abs(deltaX)) {
                moving = -1;
            } else {
                moving = {
                    restX: page.offsetLeft - savedX
                };
            }
        }
        if (moving === -1) return;
        event.preventDefault();
        page.style.marginLeft = 0;
        moving.deltaX = deltaX;
        var left = event.touches[0].clientX + moving.restX;
        page.style.left = left + "px";
        var scale = ((page.offsetWidth - left / 4) / page.offsetWidth);
        page.style.transform = "scale(" + scale + ")";
        menu.style.transform = "scale(" + (1.82 - scale) + ")";
    });
    var cancelevents = function () {
        if (moving && moving !== -1) {
            var left = parseInt(page.style.left);
            if (moving.deltaX < 0 && left > page.offsetWidth * 0.3 || moving.deltaX > 0 && left > page.offsetWidth * 0.7 || !moving.deltaX && left > page.offsetWidth >> 1) {
                transition(page, `marginLeft:-80px;left:${page.offsetWidth}px;transform:scale(.82);`, true);
                transition(menu, `transform:scale(1);`, true);
            } else {
                transition(menu, `transform:scale(.82);`, true);
                transition(page, "marginLeft:0;left:0;transform:scale(1);", true);
            }
        }
        offtouchmove();
        offtouchcancel();
        offtouchend();
    };
    var offtouchend = ontouchend(event.target, cancelevents);
    var offtouchcancel = ontouchcancel(event.target, cancelevents);
}