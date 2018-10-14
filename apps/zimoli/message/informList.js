var _chat = div();
_chat.innerHTML = `
<list></list>
`;
var _state = extend({
    messages: [
        {
            avatar: "",
            from: "消费提示",
            disp: "你于2018-10-14 18:05:52成功充值3元，当前酷币账户余额为3元。",
            time: new Date("2018-10-14 18:05"),
        },
        {
            avatar: "",
            time: new Date("2018-10-9 23:57"),
            disp: "超喜欢你的，可以跟你在一起吗？",
            from: "短视频"
        },
        {
            avatar: "",
            time: new Date("2018-10-5 18:37"),
            disp: "升级㕷，你的等级已达Lv6，快去看看吧！",
            from: "升级提醒"
        },
        {
            avatar: "",
            time: new Date("2018-8-13 20:56"),
            disp: "恭喜主人首个个人作品诞生！想让作品出现在“附近在唱”里吗？秘籍在此：设置你的个性头像和昵称，并且作品时长60秒以上，赶紧上传更多作品，让全世界听到你的声音吧~",
            from: "K歌助手"
        },
        {
            avatar: "",
            time: new Date("2018-4-20 20:00"),
            disp: "红到爆！孙语赛携《不仅仅是喜欢》酷狗首秀",
            from: "系统通知"
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