// 中文编码 utf8
var _slider = createElement(div);
addClass(_slider, "slider");
var container = createElement(div);
var floor = Math.floor;
var ceil = Math.ceil;
var round = Math.round;
var abs = Math.abs;
/**
 * 
 * @param {Boolean|Array|Function} autoplay 
 */
function slider(autoplay, circle = true) {
    var outter = createElement(container);
    {
        for (let cx = 0, dx = arguments.length; cx < dx; cx++) {
            let arg = arguments[cx];
            if (arg === true || arg === false) {
                circle = arg;
            } else if (isNode(arg)) {
                outter = arg;
            } else {
                autoplay = arg;
            }
        }
    }
    var _imageMain = createElement(_slider);
    var _imageHelp = createElement(_slider);
    outter.src = function (index) {
        var block = createElement(_slider);
        text(block, index);
        return block;
    };
    if (isFunction(autoplay) || isArray(autoplay)) {
        outter.src = autoplay;
    } else {
        css(outter, 'height:' + (innerWidth * .375 * .75) + 'pt');
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
            src.index = index;
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
        var width = outter.offsetWidth || +innerWidth;
        var indexLeft = floor(index);
        var indexRight = indexLeft + 1;
        _imageMain = generator(indexLeft, indexLeft - index);
        _imageHelp = generator(indexRight, indexRight - index);
        if (_imageHelp === _imageMain) {
            if (index - indexLeft < .5) {
                _imageHelp = null;
            } else {
                _imageMain = null;
            }
        };
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
        animate();
        if (player.ing) play();
    };
    var play = function () {
        if (!player.ing) {
            player.ing = true;
        }
        clearTimeout(timer_playyer);
        timer_playyer = setTimeout(player, player.schedule);
    };
    var player = function () {
        if (!player.direction) {
            player.direction = 1;
        }
        if (!switchBy(player.direction)) {
            player.direction = -player.direction;
        }
    };
    player.schedule = 5000;
    var switchBy = function (count) {
        clearTimeout(timer_playyer);
        if (player.ing) {
            timer_playyer = setTimeout(player, player.schedule);
        }
        var enabled = generator(count - negative_index, 1);
        enabled = enabled && enabled !== _imageMain;
        if (enabled) negative_index -= count;
        animate();
        return enabled;
    };
    var moveDeltaX = function (deltax, event) {
        var width = outter.offsetWidth;
        var singleTarget = (!_imageMain || !_imageHelp) && (_imageMain || _imageHelp);
        if (singleTarget) {
            var current_Left = parseInt(singleTarget.style.left);
            var avail_deltaWidth = round(width >> 2);
            if (current_Left + deltax > avail_deltaWidth) {
                deltax = avail_deltaWidth - current_Left;
                saved_x += deltax;
            } else if (current_Left + deltax < -avail_deltaWidth) {
                deltax = -avail_deltaWidth - current_Left;
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
        if (event.moveLocked) return;
        if (event.type !== "touchmove" && event.which === 0) return mouseup();
        var deltax = event.clientX - saved_x;
        var deltay = event.clientY - saved_y;
        if (!direction) {
            if (abs(deltax) < MOVELOCK_DELTA && abs(deltay) < MOVELOCK_DELTA) return;
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
        event.moveLocked = true;
        // event.stopPropagation && event.stopPropagation();
        moveDeltaX(deltax, event);
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
    moveupon(outter, {
        start(event) {
            cancelAnimationFrame(timer_animate);
            clearTimeout(timer_playyer);
            moving = true;
            direction = 0;
            _speed(0);
            saved_x = event.clientX;
            saved_y = event.clientY;
        },
        move: mousemove,
        end() {
            moving = false;
            park();
        }
    })

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
    outter.play = function (schedule = player.schedule) {
        if (schedule !== player.schedule) {
            player.schedule = schedule;
        }
        play();
        return outter;
    };
    outter.next = function (count = 1) {
        current_index -= .1;
        switchBy(count);
        return outter;
    };
    outter.prev = function (count = 1) {
        current_index += .1;
        switchBy(-count);
        return outter;
    };
    var cancel_resize;
    onappend(outter, function () {
        cancel_resize && cancel_resize();
        cancel_resize = onresize(window, function () {
            switchBy(0);
        });
        if (isFinite(outter.index)) switchBy(0);
    });
    onremove(outter, function () {
        cancel_resize && cancel_resize();
        cancel_resize = null;
    });
    css(outter, "overflow:hidden;-webkit-overflow-scrolling:auto;over-flow:auto;");
    return outter;
}