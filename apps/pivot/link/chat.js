async function link(id, page) {
    if (!id) {
        id = await data.from("link");
    }
    page.$scope.title = `会话窗口(<span nodrag>${id}</span>)`;
    page.roomid = id;
    var removed = false;
    on("remove")(page, function () {
        removed = true;
        if (xhr.abort) xhr.abort();
    });
    var xhr = null;
    while (true) {
        if (removed) break;
        xhr = data.from("care", { id }, function (data) {
            page.$scope.msglist.push.apply(page.$scope.msglist, data);
        });
        await xhr;
    }
}
function main(id) {
    console.log(id)
    var page = frame$chat();
    care(page, 'send', function (msg) {
        data.from("cast", { id: page.roomid, msg });
    });
    link(id, page);
    return page;
}