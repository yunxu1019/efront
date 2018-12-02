var iosOverflowScrolling = document.createElement("div");
css(iosOverflowScrolling, "-webkit-overflow-scrolling:auto");
iosOverflowScrolling = iosOverflowScrolling.style.webkitOverflowScrolling;
if (iosOverflowScrolling) {
    var preventOverflowScrolling = function (target) {
        ontouchmove(target, event => event.preventDefault());
    };
} else {
    var preventOverflowScrolling = function () {
    };
}