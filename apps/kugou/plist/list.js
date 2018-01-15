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
cross("get", "http://m.kugou.com/plist/index").done(function (xhr) {
    var bodyHTML = String(xhr.responseText || xhr.responseText || "").replace(RegBodyExp, "$1").replace(RegScriptExp, "").replace(/\son/ig, " no").replace(/\s(src|href)/g, " s$1");
    console.log(bodyHTML);
    var sandbox = createElement(div);
    sandbox.innerHTML = bodyHTML;
    var items = [].map.call(sandbox.getElementsByClassName("panel-img-list")[0].children, function (child) {
        var anchor = child.children[0];
        var href = anchor.getAttribute("shref");
        var img_src = anchor.getElementsByTagName("img")[0].getAttribute("_src");
        var text = anchor.getElementsByTagName("p")[0].innerText.replace(/^\s*|\s*$/g, "");
        return createItem(
            img_src,
            text
        );
    });
    appendChild(page, items);
});
text(page);
function main() {
    return page;
}