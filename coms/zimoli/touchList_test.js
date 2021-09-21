var listY = list(function (data, index) {
    var item = div();
    css(item, `width:100%;height:${Math.random() * 110 + 30}px;border:1px solid;`);
    text(item, data);
    return item;
}, "Y");
onappend(listY, function () {
    listY.go(0);
});
touchList(listY);
function touchList_test() {
    return listY;
}