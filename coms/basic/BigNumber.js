var trim = function (a) {
    return String(a).replace(/[\s\,]/g, '').replace(/^\+/, '').replace(/[mni]$/i, '');
};
var prepare = function (a) {
    a = trim(a);
    var neg = /^\-/.test(a);
    if (neg) a = a.slice(1);
    var [s1, s2 = ''] = a.split('.');
    s2 = s2.replace(/0+$/, '');
    return [neg, s1, s2];
};
var repeat = String.prototype.repeat || function (n) {
    return new Array(n + 1).join(this);
};
var repeat0 = function (n) {
    return repeat.call('0', n);
};
var split = function (s, n) {
    var r = [];
    var end = s.length;
    while (end > n) {
        r.push(s.slice(end - n, end));
        end -= n;
    }
    r.push(s.slice(0, end));
    return r;
};
var fixme = function (neg, res, nl) {
    if (nl > 0) res = res.slice(0, res.length - nl) + "." + res.slice(res.length - nl).replace(/0+$/, '');
    res = res.replace(/^0+(?!\.)/, '');
    if (/^\./.test(res)) res = '0' + res;
    if (neg) res = '-' + res;
    return res.replace(/\.$/, '');
};
var fixde = function (numstr, fractionDigits, compare) {
    var [neg, s1, s2] = prepare(numstr);
    var frag = +s2.charAt(fractionDigits) > compare;
    if (!frag && compare === 0) {
        frag = s2.length > fractionDigits;
    }
    if (s2.length < fractionDigits) {
        s2 += repeat0(fractionDigits - s2.length);
    }
    else {
        s2 = s2.slice(0, fractionDigits);
    }
    var res = s1 + s2;
    if (frag) {
        res = BigNumber.add(res, 1);
    }
    if (fractionDigits > 0) res = res.slice(0, res.length - fractionDigits) + '.' + res.slice(res.length - fractionDigits);
    if (neg) res = '-' + res;
    return res;
};
class BigNumber {
    constructor(value) {
        if (!this || this.constructor !== BigNumber) {
            return new BigNumber(value);
        }
        this.value = value;
    }
    toString() {
        return this.value;
    };
    add(bignumber) {
        return new BigNumber(BigNumber.add(this.value, bignumber));
    };
    static round(numstr) {
        return fixde(numstr, 0, 4);
    }
    static ceil(numstr) {
        return fixde(numstr, 0, 0);
    }
    static floor(numstr) {
        return fixde(numstr, 0, 9);
    }
    static fix(numstr, fractionDigits) {
        fractionDigits = +fractionDigits || 0;
        if (fractionDigits < 0 || fractionDigits > 100) {
            throw new Error("小数位数只能是0和100之间的数字");
        }
        return fixde(numstr, fractionDigits, 4);
    }
    static add(numstr1, numstr2) {
        var [neg1, s11, s12] = prepare(numstr1)
        var [neg2, s21, s22] = prepare(numstr2)
        var nl = 0;
        if (s12.length < s22.length) {
            nl = s22.length;
            s12 += repeat0(nl - s12.length);
        }
        else if (s22.length < s12.length) {
            nl = s12.length;
            s22 += repeat0(nl - s22.length);
        }
        else {
            nl = s12.length;
        }
        if (s11.length < s21.length) {
            s11 = repeat0(s21.length - s11.length) + s11;
        }
        else if (s11.length > s21.length) {
            s21 = repeat0(s11.length - s21.length) + s21;
        }
        numstr1 = s11 + s12;
        numstr2 = s21 + s22;
        var flag = 1;
        if (neg1 ^ neg2) {
            if (numstr1 > numstr2) {
                neg = neg1;
            }
            else if (numstr1 < numstr2) {
                neg = neg2;
                [numstr1, numstr2] = [numstr2, numstr1];
            }
            flag = 0;
        }
        else {
            var neg = neg1 && neg2;
        }
        var res = [];
        var end = (numstr1.length / 15 | 0) * 15;
        var rest = 0;
        while (end >= 0) {
            var s1 = numstr1.slice(end, end + 15);
            var s2 = numstr2.slice(end, end + 15);
            var s = +s1 + (flag ? +s2 : -s2) + rest;
            if (s < 0) {
                s = +("1" + repeat0(s1.length)) + s;
                rest = -1;
            }
            else {
                rest = 0;
            }
            s = s.toFixed(0);
            if (s.length > s1.length) {
                rest = 1;
                res.push(s.slice(1))
            }
            else {
                if (s.length < s1.length) s = repeat0(s1.length - s.length) + s;
                res.push(s);
            }
            end -= 15;
        }
        if (rest) res.push(rest);
        res = res.reverse().join('');
        return fixme(neg, res, nl);
    }
    static prd(numstr1, numstr2) {
        var [neg1, s11, s12] = prepare(numstr1);
        var [neg2, s21, s22] = prepare(numstr2);
        var d = s12.length * s22.length;
        numstr1 = s11 + s12;
        numstr2 = s21 + s22;
        if (numstr1.length < numstr2.length) [numstr1, numstr2] = [numstr2, numstr1];
        var ns1 = split(numstr1, 7);
        var ns2 = split(numstr2, 7);
        var res = [];
        var i = 0;
        for (var cx = 0, dx = ns1.length; cx < dx; cx++) {
            var s1 = ns1[cx];
            for (var cy = 0, dy = ns2.length; cy < dy; cy++) {
                var s2 = ns2[cy];
                var i = cx + cy;
                var rest = +res[i] || 0;
                var s = s1 * s2 + rest;
                s = String(s);
                if (s.length > 7) {
                    rest = +s.slice(0, s.length - 7);
                    res[i] = s.slice(s.length - 7);
                    res[i + 1] = (+res[i + 1] || 0) + rest;
                }
                else {
                    if (s.length < 7) s = repeat0(7 - s.length) + s;
                    res[i] = s;
                }
            }
        }
        res = res.reverse().join('');
        return fixme(neg1 ^ neg2, res, d);
    }
}