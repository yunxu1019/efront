var activeDevice;
function line(buffer, style, lineWidth = window.devicePixelRatio || 1) {
    var canvas = this;
    var context = canvas.getContext("2d");
    context.moveTo.apply(context, buffer[0]);
    context.beginPath();
    var { width, height } = canvas;
    for (var cx = 1, dx = buffer.length; cx < dx; cx++) {
        var [x, y] = buffer[cx];
        context.lineTo(x * width, y * height);
    }
    context.strokeStyle = style || "#00bd7bd4";
    context.lineWidth = lineWidth;
    context.stroke();
}
function draw(buffer) {
    var canvas = this;
    var context = canvas.getContext("2d");
    if (canvas.width !== canvas.offsetWidth * devicePixelRatio) canvas.width = canvas.offsetWidth * devicePixelRatio;
    if (canvas.height !== canvas.offsetHeight * devicePixelRatio) canvas.height = canvas.offsetHeight * devicePixelRatio;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.strokeStyle = "#00bd7bd4";
    context.lineWidth = window.devicePixelRatio || 1;
    var max = 2;
    var v = (this.volume >= 0 ? this.volume : 1) * buffer.length - .5;
    var x1 = 0, y1 = canvas.height / 2;
    context.moveTo(x1, y1);
    var ratio = canvas.width / buffer.length;
    if (buffer[0] instanceof Array) {
        line.call(this, buffer);
    } else if (buffer[0] instanceof Object) {
        buffer.forEach(a => line.call(this, a.data, a.color, a.width));
    } else {
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
        context.strokeStyle = "#00bd7bd4";
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
}

function dance(elem) {
    var canvas = /^canvas$/i.test(elem.tagName) ? elem : document.createElement("canvas");
    care(canvas, draw);
    return canvas;
}