
function scanBlock(piece) {
    if (!piece) return [];
    var reg = /\\[\s\S]|^\s*[#\-]\s*|\s+|"|'/mg;
    var res = [];
    var lastIndex = 0;
    for (var cx = 0, dx = piece.length; cx < dx; cx++) {
        reg.lastIndex = cx;
        var m = reg.exec(piece);
        if (m) {
            var s = m[0];
            if (/^\s+$/.test(s)) {
                res.push(piece.slice(lastIndex, reg.lastIndex));
                lastIndex = reg.lastIndex;
            }
            cx = m.index + s.length - 1;
        } else {
            res.push(piece.slice(lastIndex, piece.length));
            break;
        }
    }
    return res;
}

function scanSlant(str, s, lastIndex = 0, end = str.length) {
    s = s.replace(/[\/]/g, '\\$&');
    var reg = new RegExp(`${/\\[\s\S]/.source}|${s}`, 'g');
    var reg1 = new RegExp(`^${s}$`);
    var res = [];
    var start = lastIndex;
    while (lastIndex < end) {
        reg.lastIndex = lastIndex;
        var match = reg.exec(str);
        if (!match) {
            break;
        }
        lastIndex = match.index + match[0].length;
        if (!reg1.test(match[0])) {
            continue;
        }
        res.push(str.slice(start, match.index).replace(/\\\//g, '/'));
        start = lastIndex;
    }
    if (start < end) {
        res.push(str.slice(start, end).replace(/\\\//g, '/'));
    }
    return res;
}
var createOption = function (o) {
    return {
        name: o,
        toString() {
            return this.name;
        }
    };
};
function unfoldOptions(size, options) {
    size = Math.pow(2, size);
    for (var cx = 0, dx = options.length; cx < dx; cx++) {
        var o = options[cx];
        if (/^\.\.\.|\.\.\.$/.test(o)) {
            o = o.replace(/^\.\.\.|\.\.\.$/g, '');
            o = createOption(o);
            options.splice(cx, 1);
            var deltaLength = size - options.length;
            new Array(deltaLength).fill(o).forEach(a => {
                options.splice(cx, 0, a);
            });
            cx += deltaLength - 1;
            dx = options.length;
        } else {
            options[cx] = createOption(o);
        }
    }
    return options;
}

var last_type = '';
var piecepath = [];
function parse(piece) {
    piece = piece.filter(p => p.trim());
    if (/^\}/.test(piece[0])) {
        var f = piecepath.pop()
        last_type = f.last_type;
        delete f.last_type;
        return;
    }
    if (!piece.length) return;
    var isContainer = /\{$/.test(piece[piece.length - 1]);
    if (isContainer) {
        var p = piece[piece.length - 1];
        piece[piece.length - 1] = p.slice(0, p.length - 1);
    }
    var [name, type, options] = piece, key, repeat;
    if (piece.length === 1) {
        if (name instanceof Object) return name;
    }
    if (typeof name === 'string') {
        if (!isContainer) {
            if (!type) {
                switch (name.charAt(0)) {
                    case "#":
                    case "-":
                        type = "title";
                        name = name.replace(/^[\-#]+/, '');
                        break;
                    default:
                        type = last_type;
                }
            } else {
                last_type = type;
            }
        }
        if (/^\[[\s\S]*\]$/.test(name)) {
            repeat = true;
            name = name.replace(/^\[|\]$/g, '');
        }
        [name] = scanSlant(name, '/');
        if (key === undefined) key = name;
    }
    var sizematch = /^(\d+|\d*\.\d+)([YZEPTGMK]i?b?|byte|bit|B|)\b/i.exec(type);
    if (sizematch) {
        var [size_text, size, unit] = sizematch;
        var ratio = 'KMGTPEZY'.indexOf(unit.toUpperCase().charAt(0));
        size *= Math.pow(1024, ratio + 1);
        if (ratio >= 0) {
            unit = unit.slice(1).replace(/^i/, '');
        }
        if (unit === 'B') unit = "byte";
        else if (unit === 'b') unit = 'bit';
        unit = unit.toLowerCase();
        var ratio = unit === 'bit' ? .125 : 1;
        type = type.slice(size_text.length);
        if (/\=/.test(type)) {
            var value = type.slice(1, (size * ratio) + 1);
            type = type.slice(value.length + 1) || 'flag';
        }
        if (!type) {
            type = size + unit;
        } else {
            type = type.replace(/[\|\:\-\,]/);
        }
    }
    if (typeof options === "string") {
        var needUnfold = /^\[|\]$/.test(options);
        options = options.replace(/^\[|\]$/g, '');
        options = scanSlant(options, ',');
        if (needUnfold) unfoldOptions(size, options);
    }
    var field = { name, type, key, size, unit, ratio, value, repeat, options };
    var parent = piecepath[piecepath.length - 1];
    if (parent) {
        field.parent = parent;
        if (!parent.fields) parent.fields = [];
        parent.fields.push(field);
    }
    if (isContainer) {
        field.last_type = last_type;
        piecepath.push(field);
    }
    for (var k in field) {
        if (field[k] === undefined) {
            delete field[k];
        }
    }
    return field;
}

function refilm(str) {
    if (str.raw) str = str.raw;
    last_type = 'input';
    var result = [];
    var rest = [];
    var reg = /[\r\n\u2028\u2029]+|$/g;
    for (var cx = 0, dx = str.length; cx < dx; cx++) {
        var s = str[cx];
        var lastIndex = 0;
        do {
            reg.lastIndex = lastIndex;
            var m = reg.exec(s);
            if (!m) break;
            var piece = s.slice(lastIndex, m.index);
            piece = scanBlock(piece);
            if (m[0].length || cx + 1 === dx) {
                result.push(rest.concat(piece));
                rest.splice(0, rest.length);
            } else {
                if (piece) rest.push.apply(rest, piece);
            }
            lastIndex = m.index + m[0].length;
        } while (lastIndex < s.length);
        if (lastIndex < s.length) {
            rest.push(s.slice(lastIndex, s.length));
        }
        rest.push(arguments[cx + 1]);
    }
    var fields = result.map(parse).filter(a => !!a && !a.parent);
    piecepath.splice(0, piecepath.length);
    return fields;
}