var couple = function (marker, source) {
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
var MARK_PRE = "<b>";
var MARK_AFT = "</b>";
var mark = function (source, search) {
    return power(source, search)[1];
};
var power = function (source, search) {
    if (!search || !source) {
        return [0, source];
    }
    var matchers = couple(source, search);
    var match_text = matchers[0];
    var match_start2 = matchers[2];
    if (search.length === 1) {
        var p = 0;
        var res = source.replace(new RegExp(search.replace(/[\\\*\?\+\(\)\[]/g, "\\$&"), "g"), () => {
            if (!p) p = 1;
            return MARK_PRE + search + MARK_AFT;
        });
        return [p, res];
    }
    if (match_text.length > 1) {
        var match_text_pre = source.slice(0, match_start2);
        var match_text_aft = source.slice(match_start2 + match_text.length);
        var pp = 0, ap = 0;
        var p = match_text.length;
        if (match_text_pre.length) p += .1 / match_text_pre.length - .2;
        if (match_text_aft.length) p += .1 / match_text_aft.length - .1;
        if (match_text_pre.length > 1) {
            [pp, match_text_pre] = power(match_text_pre, search);
        }
        if (match_text_aft.length > 1) {
            [ap, match_text_aft] = power(match_text_aft, search);
        }
        p += (pp + ap) * .01;
        return [p, match_text_pre + MARK_PRE + match_text + MARK_AFT + match_text_aft];
    }
    return [0, source];
};
mark.power = power;
mark.couple = couple;