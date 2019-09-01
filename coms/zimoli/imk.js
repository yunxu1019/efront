var page = div();
var follow = function () {
};
on("mouseenter")(page, function () {
    var r = (page.offsetWidth + page.offsetHeight) / 4;
    page.style.transition = "none";

    var offmousemove = on("mousemove")(window, function (event) {
        var { layerX: x, layerY: y } = event;
        var dx = x - r;
        var dy = y - r;
        page.style.borderRadius = [-dx - dy, dx + dy, dx + dy, -dx + dy]
            .map(a => Math.abs(r - a).toFixed(2)).map(a => Math.max(a, 2) + "px").join(" ")
    });
    var offmouseleave = on('mouseleave')(page, function (event) {
        page.style.transition = "";
        page.style.borderRadius = "";
        offmousemove();
        offmouseleave();
    });
});

function main() {
    page.innerHTML = imk;
    document.body.appendChild(page);
    drag.on(page);

    return page;
}