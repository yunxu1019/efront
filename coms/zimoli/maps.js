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
    rotate(direction, ) {
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
    var context = this.context = canvas.getContext("2d");
    this.loadings = [];
    if (config instanceof Object) {
        for (var k in config) {
            if (k in this) {
                this[k] = config[k];
            }
        }
    }
    onappend(canvas, () => this.refresh());
    var map = canvas.map = this;
    onmousedown(canvas, function (event) {
        event.preventDefault();
        var saved_point = {
            x: event.clientX,
            y: event.clientY
        };
        var cancelmove = onmousemove(window, function (event) {
            var { clientX, clientY } = event;
            var deltaX = clientX - saved_point.x
            var deltaY = clientY - saved_point.y;
            saved_point.x = clientX;
            saved_point.y = clientY;
            map.Move(deltaX, deltaY);
        });
        var cancelup = onmouseup(window, function () {
            cancelup();
            cancelmove();
        });
    });
    onmousewheel(canvas, function (event) {
        var hwidth = this.width / 2;
        var hheight = this.height / 2;
        var layerx = event.layerX || event.offsetX || hwidth;
        var layery = event.layerY || event.offsetY || hheight;
        var scale = map.Scale();
        if (event.deltaY < 0) {
            scale += 0.125;
        } else {
            scale -= 0.125;
        }
        map.Scale(scale, layerx, layery);
    });

    return canvas;
};
maps.prototype = {
    url: "http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    direction: 1,
    zoom: 10,
    scale: 1,
    center: [0, 0],
    canvas: null,
    context: null,
    Move(deltaX, deltaY) {
        var { canvas, context } = this;
        var imagedata = context.getImageData(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        context.putImageData(imagedata, deltaX, deltaY);
        if (deltaX < 0) {
            var x_empty = -deltaX;
            var x_start = canvas.offsetWidth + deltaX;
        } else {
            x_start = 0;
            x_empty = deltaX;
        }
        if (deltaY < 0) {
            var y_empty = -deltaY;
            var y_start = canvas.offsetHeight + deltaY;
        } else {
            y_start = 0;
            y_empty = deltaY;
        }
        context.clearRect(x_start, 0, x_empty, canvas.offsetHeight);
        context.clearRect(0, y_start, canvas.offsetWidth, y_empty);
        var map = this;
        var [lng, lat] = map.Center();
        var zoom = map.Zoom();
        var scale = map.Scale();
        if (scale === 1) {
            map.Center(x2lng(lng2x(lng, zoom) - deltaX / 256, zoom), y2lat(lat2y(lat, zoom) - deltaY / 256, zoom));
        } else {
            map.Center(x2lng(lng2x(lng, zoom) - (deltaX / 256 / scale).toFixed(6), zoom), y2lat(lat2y(lat, zoom) - (deltaY / 256 / scale).toFixed(6), zoom));
        }
    },
    Zoom(level) {
        if (isFinite(level)) {
            this.zoom = +level;
            this.refresh();
        }
        return this.zoom;
    },
    Layer() {

    },
    Scale(scale, x, y) {
        if (isFinite(scale)) {
            var map = this;
            var { canvas, context } = map;
            var {
                width,
                height
            } = canvas;
            if (x === undefined) {
                x = width >> 1;
            }
            if (y === undefined) {
                y = height >> 1;
            }

            var zoom = map.Zoom();
            var saved_value = zoom;
            if (scale >= 2) {
                zoom += 1;
                scale -= 1;
            } else if (scale <= 1) {
                zoom -= 1;
                scale += 1;
            }
            if (!zoom || zoom < 3) {
                zoom = 3;
                scale = 1;
            } else if (zoom > 23) {
                scale = 1;
                zoom = 23;
            }
            var dest_scale = Math.pow(2, zoom - saved_value);
            if (dest_scale !== 1) {
                var dwidth = width * dest_scale;
                var dheight = height * dest_scale;

                var dw = dwidth >> 1;
                var dh = dheight >> 1;
                var tempCanvas = this.canvas.cloneNode();
                tempCanvas.getContext("2d").putImageData(context.getImageData(0, 0, width, height), 0, 0);
                context.clearRect(0, 0, width, height);
                context.drawImage(tempCanvas, 0, 0, width, height, x - dw, y - dh, dwidth, dheight);
                this.center = [this.center[0] - (dw >> 1), this.center[1] - (dh >> 1)]
            }
            this.scale = +scale;
            // if (zoom !== saved_value) map.Zoom(zoom);
        }
        return this.scale;
    },
    location(layerx, layery) {
        var map = this;
        var [centerlng, centerlat] = map.Center();
        var zoom = map.Zoom();
        var centerx = map.lng2x(centerlng, zoom);
        var centery = map.lat2y(centerlat, zoom);
        var { offsetWidth, offsetHeight } = this.canvas;
        var x = centerx + (layerx - offsetWidth / 2) / 256;
        var y = centery + (layery - offsetHeight / 2) / 256;
        var lng = +map.x2lng(x, zoom).toFixed(6), lat = +map.y2lat(y, zoom).toFixed(6);
        return [lng, lat];
    },
    freeze() {
        this.loadings.splice(0, this.loadings.length).map(this.destroyImage);
    },
    Center(lng, lat) {
        if (isFinite(lng) && isFinite(lat)) {
            this.center = [+lng, +lat];
            this.refresh();
        } else if (lng instanceof Object) {
            if (issearching in lng) return;
            ing.issearching = true;
            if (lng instanceof Array) {
                var [lng, lat] = lng;
            } else {
                var { lng, lat } = lng;
            }
            this.Center(lng, lat);
            delete ing.issearching;
        }
        return this.center;
    },
    getURL(x, y, z) {
        if (this.url) {
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
        var image = new Image;
        image.crossOrigin = "anonymous";
        this.loadImage(image, this.getURL(x, y, z));
        return image;
    },
    getGrid(gridOnly) {
        var [lng, lat] = this.Center();
        var z = this.Zoom();
        var x = this.lng2tile(lng, z);
        var y = this.lat2tile(lat, z);
        var x0 = this.lng2x(lng, z);
        var y0 = this.lat2y(lat, z);
        var {
            offsetWidth,
            offsetHeight
        } = this.canvas;
        var halfWidth = offsetWidth / 2;
        var halfHeight = offsetHeight / 2;
        var marginX = (halfWidth + 256 * (x + 1 - x0)) % 256 - 256;
        var marginY = (halfHeight + 256 * (y + 1 - y0)) % 256 - 256;
        var countX = Math.ceil((offsetWidth - marginX) / 256);
        var countY = Math.ceil((offsetHeight - marginY) / 256);
        var grids = [];
        var startx = Math.round(x0 - (halfWidth - marginX) / 256);
        var starty = Math.round(y0 - (halfHeight - marginY) / 256);
        if (gridOnly !== false) {
            for (var cx = startx, dx = cx + countX; cx < dx; cx++) {
                for (var cy = starty, dy = cy + countY; cy < dy; cy++) {
                    grids.push([cx, cy]);
                }
            }
        }
        grids.zoom = z;
        grids.startx = startx;
        grids.starty = starty;
        grids.left = marginX;
        grids.top = marginY;
        return grids;
    },
    refresh() {
        this.freeze();
        var grid = this.getGrid();
        var { zoom } = grid;
        grid.map(([x, y]) => {
            this.drawLayer(x, y, zoom);
        });
    },
    drawImage(x, y, z, image) {
        var { startx, starty, zoom, left, top } = this.getGrid(false);
        if (zoom !== z) return;
        var { width, height } = image;
        left = (x - startx) * 256 + left;
        top = (y - starty) * 256 + top;
        if (this.direction < 0) {
            top = this.canvas.offsetHeight - top - 256;
        }
        var scale = this.Scale();
        if (scale !== 1) {
            var { offsetHeight, offsetWidth } = this.canvas;
            var centerx = offsetWidth / 2;
            var centery = offsetHeight / 2;
            left = (left - centerx) * scale + centerx;
            top = (top - centery) * scale + centery;
            width = scale * width;
            height = scale * height;
        }
        var round = Math.round;
        left = round(left);
        top = round(top);
        width = round(width);
        height = round(height);
        this.context.clearRect(left, top, width, height);
        // console.log(grids)
        this.context.drawImage(image, left, top, width, height);
    },
    destroyImage(image) {
        if (!image.complete) image.abort && image.abort();
        image.onload = null;
        image.onabort = null;
        image.removeAttribute("src");
    },
    abortLoading(image) {
        for (var cx = this.loadings.length - 1; cx >= 0; cx--) {
            if (this.loadings[cx] === image) this.loadings.splice(cx, 1);
        }
    },
    drawLayer(x, y, z) {
        var image = this.getImage(x, y, z);
        if (image.src && image.complete) {
            this.drawImage(x, y, z, image);
            this.destroyImage(image);
        } else {
            image.onload = () => {
                this.abortLoading(image);
                this.drawImage(x, y, z, image);
                this.destroyImage(image);
            };
            this.loadings.push(image);
        }
    },
    lng2layer(lng, zoom) {
    },
    lat2layer(lat, zoom) {
    },
    lng2tile,
    lat2tile,
    y2lat,
    x2lng,
    lng2x,
    lat2y
};