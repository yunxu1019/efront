function video(src) {
    if (isString(src)) {
        var video = createElement("video");
        video.type = "video/" + src.replace(/^.*?\.(\w*)$/g, "$1");
        video.src = src;
    } else if (isNode(src)) {
        if (/video/i.test(src.tagName)) {
            var video = src;
        } else {
            var video = document.createElement("video");
        }
    }
    // video.autoplay = true;
    on("dblclick")(video, function () {
        requestFullScreen(video);
    })
    return video;
}