titlebar("我的收藏", {
    添加() {
        go("add", "添加到我的收藏");
    }
});
var page = div();
page.innerHTML = main;
page.initialStyle = "margin-left:100%;z-index:1";
login();

var main = function () {
    return page;
};