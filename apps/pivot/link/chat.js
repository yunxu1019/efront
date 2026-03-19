async function link(id, page) {
    if (!id) {
        id = await data.from("link");
    }
    if (!page.name) $scoped.get(page).title = `会话窗口(<span nodrag>${id}</span>)`;
    page.clientid = id;
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
    care(page, 'send', function ([sendto, msg]) {
        data.from("cast", { id: sendto, msg });
    });
    link(id, page);
    return page;
}