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
var options = [
    "聊天:chatList",
    "评论:commentList",
    "赞:praiseList",
    "通知:informList",
].map(function (a) {
    var labels = a.split(":");
    return { name: labels[0], url: labels[1] }
});
var _state = extend({ ing: 0 }, state());
page.innerHTML = `
<div class='options'>
${options.map((a, i) => `<btn -class={ing:state.ing===${i}} -click=go('${a.url}',${i})>${a.name}</btn>`).join("")}
</div>
<div class=page>
</div>
`.replace(/>\s+</g, "><");
render(page, {
    options,
    state: _state,
    btn: button,
    page,
    go(path, i) {
        if (_state.ing === i) return;
        _state.ing = i;
        state(_state);
        options.ing = options[i];
        go(path, null, page);
    }
});

page.initialStyle = 'marginLeft:100%;z-index:2';
function main() {
    go(options[_state.ing].url, null, page);
    return page;
}