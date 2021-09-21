var _chat = div();
_chat.innerHTML = `
<list></list>
`;
var _state = extend({
    messages: [
        {
            avatar: "",
            from: "酷小狗",
            disp: "嘿嘿，是我想提醒你，你关注的妲己发了评论，去回复一下呗",
            link: "妲已音乐名已改为：DADA妲妲，新歌狐",
            time: new Date("2018-7-12 11:32"),
        },
        {
            avatar: "",
            time: new Date("2018-5-30 15:03"),
            link: "谢谢赶来听歌的你，把这首歌打包带走",
            disp: "嘿嘿，是我想提醒你，你关注的妲己发了评论，去回复一下呗",
            from: "酷小狗"
        },
    ]
}, state());
var createItem = function (data) {
    var body = createWithClass(div, "item");
    body.innerHTML = `
    <div class=avatar><div></div></div>
    <div class=body>
        <div class=from>${data.from}</div>
        <div class=disp>${data.disp}</div>
        <div class=time>${filterTime(data.time)}</div>
    </div>
    <div class=link>${data.link}</div>
    `.replace(/>\s+</g, "><");
    var item = button(body);
    return item;
};
render(_chat, {
    go,
    list() {
        var _list = list(function (index) {
            if (index >= _state.messages.length) {
                return;
            };
            var data = _state.messages[index];
            var item = createItem(data);
            return item;
        });
        touchList(_list);
        onappend(_list, e => _list.go(0));
        return _list;
    }
})
function main() {
    return _chat;
}