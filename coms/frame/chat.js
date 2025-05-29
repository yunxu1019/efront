function clickfile(event) {
    var target = getTargetIn(this, event.target, false);
    var children = this.children;
    for (var cx = 0, dx = children.length; cx < dx; cx++) {
        var c = children[cx];
        if (c === target) {
            break;
        }
    }
    $eval.call(this, `pullFile(m.content[${cx}])`);
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
        case "rtc-video":
            elem.setAttribute('rtc', 'video');
            elem.innerHTML = "视频通话";
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
        if (!$scoped.get(this).users.length) return;
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
            $scoped.get(target).showList = true;
            addClass(target, "showList")
        }
        else {
            $scoped.get(target).showList = false;
            removeClass(target, "showList")
        }
        render.refresh();
    }
}

var rtcMap = Object.create(null);
var getRtc = function (userid) {
    var rtc = rtcMap[userid];
    if (!rtc) rtc = rtcMap[userid] = new ChatRTC;
    return rtc;
}
async function pullFileWithRTC(scope, file) {
    var userid = scope.user.id;
    var rtc = getRtc(userid);
    var h = await window.showSaveFilePicker({ suggestedName: file.name });
    var writable = await h.createWritable();
    var channel = await rtc.createChannel();
    channel.binaryType = 'arraybuffer';
    var writed = 0;
    var span = document.createElement('div');
    span.style.textAlign = 'left';
    span.innerText = '接收' + file.name;
    var msg = document.createElement('span');
    msg.style = 'font-size:10px;font-family: Consolas, "Courier New", monospace, sansif;'
    appendChild(span, msg);
    var tipbox = alert(span, false);
    var report = lazy(function () {
        // <!-- console.log("接收端发送",writed); -->
        msg.innerText = ` (${size(file.size, 2)}\\${size(writed, 2)})`;
        var a = new Uint8Array(16);
        var high = writed / 0x100000000 | 0;
        var low = writed & 0xffffffff;
        a[0] = low & 0xff;
        a[1] = low >>> 8 & 0xff;
        a[2] = low >>> 16 & 0xff;
        a[3] = low >>> 24 & 0xff;
        a[4] = high & 0xff;
        a[5] = high >>> 8 & 0xff;
        a[6] = high >>> 16 & 0xff;
        a[7] = high >>> 24 & 0xff;
        channel.send(a);
    }, -60);
    channel.onopen = async function () {
        // <!-- console.log('接收端打开') -->
        report();
    };
    channel.onclose = function () {
        // <!-- console.log('接收端关闭') -->
        if (writed === file.size) tipbox.setText(`接收完成`, 'success');
        else tipbox.setText('接收异常', "error");
    };
    channel.onerror = function (event) {
        // <!-- console.log('接收端异常',event) -->
    };
    var ondate = function (date) {
        scope.send("didate", date, userid);
    };
    var offer = await rtc.init(ondate);
    scope.send('accept', { file: file.id, channel: channel.id, offer })
    channel.onmessage = async function (event) {
        var buff = new Uint8Array(event.data);
        writed += buff.length;
        // <!-- console.log('接收端收到', writed, file.size); -->
        await writable.write(buff);
        report();
        if (writed >= file.size) {
            writable.close();
        }
    }
}
/**
 * @param {File} file
 */
