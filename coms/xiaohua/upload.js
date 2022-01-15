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
            f.percent = +(loaded / total * 100).toFixed(2) + "%";
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
function createURL(file) {
    var { URL } = window;
    var url = URL.createObjectURL(file);
    file.src = url;
    file.filename = file.name;
    return file;
}
function createThumb(src) {
    return new Promise(function (ok) {
        var img = new Image;
        img.src = src;
        var onload = function () {
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            var ratio = Math.max(480 / img.width, 360 / img.height);
            if (ratio > 1) ratio = 1;
            if (isFinite(ratio)) {
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
                console.log(ratio)
                canvas.toBlob(ok, 'image/jpeg');
                console.log(ratio)
            }
        };
        if (img.complete) {
            onload();
        }
        else {
            img.onload = onload;
        }
    })
}
var base = config.filebase;
main.createThumb = async function (a) {
    if (a.thumb) return;
    var u = encodeurl(a);
    var thumb = await createThumb(u);
    a.thumb = 'thumb-' + a.href.replace(/^\//, '');
    thumb.filename = a.thumb;
    await upload(thumb, base);
    var res = await data.from("photo-update", a);
    a._rev = res.rev;
};
function main(files, listpage) {
    var page = view();
    page.innerHTML = template;
    files = Array.prototype.map.call(files, createURL);
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
                f = createURL(f);
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
                    var thumb = await createThumb(f.src);
                    if (thumb.size < f.size) {
                        thumb.filename = "thumb-" + f.filename;
                        await upload(thumb, base);
                    }
                    else {
                        thumb = f;
                    }
                    var d = new Date(f.lastModified);
                    await data.from('photo-add', {
                        _id: "cc.efront.photo:" + _id++,
                        href: f.filename,
                        thumb: thumb.filename,
                        name: f.name,
                        year: d.getFullYear(),
                        type: "photo",
                        describe: f.desc,
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