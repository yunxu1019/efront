var isEmpty = require("./isEmpty");
var convertReg = /^(?:object|function)$/;
var check = function (o) {
    return o === null || typeof o === 'bigint' || o instanceof BigInt || typeof o === 'number' || typeof o === "boolean";
};
var string = function (a) {
    return "\"" + String(a).replace(/\\/g, "\\\\").replace(/"/g, '\\$&') + "\"";
};
var symbol = function (a) {
    return "\'" + String(a).replace(/^\w*\(([\s\S]*)\)$/, '$1').replace(/\\/g, "\\\\").replace(/'/g, '\\$&') + "\'";
};
var date = function (d) {
    return d.toISOString();
};
var regrep = a => a === '/' ? "\\/" : a;
var regexp = function (r) {
    return '/' + r.source.replace(/\\[\s\S]|\//g, regrep) + '/' + r.flags;
};
var join = function (o) {
    if (o === undefined) return '';
    if (check(o)) return String(o);
    if (typeof o === 'symbol' || o instanceof Symbol) return symbol(o);
    if (typeof o !== 'object') return string(o);
    if (o instanceof Date) return date(o);
    if (o instanceof RegExp) return regexp(o);
    var arr = o[""];
    delete o[""];
    var typeid = o._;
    delete o._;
    var pairs = [].concat(arr);
    for (var k in o) {
        pairs.push(k + ':' + o[k]);
    }
    var s;
    if (o instanceof Array) {
        s = `[${pairs.join(',')}]`;
    }
    else {
        s = `{${pairs.join(',')}}`;
    }
    if (typeid > 0) s = typeid + s;
    return s;
};
function stringify(memery, preload) {
    if (!isEmpty(preload)) {
        preload = [].concat(preload);
        var i = preload.indexOf(memery) + 1;
        if (i > 0) return i + ',';
    }
    if (memery === undefined) return '';
    if (check(memery)) return String(memery);
    if (typeof memery === 'symbol') return symbol(memery);
    if (memery instanceof Date) return date(memery);
    if (memery instanceof RegExp) return regexp(memery);
    if (!convertReg.test(typeof memery)) return string(memery);
    m: if (typeof memery === 'function') {
        for (var k in memery) break m;
        return '';
    }
    var dist = [memery];
    var rest = [memery];
    var trimed = [memery instanceof Array ? [] : {}];
    var objects = [trimed[0]];
    if (!isEmpty(preload)) dist = dist.concat(preload);
    var preload_used = false;
    while (rest.length) {
        var memery = rest.shift();
        var o = objects.shift();
        var inc = 0, arr = [];
        o[""] = arr;
        o._ = dist.indexOf(memery.constructor);
        if (o._ > 0) preload_used = true;
        for (var k in memery) {
            var m = memery[k];
            f: if (typeof m === 'function') {
                for (var k in m) break f;
                if (dist.indexOf(m) >= 0) {
                    preload_used = true;
                    break f;
                }
                continue;
            }
            if (inc === +k && k !== '') {
                var kindex = "";
                inc++;
            } else {
                var kindex = dist.indexOf(k);
                if (!~kindex) {
                    kindex = dist.length;
                    dist.push(k);
                    trimed.push(k);
                }
            }
            var index = dist.indexOf(m);
            if (!~index) {
                index = dist.length;
                dist.push(m);
                if (m !== null) {
                    if (m instanceof Date) {
                        trimed.push(m);
                    }
                    else if (m instanceof RegExp) {
                        trimed.push(m);
                    }
                    else if (convertReg.test(typeof m)) {
                        rest.push(m);
                        var t = m instanceof Array ? [] : {};
                        trimed.push(t);
                        objects.push(t);
                    }
                    else {
                        trimed.push(m);
                    }
                } else {
                    trimed.push(m);
                }
            }
            if (kindex === '') {
                arr.push(index);
            } else {
                o[kindex] = index;
            }
        }
    }
    var result = trimed.map(join).join(',');
    if (trimed.length === 1 && preload_used) result += ',';
    return result;
}
var create = function (a, dst) {
    if (!a) return;
    var arr = a.split(',');
    var rest = [];
    for (var cx = 0, dx = arr.length; cx < dx; cx++) {
        var [k, v] = arr[cx].split(':');
        if (v === undefined) {
            rest.push(k);
        } else {
            dst[k] = +v;
        }
    }
    dst[""] = rest;
};
function parse(string, preload) {
    string = String(string);
    var trimed = [];
    var reg0 = /\d+/g;
    var reg1 = /\}/g;
    var reg2 = /\]/g;
    var reg3 = /\\[\s\S]|"/g;
    var reg4 = /,|$/g;
    var reg5 = /\\[\s\S]|\//g;
    var reg6 = /\\[\s\S]|'/g;
    var marked = [];
    for (var cx = 0, dx = string.length; cx < dx; cx++) {
        var s = string.charAt(cx);
        var reg = null, o = null;
        reg0.lastIndex = 0;
        var typeid = 0;
        var m = reg0.test(string.charAt(cx));
        if (m) {
            reg0.lastIndex = cx;
            var m = reg0.exec(string);
            if (/^[\[\{]$/.test(string.charAt(reg0.lastIndex))) {
                typeid = +m[0];
                cx = reg0.lastIndex;
                s = string.charAt(reg0.lastIndex);
            }
        }
        switch (s) {
            case ",":
                trimed.push(undefined);
                break;
            case "{":
                reg = reg1;
                o = {};
            case "[":
                o = o || [];
                reg = reg || reg2;
                reg.lastIndex = cx + 1;
                reg.exec(string);
                var index = reg.lastIndex;
                var s = string.slice(cx + 1, index - 1);
                create(s, o);
                marked.push(trimed.length);
                trimed.push(o);
                cx = reg.lastIndex;
                if (typeid) {
                    o._ = typeid;
                }
                if (/\d/.test(string.charAt(cx))) {
                    reg4.lastIndex = cx;
                    var m = reg4.exec(string);
                    o._ = typeid || string.slice(cx, m.index);
                    cx = m.index;
                }
                break;
            case "/":
                reg = reg5;
                o = 1;
            case "'":
                reg = reg || reg6;
                o = o || 2;
            case "\"":
                reg = reg || reg3;
                reg.lastIndex = cx + 1;
                do {
                    var s = reg.exec(string);
                } while (s && s[0].length === 2);
                var index = reg.lastIndex;
                s = string.slice(cx + 1, index - 1).replace(/\\([\s\S])/g, '$1');
                cx = index;
                if (o == 2) {
                    s = Symbol(s);
                } else if (o == 1) {
                    reg4.lastIndex = index;
                    var m = reg4.exec(string);
                    index = m.index;
                    var flag = string.slice(cx, index);
                    cx = index;
                    s = new RegExp(s, flag);
                }
                trimed.push(s);
                break;
            default:
                reg4.lastIndex = cx;
                var match = reg4.exec(string);
                var index = match.index;
                var s = string.slice(cx, index);
                switch (s) {
                    case "null":
                        s = null;
                        break;
                    case "true":
                        s = true;
                        break;
                    case "false":
                        s = false;
                        break;
                    default:
                        if (/^\d+[\/\-]/i.test(s)) {
                            s = new Date(s);
                        }
                        else if (/^\-?\d+$/.test(s)) {
                            if (s.length > 15) {
                                s = BigInt(s);
                            } else {
                                s = parseInt(s);
                            }
                        } else {
                            s = parseFloat(s);
                        }

                }
                trimed.push(s);
                cx = index;
        }
    }
    if (string.charAt(string.length - 1) === ',') trimed.push(undefined);
    var dist = [trimed[0]];
    if (!isEmpty(preload)) dist = dist.concat(preload);
    var preloads_length = dist.length - 1;
    dist = dist.concat(trimed.slice(1, trimed.length));
    for (var cx = 0, dx = marked.length; cx < dx; cx++) {
        var index = marked[cx];
        var o = trimed[index];
        if (index > 0) index += preloads_length;
        if (o._ > 0) dist[index] = Object.create(dist[o._].prototype);
        else dist[index] = o instanceof Array ? [] : {};
    }
    for (var cx = 0, dx = marked.length; cx < dx; cx++) {
        var index = marked[cx];
        var o = trimed[index];
        if (index > 0) index += preloads_length;
        var t = dist[index];
        var arr = o[""];
        delete o[""];
        delete o._;
        if (arr) for (var k in arr) {
            t[k] = dist[arr[k]];
        }
        for (var k in o) {
            var v = o[k];
            t[dist[k]] = dist[v];
        }
    }
    if (trimed.length > 1 && typeof trimed[0] === 'number') {
        return dist[trimed[0]];
    }
    return dist[0];
}
module.exports = {
    stringify,
    parse(data, preload) {
        if (/^\s*(?:[^\{\[\s]|\[\s*\]|\{\s*\})\s*$/.test(data)) return parse(data, preload);
        if (/^\s*\{[\d\,\:\s]*\}\s*,/.test(data)) return parse(data, preload);
        if (/^\s*\[[\d\,\:\s]*\]\s*,/.test(data)) return parse(data, preload);
        return JSON.parse(data);
    }
};