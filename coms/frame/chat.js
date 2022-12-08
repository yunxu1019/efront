
function msg(elem, { m }, parentScopes) {
    if (m.sender === parentScopes[parentScopes.length - 1].localid) {
        elem.setAttribute("self", "");
    }
    if (m) switch (m.type) {
        case "html":
            elem.innerHTML = m.content;
            break;
        default:
            elem.innerText = m.content;
    }
}
var userManager = function (users, map) {
    for (var cx = 0, dx = users.length; cx < dx; cx++) {
        var u = users[cx];
        if (u.id in map) {
            var m = map[u.id];
            if (m.deleted) users.splice(cx, 1);
            else Object.assign(u, m);
            delete map[u.id];
            return;
        }
    }
    var ms = Object.keys(map).map(k => map[k]);
    users.push.apply(users, ms);
};

function chat(title = '会话窗口') {
    var page = view();
    page.innerHTML = template;
    drag.on(page.firstElementChild, page);
    resize.on(page);
    var localid = title.id || (Date.now() / 1000 | 0) + Math.sin(Math.random());
    var users = [];
    var addToMsgList = function (list, msgs) {
        list.push.apply(list, msgs);
        if (list === page.$scope.msglist) {
            var chat = page.querySelector("chat");
            var lastmsg = chat.getLastVisibleElement();
            if (msgs.length && (!lastmsg || lastmsg.offsetTop + lastmsg.offsetHeight === chat.scrollHeight)) {
                chat.go(list.length ? list.length - 1 : 0);
            }
            if (page.$scope.user) page.$scope.user.msgread = list.length;
        }
        else {
            page.$scope.totalunread += msgs.length;
        }
    }
    page.push = function (msgs) {
        var { msglist } = this.$scope;
        var userMap = null;
        msgs = msgs.filter(m => {
            if (!m) return false;
            if (isString(m)) return true;
            switch (m.type) {
                case 'user':
                    if (!userMap) userMap = Object.create(null);
                    if (!m.icon) m.icon = m.id.replace(/[\.\d]+$/, '');
                    userMap[m.id] = m;
                    break;
            }
            return false;
        }).map(m => JSAM.parse(encode62.timedecode(m)));
        if (userMap) {
            userManager(users, userMap);
            if (users.indexOf(page.$scope.user) < 0) page.$scope.user = users[0];
            if (users.length > 0 && page.$scope.showList === 0) page.$scope.showList = true;
        }
        if (msgs.length) {
            var msgMap = Object.create(null);
            for (var m of msgs) {
                var { sender } = m;
                if (sender) {
                    if (!msgMap[sender]) msgMap[sender] = [];
                    msgMap[sender].push(m);
                }
            }
            if (users.length) for (var u of users) {
                if (u.id in msgMap) {
                    if (!u.msglist) u.msglist = [];
                    addToMsgList(u.msglist, msgMap[u.id]);
                }
            }
            else {
                addToMsgList(msglist, msgs);
            }
        }
    };
    page.renders = [function () {
        this.$scope.resize(this.$scope.body);
    }];
    page.localid = localid;
    Object.defineProperty(page, 'userid', {
        get() {
            var user = this.$scope.user;
            if (user) return user.id;
        }
    });
    page.setAttribute('ng-class', "{showList:showList}");
    renderWithDefaults(page, {
        chat: list,
        title,
        msglist: [],
        showList: 0,
        users,
        text: '',
        localid,
        totalunread: 0,
        _user: null,
        set user(v) {
            if (!v.msglist) v.msglist = []
            if (v.msgread !== v.msglist.length) {
                v.msgread = v.msglist.length;
                this.totalunread -= v.msglist.length - v.msgread;
            }
            this.msglist = v.msglist;
            this._user = v;
        },
        get user() {
            return this._user;
        },
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
            var msg = {
                type: 'html',
                sender: this.localid,
                content: this.text,
            };
            var data = JSAM.stringify(msg);
            if (data.length > 2000) {
                return alert("信息太长，无法发送！");
            }
            if (this.user && this.user.id !== this.localid) {
                addToMsgList(this.msglist, [msg]);
            }
            data = encode62.timeencode(data);
            cast(page, "send", data);
            this.body.lastElementChild.focus();
            this.text = '';
        }
    });
    return page;
}