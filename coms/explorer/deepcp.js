function read(from, start, end) {
    var xhr = cross("get", from.fullpath);
    xhr.setRequestHeader("range", `bytes=${start}-${end}`);
    return xhr;
}
async function cp([from, dist]) {
    var rest = this.rest;
    var scope = this.scope;
    if (from.isfolder) {
        await scope.add(dist);
        var files = await scope.load(from.fullpath);
        for (var f of files) rest.push([f, dist + '/' + f.name]);
    }
    else {
        var inc = 0, step = 64 * 1024, total = 1;
        this.percent = 0;
        while (inc < total) {
            /**
             * @type {XMLHttpRequest}
             */
            var xhr = scope.read(from, inc, step);
            xhr = await xhr;
            var contentrange = xhr.getResponseHeader("Content-Range");
            var size = +xhr.getResponseHeader("Content-Length") || xhr.response.length;
            if (contentrange) total = +contentrange.split("/")[1];
            else total = size;
            await scope.upload({
                data: xhr.response,
                start: inc,
                total,
                name: from.name,
                size
            }, dist, this.token);
            this.percent = inc / total;
            inc += step;
        }
    }
};
function deepcp(scope, from, dist) {
    var task = new Task();
    if (from.isfolder) task.title = i18n`复制文件夹`;
    else task.title = i18n`复制文件`;
    task.open('copy', cp);
    task.scope = scope;
    dist = dist.replace(/^\/+|\/+$/g, '');
    task.send([from, dist]);
    return awaitable(task);
}