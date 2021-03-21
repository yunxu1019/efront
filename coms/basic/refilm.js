"use ./KMGT.txt"
function scanBlock(piece) {
    if (!piece) return [];
    var reg = /\\[\s\S]|^\s*[#\-]\s*|\s+|"|'/mg;
    var res = [];
    var lastIndex = 0;
    var save = function (a) {
        var inquote = false;
        a = a.replace(/\\[\s\S]|(['"`]+)/g, (m, q) => {
            if (!q) {
                return m;
            }
            if (q.length % 2) {
                inquote = !inquote;
            }
            q = q.slice(0, q.length >> 1);
            return q;
        });
        res.push(a);
    };
    for (var cx = 0, dx = piece.length; cx < dx; cx++) {
        reg.lastIndex = cx;
        var m = reg.exec(piece);
        if (m) {
            var s = m[0];
            if (/^\s+$/.test(s)) {
                save(piece.slice(lastIndex, reg.lastIndex));
                lastIndex = reg.lastIndex;
            } else if (/^["']$/i.test(s)) {
                var i = piece.indexOf(s, cx + 1);
                if (i > 0) {
                    cx = i;
                    continue;
                }
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

function scanNeeds(str) {
    var conditions = [], cached = [];
    str.split(",").forEach(function (s) {
        if (!cached.length) cached.push(s);
        else if (/=/.test(s) && !/^[^\=]*&/.test(s)) {
            conditions.push(cached.join(','))
            cached = [s];
        } else {
            cached.push(s);
        }
    });
    if (cached.length) conditions.push(cached.join(","));
    conditions = conditions.map(c => {
        return parseValue(parseKV(c));
    });
    if (conditions.length === 1) return conditions[0];
    return conditions;
}

var toName = function () {
    return this.name;
};
var toValue = function () {
    return this.value;
}
var createEval = function (express, value) {
    var finded;
    express = express.replace(refilm_eval_reg, function (_, b) {
        if (!b) return parseNumber(_);
        if (b === '@' || b === '$&') {
            return value;
        } else {
            finded = true;
        }
        return _;
    });

    if (!finded) return eval(`[function(){return ${express}}][0]`)();
    return createOption({
        value,
        name: express
    });
};

var createOption = function (o) {
    if (isObject(o)) {
        o.toString = toName;
        o.valueOf = toValue;
        return o;
    }
    return {
        name: o,
        valueOf: toValue,
        toString: toName
    };
};
function unfoldOptions(size, options) {
    size = Math.pow(2, size);
    for (var cx = 0, dx = options.length; cx < dx; cx++) {
        var o = options[cx];
        if (typeof o === 'string') {
            o = { name: o };
        }
        var range = rangereg.exec(o.name);
        if (range) {
            var [m, start = cx, end = size] = range;
            [start, end] = parseIntegerList([start, end]);
            if (end - cx + options.length > size) end = size - options.length + cx;
            if (start < cx) start = cx;
            o.name = o.name.slice(m.length);
            if (start <= end) {
                options.splice(cx, 1);
                while (cx < start) options.splice(cx++, 0, undefined);
                while (cx <= end) options.splice(cx, 0, createEval(o.name, cx++));
                cx = end;
                dx = options.length;
            }
        } else if (/^\.\.\.|\.\.\.$/.test(o.name)) {
            o.name = o.name.replace(/^\.\.\.|\.\.\.$/g, '');
            o = createOption(o);
            options.splice(cx, 1);
            var deltaLength = size - options.length;
            for (let cy = 0, dy = deltaLength; cy < dy; cy++) {
                options.splice(cx, 0, o);
            }
            cx += deltaLength - 1;
            dx = options.length;
        } else {
            if (number_reg.test(o.name)) {
                o = parseNumber(o.name);
            } else {
                var o = createOption(o);
                o.value = cx;
            }
            options[cx] = o;
        }
    }
    return options;
}
var rangereg = /^(0[oxb][a-f\d]+|\d+)?[\-\:]((?:0[oxb])?[a-f\d]+|\d+)?\:?/i;


var number_reg = /^(0[obx])?(\d*\.)?\d+$/i;
function parseIntegerList(list) {
    var prev;
    return list.map(function (a) {
        var m = /^0[obx]/.exec(a);
        if (m) {
            prev = m[0];
        } else if (prev && /^[a-f\d\x]+$/.test(a)) {
            return parseNumber(prev + a);
        }
        return parseNumber(a || undefined);
    });
}

function parseValue(map) {
    if (map instanceof Array) {
        return map.map(parseValue);
    }
    if (map instanceof Object) {
        var dist = {};
        for (var k in map) {
            var o = map[k];
            dist[k] = parseValue(o);
        }
        return dist;
    }
    if (/^([`'"])[\s\S]+\1$/.test(map)) {
        return map.slice(1, map.length - 1).replace(/\\([\s\S])/g, '$1');
    }
    if (!map) return map;
    if (/,/.test(map)) {
        return parseIntegerList(map.split(','));
    }
    switch (map.toLowerCase()) {
        case "false":
        case ".f.":
        case ".n.":
            return false;
        case "true":
        case ".t.":
        case ".y.":
            return true;
        case "null":
        case "nil":
            return null;
    }
    return parseNumber(map);
}

var last_type = '';
var piecepath = [];
function parse(piece) {
    piece = piece.map(p => isString(p) ? p.trim() : p).filter(p => p);
    if (/^[\}\]]/.test(piece[0])) {
        var f = piecepath.pop()
        last_type = f.last_type;
        delete f.last_type;
        if (f.options instanceof Array) {
            unfoldOptions(f.size, f.options);
        }
        return;
    }
    if (!piece.length) return;
    var isContainer = /[\{\[]$/.test(piece[piece.length - 1]);
    if (isContainer) {
        var p = piece[piece.length - 1];
        piece[piece.length - 1] = p.slice(0, p.length - 1);
    }
    var [name, type, options] = piece, key, repeat;
    if (piece.length === 1 && isObject(name)) {
        var { name, needs, type, key, size, unit, endwith, ratio, value, repeat, options } = name;
    } else {
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
            if (/^\([\s\S]*\)$/.test(name) && /,/.test(name)) {
                var [, name, rest_piece] = /^([^,]*),([\s\S]*)$/.exec(name.slice(1, name.length - 1));
                if (rest_piece && !/=/.test(rest_piece)) {
                    var needs = { [name]: parseValue(rest_piece) };
                } else {
                    var needs = scanNeeds(rest_piece);
                }
            }
            if (/^\[[\s\S]*\]$/.test(name)) {
                repeat = true;
                name = name.replace(/^\[|\]$/g, '');
                if (/\,/.test(name)) {
                    var commaindex = name.indexOf(",");
                    var endwith = parseKV(name.slice(commaindex + 1));
                    endwith = parseValue(endwith);
                    name = name.slice(0, commaindex);
                }
            }
            [name, key] = scanSlant(name, '/');
            if (key === undefined) key = name;
        }
        if (/^[a-z]+\d+$/i.test(type)) {
            let [_, t, d] = /^([a-z]+)(\d+)$/.exec(type);
            type = d + 'bit/' + t;
        }
        var sizematch = /^(\-?\d+|\-?\d*\.\d+)([YZEPTGMK]i?b?|bytes?|bits?|B|)\b/i.exec(type);
        if (sizematch) {
            var [size_text, size, unit] = sizematch;
            var ratio = KMGT.indexOf(unit.toUpperCase().charAt(0));
            size *= Math.pow(1024, ratio + 1);
            if (ratio >= 0) {
                unit = unit.slice(1).replace(/^i/, '');
            }
            if (unit === 'B') unit = "byte";
            else if (unit === 'b') unit = 'bit';
            unit = unit.toLowerCase();
            var ratio;
            switch (unit) {
                case "long":
                case "double":
                    if (!size) size = 8;
                case "float":
                case "uint":
                case "int":
                    if (!size) size = 4;
                case "bit":
                case "utf":
                case "bool":
                case "boolean":
                    ratio = .125;
                    break;
                case "word":
                    ratio = 2;
                    break;
                case "dword":
                    ratio = 4;
                    break;
                case "byte":
                default:
                    ratio = 1;
            }
            type = type.slice(size_text.length);
            if (/\=/.test(type)) {
                var value = type.slice(1, (size * ratio) + 1);
                type = type.slice(value.length + 1) || 'flag';
            }
            if (!type) {
                type = size + unit;
            } else {
                type = type.replace(/^[\|\:\-\,\/]/, '');
            }
        } else if (/^\:[^\/\:\-\,\/]+/.test(type)) {
            var size = /^\:[^\/\:\-\,\/]+/.exec(type)[0];
            type = type.slice(size.length + 1);
            if (!type) {
                type = size.slice(1);
            }
        } else if (/^[\/]/.test(type)) {
            type = type.slice(1);
        }
        if (typeof options === "string") {
            var needUnfold = /^\[|\]$/.test(options);
            options = options.replace(/^\[|\]$/g, '');
            options = scanSlant(options, ',');
            if (needUnfold) unfoldOptions(size, options);
        }
    }
    var field = { name, needs, type, key, size, unit, endwith, ratio, value, repeat, options };
    var parent = piecepath[piecepath.length - 1];
    if (parent) {
        field.parent = parent;
        if (parent.options) {
            parent.options.push(field);
        } else {
            if (!parent.fields) parent.fields = [];
            parent.fields.push(field);
        }
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