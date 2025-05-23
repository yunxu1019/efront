"use strict";
var pinyin = null;
var isABC = a => /^[a-zA-Z]$/.test(a);
let len1, len2, begin1, begin2, end1, end2, coverLength;
let s, m, ct, dt, c1, c2, source, marker;
var isLike = function () {
    var is = isABC(s), im = isABC(m);
    if (is && im) return s.toLowerCase() === m.toLowerCase();
    if (im) {
        if (pinyin.py(s).indexOf(m.toLowerCase()) < 0) return false;
        var py = pinyin.pinyin(s).split('|');
        var i = 1;
        var t = c2 + ct;
        for (var p of py) {
            if (p.length + t <= len2 && p.indexOf(marker.slice(t, p.length + t).toLowerCase()) === 0) i = p.length;
        }
        c2 += i - 1;
        dt = setDt();
        return true;
    }
    return false;
};
var setDt = function () {
    var d1 = len1 - c1;
    var d2 = len2 - c2;
    return d1 > d2 ? d2 : d1;
};
var run = function () {
    var cc = c2;
    var start = 0, end = 0;
    for (ct = 0, dt = setDt(); ct < dt; ct++) {
        s = source.charAt(c1 + ct);
        m = marker.charAt(c2 + ct);
        if (s === m || pinyin && isLike()) {
            end = ct + 1;
            var matchLength = c2 + end - cc - start;

            if (end === dt && matchLength > coverLength) {
                begin1 = c1 + start;
                begin2 = cc + start;
                end2 = c2 + end;
                end1 = c1 + end;
                coverLength = matchLength;
            }
        } else {
            var matchLength = c2 + end - cc - start;
            if (matchLength > coverLength) {
                begin1 = c1 + start;
                begin2 = cc + start;
                end1 = c1 + end;
                end2 = c2 + end;
                coverLength = matchLength;
            }
            cc = c2;
            start = ct + 1;
        }
    }
};
var couple = function (source1, marker1, py) {
    var py1 = pinyin;
    if (py) pinyin = py;
    len1 = source1.length;
    len2 = marker1.length;
    source = source1;
    marker = marker1;
    begin1 = 0;
    begin2 = 0;
    end1 = 0;
    end2 = 0;
    coverLength = 0;
    for (c1 = 0; c1 < len1; c1++) c2 = 0, run();
    for (c1 = 0, c2 = 1; c2 < len2; c2++) run();
    pinyin = py1;
    return [source1.slice(begin1, end1), begin1, begin2, end2];
};
couple.setPinyin = function (py) {
    pinyin = py;
};