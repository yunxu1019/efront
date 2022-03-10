async function link(id, page) {
    if (!id) {
        id = await data.from("link");
    }
    if (!page.name) page.$scope.title = `会话窗口(<span nodrag>${id}</span>)`;
    page.roomid = id;
    var removed = false;
    on("remove")(page, function () {
        removed = true;
        if (xhr.abort) xhr.abort();
    });
    var xhr = null;
    while (true) {
        if (removed) break;
        xhr = data.from("care", { id });
        page.push(await xhr);
    }
}
function main(params) {
    if (isObject(params)) var { linkid: id, name } = params;
    else id = params;
    var page = frame$chat(name);
    if (name) page.name = name;
    care(page, 'send', function (msg) {
        data.from("cast", { id: page.roomid, msg });
    });
    link(id, page);
    return page;
}