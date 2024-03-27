/**
 * 在大屏上，两块布局同时显示，在小屏上，左边首先显示，右边第二步显示
 * @param {Element} leftLayer 
 * @param {Element} centerLayer 
 */
var leftPage;
var layer = div();
preventOverflowScrolling(layer);
var leftLayer = div(), centerLayer = div();
leftLayer.setAttribute("layer", "left");
centerLayer.setAttribute("layer", "main");
appendChild(layer, leftLayer, centerLayer);
onappend(centerLayer, function () {
    zimoli.switch("layer-left-center", layer);
    zimoli();
    var cancel_resize = on("resize")(window, reshape);
    once("remove")(centerLayer, cancel_resize);
});
function reshape() {
    var page = getCurrentPage() || leftPage;
    if (page === leftPage) {
        if (page.parentNode === page) return;
        appendChild(leftLayer, page, false);
    } else {
        setCurrentPage(page);
    }
};

function getCurrentPage() {
    return layer.querySelector("[layer=main]>*") || layer.querySelector("[layer=left]>*");
}
function getCurrentLayer() {
    var currentLayer = centerLayer.offsetLeft > 0 ? centerLayer : leftLayer;
    return currentLayer;
}

function setCurrentPage(page) {
    var currentLayer = getCurrentLayer();
    if (page !== leftPage) {
        if (currentLayer !== leftLayer) {
            if (!leftPage.$mounted) appendChild(leftLayer, leftPage);
        } else {
            remove(leftPage, false);
        }
        if (page.parentNode !== currentLayer) appendChild(currentLayer, page, false);
    } else if (!leftPage.$mounted) {
        appendChild(leftLayer, leftPage, false);
    }
}
function main(_leftPage) {
    leftPage = _leftPage;
    return layer;
}
layer.layer = function (child, old) {
    remove(old);
    if (child === leftPage) {
        if (!leftPage.$mounted) appendChild(leftLayer, child);
    } else if (child) {
        var currentLayer = getCurrentLayer();
        appendChild(currentLayer, child);
        if (currentLayer === leftLayer) {
            if (arguments.length > 1) remove(leftPage);
        } else if (!leftPage.$mounted) {
            appendChild(leftLayer, leftPage);
        }
    } else {
        if (!leftPage.$mounted) appendChild(leftLayer, leftPage);
    }
};