var saved_x, saved_y, direction, currentOpen;
var template = `<div class='ylife-touch-delete' style='left:100%;margin: 0;padding:0;display: block;position:absolute;width:85px;top:0;background-color: rgb(230,54,67);color:#fff;text-align: center;font-size: 18px;'>删除</div>`;
var createDelete = function () {
    var _div = div();
    _div.innerHTML = template;
    _div = _div.children[0];
    remove(_div);
    var height = this.clientHeight + "px";
    css(_div, {
        height,
        lineHeight: height
    });
    css(this, "position:relative");
    return _div;
};
var touchstart = function (event) {
    var target = getTargetIn(this, event.target, false);
    if (currentOpen && currentOpen !== target) {
        scrollToRight.call(currentOpen);
    }
    if (!target) return;
    cancelAnimationFrame(target.scrollTimer);
    saved_x = null;
    currentOpen = target;
    if (!target.querySelector(".ylife-touch-delete")) {
        css(target, {
            overflow: "hidden"
        });
        var $delete = createDelete.call(target);
        on("click")($delete, function () {
            remove(this.parentNode);
        });
        appendChild(target, $delete);
    }
};
var moving = false;
var touchmove = function (event) {
    if (!saved_x) return saved_x = event.clientX, saved_y = event.clientY, moving = false, 0;
    var delta_x = event.clientX - saved_x;
    var delta_y = event.clientY - saved_y;
    if (!moving) {
        if (Math.abs(delta_x) < 2 && Math.abs(delta_y) < 2) return;
        if (Math.abs(delta_y) < Math.abs(delta_x)) {
            moving = 1;
        } else {
            moving = -1;
        }
    }
    if (moving !== 1) return;
    event.preventDefault();
    var marginLeft = -parseInt(currentOpen.scrollLeft) || 0;
    if (delta_x + marginLeft > 0) {
        delta_x = -marginLeft;
    }
    else if (delta_x + marginLeft < - calcPixel(85)) {
        delta_x = -calcPixel(85) - marginLeft;
    }
    marginLeft += delta_x;
    saved_x += delta_x;
    direction = delta_x;
    currentOpen.scrollLeft = -marginLeft;
};
var scrollTo = function (targetLeft) {
    if (!this) return;
    cancelAnimationFrame(this.scrollTimer);
    var that = this;
    var reshape = function () {
        var currentLeft = parseInt(that.scrollLeft) || 0;
        if (!currentLeft) return;
        var thisTimeLeft = (targetLeft + currentLeft * 3) / 4 | 0;
        if (Math.abs(thisTimeLeft - currentLeft) < 3) {
            thisTimeLeft = targetLeft;
        } else {
            that.scrollTimer = requestAnimationFrame(reshape);
        }
        that.scrollLeft = thisTimeLeft;
    };
    this.scrollTimer = requestAnimationFrame(reshape);
};
var scrollToLeft = function () {
    this.setAttribute("touch-delete", "open");
    scrollTo.call(this, this.scrollWidth - this.clientWidth);
};
var scrollToRight = function () {
    this.setAttribute("touch-delete", "close");
    scrollTo.call(this, 0);
};
var touchend = function () {
    var marginLeft = -parseInt(currentOpen.scrollLeft) || 0;
    moving = false;
    if (direction < 0 && marginLeft < -calcPixel(20)) {
        scrollToLeft.call(currentOpen);
    }
    else if (direction > 0 && marginLeft > -currentOpen.clientWidth + calcPixel(20)) {
        scrollToRight.call(currentOpen);
    }
    else if (marginLeft < currentOpen.clientWidth - currentOpen.scrollWidth >> 1) {
        scrollToLeft.call(currentOpen);
    }
    else {
        scrollToRight.call(currentOpen);
    }
};
function touchList(listElement) {
    var saved_y = listElement.scrollTop;
    on("scroll")(listElement, function () {
        if (this.scrollTop === saved_y) return;
        saved_y = this.scrollTop;
        if (currentOpen) scrollToRight.call(this);
    });
    moveupon(listElement, {
        start: touchstart,
        move: touchmove,
        end: touchend
    });
    // ontouchstart(listElement, touchstart);
    // ontouchmove(listElement, touchmove);
    // ontouchend(listElement, touchend);
    // ontouchcancel(listElement, touchend);
    return listElement;
}
