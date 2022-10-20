
function msg(elem, { m: data }, parentScopes) {
    if (!data) return;
    data = encode62.timedecode(data);
    var m = JSAM.parse(data);
    if (m.sender === parentScopes[parentScopes.length - 1].localid) {
        elem.setAttribute("self", "");
    }
    if (m) switch (m.type) {
        case "html":
            elem.innerHTML = m.content;
            break;
        default:
            elem.innerText = data;
    }
}
var userManager = function (users, m) {
    for (var cx = 0, dx = users.length; cx < dx; cx++) {
        var u = users[cx];
        if (u.id === m.id) {
            if (m.deleted) users.splice(cx, 1);
            else Object.assign(u, m);
            return;
        }
    }
    if (!m.deleted) users.push(m);
};
function chat(title = '会话窗口') {
    var page = view();
    page.innerHTML = template;
    drag.on(page.firstElementChild, page);
    resize.on(page);
    var localid = Date.now() + Math.sin(Math.random());
    var users = [];
    page.push = function (msgs) {
        var { msglist } = this.$scope;
        msgs = msgs.filter(m => {
            if (!m) return false;
            if (isString(m)) return true;
            switch (m.type) {
                case 'user':
                    userManager(users, m);
                    break;
            }
            return false;
        });
        msglist.push.apply(msglist, msgs);
        var chat = page.querySelector("chat");
        var lastmsg = chat.getLastVisibleElement();
        if (msgs.length && (!lastmsg || lastmsg.offsetTop + lastmsg.offsetHeight === chat.scrollHeight)) {
            chat.go(msglist.length ? msglist.length - 1 : 0);
        }
    };
    page.renders = [function () {
        this.$scope.resize(this.$scope.body);
    }];
    renderWithDefaults(page, {
        chat: list,
        title,
        msglist: [],
        users,
        text: '',
        localid,
        msg,
        remove() {
            remove(page);
        },
        resize(body) {
            var textarea = body.querySelector("[textarea]");
            var lastElementChild = textarea.lastElementChild;
            var targetHeight = Math.min(textarea.scrollHeight, body.clientHeight * .6, lastElementChild.offsetTop + lastElementChild.offsetHeight);
            if (Math.abs(targetHeight - textarea.clientHeight - textarea.clientTop) < 2) return;
            body.resizeCell(textarea, 'top', textarea.clientHeight - targetHeight - 2);
        },
        send() {
            if (!this.text) return;
            var data = JSAM.stringify({
                type: 'html',
                sender: this.localid,
                content: this.text,
            });

            data = encode62.timeencode(data);
            if (this.text.length > 2000) {
                return alert("信息太长，无法发送！");
            }
            cast(page, "send", data);
            this.body.lastElementChild.focus();
            this.text = '';
        }
    });
    return page;
}