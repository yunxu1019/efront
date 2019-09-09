var page = createVboxWithState(state);
var createItem = function (img_src, str) {
    var item = createWithClass(div, "item");
    var image = createWithClass(div, "img");
    var label = createWithClass(div, "text");
    css(image, {
        backgroundImage: `url('${img_src}')`
    });
    text(label, str);
    appendChild(item, image, label);
    return item;
};
data.asyncInstance("plist-index").loading_promise.then(function (data) {
    var items = data.map(d => {
        var item = createItem(
            d.src,
            d.name
        );
        onclick(item, function () {
            go("detail", {
                _text: d.name,
                href: d.href
            });
        });
        return item;
    });
    appendChild(page, items);
});
function main() {
    return page;
}