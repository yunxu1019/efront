function audio_test() {
    var recoder = audio.getRecorder();

    var _block = block("<canvas></canvas><button ng-if=!recording ng-click=start()>录制</button><button ng-if=recording ng-click=stop()>停止录制</button>").render(recoder);
    var canvas = _block.querySelector("canvas");
    canvas.width = 1024;
    canvas.height = 256;
    var context = canvas.getContext("2d");
    recoder.onprocess = function (buffer) {
        context.clearRect(0, 0, 1024, 256);
        context.beginPath();
        context.moveTo(0, 0);
        var max = 2;
        // [].forEach.call(buffer, function (db, cx) {
        //     if (db > max) max = db;
        // });
        [].forEach.call(buffer, function (db, cx) {
            context.lineTo(cx * canvas.width / buffer.length, canvas.height / 2 - db / max * canvas.height);
        });
        context.stroke();
    };
    return _block;
}