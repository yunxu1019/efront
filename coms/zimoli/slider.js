// 中文编码 utf8
var _slider = document.createElement("div");
addClass(_slider, "slider-item");
var container = document.createElement("div");
var floor = Math.floor;
var ceil = Math.ceil;
var round = Math.round;
var abs = Math.abs;
/**
 * 
 * @param {Boolean|Array|Function} autoplay 
 */
function slider() {
    var [autoplay, circle = true] = arguments;
    var outter = null;
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
    if (!outter) outter = container.cloneNode();
    var _imageMain = _slider.cloneNode();
    var _imageHelp = _slider.cloneNode();
    outter.src = function (index) {
        var block = _slider.cloneNode();
        text(block, index);
        return block;
    };
    if (isFunction(autoplay) || isArray(autoplay)) {
        outter.src = autoplay;
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
            src = src(index, 1 - abs(ratio), ratio);
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
    var origin_index = null;
    var reshape = function (index, ising, emit) {
        if (!isFinite(index)) return;
        index = +index;
        outter.index = current_index = index;
        var width = outter.clientWidth || +innerWidth;
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
            if (origin_index !== index) {
                origin_index = index;
                if (emit !== false) dispatch(outter, 'changed');
            }
        }
        var childNodes = outter.childNodes;
        for (var dx = childNodes.length - 1; dx >= 0; dx--) {
            var childNode = childNodes[dx];
            if (isFinite(childNode.index) && childNode !== _imageMain && childNode !== _imageHelp) {
                remove(childNode);
            }
        }
        if (indexLeft === index) remove(_imageHelp);
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
    var savedtime = 0;
    var animate0 = function () {
        savedtime = Speed.now() - 1;
        animate();
    };
    var animate = function () {
        cancelAnimationFrame(timer_animate);
        var width = outter.clientWidth;
        var now = +Speed.now();
        if (abs(current_index + negative_index) < 1.25 / width)
            return reshape(-negative_index, false);
        var temp_index = current_index;
        while (savedtime < now) {
            temp_index = (temp_index * 11 - negative_index) / 12;
            savedtime += 6;
        }
        reshape(temp_index);
        timer_animate = requestAnimationFrame(animate);
    };
    var park = function () {
        direction = 0;
        var singleTarget = getSingleTarget();
        var spd = _speed() * 40;
        if (singleTarget) {
            negative_index = round(negative_index);
        }
        else if (delta_negative_index > 0) {
            if (negative_index - floor(negative_index) > .007 / (.07 + abs(spd)))
                negative_index = ceil(negative_index);
            else
                negative_index = floor(negative_index);
        }
        else if (delta_negative_index < 0) {
            if (ceil(negative_index) - negative_index > .007 / (.07 + abs(spd)))
                negative_index = floor(negative_index);
            else
                negative_index = ceil(negative_index);
        }
        else {
            negative_index = round(negative_index);
        }
        savedtime = 0;
        animate0();
        var event = createEvent("park");
        event.index = -negative_index;
        dispatch(outter, event);
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
    var isMiss = false;
    var switchBy = function (count) {
        clearTimeout(timer_playyer);
        if (player.ing) {
            timer_playyer = setTimeout(player, player.schedule);
        }
        var enabled = generator(count - negative_index, 1);
        enabled = enabled && enabled.index !== outter.index;
        if (isMiss) {
            if (enabled) outter.go(outter.index + count);
        } else {
            if (enabled) negative_index -= count;
            animate0();
        }
        return enabled;
    };
    var getSingleTarget = () => (!_imageMain || !_imageHelp) && (_imageMain || _imageHelp);
    var moveDeltaX = function (deltax, event) {
        var width = outter.clientWidth;
        var singleTarget = getSingleTarget();
        if (singleTarget) {
            var current_Left = singleTarget.offsetLeft;
            var avail_deltaWidth = Math.min(round(width >> 2), 120);
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
        var deltax = event.clientX - saved_x;
        var deltay = event.clientY - saved_y;
        if (!direction) {
            if (!onclick.preventClick) return;
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
        event.preventDefault();
        if (!event.deltaX) return;
        if (event._target && event._target !== this) return;
        event._target = outter;
        cancelAnimationFrame(timer_animate);
        clearTimeout(stop_wheel_timer);
        stop_wheel_timer = setTimeout(park, 160);
        var deltax = -event.deltaX;
        moveDeltaX(deltax, event);
    });
    moveupon(outter, {
        start(event) {
            event.preventDefault();
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

    outter.go = lazy(function (index, cache) {
        if (!isFinite(index)) return;
        index = +index;
        if (outter.index === index && cache !== false) return;
        negative_index = -index;
        var _removingMain = _imageMain;
        reshape(index, false);
        if (_removingMain === _imageMain) return;
        css(_removingMain, "transition:.1s opacity ease-out,.1s transform;z-index:1;left:0;");
        appendChild(outter, _removingMain);
        setTimeout(function () {
            css(_removingMain, "transform:scale(.97);opacity:0;");
        });
        setTimeout(function () {
            remove(_removingMain);
            css(_removingMain, "transform:;opacity:;transition:");
            css(_imageMain, "transform:;opacity:;transition:");
        }, 300);
        css(_imageMain, "z-index:0;transform:scale(.92);opacity:0;transition:none");
        setTimeout(() => css(_imageMain, "transform:scale(1);opacity:1;transition:.2s transform ease-out,.4s opacity"), 0);
        if (player.ing) play();
    }, 20, outter);
    onmounted(outter, function () {
        reshape(current_index);
    });
    outter.play = function (schedule = player.schedule, _isMiss) {
        if (isDefined(_isMiss)) {
            isMiss = _isMiss;
        }
        if (schedule !== player.schedule) {
            player.schedule = schedule;
            play();
        } else if (!player.ing) {
            play();
        }
        return outter;
    };
    outter.stop = function () {
        player.ing = false;
        return outter;
    };
    outter.miss = function (scadule) {
        outter.play(scadule, true);
    };
    outter.next = function (count = 1) {
        current_index += .1;
        switchBy(count);
        return outter;
    };
    outter.prev = function (count = 1) {
        current_index -= .1;
        switchBy(-count);
        return outter;
    };
    var cancel_resize;
    onappend(outter, function () {
        cancel_resize && cancel_resize();
        cancel_resize = on("resize")(window, function () {
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