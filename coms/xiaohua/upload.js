var passport = encode62.timeencode(encode62.decode62(user._passport, user.session));

function upload(files, base) {
    popup('/photo/edit',files);
    return queue.call(files, f => new Promise(function (ok, oh) {
        var xhr = new XMLHttpRequest;
        xhr.open("put", (base ? base : `/@/data/`) + f.name.replace(/\.?[^\.]+$/, function (m) {
            return "!" + user.getPassport() + m;
        }));
        xhr.send(f);
    }));
}