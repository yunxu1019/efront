function lng2x(lon, zoom) {
    // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_.28JavaScript.2FActionScript.2C_etc..29
    return (lon + 180) / 360 * Math.pow(2, zoom);

}
function lat2y(lat, zoom) {
    // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_.28JavaScript.2FActionScript.2C_etc..29
    return (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom);
}
function lng2tile(lon, zoom) {
    return Math.floor(lng2x(lon, zoom));
}
function lat2tile(lat, zoom) {
    return Math.floor(lat2y(lat, zoom));
}
function x2lng(x, z) {
    // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_.28JavaScript.2FActionScript.2C_etc..29
    return (x / Math.pow(2, z) * 360 - 180);
}
function y2lat(y, z) {
    // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_.28JavaScript.2FActionScript.2C_etc..29
    var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
    return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
}

class Vector extends Array {
    length = 3;
}

var defaultImage = function (ratio = 2) {
    var image = document.createElement('canvas');
    image.width = 256 * ratio;
    image.height = 256 * ratio;
    image.src = true;
    var { width, height } = image;
    var w = width / 14;
    var h = height / 8;
    var ctx = image.getContext("2d");
    ctx.beginPath();
    for (var cx = 0, dx = width; cx < dx; cx += w) {
        for (var cy = 0, dy = height; cy < dy; cy += h) {
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx, cy + h / 6);
            ctx.lineTo(cx + w / 2, cy + h / 3);
            ctx.lineTo(cx + w / 2, cy + h * 2 / 3);
            ctx.lineTo(cx, cy + h * 5 / 6);
            ctx.lineTo(cx, cy + h);
            ctx.moveTo(cx + w / 2, cy + h / 3);
            ctx.lineTo(cx + w, cy + h / 6);
            ctx.moveTo(cx + w / 2, cy + h * 2 / 3);
            ctx.lineTo(cx + w, cy + h * 5 / 6);
        }
    }
    ctx.strokeStyle = "rgba(255,255,255,.2)";
    ctx.lineWidth = ratio;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, height);
    ctx.strokeStyle = "rgba(255,255,255,.8)";
    ctx.lineWidth = ratio * 2;
    ctx.stroke();
    image.complete = true;
    return image;
}
var rotate = function (vector, theta, points) {

};

class EarthAxis {
    alpha = 0;// 赤道法线的角度
    theta = 0;// 本初子午线的角度
    radius = 1;
    zoom = 12;
    src = [];
    res = [];
    matrix = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
    rotate(direction,) {
    }
    to2d(Points) {
        return []
    }
    getRotation() {

        return {
            vector: [, ,],
            theta: 0
        };
    }
    // 正球坐标转换
    get3d(coord) {
        var [lng, lat] = coord;
        var alpha = lat / Math.PI;
        var theta = lng / Math.PI;
        var z = Math.sin(alpha);
        var r = Math.cos(alpha);
        var x = Math.cos(theta) * r;
        var y = Math.sin(theta) * r;
        return [x, y, z];
    }
}

