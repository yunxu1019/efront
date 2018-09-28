var lastAnimateTime = +new Date;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    //一般集中在25毫秒，左右相差不超过1毫秒
    var currentTime = +new Date;
    var deltaTime = currentTime - lastAnimateTime > 16 ? 0 : currentTime % 16;
    lastAnimateTime = deltaTime + currentTime;
    return setTimeout(callback, deltaTime);
};