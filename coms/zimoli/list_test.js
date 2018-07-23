var listX = list(function (data, index) {
    var item = div();
    css(item, `height:100%;width:${Math.random() * 110 + 30}px;border:1px solid;`);
    text(item, data);
    return item;
}, "X");
onappend(listX, function () {
    listX.go(0);
});
css(listX, "width:360px;height:160px;");
var listY = list(function (data, index) {
    var item = div();
    css(item, `width:100%;height:${Math.random() * 110 + 30}px;border:1px solid;`);
    text(item, data);
    return item;
}, "Y");
onappend(listY, function () {
    listY.go(0);
});
css(listY, "width:200px;height:360px;");

function main() {
    listX.with = listY;
    return listX;
}