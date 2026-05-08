async function link(page, id = clientInfo.cid) {
    if (!id) {
        id = data.hasItem("cid") ? data.getItem('cid') : '';
        if (!id) {
            id = await data.from("link");
            data.setItem('cid', id, 0);
        }
    }
    if (!id) return alert('连接服务器失败！', 'error', false);
    page.clientid = id;
    var runing = true;
    on('remove')(page, function () {
        if (req.abort) req.abort();
        runing = false;
    });
    if (clientInfo.rid) {
        page.push([{ type: "user", name: clientInfo.rid, cid: clientInfo.rid, shaking: true }]);
        page.send({
            cid: id,
            name: clientInfo.name,
            id: clientInfo.id,
            icon: clientInfo.icon,
            shake: true,
        }, "user");
    }
    page.push([{ type: "user", id: clientInfo.id, cid: id, name: clientInfo.name }]);
    var req = data.wait("care", { id, userid: encode62.packencode([clientInfo.id, clientInfo.name, ''].join(',')) });
    do {
        try {
            var msg = await req;
            if (msg) page.push(msg);
            req = data.wait("care", { id });
        }
        catch (e) {
            req = null;
            await wait(2000);
        }
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
    care(page, "send", function ([sendto, msg]) {
        data.from("cast", { id: sendto, msg });
    });
    link(page);
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