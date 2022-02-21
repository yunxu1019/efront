function picture_test() {
    var p = picture([
        "images/cat.jpg",
        "images/mirror.png",
    ]);
    p.touchclose = true;
    popup(p);
}