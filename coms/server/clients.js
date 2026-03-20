var getIndexFromOrderedArray = require("../basic/getIndexFromOrderedArray");
var saveToOrderedArray = require("../basic/saveToOrderedArray");
var clients = [], indexedKeepingClients = [];
var increaseId = 0x1fffffff + (0x1fffffff * Math.random() | 0);
var mark = Math.cos(Math.random()) * new Date();
var markList = [mark];
var sign = function (a, mark) {
    return Math.sin(a * mark).toString(26).slice(4).replace(/\d/g, a => String.fromCharCode("z".charCodeAt(0) - a.charCodeAt(0) + "0".charCodeAt(0)));
};
var byOptime = (a, b) => a.optime <= b.optime;

var createId = function (type = 0) {
    var id = ++increaseId * 4 + type;
    return sign(id, mark) + id;
};

var getType = function (id) {
    return +id.replace(/^[a-z]+/i, '') & 0b11;
};

var checkId = function (id) {
    var s = id.replace(/^[a-z]+/i, '');
    var t = id.slice(0, id.length - s.length);
    for (var cx = 0, dx = markList.length; cx < dx; cx++) {
        if (sign(s, markList[cx]) === t) return true;
    }
    return false;
};
class User {
    /**
     * @property {Http2ServerResponse} res
     */
    type = 'user';
    constructor(userstr) {
        var [id, name, cid] = userstr.split(',');
        this.id = id;
        if (!isEmpty(name)) this.name = name;
        if (cid) this.cid = cid;
    }
    toString() {
        return [this.id, this.name, this.cid].join(',')
    }
}
var resMap = new WeakMap;
var msgMap = new WeakMap;
class Client {
    id = '';
    optime = +new Date;
    hub = false;
    users = Object.create(null);
    constructor(arg) {
        if (typeof arg === 'string') {
            // id
            this.id = arg;
        }
        else if (typeof arg === 'number') {
            // id
            this.id = createId(arg);
        }
        else if (arg instanceof Object) {
            extend(this, arg);
        }
        msgMap.set(this, []);
    }
    removeIndex() {
        var index = getIndexFromOrderedArray(indexedKeepingClients, this, byOptime);
        if (indexedKeepingClients[index] === this) {
            indexedKeepingClients.splice(index, 1);
        }
    }

    pullMessages() {
        var c = this;
        if (!c) return;
        var meglist = msgMap.get(c);
        msgMap.set(c, []);
        return meglist;
    }
    getUser(uid) {
        return this.users[uid];
    }
    putUser(u) {
        var users = this.users;
        users[u.id] = u;
        var c = clients.get(u.cid);
        var u1s = [];
        for (var uid in users) {
            var u1 = users[uid];
            if (u1.id !== u.id) {
                var c1 = clients.get(u1.cid);
                if (c1) c1.deliver(u);
                if (c) u1s.push(u1);
            }
        }
        if (c) c.deliver(u1s);

    }
    removeUser(uid) {
        var user = this.users[uid];
        if (!user) return;
        delete this.users[uid];
        for (var k in this.users) {
            var u = this.users[k];
            var c = clients.get(u.cid);
            if (c) c.deliver({ type: 'user', cid: user.cid, id: uid, deleted: true });
        }
    }
    refresh() {
        this.optime = +new Date;
    }
    keep(time = 24 * 3600 * 1000 * 7) {
        this.removeIndex();
        this.optime += time;
        saveToOrderedArray(indexedKeepingClients, this, byOptime);
    }
    deliver(msgid) {
        var c = this;
        var cmsg = msgMap.get(c);
        if (msgid instanceof Array) {
            cmsg.push.apply(cmsg, msgid);
        }
        else if (msgid) {
            cmsg.push(msgid);
        }
        if (resMap.has(c)) {
            var res = resMap.get(c);
            resMap.delete(c);
            var msg = JSON.stringify(cmsg);
            res.forEach(a => a.end(msg));
            cmsg.splice(0, cmsg.length);
            this.refresh();
            this.removeIndex();
            return true;
        }
    }
    listen(res, ustr) {
        var c = this;
        if (ustr) {
            var u = new User(ustr);
            u.cid = this.id;
            this.user = u;
        }
        if (!resMap.has(c)) {
            resMap.set(c, []);
        }
        var cres = resMap.get(c);
        if (cres.length > 2000) {
            res.writeHead(503);
            res.end("负载过重");
            return;
        }
        cres.push(res);
        return u;
    }
    valueOf() {
        return this.id;
    }
}

