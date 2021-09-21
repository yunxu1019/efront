var path = require("path");
var fs = require("fs");
function download(urls, folder) {
    if (urls instanceof Array) {
        return queue.call(url => download(url, folder), urls, 2);
    }
    if (!urls) return;
    return fetch(urls.href).then(function (data) {
        return new Promise(function (ok, oh) {
            fs.writeFile(path.join(folder, urls.name), data, function (error) {
                if (error) return oh(error);
                console.log(urls.href, urls.name);
                return ok();
            });
        })
    });
}
