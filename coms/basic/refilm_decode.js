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
    var start = lastIndex, start;
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
        if (lastIndex === start) {
            lastIndex++;
            continue;
        }
        res.push(str.slice(start, match.index).replace(/\\([\s\S])/g, '$1'));
        start = lastIndex;
    }
    if (start < end) {
        res.push(str.slice(start, end).replace(/\\([\s\S])/g, '$1'));
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
    express = express.replace(refilm_common.eval_reg, function (_, b) {
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
    if (/^[\d\.]/.test(map)) return parseNumber(map);
    return map;
}

var last_type = '';
var piecepath = [];
var getComment = function (piece) {
    for (var cx = 0, dx = piece.length; cx < dx; cx++) {
        var p = piece[cx];
        if (!isString(p)) continue;
        var a = /^(\/\/|;)/.exec(p);
        if (a) {
            return piece.splice(cx, piece.length - cx).join(' ').slice(2);
        }
    }
    return '';
};
function parse(piece) {
    if (/^[\-#]+$/.test(piece[0])) {
        var piece0 = piece.pop();
        piece[0] = piece0 + (piece[0] || '').trim();
    }

    piece = piece.map(p => isString(p) ? p.trim() : p).filter(p => !isEmpty(p));
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
    var comment = getComment(piece);
    var isContainer = /[\{\[]$/.test(piece[piece.length - 1]);
    if (isContainer) {
        var p = piece[piece.length - 1];
        piece[piece.length - 1] = p.slice(0, p.length - 1);
    }
    var [name, type, options] = piece, key, repeat;
    if (piece.length === 1 && isObject(name)) {
        var {
            name, type, key, value, comment, options,
            size, unit, ratio,
            needs, checks, repeat, endwith,
            required, inlist, hidden, readonly,
            delete_onempty, delete_onsubmit,
        } = name;
    } else {
        var test = (reg, a) => {
            if (reg.test(a)) {
                return true;
            }
        };
        var is = function (a) {
            var reg = /^[\*\+\-\!\-\$&\?\~]|[\*\+\-\!\-\$&\?\~]$/;
            if (!reg.test(a)) return a;
            required = test(/^\*|\*$/, a);
            if (test(/^[\+]|[\+]$/, a)) inlist = true;
            if (test(/^[\!]|[\!]$/, a)) inlist = false;
            hidden = test(/^\-|\-$/, a);
            readonly = test(/^[\$&]|[\$&]$/, a);
            delete_onempty = test(/^\?|\?$/, a);
            delete_onsubmit = test(/^\~|\~$/, a);
            return a.replace(reg, '');
        };
        var type1 = is(type);
        if (typeof name === 'string') {
            if (!isContainer) {
                if (!type) {
                    switch (name.charAt(0)) {
                        case "#":
                            type = "title";
                        case "-":
                            type = "label";
                            name = name.replace(/^[\-#]+\s*/, '');
                            break;
                        default:
                            type = last_type;
                    }
                } else {
                    type = type1;
                    last_type = type;
                }
            }
            if (/^\([\s\S]*\)$/.test(name) && /,/.test(name)) {
                var [, name, rest_piece] = /^([\s\S]*?),([^\]]*)$/.exec(name.slice(1, name.length - 1));
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
            [name, key] = scanSlant(name, '/', 0, name.length + 1);
            if (key === undefined && !/^(title|label|headline)$/i.test(type)) key = name;
        }
        if (/^[a-z\d]+\/?\d+$/i.test(type)) {
            let [_, t, d] = /^(\w*?)\/?(\d+)$/.exec(type);
            type = d + 'bit/' + t;
        }
        var sizematch = /^(\-?\d+|\-?\d*\.\d+)?([YZEPTGMK]i?b?|bytes?|bits?|words?|dword|real[48]|long|B|[^\/]*)([\/]|$|\s|\=)/i.exec(type);
        if (sizematch) {
            var [size_text, size = 1, unit, eq] = sizematch;
            if (unit && /^i?b?$/i.test(unit.slice(1))) {
                let ratio = KMGT.indexOf(unit.toUpperCase().charAt(0));
                size *= Math.pow(1024, ratio + 1);
                if (ratio >= 0) {
                    unit = unit.slice(1).replace(/^i/, '');
                }
            }
            if (unit === 'B') unit = "byte";
            else if (unit === 'b') unit = 'bit';
            unit = unit.toLowerCase();
            var ratio;
            switch (unit) {
                case "long":
                case "qword":
                case "real8":
                case "double":
                    ratio = 8;
                    break;
                case "dword":
                case "real":
                case "real4":
                case "float":
                case "uint":
                case "int":
                    ratio = 4;
                    break;
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
                default:
                    if (!unit) unit = "byte";
                    ratio = 1;
            }
            type = type.slice(size_text.length);
            if (eq === '=') {
                // 只读
                var value = parseValue(type);
                type = "flag";
            }
            else if (/=/.test(type)) {
                [type, value] = type.split("=");
                value = parseValue(value);
            }
            if (!type) {
                type = (!sizematch[1] ? '' : size) + unit;
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
        if (typeof options === "string" && !/^[\$#]+\d+$/.test(options)) {
            options = is(options);
            var needUnfold = /^\[|\]$/.test(options);
            options = options.replace(/^\[|\]$/g, '');
            if (needUnfold || /,/.test(options)) options = scanSlant(options, ',');
            else options = scanSlant(options, "");
            if (needUnfold) unfoldOptions(size, options);
        }
        name = is(name);
        key = is(key);
    }
    var field = {
        name, type, key, value, comment, options,
        size, unit, ratio,
        needs, checks, repeat, endwith,
        required, inlist, hidden, readonly,
        delete_onempty, delete_onsubmit,
    };
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

function refilm_decode(str) {
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