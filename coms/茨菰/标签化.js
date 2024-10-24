
var { STRAP, SCOPED, ELEMENT, QUOTED, LABEL, COMMENT, STAMP, VALUE, EXPRESS, PROPERTY, PIECE, needhead_reg } = compile$common;
var predefs = Object.create(null);
predefs.module = true;
predefs.exports = true;
predefs["module.exports"] = true;
predefs.Promise = true;
[Boolean, Number, String, Function, Object, Array, Date, RegExp, Error].forEach(p => predefs[p.name] = true);
var codecolor = function (c, encode) {
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
        var o = o.next;
        if (o?.type === EXPRESS && needhead_reg.test(o.text)) o = o.next;
        if (o?.type === ELEMENT && o.istype) o = o.next;
        if (o?.type === STAMP && o.needle) o = o.next;
        if (o?.type === SCOPED && o.entry === "(") return true;
        return false;
    };
    var setExpress = function (o, label) {
        if (!o.text || /^</.test(o.text)) return;
        var keys = o.text.split(".");
        if (isInvoke(o)) {
            if (!/^[\<\?]/.test(keys[keys.length - 1])) keys[keys.length - 1] = `<invoke>${keys[keys.length - 1]}</invoke>`;
        }
        var [name] = keys;
        if (/^[\<\?]/.test(name) || !name);
        else if (!o.isprop && o.text !== name && isConstValue(name)) name = `<strap>${name}</strap>`;
        else name = `<${label}>${name}</${label}>`;
        keys[0] = name;
        o.text = keys.map(k => /^[\<\?]/.test(k) || !k ? k : `<express>${k}</express>`).join(".");
    };
    var setPredef = o => setExpress(o, 'predef');
    var setOutside = o => setExpress(o, 'outside');
    if (used) for (var k in envs) {
        used[k].forEach(k in predefs ? setPredef : setOutside);
    }
    if (c.program) var { space_exp: spaceReg, control_reg } = c.program;
    if (spaceReg) var unspaceReg = new RegExp(`(?:${spaces.avoid()})+`, 'g');
    var wraptext = function (t, l) {
        if (unspaceReg) t = t.replace(unspaceReg, a => {
            a = encode(a);
            return `<${l}>${a}</${l}>`
        });
        return t;
    };
    c.colored = true;
    var setcolor = function (o) {
        if (o.colored) return;
        o.colored = true;
        var text = o.text;
        switch (o.type) {
            case LABEL:
                o.text = `<label>${o.text}</label>`;
                break;
            case QUOTED:
                if (o.length || !o.text) {
                    o.forEach(setcolor);
                    o.entry = "<text>" + o.entry + "</text>";
                    o.leave = "<text>" + o.leave + "</text>";
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
                    o.text = encode(o.text);
                }
                else o.text = wraptext(o.text, 'text');
                break;
                break;
            case ELEMENT:
                if (o.attributes) o.attributes.forEach(setcolor);
                if (o.tag_entry) o.tag_entry = `<stamp>${encode(o.tag_entry)}</stamp>`;
                if (o.tag_leave) o.tag_leave = `<stamp>${encode(o.tag_leave)}</stamp>`;
                if (o.entry) o.entry = `<stamp>${encode(o.entry)}</stamp>`;
                if (o.leave) o.leave = `<stamp>${encode(o.leave)}</stamp>`;
                o.tag = `<label>${o.tag}</label>`;
                o.forEach(setcolor);
                break;
            case SCOPED:
                deep++;
                o.forEach(setcolor);
                deep--;
                o.entry = `<deep${deep}>${o.entry}</deep${deep}>`;
                o.leave = `<deep${deep}>${o.leave}</deep${deep}>`;
                break;
            case VALUE:
                if (o.isdigit) o.text = `<digit>${o.text}</digit>`;
                else o.text = `<value>${o.text}</value>`;
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
                if (control_reg?.test(text)) o.text = `<flow>${o.text}</flow>`;
                else o.text = `<strap>${o.text}</strap>`;
                break;
            case STAMP:
                if (/^(=>)$/.test(o.text) || o.text === "*" && o.prev && o.prev.type === STRAP) o.text = `<strap>${encode(o.text)}</strap>`;
                // else if (!/^[<\/>]+$/.test(o.text));
                // else o.text = `<stamp>${encode(o.text)}</stamp>`;
                break;
            case COMMENT:
                o.text = wraptext(o.text, 'comment');
                break;
        }
    };
    c.forEach(setcolor);
    return c;
}
return codecolor;