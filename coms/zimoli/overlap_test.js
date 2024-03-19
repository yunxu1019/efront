var sample = div();
addClass(sample, "overlap-test");
css(".overlap-test", "position:absolute;z-index:10;");
var assert = function (a, b) {
    if (a !== b) return console.error(`${a} is not equal ${b}!`), 0;
    else return console.info(i18n`验证通过`), 1;
}
var getElement = function (left, top, width, height) {
    var element1 = createElement(sample)
    var cssText = `left:${left}px;top:${top}px;width:${width}px;height:${height}px;background:${color.random()};opacity:.6`;
    text(element1, cssText);
    css(element1, cssText);
    return element1;
}
var test = function (left1, top1, width1, height1, left2, top2, width2, height2, result) {
    console.log.apply(null, arguments);
    var element1 = getElement(left1, top1, width1, height1);
    var element2 = getElement(left2, top2, width2, height2);
    appendChild(document.body, element1, element2);
    if (assert(overlap(element1, element2), result)) {
        remove(element1, element2);
    }
}
function overlap_test() {
    console.log("overlap_test");
    test(0, 0, 100, 100, 90, 90, 100, 100, 100);
    test(0, 0, 100, 100, 99, 99, 100, 100, 1);
    test(0, 0, 100, 100, 100, 100, 100, 100, 0);
    test(0, 0, 100, 100, 10, 10, 50, 50, 2500);
}