var objects = [];
function recover() {
    var now = +new Date;
    for (var c of objects) c.recover(now);
}
function destroy() {
    for (var c of objects) c.destroy();
    pause();
}
var interval;
var start = function () {
    if (interval) return;
    interval = setInterval(recover, 20);
};
var pause = function () {
    clearInterval(interval);
    interval = 0;
};
module.exports = {
    objects,
    start,
    pause,
    recover,
    destroy
}