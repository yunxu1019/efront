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
            var imagedata = context.getImageData(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            // context.translate(clientX - saved_point.x, clientY - saved_point.y);
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
            var [lng, lat] = map.Center();
            var zoom = map.Zoom();
            map.Center(x2lng(lng2x(lng, zoom) - deltaX / 256, zoom), y2lat(lat2y(lat, zoom) - deltaY / 256, zoom));
        });
        var cancelup = onmouseup(window, function () {
            cancelup();
            cancelmove();
        });
    });
    return canvas;
};
maps.prototype = {
    url: "http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    direction: 1,
    zoom: 10,
    center: [0, 0],
    Zoom(level) {
        if (isFinite(level)) {
            this.zoom = +level;
            this.refresh();
        }
        return this.zoom;
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
        image.crossOrigin = "anonymous"
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
        var halfWidth = offsetWidth >> 1;
        var halfHeight = offsetHeight >> 1;

        var marginX = (halfWidth + 256 * (x + 1 - x0) | 0) % 256 - 256;
        var marginY = (halfHeight + 256 * (y + 1 - y0) | 0) % 256 - 256;
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
        this.loadings.splice(0, this.loadings.length).map(this.destroyImage);
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
    lng2tile,
    lat2tile,
    y2lat,
    x2lng,
    lng2x,
    lat2y
};