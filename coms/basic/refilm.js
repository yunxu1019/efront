function refilm(str) {
    if (str.raw) str = str.raw;
    return refilm_decode.apply(null, [str].concat([].slice.call(arguments, 1)));
}
var patchOffset = refilm.patchOffset = function (fields, offset = fields.offset || 0) {
    fields.offset = offset;
    fields.forEach(f => {
        f.offset = offset;
        fields[f.key] = f;
        offset += f.size * f.ratio;
    });
    fields.size = offset - fields.offset;
    return offset;
};
refilm.createFromFields = function (fields, values) {
    if (!fields.size) patchOffset(fields);
    var size = fields.size;
    var data = new Uint8Array(size);
    if (!values) values = Object.create(null);
    for (var f of fields) {
        if (f.key in values || !f.value) continue;
        values[f.key] = f.value;
    }
    writeFields(data, fields, values, 0);
    return data;
}
var writeField = refilm.writeField = function (data, field, value, offset = field.offset, byteLimit = field.size * field.ratio) {
    if (isArrayLike(value));
    else if (typeof value === "string") {
        value = encodeUTF8(value);
    }
    else if (typeof value === "number") {
        var v = [];
        var limit = byteLimit;
        while (limit-- > 0) {
            v.push(value & 0xff);
            value = value >>> 8;
        }
        if (value) throw new Error("数据过大");
        value = v;
    }
    else value = [value | 0];
    if (value.length > byteLimit) {
        throw new Error("数据超出大小限制！");
    }
    var offset = field.offset;
    while (value.length) data[offset++] = value.shift();
};
var writeFields = refilm.writeFields = function (data, fields, values, offset = fields.offset) {
    for (var f of fields) {
        var size = f.size * f.ratio;
        if (f.key in values) writeField(data, f, values[f.key], offset, size);
        offset += size;
    }
};
var toint = function (buf) {
    var n = 0;
    for (var cx = 0, dx = buf.length; cx < dx; cx++) {
        n += buf[cx] << (cx << 3);
    }
    return n;
};
var readField = refilm.readField = function (data, field, offset = field.offset, size = field.size * field.ratio) {
    return data.slice(offset, offset + size);
};

refilm.readFields = function (data, fields, offset = fields.offset || 0) {
    var res = Object.create(null);
    for (var f of fields) {
        var size = f.size * f.ratio;
        var v = readField(data, f, offset, size);
        if (size <= 4) v = toint(v);
        res[f.key] = v;
        offset += size;
    }
    return res;
};