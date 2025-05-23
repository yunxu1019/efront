"use strict";
var MARK_PRE1, MARK_PRE2, _PRE1, _PRE2 = _PRE1 = "<b>";
var MARK_AFT1, MARK_AFT2, _AFT1, _AFT2 = _AFT1 = "</b>";
var mark = function (source, search) {
    return power(source, search)[1];
};
var pair = function (source, search, t1, t2, t3, t4) {
    switch (arguments.length) {
        case 2:
            break;
        case 4:
            setTag1(t1, t2);
            setTag2(t1, t2);
            break;
        case 6:
            setTag1(t1, t2);
            setTag2(t3, t4);
            break;
    }
    return power2(source, search);
}
var searchText = '';
var concat1 = function (pre, match, aft) {
    return pre.concat(MARK_PRE1, match, MARK_AFT1, aft);
};
var power = function (source, search, concat_me) {
    searchText = search;
    var concat_ = concat1;
    if (concat_me) concat1 = concat_me;
    var res = power_(source, search);
    searchText = '';
    concat1 = concat_;
    return res;
};
var power_p = function () { };
var power_f = function () { };
var power_ = function (source, search, func, mp) {
    if (!search || !source) {
        return [0, source];
    }
    var matchers = couple(source, search);
    var match_text = matchers[0];
    var match_start = matchers[1];
    var search_start = matchers[2];
    var search_end = matchers[3];
    var match_length = search_end - search_start;
    if (match_length >= 1) {
        var match_text_pre = source.slice(0, match_start);
        var match_text_aft = source.slice(match_start + match_text.length);
        var pp = 0, ap = 0;
        var p = match_length !== match_text.length ? match_length - .1 : match_length;
        if (match_start) p += .1 / (1 + match_start) - .1;
        if (match_text_aft.length) p += .01 / (match_text_aft.length + 1) - .01;
        if (!mp) mp = p;
        var pw = null;
        if (match_text_pre.length > 1 && !(func === power_f && search_start === 0)) {
            pw = power_(match_text_pre, search_start > 0 ? search.slice(0, search_start) : searchText, search_start > 0 ? power_p : null, p);
            pp = pw[0];
            if (search_start !== 0) match_text_pre = pw[1];
            else {
                if (pp >= mp - .6) {
                    match_text_pre = pw[1];
                }
                pp = 0;
            }
        }

        var isend = search_end === search.length;
        if (match_text_aft.length > 1 && !(func === power_p && isend)) {
            pw = power_(match_text_aft, isend ? searchText : search.slice(search_end), isend ? null : power_f, p);
            var ap = pw[0];
            if (search_end !== search.length) match_text_aft = pw[1];
            else {
                if (ap >= mp - .6) {
                    match_text_aft = pw[1];
                }
                ap = 0;
            }
        }
        if (match_length !== search.length) {
            p += (pp + ap) * .86;
        }
        else if (pp >= p) {
            p += pp / source.length / search.length * .01 - .2;
        }
        else if (ap >= p) {
            p += ap / source.length / search.length * .01 - .2;
        }
        return [p, concat1(match_text_pre, match_text, match_text_aft)];
    }
    return [0, source];
};

var power2 = function (src1, src2) {
    var c = compare(src1, src2);
    var p = c.pop();
    if (!p) return [src1, src2, 0];
    src1 = src1.slice(0, 0);
    src2 = src2.slice(0, 0);
    for (var a of c) {
        if (a.different) src1 = src1.concat(a[0]), src2 = src2.concat(a[1]);
        else src1 = src1.concat(MARK_PRE1, a, MARK_AFT1), src2 = src2.concat(MARK_PRE2, a, MARK_AFT2);
    }
    return [src1, src2, p];
};

var different = function (src1, src2) {
    var res = [src1, src2];
    res.different = true;
    return res;
};

var compare = function (src1, src2, min = 0) {
    if (!src2 || !src1 || !src1.slice || !src2.slice) {
        if (isSame(src1, src2)) return [src1, 1];
        return [different(src1, src2), 0];
    }
    var matchers = couple(src1, src2);
    var [match_text, match_start1, match_start2] = matchers;
    if (match_text.length > min) {
        var src1_pre = src1.slice(0, match_start1);
        var src1_aft = src1.slice(match_start1 + match_text.length);
        var src2_pre = src2.slice(0, match_start2);
        var src2_aft = src2.slice(match_start2 + match_text.length);
        var pp = 0, ap = 0;
        var p = match_text.length;
        var pre, aft;
        if (src1_pre.length) p += .1 / src1_pre.length - .2;
        if (src1_aft.length) p += .1 / src1_aft.length - .1;
        if (src1_pre.length > 0 || src2_pre.length > 0) {
            pre = compare(src1_pre, src2_pre);
            pp = pre.pop();
        }
        else {
            pre = [];
        }
        if (src1_aft.length > 0 || src2_aft.length > 0) {
            aft = compare(src1_aft, src2_aft);
            ap = aft.pop();
        }
        else {
            aft = [];
        }
        p += (pp + ap) / src1.length / src2.length * .01;
        pre.push(match_text);
        return pre.concat(aft, p);
    }
    return [different(src1, src2), 0];

};

var setTag1 = function (pre, aft) {
    if (arguments.length === 1) {
        if (pre instanceof Array) {
            [pre, aft] = pre;
        }
        else {
            pre.replace(/^<|>$/g, '');
            pre = `<${pre}>`;
            aft = `</${pre}>`;
        }
    }
    MARK_PRE1 = pre;
    MARK_AFT1 = aft;
};
var setTag2 = function (pre = _PRE2, aft = _AFT2) {
    if (arguments.length === 1) {
        if (pre instanceof Array) {
            [pre, aft] = pre;
        }
        else {
            pre.replace(/^<|>$/g, '');
            pre = `<${pre}>;`
            aft = `</${pre}>`;
        }
    }
    MARK_PRE2 = pre;
    MARK_AFT2 = aft;
};
setTag1(_PRE1, _AFT1);
setTag2(_PRE2, _AFT2);
mark.setTag1 = setTag1;
mark.setTag2 = setTag2;
mark.power = power;
mark.power2 = power2;
mark.setPinyin = couple.setPinyin;
mark.compare = function (a, b) {
    var c = compare(a, b);
    c.power = c.pop();
    return c;
};
mark.pair = pair;
mark.couple = couple;