function main(item) {
    var _video = video(`/@${encodeURIComponent(item.value.pathname)}`);
    once("append")(_video, function () {
        requestFullScreen(_video);
    });
    onclick(_video, e => remove(_video));
    return _video;
}
var support = main.support = function (file) {
    return /\.(mpg|rmvb|rm|mp4|avi|mkv|wmv)$/i.test(file.name);
}