var page = div();
var _titlebar = titlebar("消息中心", [button("…")]);
var _list = div();
_list.innerHTML = `<btn>一键已读</btn><btn>消息设置</btn>`;
render(_list, {
    btn(node) {
        var btn = button(node, "white");
        css(btn, {
            padding: "0 20px",
            display: "block",
            width: "auto",
        });
        return btn;
    }
});
select(_titlebar.querySelector(".button.menu"), _list);
page.innerHTML = `
<div></div>
`;
page.initialStyle = 'marginLeft:100%;z-index:2';
function main() {
    return page;
}