var {
    STAMP,
    EXPRESS,
    SCOPED,
    QUOTED,
    PROPERTY,
    STRAP,
    getDeclared,
    pickAssignment,
    createString,
    snapExpressFoot,
    collectArgument,
    collectProperty,
    skipAssignment,
    snapAssignmentHead
} = require("./common.js");
var strings = require('../basic/strings.js');
var namelist = require("./namelist.js");
var keepSet = new Set;
var skip = 0;
function addKeepName(a) {
    if (!a || keepSet.has(a)) return;
    keepSet.add(a);
}
[
    {},
    Object.prototype,
    [],
    Array.prototype,
    Uint8Array.prototype,
    "",
    String.prototype,
    false,
    Boolean.prototype,
    0,
    Number.prototype,
    /0/,
    RegExp.prototype,
    function () { },
    Function.prototype,
    Promise.prototype,
].forEach(o => {
    if (o) for (var n of Object.getOwnPropertyNames(o)) {
        addKeepName(n);
    }
});
[
    'constructor', 'readBigUInt64LE', 'readBigUInt64BE', 'readBigUint64LE',
    'readBigUint64BE', 'readBigInt64LE', 'readBigInt64BE', 'writeBigUInt64LE',
    'writeBigUInt64BE', 'writeBigUint64LE', 'writeBigUint64BE', 'writeBigInt64LE',
    'writeBigInt64BE', 'readUIntLE', 'readUInt32LE', 'readUInt16LE',
    'readUInt8', 'readUIntBE', 'readUInt32BE', 'readUInt16BE',
    'readUintLE', 'readUint32LE', 'readUint16LE', 'readUint8',
    'readUintBE', 'readUint32BE', 'readUint16BE', 'readIntLE',
    'readInt32LE', 'readInt16LE', 'readInt8', 'readIntBE',
    'readInt32BE', 'readInt16BE', 'writeUIntLE', 'writeUInt32LE',
    'writeUInt16LE', 'writeUInt8', 'writeUIntBE', 'writeUInt32BE',
    'writeUInt16BE', 'writeUintLE', 'writeUint32LE', 'writeUint16LE',
    'writeUint8', 'writeUintBE', 'writeUint32BE', 'writeUint16BE',
    'writeIntLE', 'writeInt32LE', 'writeInt16LE', 'writeInt8',
    'writeIntBE', 'writeInt32BE', 'writeInt16BE', 'readFloatLE',
    'readFloatBE', 'readDoubleLE', 'readDoubleBE', 'writeFloatLE',
    'writeFloatBE', 'writeDoubleLE', 'writeDoubleBE', 'asciiSlice',
    'base64Slice', 'base64urlSlice', 'latin1Slice', 'hexSlice',
    'ucs2Slice', 'utf8Slice', 'asciiWrite', 'base64Write',
    'base64urlWrite', 'latin1Write', 'hexWrite', 'ucs2Write',
    'utf8Write', 'parent', 'offset', 'copy',
    'toString', 'equals', 'inspect', 'compare',
    'indexOf', 'lastIndexOf', 'includes', 'fill',
    'write', 'toJSON', 'subarray', 'slice',
    'swap16', 'swap32', 'swap64', 'toLocaleString',
    "callee", "null", "true", "false", "boolean", "string", "number",
    "function", "object", "undefined", "symbol", "get", "set", "value",
    "enumerable", "configurable", "require", "from"
].forEach(a => keepSet.add(a));
function addPropSeek(dec, used) {
    for (var d of dec) {
        for (var o of used[d]) addKeepEqual(o);
    }
    if (dec.attributes) for (var [name, node] of dec.attributes) {
        addKeepName(name);
        if (node.attributes) addPropSeek(node, used);
    }
}
function forPropName(o, add) {
    var ks = o.text.split('.').slice(1).forEach(add);
    var n = o.next;
    while (n) {
        if (n.type === EXPRESS) {
            if (/\.$/.test(o.text));
            else if (!/^\./.test(n.text)) break;
            n.text.split('.').forEach(add);
            o = n;
            n = o.next;
        }
        else if (n.type === SCOPED) {
            if (n.entry === '{') break;
            if (n.entry === '(') {
                if (add === addKeepName && n.prev === o) {
                    addKeepParam(n);
                }
                o = n;
                n = n.next;
                continue;
            }
            var f = n.first;
            if (!f || f !== n.last || f.type !== QUOTED || f.length) {
                o = n;
                n = o.next;
                continue;
            }
            add(strings.decode(n.text));
            o = n;
            n = o.next;
        }
        else break;
    }
}
function addKeepEnv(o) {
    forPropName(o, addKeepName);
    addKeepEqual(o);
}
function addHideExp(o) {
    forPropName(o, addHideName)
}
var keeping = new Set;
function addKeepEqual(o) {
    var p = o.prev;
    if (p && p.type === STRAP && p.text === 'new') p = p.prev;
    if (!p || p.type !== STAMP || p.text !== "=") return;
    var h = snapAssignmentHead(p);
    if (keeping.has(h)) return;
    keeping.add(h);
    while (h !== p) {
        switch (h.type) {
            case STAMP: break;
            case EXPRESS:
                if (h.scoped && h.tack === h.text) {
                    var { used } = h.scoped;
                    for (var o of used[h.tack]) {
                        if (o === h) continue;
                        forPropName(o, addKeepName);
                        addKeepEqual(o);
                    }
                }
                break;
            case SCOPED:
                if (h.entry !== '{' || !h.first) break;
                var dec = getDeclared(h.first)[0];

                var { used } = h.scoped;
                addPropSeek(dec, used);
                break;
        }
        h = h.next;
    }
    keeping.delete(h);
}

