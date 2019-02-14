var page = createVboxWithState(state);
page.innerHTML = listen;

var _images = [];
var _slider = slider(_images);
cross("get", "http://m.kugou.com/").done(function (xhr) {
    var bodyHTML = String(xhr.responseText || xhr.responseText || "").replace(RegBodyExp, "$1").replace(RegScriptExp, "").replace(/\son/ig, " no").replace(/\s(src|href)/g, " s$1");
    var sandbox = createElement(div);
    sandbox.innerHTML = bodyHTML;
    var images = [].map.call(sandbox.querySelector(".mod-slider").children[0].children, function (child) {
        var a = child.children[0];
        var src = a.children[0].getAttribute("ssrc");
        var href = a.getAttribute("shref");
        var image = createElement(div);
        css(image, `background:url('${src}') center no-repeat;background-size:contain;`)
        return image;
    });
    _images.splice(0, _images.length);
    _images.push.apply(_images, images);
    _slider.go(0).play();
});


render(page, {
    go,
    user,
    slider() {
        return _slider;
    },
    btn(a) {
        return button(a, "white");
    }
});

function main() {
    return page;
}