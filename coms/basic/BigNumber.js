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
    if (nl > 0) {
        if (res.length < nl) res = repeat0(nl - res.length) + res;
        res = res.slice(0, res.length - nl) + "." + res.slice(res.length - nl).replace(/0+$/, '');
    }
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
        var res_length = res.length;
        res = BigNumber.add(res, 1);
        if (res.length < res_length) res = repeat0(res_length - res.length) + res;
    }
    if (fractionDigits > 0) res = res.slice(0, res.length - fractionDigits) + '.' + res.slice(res.length - fractionDigits);
    if (/^\./.test(res)) res = "0" + res;
    if (neg) res = '-' + res;
    return res;
};
var vmap = Object.create(null);
var vsrc = [];
var adds = function (s, c) {
    for (var cx = 0, dx = s.length; cx < dx; cx++) {
        vmap[s.charAt(cx)] = c + cx;
        vsrc[c + cx] = s.charAt(cx);
    }
}
adds("0123456789", 0);
adds("abcdefghijklmnopqrstuvwxyz", 10);
class BigNumber {
    constructor(value, system_scale) {
        if (!this || this.constructor !== BigNumber) {
            return new BigNumber(value, system_scale);
        }
        system_scale = system_scale | 0;
        if (!system_scale) system_scale = 10;
        if (system_scale <= 1 || system_scale > 36) throw new Error("进制错误！");
        var num = '0';
        var dotOccurs;
        var scale = system_scale;
        if (system_scale <= 36) {
            value = value.toLowerCase();
        }
        for (var v of value) {
            if (v === '.') {
                dotOccurs = true;
                continue;
            }
            if (v === '_') continue;
            if (v === ',') continue;
            if (dotOccurs) {
                num = BigNumber.add(num, BigNumber.div(vmap[v], scale, BigNumber.DECIMAL_DIGIT))
                scale = BigNumber.prd(scale, system_scale);
            }
            else {
                num = BigNumber.add(BigNumber.prd(num, scale), vmap[v]);
            }
        }
        this.value = num;
    }
    static DECIMAL_DIGIT = 120;
    toString(system_scale) {
        system_scale |= 0;
        if (!system_scale || system_scale === 10) return this.value;
        if (system_scale <= 1 || system_scale > 36) throw new Error("进制错误！");
        var [s, n, m] = prepare(this.value);
        var dist = [];
        while (n && n !== "0") {
            var n0 = BigNumber.div(n, system_scale, 0);
            var a = BigNumber.sub(n, BigNumber.prd(n0, system_scale));
            n = n0;
            dist.unshift(vsrc[+a]);
        }
        if (m && m !== "0") {
            var c = 0;
            dist.push('.');
            while (m !== "0") {
                [a, m = '0'] = BigNumber.prd("0." + m, system_scale).split('.');
                dist.push(vsrc[+a]);
                if (++c > BigNumber.DECIMAL_DIGIT || !m) break;
            }
        }
        if (s) dist.unshift('-');
        return dist.join('');
    };
    add(bignumber) {
        return new BigNumber(BigNumber.add(this.value, bignumber));
    };
    static round(numstr) {
        return fixde(numstr, 0, 4);
    }
    static ceil(numstr) {
        return fixde(numstr, 0, /^\-/.test(numstr) ? 9 : 0);
    }
    static floor(numstr) {
        return fixde(numstr, 0, /^\-/.test(numstr) ? 0 : 9);
    }
    static fix(numstr, fractionDigits) {
        fractionDigits = +fractionDigits || 0;
        if (fractionDigits < 0 || fractionDigits > BigNumber.DECIMAL_DIGIT) {
            throw new Error(`小数位数只能是0和${BigNumber.DECIMAL_DIGIT}之间的数字`);
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
        var d = s12.length + s22.length;
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
    static sub(numstr1, numstr2) {
        numstr2 = trim(numstr2);
        if (/^\-/.test(numstr2)) numstr2 = numstr2.slice(1);
        else numstr2 = '-' + numstr2;
        return BigNumber.add(numstr1, numstr2);
    }
    // 按整数除法，超出输入的数字的位数之和
    static div(numstr1, numstr2, decimal) {
        if (isEmpty(decimal)) throw new Error("请输入保留小数的位数！");
        var [neg1, s11, s12] = prepare(numstr1);
        var [neg2, s21, s22] = prepare(numstr2);
        var d = s12.length + decimal - s22.length;
        decimal = (decimal | 0) + 1;
        numstr1 = s11 + s12;
        numstr2 = s21 + s22;
        numstr1 = numstr1.replace(/^0+/, '');
        numstr2 = numstr2.replace(/^0+/, '');
        if (d < 0) numstr2 += repeat0(-d);
        else if (d > 0) numstr1 += repeat0(d);
        var result = [];
        var ns1 = split(numstr1, 9);
        var s1 = "";
        while (ns1.length) {
            s1 = s1 + ns1.pop();
            if (s1.length >= numstr2.length) {
                for (var cx = 0, dx = 1000000000, ci = cx + dx >> 1; cx < dx; ci = cx + dx + 1 >> 1) {
                    var s2 = BigNumber.sub(s1, BigNumber.prd(numstr2, ci));
                    if (/^\-/.test(s2)) dx = ci - 1;
                    else cx = ci;
                }
            }
            else {
                ci = 0;
            }
            ci = String(ci);
            s1 = BigNumber.sub(s1, BigNumber.prd(numstr2, ci));
            if (result.length) ci = repeat0(9 - ci.length) + ci;
            result.push(ci);
        }
        result = result.join('');
        result = fixme(neg1 ^ neg2, result, +d + s12.length - s22.length);
        return BigNumber.fix(result, decimal - 1);
    }
}