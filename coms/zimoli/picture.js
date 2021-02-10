var mountedPictures = [];
on("resize")(window, function () {
    mountedPictures.forEach(a => a.update());
});
var getstation = function (n, s) {
    var scale = Math.pow(10, Math.round(Math.log(n) / Math.log(10)));
    var step;
    if (n / scale < 1) {
        step = s ? .01 : .05;
    } else {
        step = s ? .05 : .1;
    }
    step = step * scale;
    n = Math.round(n / step) * step;
    return n;
};
var create = function (url, key) {
    var __css = function (a) {
        css.apply(a, arguments);
        dispatch(p, 'scaled');
    };
    if (!url) return;
    var image = div();
    var img = new Image;
    if (isObject(url)) {
        if (key) {
            url = seek(url, key);
        }
    }
    var p = this;
    var image_width, image_height;
    var onload = function () {
        img.onload = null;
        image.width = this.width;
        image.height = this.height;
        image.complete = true;
        img = null;
        onload = null;
        setInitParams();
        set_unlock();
    };
    img.onload = onload;
    image.url = img.src = url;

    var setInitParams = function () {
        if (img) {
            image.width = img.width;
            image.height = img.height;
        }
        image_width = image.width / devicePixelRatio;
        image_height = image.height / devicePixelRatio;
        if (p.current === image) {
            p.width = image.width;
            p.height = image.height;
        }
        loaded_scale = Math.min(image.clientHeight / image_height, image.clientWidth / image_width);
        if (loaded_scale >= 1) {
            if (loaded_scale < 1.2) {
                click_scale = 2;
            } else if (loaded_scale < max_scale) {
                click_scale = loaded_scale;
            } else {
                click_scale = max_scale;
            }
            loaded_scale = 1;
        } else {
            click_scale = 1;
        }
        loaded_x = (image.clientWidth - image_width * loaded_scale) / 2;
        loaded_y = (image.clientHeight - image_height * loaded_scale) / 2;
        min_scale = loaded_scale * .75;
        scaled = loaded_scale;
        x = loaded_x;
        y = loaded_y;
    };
    image.locked = false;
    var scaled, x, y, min_scale, loaded_scale, click_scale, loaded_x, loaded_y;
    var max_scale = 10 * devicePixelRatio;
    var last_click_time = 0;
    on("click")(image, function (event) {
        var time = +new Date;
        var delta_time = time - last_click_time;
        last_click_time = time;
        if (delta_time > 300) return;
        var image = this;
        setInitParams();
        image.locked = scaled < click_scale && !image.locked;
        var layerx = event.offsetX || 0;
        var layery = event.offsetY || 0;
        var deltax = (image.clientWidth - image_width * scaled) / 2;
        var deltay = (image.clientHeight - image_height * scaled) / 2;
        if (layerx < deltax || layery < deltay || image.clientWidth - layerx < deltax || image.clientHeight - layery < deltay) {
            // white space
            image.locked = false;
        }
        if (image.locked) {
            scale(layerx, layery);
        } else {
            set_unlock();
        }
    });
    var set_unlock = function () {
        setInitParams();
        __css(image, get_style());
    };
    image.getScale = function () {
        if (!this.locked && !loaded_scale) {
            setInitParams();
        }
        return +String(+scaled + 0.00005).slice(0, 6);
    };
    var get_style = function () {
        return {
            imageRendering: scaled >= 2.5 / devicePixelRatio ? "pixelated" : "",
            backgroundPositionX: fromOffset(x),
            backgroundPositionY: fromOffset(y),
            backgroundSize: [fromOffset(image_width * scaled), fromOffset(image_height * scaled)].join(" ")
        };
    };
    var scale = function (layerx, layery) {
        if (!image.locked) return;
        scaled = click_scale;
        var ratio = scaled / loaded_scale;
        x = (loaded_x - layerx) * ratio + layerx;
        y = (loaded_y - layery) * ratio + layery;
        __css(image, get_style());
    };
    var touch = function ([x1, y1, x2, y2], [m1, n1, m2, n2]) {
        var l1 = Math.sqrt(Math.pow(m1 - m2, 2) + Math.pow(n1 - n2, 2));
        var l2 = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        var scale = l1 / l2;
        if (scaled >= max_scale * 1.1 && scale > 1) return;
        if (scaled <= min_scale && scale < 1) return;
        scaled *= scale;
        var centerx = (x1 + x2) / 2;
        var centery = (y1 + y2) / 2;
        var centerm = (m1 + m2) / 2;
        var centern = (n1 + n2) / 2;
        x = (x - centerx) * scale + centerm;
        y = (y - centery) * scale + centern;
        __css(image, get_style());
    };
    var get_change = function (isprocess) {
        isprocess = isprocess !== false;
        var change;
        var side_x, side_y;
        side_x = Math.max(0, image.clientWidth - image_width * scaled) / 2;
        side_y = Math.max(0, image.clientHeight - image_height * scaled) / 2;
        if (x > side_x) {
            x = isprocess ? (x - side_x) / 2 + side_x : side_x;
            change = true;
        }
        if (y > side_y) {
            y = isprocess ? (y - side_y) / 2 + side_y : side_y;
            change = true;
        }
        var min_x = image.clientWidth - image_width * scaled - side_x;
        var min_y = image.clientHeight - image_height * scaled - side_y;
        if (x < min_x) {
            x = min_x;
            change = true;
        }
        if (y < min_y) {
            y = min_y
            change = true;
        }
        return change;
    };
    var recover = function (change) {
        var aimed_scale = getstation(scaled);
        if (aimed_scale !== scaled) {
            change = true;
            x = (x - image.clientWidth / 2) / scaled * aimed_scale + image.clientWidth / 2;
            y = (y - image.clientHeight / 2) / scaled * aimed_scale + image.clientHeight / 2;
            scaled = aimed_scale;
        }
        if (scaled <= loaded_scale * 1.2) {
            scaled = loaded_scale;
            x = loaded_x;
            y = loaded_y;
            change = true;
        }
        if (scaled > max_scale) {
            change = true;
            x = (x - image.clientWidth / 2) * max_scale / scaled + image.clientWidth / 2;
            y = (y - image.clientHeight / 2) * max_scale / scaled + image.clientHeight / 2;
            scaled = max_scale;
        }
        change = get_change(false) || change;
        if (change) {
            var a = transition(image, get_style(), true);
            if (scaled === loaded_scale) {
                setTimeout(function () {
                    set_unlock();
                    image.locked = false;
                }, a || 0);
            }
        }
    };
    var move = inertia(function (deltax, deltay) {
        x += deltax, y += deltay;
        __css(image, get_style());
        if (get_change()) return false;
    });
    var saved_event;
    onmousewheel(image, function (event) {
        var { offsetX: layerX, offsetY: layerY, deltaY } = event;
        event.preventDefault();
        if (!deltaY) return;
        if (!this.locked) setInitParams();
        this.locked = true;
        var scale = Math.pow(0.99, 20 * Math.atan(deltaY / 20));
        var __scaled = scaled;
        __scaled *= scale;
        if (__scaled > max_scale && scale > 1) {
            __scaled = max_scale;
        }
        if (__scaled < min_scale && scale < 1) {
            __scaled = min_scale;
        }
        var saved = __scaled;
        scale = __scaled / scaled;
        scaled = __scaled;
        x = (x - layerX) * scale + layerX;
        y = (y - layerY) * scale + layerY;
        __css(image, get_style());
        scaled = saved;
    });
    moveupon(image, {
        start(event) {
            event.preventDefault();
            saved_event = event;
            event.moveLocked = this.locked;
            if (!this.locked) {
                setInitParams();
            }
            move.reset();
        },
        move(event) {
            event.moveLocked = this.locked;
            event.preventDefault();
            if (event.touches && saved_event.touches) {
                if (event.touches.length !== saved_event.touches.length) {
                    saved_event = event;
                    return;
                }

                switch (event.touches.length) {
                    case 1:
                        if (!this.locked) return;
                        break;
                    case 2:
                        this.locked = true;
                        event.moveLocked = true;
                        var [xy1, xy2] = saved_event.touches;
                        var [mn1, mn2] = event.touches;
                        var { left, top } = getScreenPosition(image);
                        top += image.clientTop;
                        left += image.clientLeft;
                        touch(
                            [xy1.clientX - left, xy1.clientY - top, xy2.clientX - left, xy2.clientY - top],
                            [mn1.clientX - left, mn1.clientY - top, mn2.clientX - left, mn2.clientY - top]
                        );
                        saved_event = event;
                        return;
                }
            }
            if (!this.locked) return;
            var deltax = event.clientX - saved_event.clientX,
                deltay = event.clientY - saved_event.clientY;
            move(deltax, deltay);
            saved_event = event;
        },
        end(event) {
            saved_event = null;
            event.moveLocked = this.locked;
            if (this.locked && onclick.preventClick) move.smooth(recover);
        }
    });
    __css(image, {
        backgroundImage: `url("${url}")`
    });
    on("append")(image, function () {
        mountedPictures.push(image);
        setInitParams();
        set_unlock();
    });
    on("remove")(image, function () {
        removeFromList(mountedPictures, image);
    });
    image.update = function () {
        setInitParams();
        recover();
    }
    return image;
};