function addKeepParam(o) {
    if (keeping.has(o)) return;
    keeping.add(o);
    switch (o.type) {
        case SCOPED:
            if (!o.brace) {
                var args = collectArgument(o);
                for (var a of args) {
                    if (a.length !== 1) continue;
                    addKeepParam(a[0]);

                }
                break;
            }
            if (!o.isObject) break;
            var props = collectProperty(o);
            for (var k in props) {
                var v = props[k];
                addKeepName(k);
                if (v.length !== 1) continue;
                addKeepParam(v[0]);
            }
            break;
        case EXPRESS:
        case PROPERTY:
            if (o.isprop) {
                addKeepName(o.text);
                if (o.short) {
                    var { used } = o.scoped;
                    used[o.tack].forEach(addKeepParam);
                    break;
                }
            }
            else {
                var { used } = o.scoped;
                used[o.tack].forEach(a => {
                    var eq = a.equal;
                    if (eq && eq.text === '=') {
                        var n = eq.next;
                        if (!n.isObject) return;
                        var n1 = skipAssignment(eq.next);
                        if (n1 !== n.next) return;
                        addKeepParam(n);
                    }
                });
            }
            break;
        case QUOTED:
            if (!o.length) {
                addKeepString(o.text);
            }
            break;

    }
    keeping.delete(o);
}
var hideMap = new Map;
function addHideName(text) {
    if (hideMap.has(text) || keepSet.has(text)) return;
    var name = namelist(1, keepSet, skip);
    skip = name.skip;
    var replace = `"${name[0]}"/* ${text} */`;
    hideMap.set(text, replace);
    return replace;
}
function addHideString(text) {
    text = strings.decode(text);
    addHideName(text);
}
function addKeepString(text) {
    text = strings.decode(text);
    addKeepName(text);
}
function addKeepCode(code) {
    for (var o of code) {
        switch (o.type) {
            case SCOPED:
                addKeepCode(o);
                break;
            case QUOTED:
                if (o.length) {
                    addKeepCode(o);
                    break;
                }
                var text = o.text;
                if (!/^['"`]/.test(text)) break;
                text = strings.decode(text);
                addKeepString(o.text);
                break;
            case PROPERTY:
                if (/^#/.test(o.text)) addHideName(o.text);
        }
    }
}
function addKeepBody(code) {
    addKeepCode(code);
    var { used, envs } = code;
    if (used.this && !envs.module && !envs.exports) {
        used.this.forEach(addKeepEnv);
    }
}
function autoprop(text, addhidden) {
    text = strings.decode(text);
    if (keepSet.has(text)) return strings.encode(text);
    if (addhidden) addHideName(text);
    if (hideMap.has(text)) return hideMap.get(text);
    return strings.encode(text);
}
module.exports = autoprop;
autoprop.addKeepName = addKeepName;
autoprop.addHideName = addHideName;
autoprop.addKeepEnv = addKeepEnv;
autoprop.addHideExp = addHideExp;
autoprop.addKeepEqual = addKeepEqual;
autoprop.addMapedString = addHideString;
autoprop.addKeepBody = addKeepBody;