async function pushFileWithRTC(scope, file, msg) {
    var sender = msg.sender;
    var rtc = getRtc(sender);
    var reader = file.stream().getReader();
    var ondate = function (date) {
        scope.send("didate", date, sender);
    }
    var answer = await rtc.init(ondate, msg.offer);
    scope.send('takeup', answer, sender);
    var remote = await rtc.waitChannel();
    remote.binaryType = 'arraybuffer';
    var writed = 0, reported = 0;
    var readed = reader.read();
    var sizeLimit = 65536;
    remote.onmessage = async function (event) {
        var [low, high] = new Uint32Array(event.data);
        reported = high * 0x100000000 + low;
        // <!-- console.log('发送端收到', size(writed), size(reported)); -->
        if (reported < writed) return;
        var readed1 = readed;
        readed = reader.read();
        var { done, value } = await readed1;
        if (done) {
            if (writed < file.size) console.error('发送未完成', size(file.size), size(writed), value);
            remote.close();
            return;
        }
        // <!-- console.log("发送",size(value.length)); -->
        writed += value.length;
        for (var cx = 0, dx = value.length; cx < dx;) {
            remote.send(value.slice(cx, cx += sizeLimit));
        }
    }
    remote.onclose = function () {
        // <!-- console.log("发送端关闭") -->
    }
    remote.onerror = function (event) {
        // <!-- console.log("发送端异常",event) -->
    }
    remote.onopen = async function () {
        // <!-- console.log("发送端打开") -->
    };
}


