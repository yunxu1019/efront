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
    var [leftLayer, topLayer, mainLayer] = layer.children;
    once("append")(layer, function () {
        zimoli.switch(historyName, layer, mainPath);
        zimoli();
        if (leftPath) {
            zimoli.prepare(leftPath, function () {
                var page = zimoli.go(leftPath, null, leftLayer);
                page.setAttribute('layer', 'left');
                appendChild.replace(leftLayer, page);
                leftLayer = page;
            });
        }
        if (topPath) {
            zimoli.prepare(topPath, function (page) {
                var page = zimoli.go(topPath, null, topLayer);
                page.setAttribute('layer', 'top');
                appendChild.replace(topLayer, page);
                topLayer = page;
            });
        }
    });
    var closed = false;
    var bindClass = function () {
        if (closed) {
            addClass(layer, 'close');
            removeClass(layer, 'open');
        } else {
            addClass(layer, 'open');
            removeClass(layer, 'close');
        }
    }
    layer.closeLeft = function () {
        closed = true;
        bindClass();
    };
    layer.openLeft = function () {
        closed = false;
        bindClass();
    };
    layer.switchLeft = function () {
        closed = !closed;
        bindClass();
    };
    return layer;
}