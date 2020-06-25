var clients = [];
var increaseId = 0x1fffffff + (0x1fffffff * Math.random() | 0);


var Client = function (id = ++increaseId) {
    if (id instanceof Object) {
        extend(this, id);
    } else {
        this.id = id;
    }
};

Client.prototype = {
    name: '',
    id: '',
    optime: 0,
    res: null,
    messages: [],
    printer: null,
    refresh() {
        this.optime = +new Date;
    },
    keep(time = 24 * 3600 * 1000 * 7) {
        this.optime += time;
    },
    clean() {
        this.messages.splice(0, this.messages.length);
        this.refresh();
    },
    deliver(msgid) {
        var { res } = this;
        if (msgid instanceof Array) {
            this.messages.push.apply(this.messages, msgid)
        } else if (msgid) {
            this.messages.push(msgid);
        }
        if (res) {
            this.res = null;
            res.end(JSON.stringify(this.messages));
            this.clean();
        }
    },
    listen(res) {
        if (!this.messages.length) {
            if (this.res){
                
            };
            this.res = res;
            return;
        }
        var msgs = this.messages.splice(0, this.messages.length);
        res.end(msgs.join());
    },
    valueOf() {
        return this.id;
    }
};
var index = 0;
var autoremove = function () {
    var time = +new Date, delta = 10 * 1000;
    for (var cx = index, dx = index - 1000; cx > dx; cx--) {
        if (cx <= 0) {
            cx = clients.length;
            return;
        }
        var client = clients[cx];
        if (client.res) continue;
        if (client.optime + delta < time) {
            clients.splice(cx, 1);
        }
    }
};

var interval = setInterval(autoremove, 20);

var methods = {
    destroy() {
        clearInterval(interval);
        clients.splice(0, clients.length).forEach(u => u.res && u.res.end());
    },
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
    attach(clientid) {
        var client = this.get(clientid);
        if (client) return client;
        client = this.create(clientid);
        saveToOrderedArray(clients, client);
        return client;
    },
    deliver(clientid, message) {
        var client = this.get(clientid);
        if (client) {
            client.deliver(message);
            return true;
        }
        return false;
    },
    detach(clientid) {
        var index = getIndexFromOrderedArray(clients, clientid);
        if (clients[index].id === clientid) {
            clients.splice(index, 1);
        }
    }
};

module.exports = methods;