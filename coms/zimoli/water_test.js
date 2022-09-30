
function main() {
    var canvas = document.createElement("canvas");
    canvas.style.cursor = 'pointer';
    canvas.width = 256;
    canvas.height = 256;
    var waterRippleEffect = new water(canvas);
    waterRippleEffect.src = "favicon.ico";

    on("append")(canvas, function () {
        waterRippleEffect.start();
    });
    on("remove")(canvas, function () {
        waterRippleEffect.stop();
    });
    onclick(canvas, function (e) {
        var mouseX = e.layerX;
        var mouseY = e.layerY;
        waterRippleEffect.disturb(mouseX, mouseY);
    });
    onmousemove(canvas, function (e) {
        var mouseX = e.layerX;
        var mouseY = e.layerY;
        waterRippleEffect.disturb(mouseX, mouseY);
    });
    return canvas;
}
