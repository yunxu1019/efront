var osm = {
    url: `https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    loadImage(image, src) {
        var img = new Image;
        img.crossOrigin = "anonymous";
        var ok = function () {
            var canvas = document.createElement("canvas");
            var { width, height } = img;
            canvas.width = width;
            canvas.height = height;
            var context = canvas.getContext("2d");
            context.drawImage(img, 0, 0, width, height);
            var imagedata = context.getImageData(0, 0, width, height);
            var data = imagedata.data;
            var { max, cos, PI } = Math;
            for (var cx = 0, dx = data.length; cx < dx; cx += 4) {
                var r = data[cx];
                var g = data[cx + 1];
                var b = data[cx + 2];
                var s = r + g + b;
                var t = (765 - s) / s;
                var p = max(r, g, b);
                var q = 255 / p;
                r *= q, g *= q, b *= q;
                data[cx] = r;
                data[cx + 1] = g;
                data[cx + 2] = b;
                data[cx + 3] = (1-cos(p * t / 255 * PI)) * 128;
            }
            context.putImageData(imagedata, 0, 0);
            delete image.abort;
            image.src = canvas.toDataURL();
        }

        image.abort = function () {
            delete image.abort;
            img.abort();
        };
        img.src = src;
        if (img.complete) {
            ok();
        } else {
            img.onload = ok;
        }
    }
};