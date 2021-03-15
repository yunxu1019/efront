var mountedPictures = [];
on("resize")(window, function () {
    mountedPictures.forEach(a => a.update());
});
var coordIn = move.coordIn;
var trimCoord = move.trimCoord;
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
var _createImage = function (url, callback) {
    var imgpic = document.createElement('img');
    imgpic.src = url;
    var onload = function () {
        imgpic.onload = null;
        callback(imgpic);
    };
    if (imgpic.complete) {
        onload.call(imgpic);
    } else {
        imgpic.onload = onload;
    }
    return imgpic;
};
var create = function (url, key) {
    var __css = function (a) {
        css.apply(a, arguments);
        if (imgpic) dispatch(imgpic, 'scaled');
        dispatch(p, 'scaled');
    };
    if (!url) return;
    var image = div();
    if (isObject(url)) {
        if (key) {
            url = seek(url, key);
        }
    }
    var p = this;
    var createImage = p.createImage || _createImage;
    var image_width, image_height;
    var scaled, x, y, min_scale, loaded_scale, click_scale, loaded_x, loaded_y;
    var max_scale = 10 * devicePixelRatio;

    var setInitParams = function () {
        if (!imgpic) return;
        if (!image.clientHeight || !image.clientWidth) {
            image.width = imgpic.width;
            image.height = imgpic.height;
            return;
        }
        image_width = image.width / devicePixelRatio;
        image_height = image.height / devicePixelRatio;
        if (p.current === image) {
            p.width = image.width;
            p.height = image.height;
        }
        loaded_scale = Math.min(image.clientHeight / image_height, image.clientWidth / image_width);
        if (loaded_scale >= 0.9) {
            if (loaded_scale < 1.2) {
                click_scale = 1;
                loaded_scale = .8;
            } else if (loaded_scale < max_scale) {
                click_scale = loaded_scale;
                loaded_scale = 1;
            } else {
                click_scale = max_scale;
                loaded_scale = 1;
            }
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
    var set_unlock = function () {
        if (!loaded_scale) return;
        setInitParams();
        __css(imgpic, get_style(-1));
    };

    image.url = url;
    var imgpic;
    createImage(url, function (_imgpic) {
        if (!isElement(_imgpic)) _imgpic = this;
        imgpic = _imgpic;
        imgpic.setAttribute('imgpic', '');
        _imgpic.draggable = false;
        image.width = _imgpic.width;
        image.height = _imgpic.height;
        image.appendChild(_imgpic);
        setInitParams();
        set_unlock();
    });
    on("append")(image, setInitParams);


    image.locked = false;
    var last_click_time = 0;
    on("click")(image, function (event) {
        var time = +new Date;
        var delta_time = time - last_click_time;
        last_click_time = time;
        if (delta_time > 300) return;
        var image = this;
        var __scaled = scaled, _x = x, _y = y;
        setInitParams();
        image.locked = __scaled === loaded_scale && loaded_x === _x && loaded_y === _y;
        var layerx = event.offsetX || 0;
        var layery = event.offsetY || 0;
        if (layerx)
            if (image.locked) {
                var width = image_width * loaded_scale, height = image_height * loaded_scale;
                if (layerx > loaded_x + width || layerx < loaded_x || width < image.offsetWidth >> 2) {
                    layerx = loaded_x + width / 2;
                }
                if (layery > loaded_y + height || layery < loaded_y || height < image.offsetHeight >> 2) {
                    layery = loaded_y + height / 2;
                }
                scale(layerx, layery, click_scale / loaded_scale);
            } else {
                set_unlock();
            }
    });
    image.getScale = function () {
        if (!this.locked && !loaded_scale) {
            setInitParams();
        }
        return +String(+scaled + 0.00005).slice(0, 6);
    };
    var get_style = function (type) {
        var width = image_width * scaled;
        var height = image_height * scaled;
        if (type <= 0) [x, y] = trimCoord([image.clientWidth, image.clientHeight], [x, y, width, height], type);
        var [left, top, marginLeft, marginTop] = coordIn([image.clientWidth, image.clientHeight], [x, y, width, height]);

        return {
            imageRendering: scaled >= 3 / devicePixelRatio ? "pixelated" : "",
            width: fromOffset(width),
            height: fromOffset(height),
            left,
            top,
            marginLeft,
            marginTop
        };
    };
    var scale = function (layerx, layery, ratio) {
        if (!image.locked) return;
        scaled *= ratio;
        x = (x - layerx) * ratio + layerx;
        y = (y - layery) * ratio + layery;
        __css(imgpic, get_style());
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
        __css(imgpic, get_style());
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
        var saved_x = x, saved_y = y;
        var style = get_style(-1);
        if (change || saved_x !== x || saved_y !== y) {
            var a = transition(imgpic, style, true);
            if (scaled === loaded_scale) {
                setTimeout(function () {
                    set_unlock();
                    image.locked = false;
                }, a || 0);
            }
        }
    };
    var move = inertia(function (deltax, deltay) {
        var saved_x = x, saved_y = y;
        x += deltax, y += deltay;
        __css(imgpic, get_style(-1));
        if (saved_x === x && saved_y === y) return false;
    });
    var saved_event, wheeltime;
    onmousewheel(image, function (event) {
        var { offsetX: layerX, offsetY: layerY, deltaY } = event;
        if (this.locked) event.preventDefault();
        if (!deltaY) return;
        if (!this.locked) setInitParams();
        this.locked = true;
        var ratio = Math.pow(0.99, 20 * Math.atan(deltaY / 20));
        var __scaled = scaled;
        __scaled *= ratio;
        if (__scaled > max_scale && ratio > 1) {
            __scaled = max_scale;
        }
        if (__scaled < min_scale && ratio < 1) {
            __scaled = min_scale;
        }
        ratio = __scaled / scaled;
        scale(layerX, layerY, ratio);
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
            if (saved_event) {
                if (event.timeStamp - saved_event.timeStamp > 120) {
                    move.reset();
                }
            }
            saved_event = null;
            event.moveLocked = this.locked;
            if (this.locked && onclick.preventClick) move.smooth(recover);
        }
    });
    on("append")(image, function () {
        mountedPictures.push(image);
        set_unlock();
    });
    on("remove")(image, function () {
        removeFromList(mountedPictures, image);
    });
    image.update = function () {
        if (image.locked) return;
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