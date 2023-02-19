function clickfile(event) {
    var target = getTargetIn(this, event.target, false);
    var children = this.children;
    for (var cx = 0, dx = children.length; cx < dx; cx++) {
        var c = children[cx];
        if (c === target) {
            break;
        }
    }
    this.$eval(`pullFile(m.content[${cx}])`);
}

function msg(elem, { m }, parentScopes) {
    if (m.sender === parentScopes[parentScopes.length - 1].localid) {
        elem.setAttribute("self", "");
    }
    if (m) switch (m.type) {
        case "html":
            elem.innerHTML = /<(script|iframe)(\s|>)|(src|href)=(['"`]|)javascript\:/i.test(m.content) ? `<span color="#c24">对方正试图窃取您的信息</span>` : m.content;
            break;
        case "file":
            var files = m.content;
            elem.setAttribute("files", '');
            elem.innerHTML = files.map(f => `<a class=file>${f.icon ? `<img src="${f.icon.replace(/\"/g, '')}"/>` : shapes$file}<span>${f.name.replace(/[><]/g, a => `&#${a.codePointAt(0)};`)}</span></a>`).join("");
            elem.files = files;
            onclick(elem, clickfile);
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
    for (var u of ms) u.msgread = 0;
    users.push.apply(users, ms);
};
var saved_event, moving = null;
var dragpage = {
    start(event) {
        moving = null;
        saved_event = null;
        if (getTargetIn(a => /^(msg)$/i.test(a.tagName), event.target)) return;
        if (!this.$scope.users.length) return;
        saved_event = event;
    },
    move(event) {
        if (!saved_event) return;
        if (event.moveLocked) return;
        var target = this;
        if (target.hasAttribute('resizing') || target.hasAttribute("dragging")) {
            saved_event = null;
            return;
        }
        var deltaX = saved_event.clientX - event.clientX;
        var deltaY = saved_event.clientY - event.clientY;
        event.preventDefault();
        if (!moving) {
            if (!onclick.preventClick) return;
            if (Math.abs(deltaY) * 1.5 >= Math.abs(deltaX)) {
                saved_event = null;
                return;
            }
            moving = {
                restX: parseFloat(getComputedStyle(target).paddingLeft) - saved_event.clientX,
            }
            target.style.transition = 'none';
        }
        event.moveLocked = true;
        moving.deltaX = deltaX;
        var left = event.clientX + moving.restX;
        if (left < 0) left = 0;
        var menuWidth = target.children[1].offsetWidth;
        if (left > menuWidth) left = menuWidth;
        target.style.paddingLeft = fromOffset(left);
    },
    end() {
        if (!moving) return;
        var target = this;
        target.style.transition = "";
        var left = freeOffset(target.style.paddingLeft);
        var menuWidth = target.children[1].offsetWidth;
        target.style.paddingLeft = '';
        if (moving.deltaX < 0 && left > menuWidth * .1 || moving.deltaX > 0 && left > menuWidth * .9 || !moving.deltaX && left > menuWidth >> 1) {
            target.$scope.showList = true;
            addClass(target, "showList")
        }
        else {
            target.$scope.showList = false;
            removeClass(target, "showList")
        }
        render.refresh();
    }
}
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
        }).map(m => JSAM.parse(encode62.timedecode(m))).filter(m => {
            if (m.type === 'accept') {
                page.$scope.pushFile(m.content);
                return false;
            }
            return true;
        });
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
    var fid = 0;
    var filesMap = Object.create(null);
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
        fileIcon: shapes$file,
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
        async pullFile(f) {
            cast(page, 'pullfile', f);
        },
        async pushFile(msg) {
            cast(page, 'pushfile', [msg.channel, filesMap[msg.file]]);
        },
        async chooseFile() {
            /**
             * @type {[:File]}
             */
            var files = await chooseFile('*.*', true);
            this.sendFiles(files);
        },
        async sendFiles(files) {
            var flist = [];
            var URL = window.URL;
            for (var f of files) {
                if (URL && f.size < 100 * 1000 * 1000 && /\.(png|jpeg|jpg|jpe|gif|bmp)$/.test(f.name)) {
                    var canvas = document.createElement('canvas');
                    var size = 32;
                    canvas.width = size;
                    canvas.height = size;
                    var context = canvas.getContext("2d");
                    var img = new Image;
                    var u = URL.createObjectURL(f);
                    img.src = u;
                    await awaitable(img);
                    context.drawImage(img, 0, 0, size, size);
                    f.icon = canvas.toDataURL();
                    URL.revokeObjectURL(u);
                }
                flist.push({ name: f.name, icon: f.icon, size: f.size, id: ++fid, mtime: +f.lastModified });
                filesMap[fid] = f;
            }
            return this.send('file', flist);
        },
        resize(body) {
            var textarea = body.querySelector("[textarea]");
            var lastElementChild = textarea.lastElementChild;
            var targetHeight = Math.min(textarea.scrollHeight, body.clientHeight * .6, lastElementChild.offsetTop + lastElementChild.offsetHeight);
            if (Math.abs(targetHeight - textarea.clientHeight - textarea.clientTop) < 2) return;
            body.resizeCell(textarea, 'top', textarea.clientHeight - targetHeight - 2);
        },

        send(type, content) {
            if (!content) return;
            var msg = {
                type,
                sender: this.localid,
                content,
            };
            var data = JSAM.stringify(msg);
            if (data.length > 2000) {
                return alert("信息太长，无法发送！");
            }
            if (this.user && this.user.id !== this.localid && type !== "accept") {
                addToMsgList(this.msglist, [msg]);
            }
            data = encode62.timeencode(data);
            cast(page, "send", data);
            this.body.lastElementChild.focus();
            this.text = '';
        }
    });
    var headHeight = 0;
    resizingList.set(page, function () {
        var height = page.firstElementChild.offsetHeight;
        if (height !== headHeight) {
            headHeight = height;
            css(page.firstElementChild, { marginBottom: fromOffset(-headHeight) });
            css(page.$scope.body.firstElementChild, { paddingTop: fromOffset(headHeight) });
        }
    });
    moveupon(page, dragpage);
    return page;
}