var removedindex = 0;
var autoremove = function (time) {
    var delta = 2000, limit = 60 * 1000;
    for (var cx = removedindex - 1, dx = removedindex - 1000; cx >= dx; cx--) {
        if (cx < 0) {
            break;
        }
        var client = clients[cx];
        if (!client) continue;
        if (client.optime + delta < time) {
            if (resMap.has(client)) {
                var res = resMap.get(client);
                if (res.length) {
                    if (client.optime + limit < time) {
                        clients.splice(cx, 1)[0].removeIndex();
                        client.deliver();
                    }
                    continue;
                }
            }
            if (!client.nid) {
                var hasUser = false;
                var users = client.users;
                for (var _ in users) {
                    hasUser = true;
                    break;
                }
                if (hasUser) {
                    client.refresh();
                    continue;
                }
            }
            clients.splice(cx, 1)[0].removeIndex();
            var cuser = client.user;
            if (cuser) {
                clients.removeUser(client.nid, cuser.id);
            }
        }
        else {
            var messages = msgMap.get(client);
            if (messages?.length > 300) messages.splice(0, messages.length - 200);
        }
    }
    removedindex = dx;
    if (removedindex <= 0) {
        removedindex = clients.length;
    }
    if (indexedKeepingClients.length >= 3000) {
        for (var cx = indexedKeepingClients.length; cx >= 2000; cx--) {
            var client = indexedKeepingClients[cx];
            var clientindex = getIndexFromOrderedArray(clients, client);
            if (clients[clientindex] === client) {
                clients.splice(clientindex, 1);
            }
        }
        indexedKeepingClients.splice(2000, indexedKeepingClients.length);
        if (removedindex >= clients.length) removedindex = clients.length - 1;
    }
};


var methods = {
    /**
     * @returns {Client}
     */
    get(clientid) {
        var index = getIndexFromOrderedArray(clients, clientid);
        if (clients[index] && clients[index].id === clientid) {
            return clients[index];
        }
        return null;
    },
    has(clientid) {
        var index = getIndexFromOrderedArray(clients, clientid);
        return clients[index.id].id === clientid;
    },
    create(config) {
        var client = new Client(config);
        return client;
    },
    attach(clientid, nid) {
        var client = this.get(clientid);
        if (client) {
            if (nid === client.nid) return client;
            return;
        }
        if (nid !== false && !checkId(clientid)) return;
        client = this.create(clientid);
        client.nid = nid;
        saveToOrderedArray(clients, client);
        return client;
    },
    detach(clientid) {
        var index = getIndexFromOrderedArray(clients, clientid);
        if (clients[index].id === clientid) {
            clients.splice(index, 1)[0].removeIndex();
        }
    },
    addMark(a) {
        a = +a;
        if (a && !~markList.indexOf(a)) {
            markList.push(+a);
        }
    },
    checkId,
    getType,
    putUser(clientid, usr) {
        var u = new User(usr);
        var client = this.attach(clientid, false);
        var u0 = client.getUser(u.id);
        if (u0) {
            if (u.cid === u0.cid) {
                Object.assign(u0, u)
                return;
            }
        }
        client.putUser(u);
    },
    getMark() {
        return markList;
    }
};
Object.assign(clients, methods);
require("./recover").objects.push({
    recover: autoremove,
    destroy() {
        clients.splice(0, clients.length).forEach(u => u.deliver());
    },
});
module.exports = clients;