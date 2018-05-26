// 中文编码 utf8
var _slider = createElement(div);
addClass(_slider, "slider");
var container = createElement(div);
var windowInnerWidth = window.innerWidth || screen.availWidth;
onresize(window, function (event) {
    windowInnerWidth = window.innerWidth || screen.availWidth;
});
var floor = Math.floor;
var ceil = Math.ceil;
var round = Math.round;
var abs = Math.abs;
var sign = Math.sign;
var is_touch_enabled = "ontouchstart" in window;
var extendTouch = function (e) {
    var touch = e.touches[0];
    for (var k in touch) {
        if (!(k in e)) e[k] = touch[k];
    }
    return e;
};
var has_moving_instance;
/**
 * 
 * @param {Boolean|Array|Function} autoplay 
 */
function slider(autoplay, circle = true) {
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
    } else {
        css(outter, 'height:' + (windowInnerWidth * .375 * .75) + 'pt');
    }
    var generator = function (index, ratio) {
        var src = outter.src;
        if (isArray(src)) {
            if (circle) {
                index = index % src.length;
                if (index < 0) index += src.length;
            }
            src = src[index];
        }
        if (isFunction(src)) {
            src = src(index, 1 - abs(ratio));
        }
        if (src) {
            if (src.parentNode !== outter) {
                remove(src);
                appendChild(outter, src);
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
        direction,
        _speed = speed(1);
    var reshape = function (index, ising) {
        outter.index = current_index = index;
        var width = outter.offsetWidth || windowInnerWidth;
        var indexLeft = floor(index);
        var indexRight = indexLeft + 1;
        if (ising === false) {
            //预载
            generator(indexLeft - 1, 1);
            generator(indexLeft - 2, 1);
            generator(indexLeft - 3, 1);
            generator(indexLeft - 4, 1);
            generator(indexLeft + 2, 1);
            generator(indexLeft + 3, 1);
            generator(indexLeft + 4, 1);
        }
        _imageMain = generator(indexLeft, indexLeft - index);
        _imageHelp = generator(indexRight, indexRight - index);
        var childNodes = outter.childNodes;
        for (var dx = childNodes.length - 1; dx >= 0; dx--) {
            var childNode = childNodes[dx];
            if (childNode !== _imageMain && childNode !== _imageHelp) {
                remove(childNode);
            }
        }
        if (!width) return;
        css(_imageMain, {
            position: "absolute",
            width: "100%",
            height: "100%",
            left: round((indexLeft - index) * width) + "px"
        });
        css(_imageHelp, {
            position: "absolute",
            width: "100%",
            height: "100%",
            left: round((indexRight - index) * width) + "px"
        });
        outter.hasLeft = _imageMain;
        outter.hasRight = _imageHelp;
    };
    var animate = function () {
        cancelAnimationFrame(timer_animate);
        var width = outter.offsetWidth;
        if (abs(current_index + negative_index) < 1.25 / width)
            return reshape(-negative_index, false);
        timer_animate = requestAnimationFrame(animate);
        reshape((current_index * 3 - negative_index) / 4);
    };
    var park = function () {
        direction = 0;
        if (delta_negative_index > 0) {
            if (negative_index - floor(negative_index) > 0.3 / (1 + abs(_speed())))
                negative_index = ceil(negative_index);
            else
                negative_index = floor(negative_index);
        } else if (delta_negative_index < 0) {
            if (ceil(negative_index) - negative_index > 0.3 / (1 + abs(_speed())))
                negative_index = floor(negative_index);
            else
                negative_index = ceil(negative_index);
        } else {
            negative_index = round(negative_index);
        }
        if (player.ing) {
            negative_index++;
            player();
        } else {
            animate();
        }
    };
    var play = function () {
        if (!player.ing) {
            player.ing = true;
        }
        clearTimeout(timer_playyer);
        timer_playyer = setTimeout(player, player.schedule);
    };
    var player = function () {
        switchBy(1);
    };
    player.schedule = 5000;
    var switchBy = function (count) {
        clearTimeout(timer_playyer);
        if (player.ing) {
            timer_playyer = setTimeout(player, player.schedule);
        }
        negative_index -= count;
        animate();
    };
    var stop = function () {
        clearTimeout(timer_playyer);
        player.ing = false;
    };
    var moveDeltaX = function (deltax, event) {
        var width = outter.offsetWidth;
        if (!outter.hasLeft && deltax > 0) {
            var current_Left = parseInt(_imageHelp.style.left);
            var avail_deltaWidth = round(width >> 2);
            if (current_Left + deltax >= avail_deltaWidth) {
                deltax = avail_deltaWidth - current_Left;
                saved_x += deltax;
            } else {
                saved_x = event.clientX;
            }
            _speed(0);
        } else if (!outter.hasRight && deltax < 0) {
            var current_Left = parseInt(_imageMain.style.left);
            var avail_deltaWidth = -round(width >> 2);
            if (current_Left + deltax <= avail_deltaWidth) {
                deltax = avail_deltaWidth - current_Left;
                saved_x += deltax;
            } else {
                saved_x = event.clientX;
            }
            _speed(0);
        } else {
            saved_x = event.clientX;
            _speed(deltax);
        }
        delta_negative_index = deltax / width;
        negative_index += delta_negative_index;
        reshape(-negative_index);
    };
    var mousemove = function (event) {
        if (event.defaultPrevented) return;
        if (event.type !== "touchmove" && event.which === 0) return mouseup();
        var deltax = event.clientX - saved_x;
        var deltay = event.clientY - saved_y;
        if (!direction) {
            if (abs(deltax) < 3 && abs(deltay) < 3) return;
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
        // event.stopPropagation && event.stopPropagation();
        moveDeltaX(deltax, event);
    };
    var mouseup = function () {
        mousemove_remove();
        mouseup_remove();
        moving = has_moving_instance = false;
        park();
    };
    var stop_wheel_timer = 0;
    onmousewheel(outter, function (event) {
        if (!event.deltaX) return;
        if (event._target && event._target !== this) return;
        event._target = outter;
        clearTimeout(stop_wheel_timer);
        stop_wheel_timer = setTimeout(park, 60);
        var deltax = -event.deltaX;
        moveDeltaX(deltax, event);
    });
    var mousemove_remove, mouseup_remove;
    onmousedown(outter, function (event) {
        cancelAnimationFrame(timer_animate);
        clearTimeout(timer_playyer);
        if (has_moving_instance) {
            return;
        }
        has_moving_instance = true;
        moving = true;
        direction = 0;
        _speed(0);
        mousemove_remove = onmousemove(window, mousemove);
        mouseup_remove = onmouseup(window, mouseup);
        saved_x = event.clientX;
        saved_y = event.clientY;
    });

    if (is_touch_enabled) {
        var addEventListener = function (target, eventname, handle) {
            target.addEventListener(eventname, handle);
        };
        var removeEventListener = function (target, eventname, handle) {
            target.removeEventListener(eventname, handle);
        };
        addEventListener(outter, "touchstart", function (e) {
            cancelAnimationFrame(timer_animate);
            clearTimeout(timer_playyer);
            if (has_moving_instance) {
                return;
            }
            has_moving_instance = true;
            moving = e.target;
            direction = 0;
            _speed(0);
            addEventListener(moving, "touchmove", ontouchmove);
            addEventListener(moving, "touchcancel", ontouchend);
            addEventListener(moving, "touchend", ontouchend);
            extendTouch(e);
            saved_x = e.clientX;
            saved_y = e.clientY;
        });
        var ontouchmove = function (e) {
            extendTouch(e);
            mousemove(e);
        };
        var ontouchend = function (e) {
            removeEventListener(moving, "touchmove", ontouchmove);
            removeEventListener(moving, "touchcancel", ontouchend);
            removeEventListener(moving, "touchend", ontouchend);
            moving = has_moving_instance = false;
            park();
        };
    }
    outter.go = function (index) {
        if (outter.index === index) return;
        negative_index = -index;
        var _removingMain = _imageMain;
        reshape(index, false);
        css(_removingMain, "transition:.1s opacity ease-out,.1s transform;z-index:1;left:0;");
        appendChild(outter, _removingMain);
        setTimeout(function () {
            css(_removingMain, "transform:scale(.97);opacity:0;");
        });
        setTimeout(function () {
            remove(_removingMain);
            css(_removingMain, "transform:scale(1);opacity:1;transition:none");
        }, 100);
        css(_imageMain, "z-index:0;transform:scale(.92);opacity:0;transition:none");
        setTimeout(() => css(_imageMain, "transform:scale(1);opacity:1;transition:.2s transform ease-out,.4s opacity"), 0);
        if (player.ing) play();
        return outter;
    };
    outter.play = function (schedule = player.schedule, delay = schedule) {
        if (schedule !== player.schedule) {
            player.schedule = schedule;
        }
        play();
        return outter;
    };
    outter.next = function (count = 1) {
        switchBy(count);
        return outter;
    };
    outter.prev = function (count = 1) {
        switchBy(-count);
        return outter;
    };
    var cancel_resize;
    onappend(outter, function () {
        cancel_resize && cancel_resize();
        cancel_resize = onresize(window, function () {
            if (player.ing) switchBy(0);
        });
    });
    onremove(outter, function () {
        cancel_resize && cancel_resize();
        cancel_resize = null;
    });
    return outter;
}