var page = div();
titlebar("皮肤中心", ["我的"]);
page.innerHTML = `<hbox class=title-area>
<span class=active>推荐</span>
<span>卡通</span>
<span>明星</span>
<span>星座</span>
<span>个性</span>
</hbox>
<list>
    <div>
        官方推荐
    </div>
    <div>
        <div></div>
    </div>
</list>
`.replace(/>\s+</g, "><");
page.initialStyle = 'margin-left:100%';
var list = div();
render(page, {
    hbox(element) {
        var elements = [].slice.call(element.children, 0);
        var container = vbox(div(), "X");
        appendChild(container, elements);
        return container;
    },
    list() {
        return
    }
});
var titleArea = page.querySelector(".title-area");
onclick(titleArea, function (event) {
    var target = event.target;
    if (!/span/i.test(target.tagName)) return;
    [].forEach.call(titleArea.children, function (child) {
        if (child !== target) {
            removeClass(child, "active");
        } else {
            addClass(child, "active");
        }
    });

});
function main() {
    return page;
}