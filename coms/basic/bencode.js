function bencode(object) {
    if (isString(object)) return `${object.length}:${object}`;
    if (isNumber(object)) return `i${object}e`;
    if (isArray(object)) return `l${object.map(bencode).join('')}e`;
    if (isEmpty(object)) return ``;
    if (!isObject(object)) return ``;
    var res = [];
    for (var k in object) {
        var o = object[k];
        if (isEmpty(o)) continue;
        res.push(bencode(k), bencode(o));
    }
    return `d${res.join('')}e`;
}