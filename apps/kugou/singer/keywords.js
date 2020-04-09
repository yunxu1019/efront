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
cross("get", "http://m.kugou.com/singer/class").done(function (xhr) {
    var bodyHTML = String(xhr.responseText || xhr.responseText || "").replace(RegBodyExp, "$1").replace(RegScriptExp, "").replace(/\son/ig, " no").replace(/\s(src|href)/g, " s$1");
    var sandbox = createElement(div);
    sandbox.innerHTML = bodyHTML;
    var groups = [].map.call(sandbox.querySelector(".bd").children, function (child) {
        var anchors = child.getElementsByTagName("a");
        var items = [].map.call(anchors, function (anchor) {
            var href = anchor.getAttribute("shref");
            var innerText = anchor.innerText.replace(/^\s*|\s*$/g, "");
            var item = createElement(div);
            text(item, innerText);
            onclick(item, function () {
                go("list", {
                    href,
                    id: href.replace(/^[\s\S]*?(\d+)$/, '$1'),
                    title: innerText
                });
            });
            return item;
        });
        var group = createWithClass(div, "group");
        appendChild(group, items);
        return group;
    });
    appendChild(page, groups);
});
text(page);
function main() {
    return page;
}