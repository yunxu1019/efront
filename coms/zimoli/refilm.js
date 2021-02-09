"use ../basic/KMGT.txt"
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
var eval_reg = /0[xob]\d+|(?:\d*\.)?\d+|([^\+\-\*\/\\\?\:\|\&\^\%\!\~\>\<\(\)\[\]\=]+)/g;
function evalExpress(express) {
    var o = this;
    express = express.replace(eval_reg, function (_, b) {
        if (!b) return parseNumber(_);
        if (b in o) {
            return +o[b];
        }
        return _;
    });
    return eval(`${express}`);
}
var createEval = function (express, value) {
    var finded;
    express = express.replace(eval_reg, function (_, b) {
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

function xto0(x) {
    return 1 - /^x$/i.test(x);
}
function bitTest(mask, sample, value) {
    return (value & mask) === sample;
}
function parseNumber(str) {
    var s = 10;
    if (!isString(str)) return str;
    switch (str.slice(0, 2).toLowerCase()) {
        case "0x":
            s = 16;
            break;
        case "0o":
            s = 8;
            break;
        case "0b":
            s = 2;
            break;
        default:
            return parseFloat(str);
    }
    str = str.slice(2);
    if (/x/i.test(str)) {
        return bitTest.bind(null,
            parseInt(str.replace(/[\s\S]/g, xto0), 2),
            parseInt(str.replace(/x/g, '0'), 2)
        );
    }
    return parseInt(str, s);
}

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
            var ratio = /^(bit|utf)$/.test(unit) ? .125 : 1;
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

var numberFromBuffer = function (buff, start = 0, end = buff.length << 3) {
    var num = 0, index = start >> 3, bitIndex = start;
    start = start - index;
    if (start > 0) {
        var delta = buff[index];
        num += delta << start >> start;
        index++;
    }
    bitIndex = index << 3;
    var rest = index + (end - bitIndex >> 3);
    while (index < rest) {
        var delta = buff[index];
        num = num * 256;
        num += delta;
        index++;
    }
    bitIndex = index << 3;
    if (bitIndex < end) {
        var delta = buff[index];
        var bitrest = end - bitIndex;
        num = num * Math.pow(2, bitrest) + (delta >> 8 - bitrest);
    }
    return num;
};
var numberFromSmallEnd = function (buff) {
    var cx = buff.length, sum = 0;
    while (cx-- > 0) {
        sum *= 256;
        sum += buff[cx]
    }
    return sum;
};
var getUTF8Rest = function (bit) {
    if (bit < 192 || bit > 255) return 0;
    return 7 - Math.log2(256 - bit) | 0;
};
var bufferToUTF8IntFunc = [
    // 0b0xxxxxxx - 0b10xxxxxx
    (buff, cx) => buff[cx],
    // 0b110xxxxx 10xxxxxx
    (buff, cx) => ((buff[cx] & 0b00011111) << 6) + (buff[++cx] & 0b00111111),
    // 0b1110xxxx 10xxxxxx 10xxxxxx
    (buff, cx) => ((buff[cx] & 0b00001111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111),
    // 0b11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    (buff, cx) => ((buff[cx] & 0b00000111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111),
    // 0b111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
    (buff, cx) => (buff[cx] & 0b00000011) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111),
    // 0b1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
    (buff, cx) => (buff[cx] & 0b00000001) * Math.pow(2, 30) + (buff[++cx] & 0b00111111) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111),
    // 0b11111110 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
    (buff, cx) => (buff[++cx] & 0b00111111) * Math.pow(2, 30) + (buff[++cx] & 0b00111111) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111),
    // 0b11111111 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
    (buff, cx) => (buff[++cx] & 0b00111111) * Math.pow(2, 36) + (buff[++cx] & 0b00111111) * Math.pow(2, 30) + (buff[++cx] & 0b00111111) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
];
var bufferToUTF8String = function (buff) {
    var dist = [];
    for (var cx = 0, dx = buff.length; cx < dx; cx++) {
        var rest = getUTF8Rest(buff[cx]);
        var s = bufferToUTF8IntFunc[rest](buff, cx);
        dist.push(String.fromCharCode(s));
        cx += rest;
    }
    return dist.join('');
};

var bufferToUTF8Int = function (buff, cx = 0) {
    var rest = getUTF8Rest(buff[cx]);
    var s = bufferToUTF8IntFunc[rest](buff, cx);
    return s;
};

var getUnaryRest = function (buff, index, flag) {
    var binc = index * 8;
    var savedb = binc;
    do {

        var i = binc / 8 | 0;
        var b = binc - i * 8;
        if (i >= buff.length) break;
        var byte = buff[i];
        var bit = byte << b >> 7 - b;
        binc++;
    } while (flag !== bit);
    return binc - savedb;
}

var readFromIndex = function (data, index, offset) {
    var byteIndex = index | 0;
    var bitIndex = (index - byteIndex) * 8;
    var byteOffset = offset | 0;
    var bitOffset = (offset - byteOffset) * 8;
    if (bitOffset > 0) {
        byteOffset++;
        bitOffset = 8 - bitOffset;
    }
    var bytes = data.slice(byteIndex, byteOffset);
    if (bitOffset > 0 || bitIndex > 0) bytes = bytes.map(copy);
    if (bitOffset > 0) {
        bytes[bytes.length - 1] = bytes[bytes.length - 1] >> bitOffset << bitOffset;
    }
    if (bitIndex > 0) {
        for (var cx = 0, dx = bytes.length - 1; cx < dx; cx++) {
            bytes[cx] = (bytes[cx + 1] >> (8 - bitIndex)) + (bytes[cx] << bitIndex);
        }
        bytes[bytes.length - 1] = bytes[bytes.length - 1] << bitIndex;
    }
    if (bitIndex + bitOffset >= 8) {
        bytes = bytes.slice(0, bytes.length - 1);
    }
    return bytes;
};
var copy = a => a;

var proto = {
    parse(data, start = 0) {
        var fields = this;
        var index = start;
        var map = Object.create(null), map_start = index, map_end, total = data.length;
        var readlist = function (fields, inc) {
            if (index >= total) return null;
            var saved_map = map;
            var saved_start = map_start;
            var saved_total = total;
            var saved_end = map_end;
            map = Object.create(map);
            map_start = index;
            map_end = undefined;
            if (isFinite(inc)) map.$index = inc;
            for (var cx = 0, dx = fields.length; cx < dx; cx++) {
                var field = fields[cx];
                if (field.needs) {
                    if (!check(map, field.needs)) continue;
                }
                var value1 = readone(field);
                if (field.key) {
                    map[field.key] = value1;
                }
                if (index >= total) break;
            }
            if (map_end) index = map_end;
            var value = map;
            map = saved_map;
            total = saved_total;
            map_start = saved_start;
            map_end = saved_end;
            if (dx === 1 && !field.key) {
                return value1;
            }
            return value;
        };

        var read = function (field, inc) {
            var { size, ratio = 1, type } = field;
            if (/^\./.test(type)) {
                var option = map[type.slice(1)];
                if (option && option.fields instanceof Array) {
                    var value = readone(option);
                    if (!option.key) {
                        extend(map, value);
                    } else {
                        map[option.key] = value;
                    }
                }
                return value;
            }
            if (/^\-/.test(type)) {
                var c = /\|$/.test(type);
                if (c) type = type.slice(0, type.length - 1);
                var rest_size = evalExpress.call(map, type.slice(1));
                total = map_end = rest_size + index;
                var range = [index, map_end];
                if (c) total = map_end = Math.ceil(map_end);
                return range;
            }
            if (/^=/.test(type)) {
                return evalExpress.call(map, type.slice(1));
            }
            if (size === undefined && isString(field.type)) {
                size = (map_end - index) / ratio;
            } else if (/^\:/.test(size)) {

                size = evalExpress.call(map, size.slice(1));
            }
            if (index >= total) {
                value = null;
            }
            if (field.fields) {
                value = readlist(field.fields, inc);
            }
            else if (/^unary/i.test(field.type)) {
                value = getUnaryRest(data, index, size);
                offset = index + value / 8;
            }
            else if (size > 0) {
                var offset = index + size * ratio;
                var bytes = readFromIndex(data, index, offset);
                var value = bytes;
                if (/^utf/i.test(field.type)) {
                    offset += getUTF8Rest(bytes[0]);
                    bytes = readFromIndex(data, index, offset);
                    value = bufferToUTF8String(bytes, 0);
                }
                else if (/^small$/i.test(field.type)) {
                    value = numberFromSmallEnd(value);
                }
                else if (/^(string|str)$/i.test(field.type)) {
                    window[field.key] = value;
                    value = bufferToUTF8String(value);
                }
                else if (/^num$|^number$|^int$|^integer$|^float$|^uint$/i.test(field.type)) {
                    value = numberFromBuffer(value, 0, field.size * field.ratio * 8);
                }
                else if (/^bool$|^boolean$/i.test(field.type)) {
                    value = !!numberFromBuffer(value, 0, field.size * field.ratio * 8);
                }
                else if (/^raise$/i.test(field.type)) {
                    value = 1 + numberFromBuffer(value, 0, field.size * field.ratio * 8);
                }
                else {
                    value = bytes.map(copy);
                }
                index = offset;
            }

            if (field.options) {
                if (field.options instanceof Array) {
                    var option_index = numberFromBuffer(bytes, 0, field.size * field.ratio * 8);
                    if (option_index in field.options) {
                        var option = field.options[option_index];
                        value = option;
                    } else {
                        value = option_index;
                    }
                }
            }
            return value;
        };
        var readone = function (field) {
            var inc = 0;
            var value = read(field, inc);
            if (field.repeat) {
                var result = [value];
                var { size } = field;
                if (/^\:/.test(size)) {
                    size = evalExpress.call(map, size.slice(1));
                }
                while (!field.endwith || !check(value, field.endwith)) {
                    if (result.length >= size) break;
                    if (index < total) {
                        let temp_index = index;
                        value = read(field, ++inc);
                        if (index === temp_index) break;
                        result.push(value);
                    }
                    else break;
                }
                return result;
            }
            return value;
        }

        return readlist(fields);
    },
    reset() { }
};

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
    extend(fields, proto);
    return fields;
}