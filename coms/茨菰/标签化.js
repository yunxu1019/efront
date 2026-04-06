
var { STRAP, SCOPED, ELEMENT, SPACE, QUOTED, LABEL, COMMENT, STAMP, VALUE, EXPRESS, PROPERTY, PIECE, needhead_reg } = compile$common;
var predefs = Object.create(null);
predefs.module = true;
predefs.exports = true;
predefs["module.exports"] = true;
predefs.Promise = true;
[Boolean, Number, String, Function, Object, Array, Date, RegExp, Error].forEach(p => predefs[p.name] = true);
var wrapLabel = function (content, typeName) {
    return `<${typeName}>${content}</${typeName}>`;
};
var amp = a => `&#${a.charCodeAt()};`;
var encodeAmp = function (a) {
    return a.replace(/[\<\>\|&]/g, amp);
};
var codecolor = function (c, encode) {
    var wrap = arguments[2];
    if (encode?.length === 2) wrap = encode, encode = arguments[2];
    if (!wrap) {
        wrap = wrapLabel;
        if (!encode) encode = encodeAmp;
    }
    var envs = c.envs;
    var deep = 0;
    var used = c.used;
    var scoped = c.scoped;
    var setdefs = function (scoped) {
        var { used } = scoped;
        if (!isObject(used) || isArray(used)) return;
        for (var k in used) {
            var isdef = false;
            for (var o of used[k]) {
                if (o.next?.needle) {
                    isdef = true;
                    break;
                }
            }
            if (isdef) {
                for (var o of used[k]) {
                    o.isdef = true;
                }
            }
        }
        scoped.forEach(setdefs);
    };
    if (scoped) setdefs(scoped);
    var isConstValue = () => false;
    if (c.program) {
        var { strap_reg, value_reg } = c.program;
        isConstValue = a => strap_reg.test(a) || value_reg.test(a);
    }
    var isInvoke = function (o) {
        var p = o.prev;
        if (p?.type === STRAP && /^(invoke|call)$/i.test(p.text)) return true;
        o = o.next;
        if (o?.type === STRAP && /^(proc|endp)$/i.test(o.text)) return true;
        if (o?.type === EXPRESS && needhead_reg.test(o.text)) o = o.next;
        if (o?.type === ELEMENT && o.istype) o = o.next;
        if (o?.type === STAMP && o.needle) o = o.next;
        if (o?.type === SCOPED && o.entry === "(") return true;

        return false;
    };
    var setExpress = function (o, label) {
        if (!o.text || o.wraped) return;
        o.wraped = true;
        var keys = o.text.split(".");
        var pdot = !keys[0] && keys.length > 1;
        if (pdot) keys.shift();
        var invoked = null;
        var endi = keys.length - 1;
        if (o.danger) var danger = wrap(keys[0], 'danger');
        if (isInvoke(o)) {
            if (!/^[\?]/.test(keys[endi])) invoked = wrap(keys[endi], "invoke");
        }
        else endi++;
        var [name] = keys;
        if (name && endi > 0) {
            if (!o.isprop && o.text !== name && isConstValue(name)) name = wrap(name, "strap");
            else name = wrap(name, label);
            keys[0] = name;
        }
        for (var cx = 1, dx = endi; cx < dx; cx++) {
            var k = keys[cx];
            keys[cx] = /^[\?]/.test(k) || !k ? k : wrap(k, 'express');
        }
        if (endi === keys.length - 1) keys[endi] = invoked;
        if (danger) keys[0] = danger;
        keys = keys.join(".");
        if (pdot) keys = "." + keys;
        o.text = keys;
    };
    var setPredef = o => setExpress(o, 'predef');
    var setOutside = o => setExpress(o, 'outside');
    if (used) for (var k in envs) {
        used[k].forEach(k in predefs ? setPredef : setOutside);
    }
    if (c.program) var { space_exp: spaceReg, control_reg } = c.program;
    if (spaceReg) var unspaceReg = new RegExp(`(?:${spaces.avoid(光标)})+`, 'g');
    var wraptext = function (t, l) {
        if (unspaceReg) t = t.replace(unspaceReg, a => {
            if (encode) a = encode(a);
            return wrap(a, l);
        });
        return t;
    };
    var wrapcode = encode ? function (t, l) {
        t = encode(t);
        return wrap(t, l);
    } : wrap;
    c.colored = true;
    var setcolor = function (o) {
        if (o.colored) return;
        o.colored = true;
        var text = o.text;
        switch (o.type) {
            case LABEL:
                o.text = wrap(o.text, 'label');
                break;
            case QUOTED:
                if (o.length || !o.text) {
                    o.forEach(setcolor);
                    o.entry = wrap(o.entry, 'text');
                    o.leave = wrap(o.leave, 'text');
                    break;
                }
                if (/^\//.test(o.text)) {
                    var source = o.text;
                    var flags = /[^\/]+$/.exec(source);
                    if (flags) {
                        flags = flags[0];
                        source = source.slice(0, source.length - flags.length);
                    }
                    source = wraptext(source, 'regexp');
                    if (flags) source = source + wraptext(flags, 'strap');
                    o.text = source;
                    break;
                }
            case PIECE:
                if (o.queue && o.queue.tag) {
                    if (encode) o.text = encode(o.text);
                }
                else o.text = wraptext(o.text, 'text');
                break;
                break;
            case ELEMENT:
                if (o.attributes) o.attributes.forEach(setcolor);
                if (o.tag_entry) o.tag_entry = wrapcode(o.tag_entry, 'stamp');
                if (o.tag_leave) o.tag_leave = wrapcode(o.tag_leave, 'stamp');
                if (o.entry) o.entry = wrapcode(o.entry, 'stamp');
                if (o.leave) o.leave = wrapcode(o.leave, 'stamp');
                o.tag = wrapcode(o.tag, 'label');
                o.forEach(setcolor);
                break;
            case SCOPED:
                deep++;
                o.forEach(setcolor);
                deep--;
                o.entry = wrapcode(o.entry, 'deep' + deep);
                o.leave = wrapcode(o.leave, 'deep' + deep);
                break;
            case VALUE:
                if (o.isdigit) o.text = wrap(o.text, 'digit');
                else o.text = wrap(o.text, 'value');
                break;
            case PROPERTY:
                var next = o.next;
                if (next && next.type === SCOPED && next.entry === '(') {
                    setExpress(o, 'method');
                }
                else setExpress(o, 'property');
                break;
            case EXPRESS:
                setExpress(o, o.istype || o.isdef || o.next?.needle ? 'predef' : 'express');
                break;
            case STRAP:
                if (control_reg?.test(text)) o.text = wrap(o.text, 'flow');
                else o.text = wrap(o.text, 'strap');
                break;
            case STAMP:
                if (/^(=>)$/.test(o.text) || o.text === "*" && o.prev && o.prev.type === STRAP) o.text = wrapcode(o.text, 'strap');
                break;
            case COMMENT:
                o.text = wraptext(o.text, 'comment');
                break;
        }
    };
    c.forEach(setcolor);
    return c;
}
codecolor.encode = encodeAmp;
return codecolor;