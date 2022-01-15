var passport = encode62.timeencode(encode62.decode62(user._passport, user.session));
function upload(f, base) {
    return new Promise(function (ok, oh) {
        var xhr = new XMLHttpRequest;
        xhr.open("put", (base ? base : `/@/data/`) + f.filename.replace(/\.?[^\.]+$/, function (m) {
            return "!" + user.getPassport() + m;
        }));
        xhr.onload = ok;
        xhr.onerror = oh;
        if (xhr.upload) xhr.upload.onprogress = function (event) {
            var { total, loaded } = event;
            f.percent = +(total / loaded * 100).toFixed(2) + "%";
            f.total = total;
            f.loaded = loaded;
            render.digest();
        };
        xhr.send(f);
    });
}
function couchdb() {

}
main.upload = upload;
function createThumbnail(file) {
    var { URL } = window;
    var url = URL.createObjectURL(file);
    file.src = url;
    file.filename = file.name;
    return file;
}
function main(files, listpage) {
    var page = view();
    page.innerHTML = template;
    files = Array.prototype.map.call(files, createThumbnail);
    var base = '/@/data/xiaohua/photos/';
    renderWithDefaults(page, {
        base,
        fields: [
            { name: "文件名", key: "filename" },
            { name: "描述", key: "describe" },
        ],
        view(i) {
            popup("show", { src: files, index: i });
        },
        async add() {
            var fs = await chooseFile(null, true);
            for (var f of fs) {
                f = createThumbnail(f);
                files.push(f);
            }
        },
        files,
        dropfile(i) {
            var f = files[i];
            files.splice(i, 1);
            window.URL.revokeObjectURL(f.src);
        },
        remove() {
            remove(page);
            for (var f of files) {
                window.URL.revokeObjectURL(f.src);
            }
        },
        async upload() {
            if (!files.length) return alert("请选择文件！", 'warn');
            var count = 0;
            var _id = +new Date();
            for (var f of files) {
                try {
                    f.error = null;
                    var { target: xhr } = await upload(f, base);
                    if (xhr.status !== 200) {
                        throw xhr.responseText || xhr.response;
                    }
                    var d = new Date(f.lastModified);
                    await data.from('photo-add', {
                        _id: _id++,
                        href: f.filename,
                        name: f.name,
                        year: d.getFullYear(),
                        type: "photo",
                        describe: f.desc,
                        _id: "cc.efront.photo:" + f
                    });
                    count++;
                } catch (e) {
                    f.percent = 0;
                    f.error = e;
                }
            }
            if (count > 0) listpage.load();
            for (var cx = files.length - 1; cx >= 0; cx--) {
                var f = files[cx];
                if (!f.error) files.splice(cx, 1);
            }
            if (!files.length) {
                remove(page);
                alert("上传完成！", "success");
            }
            else {
                alert(`有${files.length}个文件上传失败！`, 'warn');
            }
        }
    });
    page.upload = page.$scope.upload;
    drag.on(page.firstChild, page);
    resize.on(page);
    setTimeout(function () {
        popup(page, true);
        move.bindPosition(page, [.5, .5]);
    });

    return page;
}