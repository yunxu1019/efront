var b = document.createElement("div");
css(b, "position:absolute;");
css(b, {
    height: 1 + 'px',
    width: 1 + "px"
});
var Canvas = function (width, height) {
    var canvas = document.createElement("div");
    css(canvas, `width:${width * renderPixelRatio}pt;height:${height * renderPixelRatio}pt;position:relative;overflow:hidden;`);
    var _canvas = document.createElement("div");
    css(_canvas, `top:50%;left:50%;margin:-${height / 2}px -${width / 2}px;height:${height}px;width:${width}px;position:absolute;overflow:hidden;-webkit-transform:scale(${renderPixelRatio / .75});`);
    var points = [], context = [];
    for (var cx = 0; cx < width; cx++) {
        for (var cy = 0; cy < height; cy++) {
            var point = b.cloneNode();
            var style = point.style;

            style.left = cx + "px";
            style.top = cy + "px";
            style.backgroundColor = `rgb(${(cx << 2) % 256},${(cy << 2) % 256},${(cx + cy << 2) % 256})`;
            context.push(style);
            points.push(point);
            _canvas.appendChild(point);
        }
    }
    appendChild(canvas, _canvas);
    return canvas;
};
Canvas.prototype = {
    getContext() {

    }
};