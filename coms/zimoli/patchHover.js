var onmouseenter = on("mouseenter");

var hover = function () {
    addClass(this, "hover");
};
var active = function () {
    addClass(this, "hover active");
};
var checkclick = function () {
    if (this.hasAttribute("disabled") || this.disabled || this.hasAttribute("loading") || this.loading || this.hasAttribute("pending") || this.pending) {
        onclick.preventClick = true;
        return;
    }
    if (this.hasAttribute("confirm") || this.confirm) {
        if (!this.confirm_sign) {
            addClass(this, 'confirm');
            var that = this;
            that.confirm_sign = true;
            setTimeout(function () {
                removeClass(that, "confirm");
                delete that.confirm_sign;
            }, 2000);
            onclick.preventClick = true;
            return;
        }
        delete this.confirm_sign;
        removeClass(this, "confirm");
    }
};
var resetactive = function () {
    removeClass(this, "active");
};
var resetall = function () {
    removeClass(this, "active hover");
};
var mousedown = function () {
    var that = this;
    var cancelmouseup = onmouseup(window, function () {
        cancelmouseup();
        resetactive.call(that);
        checkclick.call(that);
    });
    active.call(this);
};
var mouseleave = function (event) {
    removeClass(this, "hover");
};
var mousemove = function (event) {
    if (onclick.preventClick && event.which) resetall.call(this);
};
var firedTime = +new Date;
var touchstart = function () {
    var that = this;
    var cancel = function () {
        firedTime = +new Date;
        canceltouchcancel();
        canceltouchend();
        resetall.call(that);
        checkclick.call(that);
    };
    var canceltouchcancel = ontouchcancel(this, cancel);
    var canceltouchend = ontouchend(this, cancel);
    active.call(this);
};
function patchHover(button) {
    onremove(button, resetall);
    onmouseenter(button, hover);
    onmouseleave(button, mouseleave);
    onmousemove(button, mousemove);
    onmousedown(button, mousedown);
    ontouchmove(button, resetall);
    ontouchstart(button, touchstart);
    return button;
};