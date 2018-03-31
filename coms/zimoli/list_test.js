var page = list(function (data, index) {
    var item = div();
    css(item, `width:100%;height:${Math.random() * 110 + 30}px;border:1px solid;`);
    text(item, data);
    return item;
}, Array(100).fill(0));
onappend(page,function () {
    page.go(0);
});
css(page, "width:200px;height:360px;");
function main() {
    return page;
}