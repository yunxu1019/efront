function audio(canvasContext, buffer) {
    var canvas = canvasContext.canvas;
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.beginPath();
    var max = canvas.height/2;
    var middle = max ;
    canvasContext.moveTo(0, middle + buffer[0] * max);
    [].forEach.call(buffer, function (db, cx, buffer) {
        var x = cx * canvas.width / buffer.length | 0;
        var y = middle + db *  max;
        canvasContext.lineTo(x, y);
    });
    canvasContext.stroke();
}