function chat(title = '会话窗口') {
    var page = view();
    page.innerHTML = template;
    drag.on(page.firstElementChild, page);
    resize.on(page);
    var localid = title.id || (new Date / 1000 | 0) + Math.sin(Math.random());
    var users = [];
    var addToMsgList = function (list, msgs) {
        list.push.apply(list, msgs);
        if (list === ps.msglist) {
            var chat = page.querySelector("chat");
            var lastmsg = chat.getLastVisibleElement();
            if (msgs.length && (!lastmsg || lastmsg.offsetTop + lastmsg.offsetHeight === chat.scrollHeight)) {
                chat.go(list.length ? list.length - 1 : 0);
            }
            if (ps.user) ps.user.msgread = list.length;
        }
        else {
            ps.totalunread += msgs.length;
        }
    }
    var msgTemp = Object.create(null);
    page.push = function (msgs) {
        var { msglist } = ps;
        var userMap = null;
        var cached = [], cachedi = 0;
        msgs = msgs.filter(m => {
            if (!m) return false;
            if (isString(m)) {
                if (/^\|/.test(m)) {
                    var a = /^\|(\d+)\|(\d+)\|(\d+)\|/.exec(m);
                    if (a) var [, msgid, total, index] = a;
                    total = +total, index = +index, msgid = +msgid;
                    var tmp = msgTemp[msgid];
                    if (!tmp) {
                        tmp = msgTemp[msgid] = Array(total);
                        tmp.count = 0;
                    }
                    if (!tmp[index]) {
                        tmp[index] = m.slice(a.index + a[0].length);
                        tmp.count++;
                    }
                    if (tmp.count === total) {
                        cached.push([cachedi, tmp.join('')]);
                        delete msgTemp[msgid];
                    }
                    return false;
                }
                cachedi++;
                return true;
            }
            switch (m.type) {
                case 'user':
                    if (!userMap) userMap = Object.create(null);
                    if (!m.icon) m.icon = m.id.replace(/[\.\d]+$/, '');
                    userMap[m.id] = m;
                    break;
            }
            return false;
        });
        backEach(cached, function ([i, m]) {
            msgs.splice(i, 0, m);
        });
        msgs = msgs.map(m => JSAM.parse(encode62.packdecode(m))).filter(m => {
            if (m.type === 'accept') {
                ps.pushFile(m.content);
                return false;
            }
            return true;
        });
        if (userMap) {
            userManager(users, userMap);
            if (users.indexOf(ps.user) < 0) ps.user = users[0];
            if (users.length > 0 && ps.showList === 0) ps.showList = true;
        }
        if (msgs.length) {
            var msgMap = Object.create(null);
            for (var m of msgs) {
                var { sender } = m;
                if (m.type === 'rtc-video') {
                }
                switch (m.type) {
                    case "rtc-close":
                    case "rtc-accept":
                    case "rtc-didate":
                        if (ps.calling) cast(ps.calling, [m.type, m.sender, m.content]);
                        continue;
                    case "didate":
                        var rtc = rtcMap[m.sender];
                        if (rtc) rtc.addDidate(m.content);
                        continue;
                    case "takeup":
                        var rtc = rtcMap[m.sender];
                        if (rtc) rtc.setAnswer(m.content);
                        continue;
                    case "rtc-video":
                        if (ps.calling) {
                            ps.send("rtc-close", i18n`正在通话中..`, m.sender);
                            continue;
                        }
                        ps.call(sender, m.content);
                        break;
                }
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
    page.$renders = [function () {
        ps.resize(ps.body);
    }];
    page.localid = localid;
    Object.defineProperty(page, 'userid', {
        get() {
            var user = ps.user;
            if (user) return user.id;
        }
    });
    page.setAttribute('ng-class', "{showList:showList}");
    var fid = 0;
    var filesMap = Object.create(null);
    function rtcMessage([type, data]) {
        switch (type) {
            case "offer":
                ps.send('rtc-video', data);
                break;
            case "hangup":
                ps.send('rtc-close', "", ps.remote);
                break;
            case "accept":
                ps.send('rtc-accept', data, ps.remote);
                break;
            case "didate":
                ps.send('rtc-didate', data, ps.remote);
                break;
        }
    }
    function send1(msg, sendto) {
        cast(page, 'send', [sendto, msg]);
    }
    var ps = {
        chat: zimoli$list,
        title,
        msglist: [],
        showList: 0,
        users,
        text: '',
        calling: null,
        remote: null,
        localid,
        totalunread: 0,
        _user: null,
        call(remote = this.user, offer) {
            if (this.calling) return;
            this.remote = isObject(remote) ? remote.id : remote;
            if (typeof remote === 'string') {
                for (var u of this.users) {
                    if (u.id === remote) {
                        remote = u;
                        break;
                    }
                }
            }
            if (!remote) return;
            var c = chatRtc(remote, this.localid, offer);
            this.calling = c;

            on('remove')(c, function () {
                ps.calling = null;
                ps.remote = null;
            })
            care(c, rtcMessage);
            popup(c);
        },
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
            if (!f) return;
            if (f.rtc && ChatRTC.enabled && window.showSaveFilePicker) {
                return pullFileWithRTC(this, f);
            }
            cast(page, 'pullfile', f);
        },
        async pushFile(msg) {
            if (msg.offer && ChatRTC.enabled) return pushFileWithRTC(this, filesMap[msg.file], msg);
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
                flist.push({ name: f.name, rtc: ChatRTC.enabled, icon: f.icon, size: f.size, id: ++fid, mtime: +f.lastModified });
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

        send(type, content, sendto = page.userid) {
            var msg = {
                type,
                sender: this.localid,
                content,
            };
            var data = JSAM.stringify(msg);
            data = encode62.packencode(data);
            if (data.length > 16000) {
                return alert("信息太长，无法发送！");
            }
            if (this.user && this.user.id !== this.localid) a: {
                switch (type) {
                    case "accept":
                    case "didate":
                    case "takeup":
                    case "rtc-close":
                    case "rtc-accept":
                    case "rtc-didate":
                        break a;
                }
                if (!content) return;
                addToMsgList(this.msglist, [msg]);
            }
            if (data.length > 2000) {
                var count = Math.ceil(data.length / 2000);
                var msgid = Date.now().toString().slice(-8) + "|" + count + "|";
                for (var cx = 0, ci = 0, dx = data.length; cx < dx;) {
                    var d = data.slice(cx, cx += 2000);
                    send1("|" + msgid + ci++ + "|" + d, sendto);
                }
            }
            else {
                send1(data, sendto);
            }
            this.body.lastElementChild.focus();
            this.text = '';
        }
    };
    renderWithDefaults(page, ps);
    var headHeight = 0;
    resizingList.set(page, function () {
        var height = page.firstElementChild.offsetHeight;
        if (height !== headHeight) {
            headHeight = height;
            css(page.firstElementChild, { marginBottom: fromOffset(-headHeight) });
            css(ps.body.firstElementChild, { paddingTop: fromOffset(headHeight) });
        }
    });
    moveupon(page, dragpage);
    return page;
}