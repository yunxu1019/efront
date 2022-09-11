var hexagon = function (c = "#fff", lineWidth = devicePixelRatio) {
    var image = document.createElement('canvas');
    image.width = 9 * lineWidth;
    image.height = 16 * lineWidth;
    image.src = true;
    var { width, height } = image;
    var w = width;
    var h = height;

    var ctx = image.getContext("2d");
    ctx.beginPath();
    var cx = lineWidth / 2;
    var cy = 0;
    ctx.moveTo(cx, cy);
    /* |   */ctx.lineTo(cx, cy + h / 6);
    /*  \  */ctx.lineTo(cx + w / 2, cy + h / 3);
    /*   | */ctx.lineTo(cx + w / 2, cy + h * 2 / 3);
    /*  /  */ctx.lineTo(cx, cy + h * 5 / 6);
    /* |   */ctx.lineTo(cx, cy + h);
    ctx.moveTo(cx + w / 2, cy + h / 3);
    /*   / */ctx.lineTo(cx + w, cy + h / 6);
    ctx.moveTo(cx + w / 2, cy + h * 2 / 3);
    /*   \ */ctx.lineTo(cx + w, cy + h * 5 / 6);
    ctx.moveTo(cx, cy + h / 6);
    ctx.lineTo(cx - w / 2, cy + h / 3);
    ctx.moveTo(cx - w / 2, cy + h * 2 / 3);
    ctx.lineTo(cx, cy + h * 5 / 6);
    ctx.strokeStyle = c;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    image.complete = true;
    return image;
}
