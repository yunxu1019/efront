var page = div();
css("html", `position:absolute;height:100%;width:100%;background: url(images/background.jpg) no-repeat 50%;background-size:cover;`);
$http.injector = function (url, data) {
    url = url.replace(/(?:\?(.*?))?$/, `?$1&lang=zh_CN&pass_ticket=${encodeURIComponent(accountFactory.getPassticket())}`);
    return {
        url,
        data
    }
};
onappend(page, function () {
    zimoli.switch("wechat", document.body, "/login/login");
    zimoli();
});
function main() {
    return page;
}