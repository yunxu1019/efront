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
var 缩放到1附近 = function (bign, scale, 有效数字位数) {
    var scale = scale.toString();
    var 用乘法 = /^0\./.test(bign);
    var targetSize;
    if (用乘法) {
        targetSize = /^0\.0*/.exec(bign)[0].length;
    }
    else {
        targetSize = bign.toString().replace(/\.[\s\S]+$/, '').length;
    }
    var system = [scale];
    var halfSize = targetSize >> 1;
    while (scale.length <= halfSize) {
        scale = BigNumber.prd(scale, scale);
        system.push(scale);
    }
    scale = system.pop();
    var zerocount = 1 << system.length;
    while (system.length > 1) {
        var s = system.pop();
        if (s.length + scale.length > targetSize) continue;
        s = BigNumber.prd(scale, s);
        if (s.length < targetSize) {
            scale = s;
            zerocount += 1 << system.length;
        }
    }
    if (用乘法) bign = BigNumber.prd(bign, scale);
    else {
        bign = BigNumber.div(bign, scale, BigNumber.DECIMAL_DIGIT);
    }
    return [bign, 用乘法 ? -zerocount : zerocount];
};
class BigNumber {
    constructor(value, system_scale) {
        if (!this || this.constructor !== BigNumber) {
            return new BigNumber(value, system_scale);
        }
        value = String(value || 0);
        system_scale = system_scale | 0;
        if (!system_scale) {
            system_scale = 10;
        }
        if (system_scale === 1) throw new Error("不支持半年级数数进制！");
        if (system_scale < 1) throw new Error("不支持小于1的进位方针！");
        var BACK_DIGIT = BigNumber.DECIMAL_DIGIT;
        var digit = value.indexOf('.');
        if (digit < 0) digit = 0;
        else digit = value.length - digit;
        if (system_scale === 10 && value.indexOf('e') > 0) {
            var [value, ratio] = value.split('e');
            if (/^\-/.test(ratio)) digit += ratio - ratio.length, ratio = "0." + Array(+ratio.slice(1)).join('0') + "1";
            else {
                if (/^\+/.test(ratio)) ratio = ratio.slice(1);
                ratio = "1" + Array(+ratio + 1).join('0');
            }
        }
        if (digit > 1) digit += 6;
        digit = Math.ceil(digit * Math.log10(system_scale));
        if (digit > BACK_DIGIT) BigNumber.DECIMAL_DIGIT = digit;
        var num = '0';
        var dotOccurs;
        var scale = system_scale;
        if (system_scale <= 36) {
            value = value.toLowerCase();
        }
        value = value.replace(/^\[|\]$/g, '').split(/[,:;、；。，]|\]\[/);
        if (value.length === 1) value = value[0];
        var sign = false;
        for (var v of value) {
            if (v === "-") {
                sign = !sign;
                continue;
            }
            if (v === '+') continue;
            if (v === '.') {
                dotOccurs = true;
                continue;
            }
            if (v === '_') continue;
            if (v === ',') continue;
            if (!(v in vmap)) {
                v = +v;
            }
            else v = vmap[v];
            if (v !== v || v >= system_scale || v !== +v) throw new Error("数据错误！");

            if (dotOccurs) {
                num = BigNumber.add(num, BigNumber.div(v, scale, BigNumber.DECIMAL_DIGIT))
                scale = BigNumber.prd(scale, system_scale);
            }
            else {
                num = BigNumber.add(BigNumber.prd(num, scale), v);
            }
        }
        if (sign) num = '-' + num;
        if (ratio) num = BigNumber.prd(num, ratio);
        this.value = num;
        if (digit > BACK_DIGIT) {
            this.digit = digit;
        }
        BigNumber.DECIMAL_DIGIT = BACK_DIGIT;
    }
    static DECIMAL_DIGIT = 324;
    toString(system_scale, 有效数字位数) {
        system_scale |= 0;
        var 收起零 = 有效数字位数 < 0;
        if (收起零) 有效数字位数 = -有效数字位数;
        var zero = system_scale <= 36 ? '0' : '[0]';
        if (!system_scale || system_scale === 10) return this.value || zero;
        if (system_scale <= 1) throw new Error("进制错误！");
        var BACK_DIGIT = BigNumber.DECIMAL_DIGIT;
        if (!有效数字位数) 有效数字位数 = Math.ceil((this.digit || BigNumber.DECIMAL_DIGIT) / Math.log10(system_scale));
        BigNumber.DECIMAL_DIGIT = 有效数字位数 + 10 + system_scale;
        var [value, zerocount] = 缩放到1附近(this.value, system_scale, 有效数字位数);
        var [s, n, m] = prepare(value);
        var dist = [];
        while (n && n !== "0") {
            var n0 = BigNumber.div(n, system_scale, 0);
            var a = BigNumber.sub(n, BigNumber.prd(n0, system_scale));
            n = n0;
            dist.unshift(+a);
        }
        var c = dist.length;
        var mid = (system_scale - 1) / 2 | 0;
        var end = system_scale - 1;
        if (m && m !== "0" && c <= 有效数字位数) {
            dist.push('.');
            while (m !== "0") {
                [a, m = '0'] = BigNumber.prd("0." + m, system_scale).split('.');
                dist.push(+a);
                if (c > 0 || +a > 0) {
                    if (c++ >= 有效数字位数 || !m) break;
                }
            }
            if (c > 有效数字位数) {
                if (dist[dist.length - 1] > mid) {
                    dist.pop();
                    while (dist[dist.length - 1] === end) dist.pop();
                    if (dist[dist.length - 1] === ".") dist.pop();
                    c = dist.length - 1;
                    while (dist[c] === end) dist[c--] = 0;
                    if (c < 0) dist.unshift(1);
                    else dist[c] = dist[c] + 1;
                }
                else dist.pop();
            }
        } else if (c > 有效数字位数) {
            if (dist[有效数字位数] > mid) {
                var c = 有效数字位数 - 1;
                while (dist[c] === end) dist[c--] = 0;
                if (c < 0) dist.unshift(1);
                else dist[c] = dist[c] + 1;
            }
            while (有效数字位数 < dist.length) dist[有效数字位数++] = 0;
        }
        var i = dist.indexOf('.');
        if (i >= 0) dist.splice(i, 1);
        else i = dist.length;
        i += zerocount;
        if (i <= 0) {
            if (收起零 && i <= -30) dist.unshift(`${zero}.(${- i}个${zero})`);
            else dist.unshift(zero + "." + Array(1 - i).join(zero));
        }
        else if (i === dist.length);
        else if (i < dist.length) dist.splice(i, 0, '.');
        else if (i > dist.length) {
            if (收起零 && i >= dist.length + 30) dist.push(`(还有${i - dist.length}位)`);
            else dist.push(Array(i - dist.length + 1).join(zero));
        }
        while (dist[0] === 0) dist.shift();
        if (dist[0] === '.') dist.unshift(0);
        else if (!dist.length) dist.push(0);
        if (s) dist.unshift('-');
        BigNumber.DECIMAL_DIGIT = BACK_DIGIT;
        if (system_scale <= 36) dist = dist.map(d => Number.isFinite(d) ? vsrc[d] : d);
        else dist = dist.map(d => Number.isFinite(d) ? '[' + d + ']' : d);
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
        var end = ((numstr1.length - 1) / 15 | 0) * 15;
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
        decimal = (decimal & 0x7fffffff) + 1;
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