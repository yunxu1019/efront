var seek = function (keeys, o) {
    var cx = 0;
    for (var cx = 0, dx = keeys.length; cx < dx; cx++) {
        if (o === null || o === undefined) return '';
        var key = keeys[cx];
        o = o[key];
    }
    if (o === undefined) return '';
    return o;
};
var createseek = function (content) {
    var keys = String(content || '').trim().split('.').map(a => a.trim());
    var res = seek.bind(null, keys);
    return res;
};