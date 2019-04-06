function video(src) {
    var video = createElement("video");
    video.type = "video/" + src.replace(/^.*?\.(\w*)$/g, "$1");
    video.src = src;
    // video.autoplay = true;
    on("dblclick")(video,function(){
        requestFullScreen(video);
    })
    return video;
}