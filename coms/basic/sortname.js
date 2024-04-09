var minus = function (d1, d2) {
    d1 = d1.split(".");
    d2 = d2.split(".");
    for (var cx = 0, dx = Math.max(d1.length, d2.length); cx < dx; cx++) {
        var a = +d1[cx] || 0;
        var b = +d2[cx] || 0;
        if (a !== b) {
            return a - b;
        }
    }
    return 0;
};

var createMap = function (str) {
    str = str.split('');
    var map = {};
    for (var cx = 0, dx = str.length; cx < dx; cx++) {
        map[str[cx]] = cx;
    }
    return map;
};
var 甲乙丙丁戊己庚辛壬癸 = "甲乙丙丁戊己庚辛壬癸";

var map一二三 = extend(createMap("零一二三四五六七八九"), createMap("〇壹贰叁肆伍陆柒捌玖"));
var power = {
    拾: 10,
    十: 10,
    佰: 100,
    百: 100,
    仟: 1000,
    千: 1000,
    万: 10000,
    萬: 10000,
    亿: 100000000,
};
var parse一二三 = function (a) {
    if (!/[十百千万亿拾佰仟萬]/.test(a)) return parseInt(a.split("").map(a => map一二三[a]).join(''));
    var base = 0;
    a.replace(/([^十百千万亿拾佰仟萬零〇]*)([十百千万亿拾佰仟萬]*)/g, function (_, a, b) {
        if (!_) return;
        if (!a) a = 1;
        else a = map一二三[a];
        var r = 1;
        b.split('').forEach(b => r *= power[b]);
        base += a * r;
    })
    return base;
};
var map甲乙丙 = createMap("甲乙丙丁戊己庚辛壬癸");
var map子丑寅 = createMap("子丑寅卯辰巳午未申酉戌亥");
var map上中下 = createMap("前上中下后");

var reg123 = /^(\d+|\d+[\.\d]+\d+)[\s\S]*$/;
var reg一二三 = /^([一二三四五六七八九十百千万亿壹贰叁肆伍陆柒捌玖拾佰仟萬零〇]+)[\s\S]*$/;
var reg甲乙丙 = /^([甲乙丙丁戊己庚辛壬癸])[\s\S]*$/;
var reg子丑寅 = /^([子丑寅卯辰巳午未申酉戌亥])[\s\S]*$/;
var reg上中下 = /^([前上中下后])[\s\S]*$/;
var reg天干地支 = /^([甲乙丙丁戊己庚辛壬癸][子丑寅卯辰巳午未申酉戌亥])[\s\S]*$/;

var getDelta = function (a, b, reg, parse) {
    var match1 = reg.exec(a);
    var match2 = reg.exec(b);
    if (match1 && match2) {
        var [, d1] = match1;
        var [, d2] = match2;
        if (parse) {
            d1 = parse(d1);
            d2 = parse(d2);
            var delta = d1 - d2;
        } else {

            var delta = minus(d1, d2);
        }
        if (delta) return delta;
    }
    if (match1) return -1;
    if (match2) return 1;
    return 0;
};
var parse干支 = function (a) {
    var [g, z] = a;
    g = map甲乙丙[g];
    z = map子丑寅[z];
    return (12 + g - z) % 12 / 2 * 10 + g + 1;
};
var compare = function (a, b) {
    for (var cx1 = a.length - 1, cx2 = b.length - 1; cx1 >= 0 && cx2 >= 0; cx1--, cx2--) {
        while (/[\s\u00a0]/.test(a[cx1])) cx1--;
        while (/[\s\u00a0]/.test(b[cx2])) cx2--;
        if (a[cx1] !== b[cx2] || a[cx1] in map子丑寅 || a[cx1] in map上中下 || a[cx1] in map一二三 || a in power || /^\d$/.test(a[cx1])) break;
    }
    a = a.slice(0, cx1 + 1);
    b = b.slice(0, cx2 + 1);
    for (var cx1 = 0, cx2 = 0, dx1 = b.length, dx2 = b.length; cx1 < dx1 && cx2 < dx2; cx1++, cx2++) {
        while (/[\s\u00a0]/.test(a[cx1])) cx1++;
        while (/[\s\u00a0]/.test(b[cx2])) cx2++;
        if (a[cx1] !== b[cx2] || a[cx1] in map甲乙丙 || a[cx1] in map上中下 || a[cx1] in map一二三 || a in power || /^\d/.test(a[cx1])) break;
    }
    if (cx1) a = a.slice(cx1);
    if (cx2) b = b.slice(cx2);
    if (!a) return -1;
    if (!b) return 1;
    var delta = getDelta(a, b, reg123);
    if (delta) return delta;
    delta = getDelta(a, b, reg一二三, parse一二三);
    if (delta) return delta;
    delta = getDelta(a, b, reg天干地支, parse干支);
    if (delta) return delta;
    delta = getDelta(a, b, reg甲乙丙, d => map甲乙丙[d]);
    if (delta) return delta;
    delta = getDelta(a, b, reg子丑寅, d => map子丑寅[d]);
    if (delta) return delta;
    delta = getDelta(a, b, reg上中下, d => map上中下[d]);
    if (delta) return delta;
    return 0;
}
function sortname() {
    var [list = this] = arguments;
    if (this !== arguments[1] && arguments.length === 2) {
        return compare(arguments[0], arguments[1]);
    }
    list = list.sort(compare);
    return list;
}