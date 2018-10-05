function main(item) {
    var _video = video(`/@${encodeURIComponent(item.value.pathname)}`);
    once("dblclick")(_video, function () {
        requestFullScreen(_video);
    });
    return _video;
}
var support = main.support = function (file) {
    return /\.(mpg|rmvb|rm|mp4|avi|mkv|wmv)$/i.test(file.name);
}