async function link(page, id) {
    if (!id) id = await data.from("link");
    page.roomid = id;
    var runing = true;
    on('remove')(page, function () {
        if (req.abort) req.abort();
        runing = false;
    });
    var req = await data.from("care", { id, userid: encode62.timeencode([page.localid, clientInfo.name, ''].join(',')) })
    do {
        var msg = await req;
        page.push(msg);
        req = data.from("care", { id, userid: encode62.timeencode(page.localid) });
    } while (runing);
}

function main() {
    var page = frame$chat(clientInfo);
    link(page, '');
    care(page, "send", function (msg) {
        data.from("cast", { id: [page.roomid, page.userid].join('/'), msg });
    });
    return page;
}