function picture(url, to = 0, key) {

    var images = {};
    var gen = function (index, ratio) {
        if (index >= urls.length || index < 0) return null;
        if (images[index] && images[index].url !== urls[index]) {
            delete images[index];
        }
        if (!images[index]) {
            images[index] = create.call(p, urls[index], key);
        }
        if (!images[index + 1] && index + 1 < urls.length) {
            images[index + 1] = create.call(p, urls[index + 1], key);
        }
        if (index >= 5) delete images[index - 5];
        if (index + 5 < urls.length) {
            delete images[index + 5];
        }
        var img = images[index]
        if (ratio > .75 && img) {
            p.width = img.width;
            p.height = img.height;
            p.current = img;
        }
        return images[index];
    };
    if (isElement(url)) {
        var urls = [];
        var p = slider(url);
        care(p, function (e) {
            urls = [].concat(e);
            p.src = gen;
            p.go(p.index || 0, false);
        });
        on("changes")(p, function ({ changes }) {
            if (changes.index) {
                p.go(p.index, false);
            }
        });
    } else {
        var urls = [].concat(url);
        var p = slider(gen, false);
    }
    p.go(to);
    p.getScale = function () {
        if (p.current) return p.current.getScale();
        return 1;
    };
    p.initialStyle = 'backdrop-filter:blur(0);opacity:0;';
    return p;
}