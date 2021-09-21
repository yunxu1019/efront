if ("webkitOverflowScrolling" in document.documentElement.style) {
    var preventOverflowScrolling = function (target) {
        ontouchmove(target, event => event.preventDefault());
    };
} else {
    var preventOverflowScrolling = function () {
    };
}