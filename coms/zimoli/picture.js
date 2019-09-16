
function picture(url, to = 0) {
    var urls = [].concat(url);

    images = urls.map(url => {
        var image = div();
        var img = new Image;
        img.src = url;
        var onload = function () {
            img.onload = null;
            image.width = this.width;
            image.height = this.height;
            scaled = Math.min(image.offsetHeight / image.height, image.offsetWidth / image.width);
            x = (image.offsetWidth - image.width * scaled) / 2;
            y = (image.offsetHeight - image.height * scaled) / 2;
            min_scale = scaled * .75;
            loaded_scale = scaled;
            loaded_x = x;
            loaded_y = y;
            image.complete = true;
        }
        if (img.complete) {
            once("append")(img, onload);
        } else {
            img.onload = onload;
        }
        image.locked = false;
        var scaled, x, y, min_scale, loaded_scale, loaded_x, loaded_y;
        var last_click_time = 0;
        on("click")(image, function (event) {
            var time = +new Date;
            var delta_time = time - last_click_time;
            last_click_time = time;
            if (delta_time > 300) return;
            var image = this;
            scaled = Math.min(image.offsetHeight / image.height, image.offsetWidth / image.width);
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
                css(image, get_empty());
            }
        });
        var get_empty = function () {
            return {
                backgroundPositionX: "",
                backgroundPositionY: "",
                backgroundSize: "",
                transition: ""
            };
        }
        var get_style = function () {
            return {
                backgroundPositionX: x + "px",
                backgroundPositionY: y + "px",
                backgroundSize: [image.width * scaled + "px", image.height * scaled + "px"].join(" ")
            };
        };
        var scale = function (layerx, layery, scale = 1) {
            if (!image.locked) return;
            var ratio = scale / scaled;
            x = layerx - (layerx - image.offsetWidth / 2 + image.width / 2 * scaled) * ratio;
            y = layery - (layery - image.offsetHeight / 2 + image.height / 2 * scaled) * ratio;
            scaled = ratio;
            css(image, get_style());
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
            css(image, get_style());
        };
        var move = function (deltax, deltay) {
            x += deltax, y += deltay;
            css(image, get_style());
        };
        var recover = function () {
            var change;
            if (scaled <= loaded_scale) {
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
            if (x > loaded_x) {
                x = loaded_x;
                change = true;
            }
            if (y > loaded_y) {
                y = loaded_y;
                change = true;
            }
            var min_x = image.offsetWidth - image.width * scaled - loaded_x;
            var min_y = image.offsetHeight - image.height * scaled - loaded_y;
            if (x < min_x) {
                x = min_x;
                change = true;
            }
            if (y < min_y) {
                y = min_y
                change = true;
            }
            if (change) {
                var a = transition(image, get_style(), true);
                setTimeout(function () {
                    if (scaled === loaded_scale) {
                        css(image, get_empty());
                        image.locked = false;
                    }
                }, a || 0);
            }
        };
        var saved_event;

        moveupon(image, {
            start(event) {
                saved_event = event;
                event.moveLocked = this.locked;
                // console.log(e);
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
                var deltax = event.clientX - saved_event.clientX,
                    deltay = event.clientY - saved_event.clientY;
                move(deltax, deltay);
                saved_event = event;
                // console.log(e);
            },
            end(event) {
                event.moveLocked = this.locked;
                if (this.locked) recover();
            }
        });
        css(image, {
            backgroundImage: `url("${url}")`
        });
        return image;
    });
    var p = slider(images, false);
    p.go(to);
    p.initialStyle = 'backdrop-filter:blur(0);opacity:0;';
    return p;
}