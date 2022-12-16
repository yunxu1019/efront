var page = new maps(Object.assign({
    center: [/*兰考*/114.834364, 34.82138],
    zoom: 3,
}, maps$baidu));
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
var randomid = Math.random().toString(8).replace(/4|13/g, "9", '8').slice(-9, -3);
if (!clientInfo.id) {
    data.patchInstance("clientInfo", { id: clientInfo.type + randomid });
}

if (!clientInfo.name) {
    data.patchInstance("clientInfo", { name: clientInfo.typeName + " " + randomid })
}
function main() {
    return page;
}