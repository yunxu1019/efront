var saved_x, saved_y, direction, currentTarget, currentOpen;
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
var removeDeleted = lazy(function () {
    dispatch(this.parentNode, 'delete');
    remove(this.parentNode);
});
var touchstart = function (event) {
    var target = getTargetIn(this, event.target, false);
    if (currentTarget && currentTarget !== target) {
        scrollToRight.call(currentTarget);
    }
    if (!target) return;
    cancelAnimationFrame(target.scrollTimer);
    saved_x = event.clientX, saved_y = event.clientY, moving = false, 0;
    currentTarget = target;
    if (!target.querySelector(".ylife-touch-delete")) {
        css(target, {
            overflow: "hidden"
        });
        var $delete = createDelete.call(target);
        on("click")($delete, removeDeleted);
        appendChild(target, $delete);
    }
};
var moving = false;
var touchmove = function (event) {
    var delta_x = event.clientX - saved_x;
    var delta_y = event.clientY - saved_y;
    if (!moving) {
        if (Math.abs(delta_x) < MOVELOCK_DELTA && Math.abs(delta_y) < MOVELOCK_DELTA) return;
        if (Math.abs(delta_y) < Math.abs(delta_x)) {
            moving = 1;
        } else {
            moving = -1;
        }
    }
    if (moving !== 1) return;
    event.moveLocked = true;
    var buttonWidth = currentTarget.scrollWidth - currentTarget.clientWidth;
    var scrollLeft = -currentTarget.scrollLeft;
    if (delta_x + scrollLeft > 0) {
        delta_x = -scrollLeft;
    }
    else if (delta_x + scrollLeft < - buttonWidth) {
        delta_x = -buttonWidth - scrollLeft;
    }
    scrollLeft += delta_x;
    saved_x += delta_x;
    direction = delta_x;
    currentTarget.scrollLeft = -scrollLeft;
};
var scrollTo = function (targetLeft) {
    if (!this) return;
    cancelAnimationFrame(this.scrollTimer);
    var that = this;
    var scrollTime = +Speed.now();
    var reshape = function () {
        var currentLeft = that.scrollLeft;
        if (0 === (0 | currentLeft - targetLeft)) return;
        var now = +Speed.now();
        var thisTimeLeft = currentLeft;
        while (scrollTime < now) {
            scrollTime += 6;
            thisTimeLeft = (thisTimeLeft * 11 + targetLeft) / 12;
        }
        if (Math.abs(thisTimeLeft - currentLeft) < .5) {
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
    currentOpen = this;
    scrollTo.call(this, this.scrollWidth - this.clientWidth);
};
var scrollToRight = function () {
    this.setAttribute("touch-delete", "close");
    if (currentTarget === currentOpen) {
        currentOpen = null;
    }
    scrollTo.call(this, 0);
};
var touchend = function () {
    var marginLeft = -parseInt(currentTarget.scrollLeft) || 0;
    moving = false;
    if (direction < 0 && marginLeft < -7) {
        scrollToLeft.call(currentTarget);
    }
    else if (direction > 0 && marginLeft > -currentTarget.clientWidth + 7) {
        scrollToRight.call(currentTarget);
    }
    else if (marginLeft < currentTarget.clientWidth - currentTarget.scrollWidth >> 1) {
        scrollToLeft.call(currentTarget);
    }
    else {
        scrollToRight.call(currentTarget);
    }
};
function touchList(listElement) {
    var saved_y = listElement.scrollTop;
    on("scroll")(listElement, function () {
        if (this.scrollTop === saved_y) return;
        saved_y = this.scrollTop;
        if (currentTarget) scrollToRight.call(this);
    });
    on("contextmenu")(listElement, function (event) {
        if (event.defaultPrevented) return;
        var target = getTargetIn(this, event.target, false);
        event.preventDefault();
        if (target !== currentOpen) {
            if (currentOpen) scrollToRight.call(currentOpen);
            scrollToLeft.call(target);
        } else {
            scrollToRight.call(target);
        }
    });
    moveupon(listElement, {
        start: touchstart,
        move: touchmove,
        end: touchend
    });
    return listElement;
}
