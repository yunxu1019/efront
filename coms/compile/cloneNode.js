var { VALUE, QUOTED, EXPRESS, STRAP, relink, setqueue, } = require("./common");
var Node = require("./Node");
var cloneChild = o => cloneNode(o);
var cloneNode = function (o, keep) {
    var c = o;
    if (c instanceof Array && !c.text) {
        if (keep) return c;
        c = c.map(cloneChild);
        c.entry = o.entry;
        c.leave = o.leave;
        c.type = o.type;
        c.istype = o.istype;
        c.brace = o.brace;
        c.isExpress = o.isExpress;
        relink(c);
        setqueue(c);
    }
    else if (typeof c === 'object' && c instanceof Object) {
        if (keep) return c;
        c = new Node(c);
    }
    else switch (typeof c) {
        case "number": case "bigint": c = new Node({ type: VALUE, isdigit: c === c, text: String(c) }); break;
        case "boolean": case "undefined": c = new Node({ type: VALUE, text: String(c) }); break;
        case "regexp": c = new Node({ type: QUOTED, text: String(c) }); break;
        case "string": c = scanner2(c); break;
        default: if (c === null) c = new Node({ type: VALUE, text: String(c) });
    }
    return c;
};
module.exports = cloneNode;