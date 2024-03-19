var path = window.require && window.require("path");
if (!path) throw new Error(i18n`请运行在有文件操作的环境下`);
var getRect = function (points) {
    var minpoint = [].concat(points[0] || []), maxpoint = [].concat(points[points.length - 1] || []);
    var { min, max } = Math;
    points.forEach(function (point) {
        minpoint[0] = min(minpoint[0], point[0]);
        minpoint[1] = min(minpoint[1], point[1]);
        maxpoint[0] = max(maxpoint[0], point[0]);
        maxpoint[1] = max(maxpoint[1], point[1]);
    });
    return [minpoint, maxpoint];
}
var getLimit = function (map_location, zoom, map) {
    var [[lng_start, lat_start], [lng_end, lat_end]] = getRect(map_location);
    var xstart = map.lng2tile(lng_start, zoom);
    var xend = map.lng2tile(lng_end, zoom);
    var ystart = map.lat2tile(lat_start, zoom);
    var yend = map.lat2tile(lat_end, zoom);
    if (xstart > xend) {
        xstart = xstart ^ xend;
        xend = xend ^ xstart;
        xstart = xstart ^ xend;
    }
    if (ystart > yend) {
        ystart = ystart ^ yend;
        yend = ystart ^ yend;
        ystart = ystart ^ yend;
    }
    return [xstart, xend, ystart, yend];
};
var getCount = function (map_location, zoom_location, map) {
    var [zoom_start, zoom_end] = zoom_location;
    var sum = 0;
    for (var cz = zoom_start, dz = zoom_end; cz <= dz; cz++) {
        var [xstart, xend, ystart, yend] = getLimit(map_location, cz, map);
        sum += (xend - xstart + 1) * (yend - ystart + 1);
    }
    return sum;
};
var downloadmap = function (rootpath, map_locations, zoom_location, config, info) {
    var map_rect = getRect(map_locations);
    var { map } = new maps(extend({}, config));
    var totalCount = getCount(map_rect, zoom_location, map);
    var [zoom_start, zoom_end] = zoom_location;
    var cz = zoom_start;
    var inc = 0, ind = 0;
    var pz = function () {
        if (cz > zoom_end) return;
        var [xstart, xend, ystart, yend] = getLimit(map_rect, cz, map);
        var cx = xstart;
        var px = function () {
            if (cx > xend) return;
            var cy = ystart;
            var py = function (cx) {
                if (cy > yend) return cx;
                info instanceof Function && info(`${totalCount}/${++inc}/${inc - ind}(${(xend - xstart + 1) * (yend - ystart + 1)}=x${xstart}|${xend - xstart + 1}*y${ystart}|${yend - ystart + 1}) z${cz}/x${cx}/y${cy}`);
                var url = map.getImage(cx, cy, cz);
                var destpath = [cz, cx, cy].join("/") + ".png";
                cy++;
                return getimagefromurl(url, destpath, rootpath).catch(e => cx).then(e => cx).then(py);
            };
            var ry = py(cx);
            cx++;
            return Promise.resolve(ry).then(px);
        };
        return Promise.all(new Array(10).fill(0).map(e => px())).then(a => (cz++, ind = inc)).then(pz);
    };
    pz();
};
var writeImage = function (image, destpath, rootpath) {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    var data = canvas.toDataURL().replace(/^data:.*?base64,/i, "");
    data = Buffer.from(data, "base64");
    return writeFile([{ destpath, data }], rootpath);
};
function getimagefromurl(image, destpath, rootpath) {
    if (image.src && image.complete) {
        return writeImage(image, destpath, rootpath);
    } else {
        return new Promise(function (ok, oh) {
            image.onload = function () {
                this.onload = null;
                ok(writeImage(image, destpath, rootpath));
            };
            image.onerror = oh;
            image.onabort = oh;
            image.ontimeout = oh;
        });
    }
}