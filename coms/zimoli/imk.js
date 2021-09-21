

function main() {
    var page = div();

    page.innerHTML = imk;
    appendChild.before(document.body, page);
    var scope = {
        closed: true,
        imk(imk) {
            on("mouseenter")(imk, function () {
                var r = (imk.offsetWidth + imk.offsetHeight) / 4;
                imk.style.transition = "none";

                var offmousemove = on("mousemove")(window, function (event) {
                    var { layerX: x, layerY: y } = event;
                    var dx = x - r;
                    var dy = y - r;
                    imk.style.borderWidth = [y, 2 * r - x, 2 * r - y, x].map(a => fromOffset(a)).join(" ");
                    imk.style.borderRadius = [-dx - dy, dx + dy, dx + dy, -dx + dy]
                        .map(a => Math.abs(r - a).toFixed(2)).map(a => fromOffset(Math.max(a, 2))).join(" ")
                });
                var offmouseleave = on('mouseleave')(imk, function (event) {
                    imk.style.transition = "";
                    imk.style.borderRadius = "";
                    offmousemove();
                    offmouseleave();
                });
            });
            var imkPositionKey = "imk-position";
            var imkPosition = JSON.parse(sessionStorage.getItem(imkPositionKey));
            extend(imk.style, imkPosition)
            on("dragend")(imk, function (event) {
                sessionStorage.setItem(imkPositionKey, JSON.stringify({
                    marginLeft: imk.style.marginLeft,
                    marginTop: imk.style.marginTop,
                    left: imk.style.left,
                    top: imk.style.top
                }));
            });
            drag.on(imk);
            return imk;
        },
        dn(imk) {

            var timing = setTimeout(() => {
                this.closed = !this.closed;
                dispatch(window, 'render');
            }, 699);
            addClass(imk, "active");
            var clean = function () {
                clearTimeout(timing);
                offmouse();
                offdrag();
                removeClass(imk, "active");
            };
            var offdrag = on("dragstart")(imk, clean);

            var offmouse = onmouseup(window, clean);
        }
    };
    page.setAttribute("ng-class", "{closed:closed}");
    render(page, scope)

    return page;
}