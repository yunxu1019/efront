var strings = require("./strings");
var spaces = require("./spaces");
var isArrayLike = require("./isArrayLike");
var check = function (o) {
    return o === null || o === false || o === true || o === Infinity || o !== o;
};
var string = function (a) {
    return strings.encode(a, '"', false);
};
var symbol = function (a) {
    return strings.encode(String(a).replace(/^\w*\(([\s\S]*)\)$/, '$1'), "'");
};
var date = function (d) {
    return d.toISOString();
};
var regrep = a => a === '/' ? "\\/" : a;
var regexp = function (r) {
    return '/' + r.source.replace(/\\[\s\S]|\//g, regrep) + '/' + r.flags;
};
var isValidK = function (k) {
    return k.length < 16 && !/^\d|[,:'"\\\/`\-\[\]\{\}\(\)\.\+\#\@\&^]/.test(k) && spaces.trim(k) === k;
};
var extractK = function (k) {
    return /^\d{1,16}$/.test(k);
};
var noDulp = false, plength = 0, dulp = false;
var hasOwnProperty = {}.hasOwnProperty;
function _tostring(memery, preload, dist) {
    if (memery === undefined) return '';
    if (check(memery)) return String(memery);
    if (typeof memery === 'number') {
        if (memery < 0) return String(memery);
        return "+" + String(memery);
    }
    if (typeof memery === 'string') return string(memery);
    if (typeof memery === 'symbol' || memery instanceof Symbol) return symbol(memery);
    if (typeof memery === 'bigint' || memery instanceof BigInt) return String(memery) + "n";
    m: if (typeof memery === 'function') {
        for (var k in memery) break m;
        return '';
    }
    if (memery instanceof Date) return date(memery);
    if (memery instanceof RegExp) return regexp(memery);
    var constructor = memery.constructor;
    var d = preload.indexOf(constructor);
    var pre = memery instanceof Array ? "[" : "{";
    var aft = pre === "{" ? "}" : "]"
    if (d >= 0) pre = d + pre;
    var inc = 0, arr = [];
    var index = dist.length;
    dist.push(undefined);
    for (var k in memery) {
        var v = memery[k];
        if (!hasOwnProperty.call(memery, k)) {
            if (!d || !hasOwnProperty.call(constructor.prototype, k)) break;
        }
        if (v && typeof v === 'object' || typeof v === 'function') {
            if (v instanceof Date) {
                v = date(v);
            }
            else if (v instanceof RegExp) {
                v = regexp(v);
            }
            else {
                var i = preload.indexOf(v);
                if (i >= 0) {
                    if (noDulp) throw new Error(i18n`数据异常`);
                    v = i;
                    dulp = true;
                }
                else {
                    i = plength + dist.length;
                    preload.push(v);
                    v = _tostring(v, preload, dist);
                    if (!v.length) {
                        preload.pop();
                        continue;
                    }
                    if (noDulp) preload.pop();
                    v = i;
                }
            }
        }
        else {
            v = _tostring(v, preload);
        }

        if (extractK(k)) {
            if (+k === inc) arr.push(v);
            else arr.push("+" + k + ":" + v);
        }
        else {
            if (!isValidK(k)) k = string(String(k));
            arr.push(k + ":" + v);
        }
        inc++;
    }
    if (arr.length && !arr[arr.length - 1].length) arr.push('');
    dist[index] = pre + arr.join(',') + aft;
    return dist[index];
}

function stringify(memery, preload, hasDulp = true) {
    noDulp = preload === false || hasDulp === false;
    if (isArrayLike(hasDulp)) preload = hasDulp;
    if (isArrayLike(preload)) {
        preload = Array.apply(null, preload);
        var i = preload.indexOf(memery) + 1;
        if (i > 0) return i + ',';
        preload.unshift(memery);
    }
    else preload = [memery];
    var dist = [];
    plength = preload.length - 1;
    dulp = false;
    dist[0] = _tostring(memery, preload, dist);
    if (dist.length === 1 && dulp) { dist.push(''); }
    return dist.join(',');
}
function parseValue(v) {
    if (/^"/.test(v)) return strings.decode(v);
    if (/^[\+\-]?\d+n$/.test(v)) return BigInt(v.slice(0, v.length - 1));
    if (/^[\+\-]\d/.test(v)) return parseFloat(v);
    if (/^\d+[\-\/]/.test(v)) return new Date(v);
    if (/^\d/.test(v)) return parseFloat(v);
    switch (v) {
        case "true": return true;
        case "false": return false;
        case "null": return null;
        case "": return undefined;
        case "Infinity": return Infinity;
        case "NaN": return NaN;
    }
    if (/^\//.test(v)) {
        var flag = /\/(\w*)$/.exec(v);
        return new RegExp(v.slice(1, flag.index), flag[1]);
    }
    if (/^'/.test(v)) return Symbol(strings.decode(v));
    return v;
}
function setkd([obj, kds]) {
    if (!isjsam) return kds.forEach(setkv, obj);
    for (var [k, d] of kds) {
        if (typeof k === 'number');
        else if (/^\d+$/.test(k)) k = this[k];
        else k = parseValue(k);
        if (d instanceof Object);
        else if (d.length <= 16 && /^\d+$/.test(d)) d = this[d];
        else d = parseValue(d);
        obj[k] = d;
    }
}
function setkv([k, v]) {
    if (typeof k === 'number');
    else if (/^\d+$/.test(k));
    else k = parseValue(k);
    if (v instanceof Object);
    else v = parseValue(v);
    this[k] = v;
}
var blocks = [];
var isjsam = false;
function scanblock(string, index, preload, obj) {
    var reg = /\\[\s\S]|[\:,'"\}\]\{\[\/]/g;
    reg.lastIndex = index;
    var instr = false;
    var inc = index === 0 ? preload.length : 1, k = 0, d = null;
    var start = index;
    var kds = [];
    a: while (index < string.length) {
        var match = reg.exec(string);
        if (!match) {
            index = string.length;
            break;
        }
        var m = match[0];
        index = match.index + m.length;
        if (/^['"\/]$/.test(m)) {
            if (instr === m) {
                instr = false;
            }
            else if (instr) continue;
            else instr = m;
        }
        else if (instr) continue;
        switch (m) {
            case ":":
                if (index > start + 10 && /^\d+[\/\-]/.test(string.slice(start, start + 10))) {
                    continue;
                }
                k = spaces.trim(string.slice(start, match.index));
                start = index;
                continue;
            case ",":
                d = spaces.trim(string.slice(start, match.index));
                if (preload === obj) isjsam = true;
                if (!d && typeof k === 'number' && !(obj instanceof Array)) {
                    start = index;
                    k = inc++;
                    continue;
                }
                if (preload === obj) {
                    preload[k] = parseValue(d);
                }
                else kds.push([k, d]);
                k = inc++;
                start = index;
                continue;
            case "{":
                var o = {};
            case "[":
                var o = o || [];
                d = spaces.trim(string.slice(start, match.index));
                if (d) {
                    d = preload[d];
                    if (!d) throw new Error('数据异常！');
                    if (Object.setPrototypeOf) Object.setPrototypeOf(o, d.prototype);
                    else o = Object.create(d.prototype);
                }
                if (preload === obj) {
                    preload[k] = o;
                }
                else {
                    kds.push([k, o]);
                }
                index = start = scanblock(string, index, preload, o, isjsam);
                o = null;
                k = inc;
                reg.lastIndex = index;
                break;
            case "}": case "]":
                index = match.index;
                break a;
        }
    }
    if (start < index) {
        var d = spaces.trim(string.slice(start, index));
        if (typeof k !== 'number' || d) {
            if (obj === preload) preload[k] = parseValue(d);
            else kds.push([k, d]);
        }
    }
    blocks.push([obj, kds]);
    return reg.lastIndex;
}
function parse(string, preload) {
    if (isArrayLike(preload)) preload = Array.apply(null, preload);
    else preload = [];
    isjsam = false;
    preload.unshift(void 0);
    string = String(string);
    scanblock(string, 0, preload, preload);
    blocks.forEach(setkd, preload);
    blocks = [];
    return preload[0];
}
module.exports = {
    stringify,
    parse,
};