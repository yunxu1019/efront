var _slider = createElement(div);
css(_slider, "position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;");
var container = createElement(div);
var windowInnerWidth = window.innerWidth || screen.availWidth;
css(container, "overflow:hidden;position:relative;width:100%;height:260px;font-size:120px;cursor:move;");
onresize(window, function (event) {});
var floor = Math.floor;
var ceil = Math.ceil;
var round = Math.round;
var abs = Math.abs;
var sign = Math.sign;
var body = document.body;
var is_touch_enabled = "ontouchstart" in window;
var extendTouch = function (e) {
    var touch = e.touches[0];
    for (var k in touch) {
        e[k] = touch[k];
    }
    return e;
}
var has_moving_instance;
/**
 * 
 * @param {Boolean,Array,Function} autoplay 
 */
function slider(autoplay) {
    var outter = createElement(container);
    var imageMain = createElement(_slider);
    var imageHelp = createElement(_slider);
    var play_autostart = autoplay === true;
    outter.src = function (index) {
        var block = createElement(div);
        text(block, index);
        return block;
    };
    if (isFunction(autoplay) || isArray(autoplay)) {
        outter.src = autoplay;
    }
    var generator = function (dest, index, ratio) {
        var src = outter.src;
        if (isArray(src)) {
            src = src[index];
        }
        if (isFunction(src)) {
            src = src(index, 1 - abs(ratio));
        }
        if (!src) {
            if (dest.childNodes.length)
                dest.removeChild(dest.childNodes[0]);
            return false;
        }
        if (dest.childNodes.length)
            dest.replaceChild(src, dest.childNodes[0]);
        else
            appendChild(dest, src);
        return true;
    };
    var negative_index = 0,
        current_index = 0,
        delta_negative_index = 0,
        timer_animate = 0,
        timer_playyer = 0,
        saved_clientx = 0;
    var reshape = function (index) {
        current_index = index;
        var width = outter.offsetWidth || windowInnerWidth;
        var indexLeft = floor(index);
        var indexRight = indexLeft + 1;
        outter.hasLeft = generator(imageMain, indexLeft, indexLeft - index);
        outter.hasRight = generator(imageHelp, indexRight, indexRight - index);
        if (!width) return;
        css(imageMain, "left:" + (indexLeft - index) * width + "px");
        css(imageHelp, "left:" + (indexRight - index) * width + "px");
    };
    var animate = function () {
        clearTimeout(timer_animate);
        var width = outter.offsetWidth;
        if (abs(current_index + negative_index) < 1.25 / width)
            return reshape(-negative_index);
        timer_animate = setTimeout(animate, 20);
        reshape((current_index * 3 - negative_index) / 4);
    }
    var park = function () {
        if (delta_negative_index > 0) {
            if (negative_index - floor(negative_index) > 0.3)
                negative_index = ceil(negative_index);
            else
                negative_index = floor(negative_index);
        } else if (delta_negative_index < 0) {
            if (ceil(negative_index) - negative_index > 0.3)
                negative_index = floor(negative_index);
            else
                negative_index = ceil(negative_index);
        } else {
            negative_index = round(negative_index);
        }
        if (play.ing) {
            negative_index++;
            play();
        } else {
            animate();
        }
    };
    var play = function () {
        play.ing = true;
        clearTimeout(timer_playyer);
        timer_playyer = setTimeout(play, 5);
        negative_index--;
        animate();
    };
    var stop = function () {
        clearTimeout(timer_playyer);
        play.ing = false;
    }
    var mousemove = function (event) {
        var deltax = event.clientX - saved_clientx;
        var width = outter.offsetWidth;
        if (!outter.hasLeft && deltax > 0) {
            var current_Left = imageHelp.offsetLeft;
            var avail_deltaWidth = round(width >> 2);
            if (current_Left + deltax >= avail_deltaWidth) {
                deltax = avail_deltaWidth - current_Left;
                saved_clientx += deltax
            } else {
                saved_clientx = event.clientX;
            }
        } else if (!outter.hasRight && deltax < 0) {
            var current_Left = imageMain.offsetLeft;
            var avail_deltaWidth = -round(width >> 2);
            if (current_Left + deltax <= avail_deltaWidth) {
                deltax = avail_deltaWidth - current_Left;
                saved_clientx += deltax;
            } else {
                saved_clientx = event.clientX;
            }
        } else {
            saved_clientx = event.clientX;
        }
        delta_negative_index = deltax / width;
        negative_index += delta_negative_index;
        reshape(-negative_index);
    };
    var mouseup = function () {
        mousemove_remove();
        mouseup_remove();
        has_moving_instance = false;
        park();
    };
    var mousemove_remove, mouseup_remove;
    onmousedown(outter, function (event) {
        if (has_moving_instance) {
            return;
        }
        has_moving_instance = true;
        clearTimeout(timer_animate);
        clearTimeout(timer_playyer);
        mousemove_remove = onmousemove(body, mousemove);
        mouseup_remove = onmouseup(body, mouseup);
        saved_clientx = event.clientX;
    });

    if (is_touch_enabled) {
        var moving;
        outter.addEventListener("touchstart", function (e) {
            if (has_moving_instance) {
                return;
            }
            has_moving_instance = true;
            moving = e.target;
            extendTouch(e);
            clearTimeout(timer_animate);
            clearTimeout(timer_playyer);
            saved_clientx = e.clientX;
            moving.addEventListener("touchmove", ontouchmove, {
                passive: true
            });
            moving.addEventListener("touchend", ontouchend, {
                passive: true
            });
        },{passive:true});
        var ontouchmove = function (e) {
            extendTouch(e);
            mousemove(e);
        };
        var ontouchend = function (e) {
            moving.removeEventListener("touchmove", ontouchmove);
            moving.removeEventListener("touchend", ontouchend);
            moving = has_moving_instance = false;
            park();
        }
    }

    appendChild(outter, imageMain, imageHelp);
    park();
    outter.go = function (index) {
        negative_index = -index;
        reshape(index);
    };
    return outter;
}