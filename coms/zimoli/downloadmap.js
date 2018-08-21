var path = window.require && window.require("path");
if (!path) throw new Error("请运行在有文件操作的环境下");
var downloadmap = function (rootpath, map_location, zoom_location, config, info) {
    var [lng_start, lat_start, lng_end, lat_end] = map_location;
    var [zoom_start, zoom_end] = zoom_location;
    var { map } = new maps(extend({}, config));
    var cz = zoom_start;
    var pz = function () {
        if (cz > zoom_end) return;
        var xstart = map.lng2tile(lng_start, cz);
        var xend = map.lng2tile(lng_end, cz);
        var ystart = map.lat2tile(lat_start, cz);
        var yend = map.lat2tile(lat_end, cz);
        var cx = xstart;
        var px = function () {
            if (cx > xend) return;
            var cy = ystart;
            var py = function (cx) {
                if (cy > yend) return cx;
                var url = map.getImage(cx, cy, cz);
                var destpath = [cz, cx, cy].join("/") + ".png";
                cy++;
                return getimagefromurl(url, destpath, rootpath).then(e => cx).then(ty);
            };
            var ry = py(cx);
            cx++;
            return Promise.resolve(ry).then(px);
        };
        return Promise.all(new Array(20).fill(0).map(e => px())).then(a => cz++).then(pz);
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