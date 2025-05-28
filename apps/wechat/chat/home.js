async function link(page, id) {
    if (!id) id = await data.from("link");
    page.roomid = id;
    var runing = true;
    on('remove')(page, function () {
        if (req.abort) req.abort();
        runing = false;
    });
    var req = await data.from("care", { id, userid: encode62.packencode([page.localid, clientInfo.name, ''].join(',')) })
    do {
        var msg = await req;
        page.push(msg);
        req = data.from("care", { id, userid: encode62.packencode(page.localid) });
    } while (runing);
}
function download(url) {
    var f = document.createElement("iframe");
    f.style = "display:none;opacity:0;position:absolute;left:-1;top:-1;width:0;height:0;"
    f.src = url;
    document.documentElement.appendChild(f);
    f.contentWindow.onerror = f.contentWindow.onload = function () {
        remove(f);
    };
}

function main() {
    var page = frame$chat(clientInfo);
    link(page, '');
    care(page, "send", function ([sendto, msg]) {
        data.from("cast", { id: [page.roomid, sendto].join("/"), msg });
    });
    care(page, 'pullfile', async function (file) {
        try {
            var xhr = await cross("put", `/(${file.size})`);
            var channelId = xhr.response;
            $scoped.get(page).send('accept', { file: file.id, channel: channelId });
            download(`/(${channelId})/${file.name}`);
        } catch (e) {
            alert(e);
        }
    });
    care(page, 'pushfile', async function ([channel, file]) {
        cross("post", `/(${channel})`).send(file);
    })
    return page;
}