function maps(config = {}) {
    var canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.loadings = [];
    if (isObject(config)) {
        for (var k in config) {
            if (k in this) {
                this[k] = config[k];
            }
        }
    }
    var map = canvas.map = this;
    var move = map.move;
    var saved_event;
    moveupon(canvas, {
        start(event) {
            event.preventDefault();
            move.reset();
            saved_event = event;
        },
        move(event) {
            if (event.moveLocked) return;
            if (!onclick.preventClick) return;
            if (event.touches && saved_event.touches) {
                if (event.touches.length !== saved_event.touches.length) {
                    event.moveLocked = true;
                    saved_event = event;
                    return;
                }

                switch (event.touches.length) {
                    case 1:
                        break;
                    case 2:
                    default:
                        event.moveLocked = true;
                        var [xy1, xy2] = saved_event.touches;
                        var [mn1, mn2] = event.touches;
                        var { left, top } = getScreenPosition(canvas);
                        top += canvas.clientTop;
                        left += canvas.clientLeft;
                        map.touch(
                            [xy1.clientX - left, xy1.clientY - top, xy2.clientX - left, xy2.clientY - top],
                            [mn1.clientX - left, mn1.clientY - top, mn2.clientX - left, mn2.clientY - top]
                        );
                        saved_event = event;
                        return;

                }
            }
            var deltax = event.clientX - saved_event.clientX,
                deltay = event.clientY - saved_event.clientY;
            event.moveLocked = true;
            move.call(this.map, deltax, deltay);
            saved_event = event;
        },
        end() {
            move.smooth();
            saved_event = null;
        },
    })
    onmousewheel(canvas, function (event) {
        event.preventDefault();
        var hwidth = this.width / 2;
        var hheight = this.height / 2;
        var layerx = event.layerX || event.offsetX || hwidth;
        var layery = event.layerY || event.offsetY || hheight;
        map.Scale(Math.pow(0.99, 20 * Math.atan(event.deltaY / 20)), layerx, layery);
        map.refresh();
    });
    var reshape = function () {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        canvas.map.refresh();
        canvas._default = canvas.map.defaultImage();
    };
    if (canvas.$mounted) reshape();
    else once("append")(canvas, reshape);
    bind('resize')(canvas, reshape);

    return canvas;
};
maps.prototype = {
    url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    direction: 1,
    zoom: 10,
    scale: 1,
    maxZoom: 19,
    minZoom: 3,
    center: [0, 0],
    maxLat: 85.05112877980659646937,
    minLat: -85.05112877980659646937,
    maxLng: 180,
    minLng: -180,
    canvas: null,
    context: null,
    _default: null,
    defaultImage() {
        if (this._default) return this._default;
        return this._default = defaultImage();
    },
    pattern: null,
    cache: [],
    move: inertia(function (a, b) {
        this.Move(a, b);
        this.refresh();
    }),
    touch([x1, y1, x2, y2], [m1, n1, m2, n2]) {
        var l1 = Math.sqrt(Math.pow(m1 - m2, 2) + Math.pow(n1 - n2, 2));
        var l2 = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        var scale = l1 / l2;
        this.Scale(scale, (m1 + m2) / 2, (n1 + n2) / 2);
        this.refresh();
    },
    Move(deltaX, deltaY) {
        var map = this;
        var { canvas, context, minLat, maxLat, minLng, maxLng } = this;
        var zoom = map.Zoom();
        var scale = map.Scale();
        var [lng, lat] = map.Center();
        var [x, y] = [this.lng2x(lng, zoom) * 256 * scale, this.lat2y(lat, zoom) * 256 * scale];
        deltaX = Math.round(deltaX);
        deltaY = Math.round(deltaY);
        if (this.direction < 0) deltaY = -deltaY;
        var x0 = x, y0 = y;
        x -= deltaX;
        y -= deltaY;
        var y1 = this.lat2y(minLat, zoom) * 256 * scale;
        var y2 = this.lat2y(maxLat, zoom) * 256 * scale;
        if (y1 > y2) [y1, y2] = [y2, y1];
        var hh = canvas.height / 2;
        y1 += hh;
        y2 -= hh;
        if (y < y1) {
            deltaY = y0 - y1;
            y = y1;
        }
        if (y > y2) {
            deltaY = y0 - y2;
            y = y2;
        }
        var hw = canvas.width / 2;
        if (maxLng - minLng !== 360) {
            var x1 = this.lng2x(minLng, zoom) * 256 * scale;
            var x2 = this.lng2x(maxLng, zoom) * 256 * scale;
            if (x1 > x2) [x1, x2] = [x2, x1];
            x1 += hw;
            x2 -= hw;
            if (x <= x1) {
                deltaX = x0 - x1;
                x = x1;
            }
            if (x >= x2) {
                deltaX = x0 - x2;
                x = x2;
            }
        }
        if (!deltaX && !deltaY) return false;

        var imagedata = context.getImageData(0, 0, canvas.width, canvas.height);
        if (deltaX < 0) {
            var x_empty = -deltaX;
            var x_start = canvas.width + deltaX;
        } else {
            x_start = 0;
            x_empty = deltaX;
        }
        if (deltaY < 0) {
            var y_empty = -deltaY;
            var y_start = canvas.height + deltaY;
        } else {
            y_start = 0;
            y_empty = deltaY;
        }
        context.clearRect(x_start, 0, x_empty, canvas.height + 2);
        context.clearRect(0, y_start, canvas.width + 2, y_empty);
        context.putImageData(imagedata, deltaX, deltaY);
        map.Center(this.x2lng(x / 256 / scale, zoom), this.y2lat(y / 256 / scale, zoom));
    },
    Zoom(level) {
        if (isFinite(level)) {
            this.zoom = +level;
        }
        return this.zoom;
    },
    Layer() {

    },
    Scale(deltaS, layerX, layerY) {
        if (isFinite(deltaS)) {
            this.move.reset();
            var map = this;
            var { canvas, context } = map;
            var {
                offsetWidth: width,
                offsetHeight: height
            } = canvas;
            var dw = width / 2;
            var dh = height / 2;
            if (layerX === undefined) {
                layerX = dw;
            }
            if (layerY === undefined) {
                layerY = dh;
            }
            var zoom = map.Zoom();

            var deltaScale = deltaS
            var scale = map.scale * deltaS;
            var delta = Math.floor(Math.log2(scale));
            if (delta !== 0) {
                zoom += delta;
                scale /= Math.pow(2, delta);
            }
            if (!zoom || zoom <= map.minZoom && deltaScale < 1) {
                deltaScale = Math.pow(2, map.minZoom - map.zoom) / map.scale;
                zoom = map.minZoom;
                scale = 1;
            }
            else if (zoom >= map.maxZoom && deltaScale > 1) {
                deltaScale = Math.pow(2, map.maxZoom - map.zoom) / map.scale;
                zoom = map.maxZoom;
                scale = 1;
            }
            var deltaS = deltaScale;
            var dwidth = width * deltaS;
            var dheight = height * deltaS;
            var tempCanvas = map.canvas.cloneNode();
            tempCanvas.getContext("2d").putImageData(context.getImageData(0, 0, width, height), 0, 0);
            context.clearRect(0, 0, width, height);

            var dx = (layerX - dw) * deltaS - (layerX - dw);
            var dy = (layerY - dh) * deltaS - (layerY - dh);
            if (this.direction < 0) dy = -dy;
            context.drawImage(tempCanvas, 0, 0, width, height, layerX - layerX * deltaS, layerY - layerY * deltaS, dwidth, dheight);
            var [lng, lat] = map.center;
            map.center = [this.x2lng(this.lng2x(lng, zoom) + dx / 256 / scale, zoom), this.y2lat(this.lat2y(lat, zoom) + dy / 256 / scale, zoom)];
            map.scale = +scale;
            map.Zoom(zoom);
        }
        return this.scale;
    },
    location(layerx, layery) {
        var map = this;
        var [centerlng, centerlat] = map.Center();
        var zoom = map.Zoom();
        var centerx = map.lng2x(centerlng, zoom);
        var centery = map.lat2y(centerlat, zoom);
        var { width, height } = this.canvas;
        var x = centerx + (layerx - width / 2) / 256;
        var y = centery + (layery - height / 2) / 256;
        var lng = +map.x2lng(x, zoom).toFixed(6), lat = +map.y2lat(y, zoom).toFixed(6);
        return [lng, lat];
    },
    freeze() {
        this.loadings.splice(0, this.loadings.length).map(this.destroyImage);
    },
    Center(lng, lat) {
        if (isFinite(lng) && isFinite(lat)) {
            this.center = [+lng, +lat];
        } else if (isObject(lng)) {
            if ("issearching" in lng) return;
            lng.issearching = true;
            if (lng instanceof Array) {
                var [lng, lat] = lng;
            } else {
                var { lng, lat } = lng;
            }
            this.Center(lng, lat);
            delete lng.issearching;
        }
        return this.center;
    },
    getURL(x, y, z) {
        if (this.url) {
            var minY = this.lat2tile(this.minLat, z);
            var maxY = this.lat2tile(this.maxLat, z);
            var minX = this.lng2tile(this.minLng, z);
            var maxX = this.lng2tile(this.maxLng, z);
            if (minY > maxY) [minY, maxY] = [maxY, minY];
            if (minX > maxX) [minX, maxX] = [maxX, minX];
            if (y > maxY || y < minY) return;
            if (this.maxLng - this.minLng !== 360) {
                if (x >= maxX || x < minX) return;
            }
            else {
                var dx = maxX - minX;
                if (x >= maxX) x = minX + (x - minX) % dx;
                if (x < minX) x = maxX - (minX - x - 1) % dx - 1;
            }
            return String(this.url).replace(/\$?\{([\w\-]+)\}/g, function (m, a) {
                switch (a) {
                    case "x": return x;
                    case "y": return y;
                    case "z": return z;
                    default:
                        if (/^\w\-\w$/.test(a)) {
                            var [a, b] = a.split("-").map(a => a.charCodeAt(0));
                            return String.fromCharCode(+a + (b - a) * Math.random() + .5 | 0);
                        }
                }
                return m;
            });
        }
    },
    loadImage(image, src) {
        image.src = src;
    },
    getImage(x, y, z) {
        var { cache } = this;
        var id = `${x}-${y}-${z}`;
        var url = this.getURL(x, y, z);
        if (!url) return this.defaultImage();
        if (this.cache[id]) return this.cache[id];
        var image = new Image;
        image._src = url;
        image.crossOrigin = "anonymous";
        this.loadImage(image, url);
        var cache = this.cache;
        cache.push(image);
        image._id = id;
        cache[id] = image;
        if (cache.length > 1000) {
            cache.splice(0, 500).forEach(this.destroyImage);
        }
        return image;
    },
    getGrid(gridMash) {
        var {
            width,
            height
        } = this.canvas;
        var halfWidth = width / 2;
        var halfHeight = height / 2;
        var [lng, lat] = this.center;
        var z = this.zoom;
        var startlng = this.x2lng(this.lng2x(lng, z) - halfWidth / 256, z);
        var lng0 = startlng;
        if (this.maxLng - this.minLng === 360) {
            if (lng0 > this.maxLng) lng0 = this.minLng + (lng0 - this.minLng) % (this.maxLng - this.minLng);
            if (lng0 < this.minLng) lng0 = this.maxLng - (this.minLng - lng0) % (this.maxLng - this.minLng);
        }
        var x = this.lng2tile(lng0, z);
        var x0 = this.lng2x(lng0, z);
        var y = this.lat2tile(lat, z);
        var y0 = this.lat2y(lat, z);
        var marginX = (256 * (x + 1 - x0)) % 256 - 256;
        var marginY = (halfHeight + 256 * (y + 1 - y0)) % 256 - 256;
        var countX = Math.ceil((width - marginY) / 256) + 1;
        var countY = Math.ceil((height - marginY) / 256);
        var grids = [];
        var startx = Math.round(x0 - (halfWidth - marginX) / 256);
        var starty = Math.round(y0 - (halfHeight - marginY) / 256);
        grids.startx = startx;
        grids.starty = starty;
        if (gridMash !== false) {
            var minX = this.lng2tile(this.minLng, z);
            var maxX = this.lng2tile(this.maxLng, z);
            var x1 = this.lng2x(this.minLng, z);
            var x2 = this.lng2x(this.maxLng, z);
            if (minX > maxX) [minX, maxX, x1, x2] = [maxX, minX, x2, x1];
            for (var cx = startx, dx = countX + cx; cx < dx;) {
                for (var cy = starty, dy = cy + countY; cy < dy; cy++) {
                    grids.push([x, cy, cx]);
                }
                if (x + 1 > maxX) {
                    cx += x2 - maxX;
                    x = minX;
                    cx -= x1 - minX;
                }
                else {
                    x++;
                    cx++;
                }
            }
        }
        grids.zoom = z;
        grids.left = marginX;
        grids.top = marginY;
        return grids;
    },
    refreshid: 0,
    async refresh() {
        var id = ++this.refreshid;
        var grid = this.getGrid();
        var { zoom } = grid;
        for (var [x, y, r] of grid) {
            var c = this.cache[`${x}-${y}-${zoom}`];
            this.drawImage(r, y, zoom, c && c.complete ? c : this.defaultImage());
        }
        return queue.call(grid, ([x, y, r = x]) => {
            if (id !== this.refreshid) return false;
            return this.drawLayer(x, y, zoom, r);
        }, 2);
    },
    drawImage(x, y, z, image) {
        var { startx, starty, zoom, left, top } = this.getGrid(false);
        if (zoom !== z) return;
        var width = 256;
        var height = 256;
        left = (x - startx) * width + left;
        top = (y - starty) * height + top;
        if (this.direction < 0) {
            top = this.canvas.height - top - height;
        }
        var scale = this.Scale();
        if (scale !== 1) {
            var { height: cheight, width: cwidth } = this.canvas;
            var centerx = cwidth / 2;
            var centery = cheight / 2;
            left = (left - centerx) * scale + centerx;
            top = (top - centery) * scale + centery;
            width = scale * width;
            height = scale * height;
        }
        if (this.direction > 0) this.context.clearRect(left, top, width, height);
        this.context.drawImage(image, left, top, width, height);
    },
    destroyImage(image) {
        if (!image.complete) image.abort && image.abort();
        delete this.cache[image._id];
        image.onload = null;
        image.onabort = null;
    },
    abortLoading(image) {
        for (var cx = this.loadings.length - 1; cx >= 0; cx--) {
            if (this.loadings[cx] === image) this.loadings.splice(cx, 1);
        }
    },
    drawLayer(x, y, z, r) {
        return new Promise((ok) => {
            var image = this.getImage(x, y, z);
            if (image.src && image.complete) {
                this.drawImage(r, y, z, image);
                setTimeout(ok, 1);
            } else {
                image.onload = () => {
                    this.abortLoading(image);
                    this.drawImage(r, y, z, image);
                    ok();
                };
                this.loadings.push(image);
            }
        });
    },
    lng2tile,
    lat2tile,
    y2lat,
    x2lng,
    lng2x,
    lat2y
};