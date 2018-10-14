var _chat = div();
_chat.innerHTML = `
<list></list>
`;
var _state = extend({
    messages: [
        {
            avatar: "",
            from: "酷小狗",
            disp: "你已经成功购买1首付费歌曲，立即试听！",
            time: new Date("2018-10-14 19:19"),
        },
        {
            avatar: "",
            time: new Date("2018-10-11 23:57"),
            disp: "DADA(妲妲)的新专辑【漫天落叶】上线了，快来抢先听！",
            from: "新专上线"
        },
        {
            avatar: "",
            time: new Date("2017-4-14 22:42"),
            disp: "快来看看哪些通讯录好友也在使用酷狗。",
            from: "好友推荐"
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
    </div>`.replace(/>\s+</g, "><");
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