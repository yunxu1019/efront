var couple = function (source, marker) {
    var len1 = source.length;
    var len2 = marker.length;
    var match = "", begin1 = len1, begin2 = len2;
    for (var cx = -len1, dx = len2; cx < dx; cx++) {
        var c1 = cx >= 0 ? 0 : -cx;
        var c2 = cx >= 0 ? cx : 0;
        var d1 = len1 - c1;
        var d2 = len2 - c2;
        var start = 0, end = 0;
        for (var ct = 0, dt = d1 > d2 ? d2 : d1; ct < dt; ct++) {
            if (source[c1 + ct] === marker[c2 + ct]) {
                end = ct + 1;
                if (end === dt && end - start > match.length) {
                    match = source.slice(c1 + start, c1 + end);
                    begin1 = c1 + start;
                    begin2 = c2 + start;
                }
            } else {
                if (end - start > match.length) {
                    match = source.slice(c1 + start, c1 + end);
                    begin1 = c1 + start;
                    begin2 = c2 + start;
                }
                start = ct + 1;
            }
        }
    }
    return [match, begin1, begin2];
};
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
var power = function (source, search) {
    if (!search || !source) {
        return [0, source];
    }
    var matchers = couple(source, search);
    var match_text = matchers[0];
    var match_start2 = matchers[1];
    if (search.length === 1) {
        var p = 0;
        var res = source.replace(new RegExp(search.replace(/[\\\*\?\+\(\)\[]/g, "\\$&"), "g"), (m, i) => {
            if (!p) p = .1 / (1 + i);
            return MARK_PRE1 + search + MARK_AFT1;
        });
        return [p, res];
    }
    if (match_text.length > 1) {
        var match_text_pre = source.slice(0, match_start2);
        var match_text_aft = source.slice(match_start2 + match_text.length);
        var pp = 0, ap = 0;
        var p = match_text.length;
        if (match_text_pre.length) p += .1 / match_text_pre.length - .3;
        if (match_text_aft.length) p += .1 / match_text_aft.length - .2;
        if (match_text_pre.length > 1) {
            [pp, match_text_pre] = power(match_text_pre, search);
        }
        if (match_text_aft.length > 1) {
            [ap, match_text_aft] = power(match_text_aft, search);
        }
        if (match_text.length === search.length) {
            p = match_text.length;
            if (match_start2) p += .1 / match_start2 - .1;
            if (pp > p) p = pp;
        }
        else {
            p += (pp + ap) / match_text.length * .01;
        }
        return [p, match_text_pre.concat(MARK_PRE1, match_text, MARK_AFT1, match_text_aft)];
    }
    return [0, source];
};


var power2 = function (src1, src2) {

    if (!src2 || !src1) {
        return [src1, src2, 0];
    }
    var matchers = couple(src1, src2);
    var [match_text, match_start1, match_start2] = matchers;
    if (match_text.length > 0) {
        var src1_pre = src1.slice(0, match_start1);
        var src1_aft = src1.slice(match_start1 + match_text.length);
        var src2_pre = src2.slice(0, match_start2);
        var src2_aft = src2.slice(match_start2 + match_text.length);
        var pp = 0, ap = 0;
        var p = match_text.length;
        if (src1_pre.length) p += .1 / src1_pre.length - .2;
        if (src1_aft.length) p += .1 / src1_aft.length - .1;
        if (src1_pre.length > 0 && src2_pre.length > 0) {
            [src1_pre, src2_pre, pp] = power2(src1_pre, src2_pre);
        }
        if (src1_aft.length > 0 && src2_aft.length > 0) {
            [src1_aft, src2_aft, ap] = power2(src1_aft, src2_aft);
        }
        p += (pp + ap) * .01;
        return [
            src1_pre.concat(MARK_PRE1, match_text, MARK_AFT1, src1_aft),
            src2_pre.concat(MARK_PRE2, match_text, MARK_AFT2, src2_aft),
            p
        ];
    }
    return [src1, src2, 0];

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
mark.pair = pair;
mark.couple = couple;