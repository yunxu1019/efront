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
    var imgpic;
    if (url instanceof Image) {
        imgpic = new Image;
        imgpic.src = url.src;
    }
    else {
        imgpic = document.createElement('img');
        imgpic.src = url;
    }
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
    image.url = url;
    if (广告 && !广告.parentNode) appendChild(image, 广告);

    if (isObject(url)) {
        if (key) {
            url = seek(url, key);
        }
    }
    var p = this;
    var createImage = p.createImage || _createImage;
    var image_width, image_height;
    var scaled, x, y, min_scale, loaded_scale, locked_scale, click_scale, loaded_x, loaded_y;
    var origin_width, origin_height;
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
        origin_width = image.clientWidth;
        origin_height = image.clientHeight;
        origin_rotate = 0;
        if (p.current === image) {
            p.width = image.width;
            p.height = image.height;
        }
        locked_scale = loaded_scale = Math.min(image.clientHeight / image_height, image.clientWidth / image_width);
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
        updatexy();
    };
    var set_unlock = function () {
        if (!loaded_scale) return;
        setInitParams();
        __css(imgpic, get_style(-1));
    };

    var imgpic;
    image.setImage = function (_imgpic) {
        if (!isElement(_imgpic)) _imgpic = this;
        if (imgpic) {
            [].forEach.call(imgpic.attributes, a => {
                var { name, value } = a;
                if (/width|height/i.test(name)) return;
                _imgpic.setAttribute(name, value);
            })
            remove(imgpic);
            appendChild(image, _imgpic);
            imgpic = _imgpic;
        } else {
            imgpic = _imgpic;
            _imgpic.setAttribute('imgpic', '');
            _imgpic.draggable = false;
            image.width = _imgpic.width;
            image.height = _imgpic.height;
            appendChild(image, _imgpic);
            setInitParams();
            set_unlock();
        }
    };
    createImage(url, image.setImage);
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
        var r = image.rotate | 0;
        var [, , w, h] = getrotatedltwh(r);
        if (type <= 0) {
            var x0 = x + (width - w) / 2;
            var y0 = y + (height - h) / 2;
            var [x1, y1] = trimCoord([image.clientWidth, image.clientHeight], [x0, y0, w, h], type);
            x += x1 - x0;
            y += y1 - y0;
        }
        var [left, top, marginLeft, marginTop] = coordIn([image.clientWidth, image.clientHeight], [x, y, width, height]);
        return {
            imageRendering: scaled >= 3 / devicePixelRatio ? "pixelated" : "",
            width: fromOffset(width),
            height: fromOffset(height),
            left,
            top,
            marginLeft,
            transform: `rotate(${origin_rotate}deg)`,
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
            event.moveLocked = scaled > locked_scale;
            if (!this.locked) {
                setInitParams();
            }
            move.reset();
        },
        move(event) {
            if (event.moveLocked) return;
            event.moveLocked = scaled > locked_scale;
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
            event.moveLocked = scaled >= locked_scale;

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
    var origin_rotate = 0;
    var updatexy = function () {
        var deg = image.rotate - origin_rotate;
        if (isFinite(deg)) {
            origin_rotate = image.rotate;
            [x, y] = getrotatedltwh(deg, scaled);
        }
    };
    var getrotatedltwh = function (a, s = scaled) {
        var w = image_width * s;
        var h = image_height * s;
        var c = [image.clientWidth / 2, image.clientHeight / 2];
        var m = x + w / 2;
        var n = y + h / 2;
        var [c1, c2] = rotate([m, n], -a, c);
        c1 -= w / 2;
        c2 -= h / 2;
        a = origin_rotate;
        var l = c[0] - w / 2;
        var r = l + w;
        var t = c[1] - h / 2;
        var b = t + h;
        var [x1, y1] = rotate([l, t], a, c);
        var [x2, y2] = rotate([r, t], a, c);
        var [x3, y3] = rotate([l, b], a, c);
        var [x4, y4] = rotate([r, b], a, c);
        var l = Math.min(x1, x2, x3, x4);
        var t = Math.min(y1, y2, y3, y4);
        var w = Math.max(x1, x2, x3, x4) - l;
        var h = Math.max(y1, y2, y3, y4) - t;
        return [c1, c2, w, h];
    };
    image.update = function (animate) {
        if (image.locked) {
            updatexy();
            x += (image.clientWidth - origin_width) / 2;
            y += (image.clientHeight - origin_height) / 2;
            origin_height = image.clientHeight;
            origin_width = image.clientWidth;
            __css(imgpic, get_style(-1));
            return;
        }
        setInitParams();
        if (animate !== false) {
            recover();
        } else {
            __css(imgpic, get_style(-1));
        }

    }
    return image;
};


var 广告 = document.createElement(/Trident/i.test(navigator.userAgent) ? "Welcome" : "欢迎使用白前看图");
addClass(广告, 'adv');
广告.innerHTML = `欢迎使用白前看图 `;
var alink = anchor2('http://efront.cc/baiplay', 'http://efront.cc/baiplay');
alink.target = "_blank";
appendChild(广告, alink);
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
    p.rotateTo = function (deg) {
        var img = p.current;
        if (!img) return;
        img.rotate = deg;
        img.update();
        return deg;
    };
    p.rotateBy = function (deg) {
        var img = p.current;
        if (!img) return;
        var r = img.rotate | 0;
        if (deg === 90 || deg === -90) {
            r += deg;
            if (deg > 0) {
                // 九进八舍
                var a = r / 90;
                if (Math.ceil(a) - a < .01) {
                    r = Math.ceil(a) * 90;
                } else {
                    r = Math.floor(a) * 90;
                }
            } else {
                // 一进零舍
                var a = r / 90;
                if (Math.ceil(a) - a > .01) {
                    r = Math.ceil(a) * 90;
                } else {
                    r = Math.floor(a) * 90;
                }
            }
        } else {
            r += deg;
        }
        img.rotate = r;
        img.update(deg === 90 || deg === -90);
        return r;
    };
    return p;
}
picture.closeAdv = function (params) {
    广告 = null;
};