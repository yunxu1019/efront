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
    image.url = img.src = url;
    var p = this;
    var onload = function () {
        img.onload = null;
        image.width = this.width;
        image.height = this.height;
        image.complete = true;
        img = null;
        onload = null;
        setInitParams();
        dispatch(p, 'scaled');
    };
    var setInitParams = function () {
        loaded_scale = Math.min(image.offsetHeight / image.height, image.offsetWidth / image.width);
        loaded_x = (image.offsetWidth - image.width * loaded_scale) / 2;
        loaded_y = (image.offsetHeight - image.height * loaded_scale) / 2;
        min_scale = loaded_scale * .75;
        scaled = loaded_scale;
        x = loaded_x;
        y = loaded_y;
    };
    once("append")(image, function () {
        if (img.complete) {
            onload.call(img);
        } else {
            img.onload = onload;
        }
    });
    image.locked = false;
    var scaled, x, y, min_scale, loaded_scale, loaded_x, loaded_y;
    var last_click_time = 0;
    on("click")(image, function (event) {
        var time = +new Date;
        var delta_time = time - last_click_time;
        last_click_time = time;
        if (delta_time > 300) return;
        var image = this;
        setInitParams();
        image.locked = scaled < 1 && !image.locked;
        var layerx = event.layerX || event.clientX || 0;
        var layery = event.layerY || event.clientY || 0;
        var deltax = (image.offsetWidth - image.width * scaled) / 2;
        var deltay = (image.offsetHeight - image.height * scaled) / 2;
        if (layerx < deltax || layery < deltay || image.offsetWidth - layerx < deltax || image.offsetHeight - layery < deltay) {
            // white space
            image.locked = false;
        }
        if (image.locked) {
            scale(layerx, layery);
        } else {
            __css(image, get_empty());
        }
        dispatch(p, 'scaled');
    });
    var get_empty = function () {
        return {
            backgroundPositionX: "",
            backgroundPositionY: "",
            backgroundSize: "",
            transition: ""
        };
    }
    image.getScale = function () {
        if (img) {
            image.width = img.width;
            image.height = img.height;
        }
        if (!this.locked) {
            setInitParams();
            return loaded_scale;
        }
        return scaled;
    };
    var get_style = function () {
        return {
            backgroundPositionX: x + "px",
            backgroundPositionY: y + "px",
            backgroundSize: [image.width * scaled + "px", image.height * scaled + "px"].join(" ")
        };
    };
    var scale = function (layerx, layery) {
        if (!image.locked) return;
        scaled = 1;
        var ratio = scaled / loaded_scale;
        x = (loaded_x - layerx) * ratio + layerx;
        y = (loaded_y - layery) * ratio + layery;
        __css(image, get_style());
    };
    var touch = function ([x1, y1, x2, y2], [m1, n1, m2, n2]) {
        var scale = Math.sqrt((Math.pow(m1 - m2, 2) + Math.pow(n1 - n2, 2)) / (Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
        if (scaled >= 2.5 && scale > 1) return;
        if (scaled <= min_scale && scale < 1) return;
        scaled *= scale;
        if (scaled > 2.5) scaled = 2.5;
        if (scaled < min_scale) scaled = min_scale;
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
        side_x = Math.max(0, image.offsetWidth - image.width * scaled) / 2;
        side_y = Math.max(0, image.offsetHeight - image.height * scaled) / 2;
        if (x > side_x) {
            x = isprocess ? (x - side_x) / 2 + side_x : side_x;
            change = true;
        }
        if (y > side_y) {
            y = isprocess ? (y - side_y) / 2 + side_y : side_y;
            change = true;
        }
        var min_x = image.offsetWidth - image.width * scaled - side_x;
        var min_y = image.offsetHeight - image.height * scaled - side_y;
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
        if (scaled <= loaded_scale * 1.2) {
            scaled = loaded_scale;
            x = loaded_x;
            y = loaded_y;
            change = true;
        }
        if (scaled > 2) {
            change = true;
            x = (x - image.offsetWidth / 2) * 2 / scaled + image.offsetWidth / 2;
            y = (y - image.offsetHeight / 2) * 2 / scaled + image.offsetHeight / 2;
            scaled = 2;
        }
        change = get_change(false) || change;
        if (change) {
            var a = transition(image, get_style(), true);
            if (scaled === loaded_scale) {
                setTimeout(function () {
                    __css(image, get_empty());
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
    on("mousewheel")(image, function (event) {
        var { layerX, layerY, deltaY } = event;
        event.preventDefault();
        if (!deltaY) return;
        if (!this.locked) setInitParams();
        this.locked = true;
        var scale = Math.pow(0.99, 20 * Math.atan(deltaY / 20));
        if (scaled * scale >= 2.5 && scale > 1) {
            scale = 2.5 / scaled;
        }
        if (scaled * scale < min_scale && scale < 1) {
            scale = min_scale / scaled;
        }
        var s = 100, t = s * scale;
        touch([layerX - s, layerY - s, layerX + s, layerY + s], [layerX - t, layerY - t, layerX + t, layerY + t]);
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
                        touch(
                            [xy1.clientX, xy1.clientY, xy2.clientX, xy2.clientY],
                            [mn1.clientX, mn1.clientY, mn2.clientX, mn2.clientY]
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
            event.moveLocked = this.locked;
            if (this.locked && onclick.preventClick) move.smooth(recover);
        }
    });
    __css(image, {
        backgroundImage: `url("${url}")`
    });
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
        if (index + 5 < images.length) {
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