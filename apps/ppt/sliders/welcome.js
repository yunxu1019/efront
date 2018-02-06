var page = createVboxWithState(state);
text(page, "欢迎");
var btns = data.map(function (data) {
    var btn = button(data.date);
    addClass(btn, "button");
    return btn;
});
var title = data[0].date + "，我第一天来到公司上班";
function main() {
    document.title = title;
    return page;
}