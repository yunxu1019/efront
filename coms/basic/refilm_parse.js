function evalExpress(express) {
    var o = this;
    express = express.replace(refilm_common.eval_reg, function (_, b) {
        if (!b) return parseNumber(_);
        if (b in o) {
            return +o[b];
        }
        return _;
    });
    return eval(`${express}`);
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

var getUTF8Rest = function (bit) {
    if (bit < 192 || bit > 255) return 0;
    return 7 - Math.log2(256 - bit) | 0;
};

var copy = a => a;


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
};


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

function refilm_parse(data, start = 0) {
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
            else if (/^(small|little|small-end|litte-end|end)$/i.test(field.type)) {
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
}