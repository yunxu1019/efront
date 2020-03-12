function draw(buffer) {
    var canvas = this;
    var context = canvas.getContext("2d");
    if (canvas.width !== canvas.offsetWidth * devicePixelRatio) canvas.width = canvas.offsetWidth * devicePixelRatio;
    if (canvas.height !== canvas.offsetHeight * devicePixelRatio) canvas.height = canvas.offsetHeight * devicePixelRatio;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.strokeStyle = "rgba(60,180,255,1)";
    context.lineWidth = devicePixelRatio;
    var max = 2;
    var v = (this.volume >= 0 ? this.volume : 1) * buffer.length - .5;
    var x1 = 0, y1 = canvas.height / 2;
    context.moveTo(x1, y1);
    var ratio = canvas.width / buffer.length;
    [].forEach.call(buffer, function (db, cx) {
        var x = cx * ratio;
        var y = canvas.height / 2 - db / max * canvas.height;
        context.lineTo(x, y);
        if (cx <= v && cx + 1 > v) {
            context.stroke();
            context.beginPath();
        }
    });
    context.lineWidth = 1;
    context.strokeStyle = "rgba(60,180,255,.6)";
    context.stroke();
    if (this === activeDevice) {
        context.beginPath();
        context.moveTo(v * ratio, 0);
        context.lineTo(v * ratio, canvas.height);
        context.lineWidth = 1;
        context.strokeStyle = "#ffffff";
        context.stroke();
    }
}

function dance(elem) {
    var canvas = /^canvas$/i.test(elem.tagName) ? elem : document.createElement("canvas");
    care(canvas, draw);
    return canvas;
}