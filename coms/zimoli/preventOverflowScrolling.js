if ("webkitOverflowScrolling" in document.documentElement.style) {
    var preventOverflowScrolling = function (target) {
        ontouchmove(target, event => event.preventDefault());
    };
    on('touchend')(window, function (event) {
        var { activeElement } = document;
        var target = getTargetIn(activeElement, event.target);
        if (target) return;
        activeElement.blur();
    });
} else {
    var preventOverflowScrolling = function () {
    };
}