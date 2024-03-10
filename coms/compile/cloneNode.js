var { VALUE, QUOTED, EXPRESS, STRAP, relink } = require("./common");
var cloneNode = function (o) {
    var c = o;
    if (c instanceof Array && !c.text) {
        c = c.map(cloneNode);
        c.entry = o.entry;
        c.leave = o.leave;
        c.type = o.type;
        c.isExpress = o.isExpress;
        relink(c);
    }
    else if (typeof c === 'object' && c instanceof Object) {
        c = Object.assign({}, c);
    }
    else switch (typeof c) {
        case "number": case "bigint": c = { type: VALUE, isdigit: c === c, text: String(c) }; break;
        case "boolean": case "undefined": c = { type: VALUE, text: String(c) }; break;
        case "regexp": c = { type: QUOTED, text: String(c) }; break;
        case "string": c = scanner2(c); break;
        default: if (c === null) c = { type: VALUE, text: String(c) };
    }
    return c;
};