function video(src) {
    var video = createElement("video");
    video.src = src;
    video.type = "video/" + src.replace(/^.*?\.(\w*)$/g, "$1");
    video.autoplay = true;
    on("dblclick")(video,function(){
        requestFullScreen(video);
    })
    return video;
}