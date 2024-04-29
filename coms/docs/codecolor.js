
var { STRAP, SCOPED, ELEMENT, QUOTED, LABEL, COMMENT, STAMP, VALUE, EXPRESS, PROPERTY, PIECE } = compile$common;
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
    var setExpress = function (o, label) {
        if (!o.text) return;
        var keys = o.text.split(".");
        var next = o.next;
        if (next && next.type === SCOPED && next.entry === '(') {
            if (!/^\</.test(keys[keys.length - 1])) keys[keys.length - 1] = `<invoke>${keys[keys.length - 1]}</invoke>`;
        }
        var [name] = keys;
        if (/^[\<\?]/.test(name) || !name);
        else if (c.program?.strap_reg.test(name) || c.program?.value_reg.test(name) || /^(this|arguments)$/.test(name)) name = `<strap>${name}</strap>`;
        else name = `<${label}>${name}</${label}>`;
        keys[0] = name;
        o.text = keys.map(k => /^\</.test(k) || !k ? k : `<express>${k}</express>`).join(".");
    }
    var setPredef = o => setExpress(o, 'predef');
    var setOutside = o => setExpress(o, 'outside');
    if (used) for (var k in envs) {
        used[k].forEach(k in predefs ? setPredef : setOutside);
    }
    var spaceReg = c.program.space_exp;
    var unspaceReg = new RegExp(spaceReg.source.replace(/^\[/, "[^"), spaceReg.flags + 'g');
    var wraptext = function (t, l) {
        t = t.replace(unspaceReg, a => {
            a = encode(a);
            return `<${l}>${a}</${l}>`
        });
        return t;
    }

    var setcolor = function (o) {
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
                    o.text = `<method>${o.text}</method>`;
                }
                else o.text = `<property>${o.text}</property>`;

                break;
            case EXPRESS:
                setExpress(o, 'express');
                break;
            case STRAP:
                if (/^(if|else|switch|case|do|while|for|break|continue|default|import|from|as|export|try|catch|finally|throw|await|yield|return)$/.test(text))
                    o.text = `<flow>${o.text}</flow>`;
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

}