var page = div();
// css("html", `position:absolute;height:100%;width:100%;background: url(images/background.jpg) no-repeat 50%;background-size:cover;`);
onappend(page, function () {
    zimoli.switch("", document.body, "/chat/home");
    zimoli();
});
data.loadConfig('api.yml');
data.bindInstance({
    clientInfo(info) {
        extend(clientInfo, info);
    }
})
if (!clientInfo.id) {
    data.patchInstance("clientInfo", { id: clientInfo.type + Math.random().toString().slice(-6) });
}

if (!clientInfo.name) {
    data.patchInstance("clientInfo", { name: clientInfo.type })
}
page.innerHTML = `<span style="color:#c00" >注意当前窗口不会以任何形式保存会话记录，需保存的重要信息请自己想办法保存</span>`;
function main() {
    return page;
}