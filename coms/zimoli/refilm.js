
function scan(piece) {
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
var last_type = '';
function parse(piece) {
    piece = piece.filter(p => p.trim());
    if (!piece.length) return;
    var [name, type, key] = piece;
    if (piece.length === 1) {
        if (name instanceof Object) return name;
    }
    if (typeof name === 'string') {
        name = name.trim();
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
    return { name, type, key, size, unit, ratio, value };
}
function refilm(str) {
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
            piece = scan(piece);
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
    return result.map(parse).filter(a => !!a);
}