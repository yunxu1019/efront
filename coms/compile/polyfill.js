var { SCOPED } = require("./common");
var backEach = require("../basic/backEach");

var polyfills = Object.assign(Object.create(null), {
    "Object.assign": 'extend'
});
var polyfill = function (o, i, used) {
    var v = o.text;
    if (v in polyfills) {
        var p = polyfills[v];
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

module.exports = function (body) {
    var envs = body.envs;
    if (envs.Object) {
        backEach(body.used.Object, polyfill, body);
        if (!body.used.Object.length) delete body.used.Object, delete body.envs.Object;
    }
    return body;
}