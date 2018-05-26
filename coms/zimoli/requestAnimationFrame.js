var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    //一般集中在25毫秒，左右相差不超过1毫秒
    return setTimeout(callback, 25);
};