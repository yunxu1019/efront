/**
 * 左侧为菜单
 * 菜单在小屏上收起，可以点击按钮打开
 */
function main(mainPath, historyName = "glance") {
    var layer = div();
    layer.innerHTML = glance;
    if (mainPath instanceof Object) {
        var { left: leftPath, top: topPath, main: mainPath } = mainPath;
    }
    once("append")(layer, function () {
        leftPath && zimoli.go(leftPath, null, layer.children[0]);
        topPath && zimoli.go(topPath, null, layer.children[1]);
        zimoli.switch(historyName, layer.children[2], mainPath);
        zimoli();
    });
    return layer;
}