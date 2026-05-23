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
    if (m.sender === parentScopes[parentScopes.length - 1].cid) {
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
var userManager = function (users, map, page) {
    for (var cx = users.length - 1; cx >= 0; cx--) {
        var u = users[cx];
        if (u.id in map) {
            var m = map[u.id];
            if (m.deleted) users.splice(cx, 1);
            else Object.assign(u, m);
            if (!u.shake) delete map[u.id];
            else users.splice(cx, 1);
        }
    }
    var ms = Object.keys(map).map(k => map[k]);
    var us = ms.filter(a => !a.shake);
    for (var u of us) {
        u.msgread = 0;
    }
    users.push.apply(users, us);
    return ms.filter(a => a.shake);
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
var getRtc = function (userid, scope, offer) {
    var rtc = rtcMap[userid];
    if (!rtc) {
        rtc = rtcMap[userid] = new ChatRTC(function (date) {
            scope.send("didate", date, userid);

        });
        if (offer) rtc.takeOffer(offer).then(answer => {
            scope.send('takeup', answer, userid);
        });
    }
    return rtc;
}
var channelId = 0;
async function pullFileWithRTC(scope, file) {
    var rid = scope.remoteUser.cid;
    var rtc = getRtc(rid, scope);
    var pullid = Math.random().toString(36).slice(2, 6) + "-" + ++channelId;
    var h = await window.showSaveFilePicker({ suggestedName: file.name });
    var writable = await h.createWritable();
    /**
     * @type {RTCDataChannel}
     */
    var channel = await rtc.createChannel(pullid);
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
    channel.onclose = async function () {
        // <!-- console.log('接收端关闭') -->
        if (writed === file.size) tipbox.setText(`接收完成`, 'success');
        else tipbox.setText('接收异常', "error");
        await writable.close();
    };
    channel.onerror = function (event) {
        // <!-- console.log('接收端异常',event) -->
    };
    var offer = await rtc.initOffer();
    scope.send('accept', { file: file.id, channel: pullid, offer })
    channel.onmessage = async function (event) {
        var buff = new Uint8Array(event.data);
        writed += buff.length;
        // <!-- console.log('接收端收到', writed, file.size); -->
        await writable.write(buff);
        report();
    }

}
/**
 * @param {File} file
 */
async function pushFileWithRTC(scope, file, msg) {
    var sender = msg.sender;
    var rtc = getRtc(sender, scope, msg.offer);
    var reader = file.stream().getReader();
    /**
     * @type {RTCDataChannel}
     */
    var remote = await rtc.waitChannel(msg.channel);
    remote.binaryType = 'arraybuffer';
    var writed = 0, reported = 0;
    var readed = reader.read();
    var sizeLimit = 65536;
    remote.onmessage = async function (event) {
        if (!opened) opened = true;
        var [low, high] = new Uint32Array(event.data);
        reported = high * 0x100000000 + low;
        // <!-- console.log('发送端收到', size(writed), size(reported)); -->
        if (reported < writed) return;
        var readed1 = readed;
        readed = reader.read();
        var { done, value } = await readed1;
        if (done || writed >= file.size) {
            if (writed !== file.size) console.error('发送异常', size(file.size), size(writed), value);
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
    var opened = false;
    remote.onopen = async function () {
        // <!-- console.log("发送端打开") -->
        opened = true;
    };
    if (remote.readyState === 'open') {
        await wait(20);
        if (!opened) {
            opened = true;
            remote.send(new Uint8Array(0));
        }
    }
}
var shakeing = [];
var shakeUser = async function (page, shakes) {
    if (shakeing.length) return shakeing.push.apply(shakeing, shakes);
    shakeing.push.apply(shakeing, shakes);
    while (shakeing.length) {
        var user = shakeing.shift();
        if (page.autoAllow);
        else {
            var options = [i18n`允许`, i18n`不允许` + '#danger'];
            var res = await confirm(i18n`是否允许来自${user.name}(${user.id})的公网会话？`, options);
            if (res === options[1]) continue;
        }
        delete user.shake;
        page.push([user]);
        await wait(function () { return page.localUser }, 10000);
        page.send(page.localUser, 'user', user.cid);
    }
}


function chat(title = '会话窗口') {
    var page = view();
    page.innerHTML = template;
    drag.on(page.firstElementChild, page);
    resize.on(page);
    var users = [];
    var addToMsgList = function (list, msgs) {
        list.push.apply(list, msgs);
        if (list === ps.msglist) {
            var chat = page.querySelector("chat");
            var lastmsg = chat.getLastVisibleElement();
            if (msgs.length && (!lastmsg || lastmsg.offsetTop + lastmsg.offsetHeight === chat.scrollHeight)) {
                chat.go(list.length ? list.length - 1 : 0);
            }
            if (ps.remoteUser) ps.remoteUser.msgread = list.length;
        }
        else {
            ps.totalunread += msgs.length;
        }
    }
    var msgTemp = Object.create(null);
    page.push = function (msgs) {
        var { msglist } = ps;
        var cached = [], cachedi = 0;
        var userMap = null;
        var cidMap = null;
        var addUser = function (m) {

            if (!userMap) {
                cidMap = Object.create(null);
                users.forEach((u, i) => {
                    cidMap[u.cid] = i;
                })
                userMap = Object.create(null);
            }
            if (m.cid in cidMap) {
                var ci = cidMap[m.cid];
                var c = users[ci];
                if (c.shaking) {
                    delete userMap[m.id];
                    cidMap[m.cid] = m;
                    users[ci] = m;
                    if (ps.localUser === c) ps.localUser = m;
                    if (ps.remoteUser === c) ps.remoteUser = m;
                }
                else if (m.shaking) m = cidMap[m.cid];
            }
            if (!m.icon) {
                if (m.shaking) {
                    m.name = "正在开启..";
                    m.id = 'loading';
                    m.icon = 'chrm';
                }
                else if (m.id) m.icon = m.id.replace(/[\.\d]+$/, '');
            }
            cidMap[m.cid] = m;
            userMap[m.id] = m;
        };
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
                case 'user': addUser(m); break;
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
            if (m.type === "user") {
                addUser(m);
                return false;
            }
            return true;
        });
        if (userMap) {
            var shakes = userManager(users, userMap, send1);
            shakeUser(page, shakes);
            if (users.indexOf(ps.remoteUser) < 0) ps.remoteUser = users[0];
            if (users.length > 0 && ps.showList === 0) ps.showList = true;
            for (let u of users) {
                if (u.cid === ps.cid) ps.localUser = u;
            }
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
                if (u.cid in msgMap) {
                    if (!u.msglist) u.msglist = [];
                    addToMsgList(u.msglist, msgMap[u.cid]);
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

    Object.defineProperty(page, 'rid', {
        get() {
            var user = ps.remoteUser;
            if (user) return user.cid;
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
                ps.send('rtc-close', "", ps.remoteRtc);
                break;
            case "accept":
                ps.send('rtc-accept', data, ps.remoteRtc);
                break;
            case "didate":
                ps.send('rtc-didate', data, ps.remoteRtc);
                break;
        }
    }
    function send1(msg, sendto) {
        cast(page, 'send', [sendto, msg]);
    }
    page.autoAllow = true;
    var ps = {
        chat: zimoli$list,
        title,
        msglist: [],
        showList: 0,
        users,
        text: '',
        get autoAllow() {
            return page.autoAllow;
        },
        set autoAllow(v) {
            return page.autoAllow = v;
        },
        calling: null,
        remoteRtc: null,
        get localUser() {
            return page.localUser
        },
        set localUser(v) {
            page.localUser = v;
        },
        get shaking() {
            var u = this.remoteUser;
            if (u) return u.shaking;
        },
        get localid() {
            return page.clientid;
        },
        set localid(v) {
            page.clientid = v;
        },
        get cid() {
            return this.localid;
        },
        get rid() {
            if (this.remoteUser) return this.remoteUser.cid;
        },
        text: '',
        totalunread: 0,
        get linkurl() {
            var href = location.href.replace(/[?#][\s\S]*$/, '') + "?" + this.cid;
            return href;
        },
        async qr(canvas) {
            var qrcode = await init("thirdParty$qrcode");
            if (!this.cid) await wait(() => this.cid, 12000);
            var qr = qrcode(0, 'L');
            var href = this.linkurl;
            qr.addData(href);
            qr.make();
            var size = qr.getModuleCount();
            canvas.width = canvas.height = size;
            while (size < 128) size = size << 1;
            css(canvas, { width: size, height: size });
            qr.renderTo2dContext(canvas.getContext("2d"), 1);
        },
        cplink() {
            copyToClipboard(this.linkurl);
        },
        call(remote = this.rid, offer) {
            if (this.calling) return;
            this.remoteRtc = isObject(remote) ? remote.cid : remote;
            console.log(remote)
            if (typeof remote === 'string') {
                for (var u of this.users) {
                    if (u.cid === remote) {
                        remote = u;
                        break;
                    }
                }
            }
            if (!remote) return;
            var c = chatRtc(remote, this.cid, offer);
            this.calling = c;

            on('remove')(c, function () {
                ps.calling = null;
                ps.remoteRtc = null;
            })
            care(c, rtcMessage);
            popup(c);
        },
        fileIcon: shapes$file,
        set remoteUser(v) {
            if (!v.msglist) v.msglist = []
            if (v.msgread !== v.msglist.length) {
                v.msgread = v.msglist.length;
                this.totalunread -= v.msglist.length - v.msgread;
            }
            this.msglist = v.msglist;
            page.remoteUser = v;
        },
        get remoteUser() {
            return page.remoteUser;
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

        send(type, content, sendto = page.rid) {
            console.log(type, content, 'send', sendto, this.text)
            if (type instanceof Object) {
                var msg = type;
                if (!msg.type) msg.type = content;
            }
            else var msg = {
                type,
                sender: this.localUser.cid,
                content,
            };
            var data = JSAM.stringify(msg);
            data = encode62.packencode(data);
            if (data.length > 16000) {
                return alert("信息太长，无法发送！");
            }
            if (this.remoteUser && this.remoteUser.cid !== this.cid) a: {
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
            if (this.body) this.body.lastElementChild.focus();
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
    page.send = ps.send.bind(ps);
    return page;
}