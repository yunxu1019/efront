var _slider = createElement(div);
css(_slider, "position:absolute;top:0px;left:0px;right:0px;bottom:0px;width:100%;height:100%;");
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
};
var has_moving_instance;
/**
 * 
 * @param {Boolean,Array,Function} autoplay 
 */
function slider(autoplay) {
    var outter = createElement(container);
    var _imageMain = createElement(_slider);
    var _imageHelp = createElement(_slider);
    var play_autostart = autoplay === true;
    outter.src = function (index) {
        var block = createElement(_slider);
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
        if (src) {
            if (src.parentNode !== outter) {
                outter.appendChild(src);
            }
        }
        return src;
    };
    var negative_index = 0,
        current_index = 0,
        delta_negative_index = 0,
        timer_animate = 0,
        timer_playyer = 0,
        saved_x = 0,
        saved_y = 0,
        moving = 0,
        direction;
    var reshape = function (index) {
        current_index = index;
        var width = outter.offsetWidth || windowInnerWidth;
        var indexLeft = floor(index);
        var indexRight = indexLeft + 1;
        _imageMain = generator(_imageMain, indexLeft, indexLeft - index);
        _imageHelp = generator(_imageHelp, indexRight, indexRight - index);
        var childNodes = outter.childNodes;
        for (var dx = childNodes.length - 1; dx >= 0; dx--) {
            var childNode = childNodes[dx];
            if (childNode !== _imageMain && childNode !== _imageHelp) {
                outter.removeChild(childNode);
            }
        }
        if (!width) return;
        css(_imageMain, {
            left: round((indexLeft - index) * width) + "px"
        });
        css(_imageHelp, {
            left: round((indexRight - index) * width) + "px"
        });
        outter.hasLeft = _imageMain;
        outter.hasRight = _imageHelp;
    };
    var animate = function () {
        clearTimeout(timer_animate);
        var width = outter.offsetWidth;
        if (abs(current_index + negative_index) < 1.25 / width)
            return reshape(-negative_index);
        timer_animate = setTimeout(animate, 20);
        reshape((current_index * 3 - negative_index) / 4);
    };
    var park = function () {
        direction = 0;
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
    };
    var mousemove = function (event) {
        var deltax = event.pageX - saved_x;
        var deltay = event.pageY - saved_y;
        if (!direction) {
            if (abs(deltay) - abs(deltax) > 0) { //垂直方向
                direction = -1;
            } else { //水平方向
                direction = 1;
            }
        }
        if (direction < 0) {
            return;
        }
        if (!moving) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        var width = outter.offsetWidth;
        if (!outter.hasLeft && deltax > 0) {
            var current_Left = parseInt(_imageHelp.style.left);
            var avail_deltaWidth = round(width >> 2);
            if (current_Left + deltax >= avail_deltaWidth) {
                deltax = avail_deltaWidth - current_Left;
                saved_x += deltax;
            } else {
                saved_x = event.pageX;
            }
        } else if (!outter.hasRight && deltax < 0) {
            var current_Left = parseInt(_imageMain.style.left);
            var avail_deltaWidth = -round(width >> 2);
            if (current_Left + deltax <= avail_deltaWidth) {
                deltax = avail_deltaWidth - current_Left;
                saved_x += deltax;
            } else {
                saved_x = event.pageX;
            }
        } else {
            saved_x = event.pageX;
        }
        delta_negative_index = deltax / width;
        negative_index += delta_negative_index;
        reshape(-negative_index);
    };
    var mouseup = function () {
        mousemove_remove();
        mouseup_remove();
        moving = has_moving_instance = false;
        park();
    };
    var mousemove_remove, mouseup_remove;
    onmousedown(outter, function (event) {
        clearTimeout(timer_animate);
        clearTimeout(timer_playyer);
        if (has_moving_instance) {
            return;
        }
        has_moving_instance = true;
        moving = event.target;
        mousemove_remove = onmousemove(body, mousemove);
        mouseup_remove = onmouseup(body, mouseup);
        saved_x = event.pageX;
        saved_y = event.pageY;
    });

    if (is_touch_enabled) {
        var addEventListener = function (target, eventname, handle) {
            target.addEventListener(eventname, handle);
        };
        var removeEventListener = function (target, eventname, handle) {
            target.removeEventListener(eventname, handle);
        };
        addEventListener(outter, "touchstart", function (e) {
            clearTimeout(timer_animate);
            clearTimeout(timer_playyer);
            if (has_moving_instance) {
                return;
            }
            has_moving_instance = true;
            moving = e.target;
            // addEventListener(moving, "touchmove", ontouchmove);
            // addEventListener(moving, "touchcancel", ontouchend);
            // addEventListener(moving, "touchend", ontouchend);
            extendTouch(e);
            saved_x = e.pageX;
            saved_y = e.pageY;
        });
        var ontouchmove = function (e) {
            extendTouch(e);
            mousemove(e);
        };
        var ontouchend = function (e) {
            // removeEventListener(moving, "touchmove", ontouchmove);
            // removeEventListener(moving, "touchcancel", ontouchend);
            // removeEventListener(moving, "touchend", ontouchend);
            moving = has_moving_instance = false;
            park();
        };
        addEventListener(outter, "touchmove", ontouchmove);
        addEventListener(outter, "touchcancel", ontouchend);
        addEventListener(outter, "touchend", ontouchend);
    }
    outter.go = function (index) {
        negative_index = -index;
        reshape(index);
    };
    return outter;
}