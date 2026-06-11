var { SCOPED } = require("./common");
var backEach = require("../basic/backEach");
var Object_polyfills = Object.assign(Object.create(null), {
    "Object.assign": '&extend'
});
var Object_polyfill = function (o, i, used) {
    var v = o.text;
    if (v in Object_polyfills) {
        var p = Object_polyfills[v];
        var n = o.next;
        if (n && n.type === SCOPED && n.entry === '(') {
            if (!this.used[p]) {
                this.used[p] = [];
                this.envs[p] = true;
            }
            o.text = p;
            this.used[p].push(o);
            used.splice(i, 1);
        }
    }
};
var Date_polyfill = function (o, i, used) {
    var v = o.text;
    if (v !== 'Date') return
    var n = o.next;
    if (!n || n.type !== SCOPED || n.entry !== "(") return;
    var f = n.first;
    if (!f || f !== n.last || f.type !== QUOTED || f.length) return;
    var dateString = strings.decode(f.text);
    var dateTime = +new Date(dateString);
    if (Number.isFinite(dateTime)) {
        f.type = VALUE;
        f.isdigit = true;
        f.text = String(dateTime);
    }
}

module.exports = function (body) {
    var envs = body.envs;
    if (envs.Object) {
        backEach(body.used.Object, Object_polyfill, body);
        if (!body.used.Object.length) delete body.used.Object, delete body.envs.Object;
    }
    if (envs.Date) {
        backEach(body.used.Date, Date_polyfill, body);
    }
    return body;
}