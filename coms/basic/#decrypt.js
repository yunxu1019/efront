var String = window.String;
var uncode = function (text) {
    var ratio = 1;
    var sum = 0;
    for (var cx = 0, dx = text.length; cx < dx; cx++) {
        var code = text.charCodeAt(cx);
        sum += (code < 63 ? code - 39 : code < 93 ? code - 42 : code - 43) * ratio;
        ratio *= 84;
    }
    return sum;
}
var decrypt = function (text, start) {
    var rest = [];
    for (var cx = 0, dx = text.length; cx < dx; cx++) {
        var delta = text.charCodeAt(cx);
        if (delta < 44) {
            // 39-44 = -(delta -39)
            delta = 39 - delta;
        } else if (delta < 50) {
            // 44-50
            delta = delta - 44;
        } else if (delta < 55) {
            // 50-55 = -(34+delta)
            cx++;
            var next = cx + delta - 50;
            delta = -uncode(text.slice(cx, next + 1)) - 33;
            cx = next;
        } else if (delta < 60) {
            // 55-60 = -(34+delta)
            cx++;
            var next = cx + delta - 55;
            delta = 39 + uncode(text.slice(cx, next + 1));
            cx = next;
        } else if (delta < 92) {
            // 63-92 =- (5+delta-63)
            delta = 58 - delta;
        } else {
            // 93- = 6+ delta-93
            delta = delta - 87;
        }
        start = start + delta;
        rest.push(String.fromCharCode(start));
    }
    return rest.join('');
};