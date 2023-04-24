var datas = {};
var queue = [];
var procsMap = {};
var codes = [];
var includes = {};
var procs = [];
var lastdata = '';
var locals = {}, invokes = {}, params = {};
var registers = /^([er]?[abcd]x|[abcd][hl]|[er][sd]i|[re][sbi]p|[ecsdfg]s)$/i;
var operators = /^(ifn?def|exte?rn|public|enter|leave|else|endif|echo|repeat|exitm|union|option|include(lib)?|local|end|invoke|call|push|pop|cld|(lod|sto|mov|sca|cmp)s[bwd]|rep|loop|lea|ret|mov|inc|dec|xor|and|not|or|cmp|jmp|j[na]?[ez]|sh[rl]|(fi?)?(add|div|mul|sub)|fi?(stp|ld)|f(chs|ld1|init)|\.\w+)(\s|$)/i;
function clean() {
    queue = [];
    datas = {};
    procsMap = {};
    codes = [];
    includes = {};
    procs = [];
    lastdata = '';
    locals = {}, invokes = {}, params = {};
}
function enterqueue(name, type, row) {
    if (procsMap[name] || datas[name]) {
        console.log(row)
        throw new Error(`重复定义：${name}`);
    }
    procsMap[name] = queue.length

    queue.push([name, type, row, codes.length, locals, invokes, params]);
    locals = {};
    invokes = {};
    params = {};
}
function leavequeue() {
    var [name, type, row, startat, l, i, p] = queue.pop();
    type = type.toLowerCase();
    switch (type) {
        case "proc":
        case "struct":

            procs.push({
                name,
                type,
                row,
                locals,
                invokes: Object.keys(invokes),
                params,
                codes: codes.splice(startat, codes.length - startat)
            });
            break;
        default:
            codes.splice(startat, 0, name + " struct");
            codes.push(name + ' ends');
    }
    locals = l;
    invokes = i;
    params = p;
}
function adddata(name, row) {
    if (queue.length) {
        codes.push(row);
        return
    }
    if (!name) {
        datas[lastdata] += "\r\n" + row;
        return;
    }
    lastdata = name;
    if (name in datas || name in procsMap) {
        throw new Error(`重复定义:${name}`);
    }
    datas[name] = row;
}
function addinvoke(name) {
    if (/^([\d]*|\d[a-f\d]*h?)$/i.test(name)) return;
    if (!invokes[name]) invokes[name] = true;
}
function getOutsideInvokes(proc) {
    var invokes = Object.keys(proc.invokes);
    invokes.filter(a => {
        return a !== proc.name && !(a in proc.locals) && !(a in proc.params);
    });
    return invokes;
}

function addlocal(local) {
    local = local.trim();
    if (!local) return;
    var [a, b] = local.split(":");
    a = a.trim();
    if (/^uses\s/i.test(a)) {
        a = a.split(/\s+/);
        a = a[a.length - 1];
        if (registers.test(a)) return;
    }
    if (b) b = ":" + b;
    locals[a] = b || ':DWORD';
}
var prefixrow = '';
function readrow(row) {
    row = row.trim();
    if (/\\$/.test(row)) {
        prefixrow += row.slice(0, row.length - 1);
        return;
    }
    row = prefixrow + row;
    prefixrow = '';
    var match = /^(\w+)\s+(proc|struct|macro|endm|ends|endp)(?:\s+|,|$)/i.exec(row);
    if (match) {
        if (/^end/i.test(match[2])) {
            leavequeue();
        } else {
            enterqueue(match[1], match[2].toLowerCase(), row);
            var temp = locals;
            locals = params;
            row.slice(match[0].length).split(',').forEach(addlocal);
            locals = temp;
            temp = '';
        }
        return;
    }
    var match = /^local\s+/.exec(row);
    if (match) {
        row.slice(match[0].length).replace(/;[\s\S]*/, '').split(',').forEach(addlocal);
        return;
    }
    var match = /^([^\s\:;\[\],\?~`'"\>\<\(\)\*\^\%\|\\\{\}\\\/\=\+\-]+)\s+(\w+)/i.exec(row);
    if (match && !operators.test(row)) {
        if (!/(equ|proto)/i.test(match[2])) return adddata(match[1], row);
    }
    var match = /^include(?:lib)?\s+/i.exec(row);
    if (match) {
        includes[match[0].trim() + " " + row.slice(match[0].length)] = true;
        return;
    }
    var match = /^(?:invoke|call)\s+([^,\s]+)/i.exec(row)
    if (match) {
        addinvoke(match[1]);
    }
    var match = /^[^\s\:;\[\],\?~`'"\>\<\(\)\*\^\%\|\\\{\}\\\/\=\+\-]+(\s+|$)/.exec(row);
    if (match && !/^end\s/i.test(match)) row.slice(match[0].length).replace(/([^,\s\:\+&\|\-\>\<\.\(\)\[\]\;\!\'\"\*]+)\s*(?:[,\.\|\)\[\]\;\+\-\=\*\>\<\!&\\]|$)/g, function (_, a) {
        if (/^([\d\.]+|NULL|FALSE|TRUE)$/.test(a)) return;
        if (registers.test(a)) return;
        if (operators.test(a)) return;
        addinvoke(a);
        return _;
    });
    codes.push(row);
}
var path = require("path")
function parse(text, filename, fullpath) {
    var name = path.basename(fullpath);
    String(text).split(/[\r\n]+/).forEach(readrow);
    var procNames = {};
    var equals = {};
    procs.forEach(a => {
        if (!procNames[a.name]) procNames[a.name] = true;
        getOutsideInvokes(a).forEach(addinvoke);
    });
    codes = codes.filter(a => {
        if (/^[^\s]+\s+equ\s+[^\s]+$/i.test(a)) {
            var [k, v] = a.split(/\s+equ\s+/i);
            equals[k] = v;
            return false;
        }
        return true;
    });
    var file = {
        includes,
        name: name.replace(/\.asm$/i, ''),
        procs,
        equals,
        datas,
        invokes: Object.keys(invokes),
        codes
    };
    clean();
    return file;
}

module.exports = parse;
