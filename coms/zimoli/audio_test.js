function main() {
    var recoder = audio.getRecorder();
    var _block = block();
    _block.innerHTML = audio_test;
    render(_block, recoder);
    console.log(_block);
    var canvas = _block.querySelector("canvas");
    canvas.width = 1024;
    canvas.height = 256;
    var context = canvas.getContext("2d");
    recoder.onprocess = function (buffer) {
        context.clearRect(0, 0, 1024, 256);
        context.beginPath();
        context.moveTo(0, canvas.offsetHeight / 2);
        var max = 2;
        [].forEach.call(buffer, function (db, cx) {
            db = (db - 128) / 128;
            context.lineTo(cx * canvas.width / buffer.length, canvas.height / 2 - db / max * canvas.height);
        });
        context.stroke();
    };
    return _block;
}