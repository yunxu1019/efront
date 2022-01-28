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
var trimCoord = move.trimCoord;
var isequal = (a, b) => a === b || Math.abs((a - b) / (a + b)) < 1e-12;
function picture_(image = document.createElement("div")) {
    var image_width, image_height;
    var scaled, x, y, min_scale, loaded_scale, locked_scale, click_scale, loaded_x, loaded_y;
    var origin_width, origin_height;
    var max_scale = 10 * devicePixelRatio;
    var shape = function () {
        image.shape(x, y, scaled / devicePixelRatio, origin_rotate);
    };
    image.reshape = shape;
    var park = function () {
        if (image.park) image.park(x, y, scaled / devicePixelRatio, origin_rotate);
    };
    var setInitParams = function () {
        if (!image.width) return;
        image_width = image.width / devicePixelRatio;
        image_height = image.height / devicePixelRatio;
        origin_width = image.clientWidth;
        origin_height = image.clientHeight;
        origin_rotate = 0;
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
        set_unlock();
    };
    var set_unlock = function () {
        if (!loaded_scale) return;
        fixpos();
        shape();
    };

    on("append")(image, setInitParams);

    on("append")(image, function () {
        mountedPictures.push(image);
    });
    on("remove")(image, function () {
        removeFromList(mountedPictures, image);
    });
    image.init = setInitParams;
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
        image.locked = isequal(__scaled, loaded_scale) && isequal(loaded_x, x) && isequal(loaded_y, y);
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
    var fixpos = function () {
        var width = image_width * scaled;
        var height = image_height * scaled;
        var r = image.rotate | 0;
        var [, , w, h] = getrotatedltwh(r);
        var x0 = x + (width - w) / 2;
        var y0 = y + (height - h) / 2;
        var [x1, y1] = trimCoord([image.clientWidth, image.clientHeight], [x0, y0, w, h], -1);
        x += x1 - x0;
        y += y1 - y0;
    };
    var scale = function (layerx, layery, ratio) {
        if (!image.locked) return;
        scaled *= ratio;
        x = (x - layerx) * ratio + layerx;
        y = (y - layery) * ratio + layery;
        shape();
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
        shape();
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
        fixpos();
        if (change || saved_x !== x || saved_y !== y) {
            park();
        }
    };
    var move = inertia(function (deltax, deltay) {
        var saved_x = x, saved_y = y;
        x += deltax, y += deltay;
        fixpos();
        shape();
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
            if (event.which === 3) {
                event.moveLocked = true;
                rotatexy(saved_event.clientX, saved_event.clientY, event.clientX, event.clientY);
            }
            else {
                if (!this.locked) return;
                var deltax = event.clientX - saved_event.clientX,
                    deltay = event.clientY - saved_event.clientY;
                move(deltax, deltay);
            }
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
    var origin_rotate = 0;
    var rotatexy = function (x1, y1, x2, y2) {
        var centerx = image.clientWidth / 2, centery = image.clientHeight / 2;
        var deltax = x2 - x1, deltay = y2 - y1;
        var rx = x1 - centerx, ry = y1 - centery;
        var sign = -ry * deltax + rx * deltay;
        var delta = 90 * Math.sqrt(deltax * deltax + deltay * deltay) / Math.sqrt(rx * rx + ry * ry);
        if (delta > 10) delta = 10;
        if (sign) image.rotateBy(sign > 0 ? delta : -delta);
    }
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
        var a = origin_rotate;
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
            if (animate !== false) fixpos();
            shape();
            return;
        }
        setInitParams();
        if (animate !== false) {
            recover();
        } else {
            if (animate !== false) fixpos();
            shape();
        }

    };
    image.rotateTo = function (deg) {
        this.rotate = deg;
        this.update();
    };
    image.rotateBy = function (deg) {
        var r = this.rotate | 0;
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
        this.rotate = r;
        this.update(deg === 90 || deg === -90);
    };
    on("contextmenu")(image, function (e) {
        if (onclick.preventClick) e.preventDefault();
    });
    return image;
}