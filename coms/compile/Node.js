var defineProperty = Object.defineProperty;
var typemap = require('./const.mjs');
var types = Object.create(null);
Object.keys(typemap).map(k => {
    var v = typemap[k];
    types[v] = k;
})
function Node(o) {
    var t = this instanceof Node ? this : o;
    if (debug && t instanceof Array) array_props.forEach(def, t);
    if (t === o) o = arguments[1];
    if (debug && o) {
        node_props.forEach(k => {
            t[k] = o[k];
        });
        t[types[o.type]] = o.text;
    }
    else Object.assign(t, o);
    return t;
}
var node_props = [
    "next", "prev", "queue", "type", "text",
    "istype", 'isend', "isdigit",
    "tack", "refs", "maped", 'called',
    "col", "row", "start", "end", "isExpress"
];
var array_props = [
    "next", "prev", "queue",
    "col", "row", "start", "end",
    "isExpress", "inExpress",
    "type", "inTag",
    "last", "first",
];
var debug = false;
defineProperty(Node, 'debug', {
    get() {
        return debug;
    },
    set(v) {
        debug = !!v;
        node_props.forEach(debug ? def : del, Node.prototype);
    }
});
var def = function (k) {
    var k1 = Symbol(k);
    defineProperty(this, k, {
        configurable: true, enumerable: false,
        get() {
            return this[k1];
        },
        set(v) {
            defineProperty(this, k1, { configurable: true, writable: true, enumerable: false, value: v })
        }
    });
};
var del = function (k) {
    delete this[k];
};
module.exports = Node;