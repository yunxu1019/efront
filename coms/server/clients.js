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
        var [id, name] = userstr.split(',');
        this.id = id;
        if (!isEmpty(name)) this.name = name;
    }
}
var resMap = new WeakMap;
var msgMap = new WeakMap;
class Client {
    id = '';
    optime = 0;
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
    removeUser(u) {
        if (!this.hasUser(u)) return;
        delete this.users[u.id];
    }
    getMessages(uid) {
        var c = this;
        if (uid) c = this.getUser(uid);
        var msglist = msgMap.get(c);
        return msglist;
    }
    hasUser(u) {
        return u.id in this.users;
    }
    mapUser(u) {
        var u = this.users[u.id];
        if (u.name !== u.name) {
            u.name = u.name;
        }
        Object.assign(this.users[u.id], u);
    }
    putUser(user) {
        this.users[user.id] = user;
        msgMap.set(user, []);
    }
    /**
     * @returns {User}
     */
    getUser(uid) {
        return this.users[uid];
    }
    getUserList() {
        return Object.keys(this.users).map(k => this.users[k]);
    }
    refresh() {
        this.removeIndex();
        this.optime = +new Date;
    }
    keep(time = 24 * 3600 * 1000 * 7) {
        this.removeIndex();
        this.optime += time;
        saveToOrderedArray(indexedKeepingClients, this, byOptime);
    }
    deliver(userid, msgid) {
        var c = this;
        if (userid) c = c.getUser(userid);
        if (!c) return;
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
            return true;
        }
    }
    listen(res, ustr) {
        var c;
        if (ustr) {
            var u = new User(ustr);
            if (!this.hasUser(u)) {
                this.putUser(u);
                c = u;
            }
            else {
                c = this.getUser(u.id);
                Object.assign(c, u);
            }
            if (/,$/.test(ustr)) {
                res.writeHead(201);
                res.end(JSON.stringify(Object.keys(this.users).map(k => this.users[k])));
                return true;
            }
        }
        else {
            c = this;
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
        return u && u.name;
    }
    valueOf() {
        return this.id;
    }
}

var removedindex = 0;
var autoremove = function (time) {
    var delta = 30 * 1000, d = 300;
    for (var cx = removedindex - 1, dx = removedindex - 1000; cx >= dx; cx--) {
        if (cx < 0) {
            break;
        }
        var client = clients[cx];
        if (!client) continue;

        var users = client.users;
        if (client.optime + delta < time) {
            for (var k in users) {
                var u = resMap.get(users[k]);
                if (u) {
                    client.deliver(k);
                }
            }
            if (resMap.has(client)) {
                client.deliver();
                continue;
            }
            clients.splice(cx, 1)[0].removeIndex();
        } else {
            if (client.optime + d < time) {
                var rusers = [];
                for (var k in users) {
                    var u = users[k];
                    if (!resMap.has(u)) {
                        delete users[k];
                        u.deleted = true;
                        rusers.push(u);
                    }
                }
                if (rusers.length) for (var k in users) {
                    client.deliver(k, rusers);
                }
            }
            if (msgMap.has(client)) {
                var messages = msgMap.get(client);
                if (messages.length > 300) messages.splice(messages.length - 200, messages.length);
            }
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
    attach(clientid, checkmark) {
        var client = this.get(clientid);
        if (client) return client;
        if (checkmark !== false && !checkId(clientid)) return;
        client = this.create(clientid);
        saveToOrderedArray(clients, client);
        return client;
    },
    deliver(clientid, userid, message) {
        var client = this.get(clientid);
        if (client) {
            return client.deliver(userid, message);
        }
        return false;
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
        var client = this.get(clientid);
        if (client) {
            var u = new User(usr);
            if (!client.hasUser(u)) {
                client.putUser(u);
            }
            else {
                var user = client.getUser(u.id);
                Object.assign(user, u);
            }
            var users = Object.keys(client.users).map(k => client.users[k]);
            for (var user of users) {
                if (user.id !== u.id) client.deliver(user.id, u);
            }
        }
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