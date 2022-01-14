var passport = encode62.timeencode(encode62.decode62(user._passport, user.session));
function upload(files, base) {
    return queue.call(files, f => new Promise(function (ok, oh) {
        var xhr = new XMLHttpRequest;
        xhr.open("put", (base ? base : `/@/data/`) + f.name.replace(/\.?[^\.]+$/, function (m) {
            return "!" + user.getPassport() + m;
        }));
        xhr.send(f);
    }));

}
main.upload = upload;
function createThumbnail(file) {
    var { URL } = window;
    var url = URL.createObjectURL(file);
    var img = new Image;
    img.src = url;
    return img;
}
function main(files, base) {
    var page = view();
    page.innerHTML = template;
    files = Array.prototype.map.call(files, createThumbnail);
    renderWithDefaults(page, {
        c(c, { f }) {
            return f;
        },
        view(i) {
            popup("show", { src: files, index: i });
        },
        files
    });
    page.upload = upload.bind(null, files, base);
    drag.on(page.firstChild, page);
    setTimeout(function () {
        popup(page);
        move.bindPosition(page, [.5, .5]);
    });

    return page;
}