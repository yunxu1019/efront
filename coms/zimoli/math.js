var mo2 = (o, b) => `<mo>${o}</mo>${b}`;
var mo3 = (o, args) => args.length === 1 ? args[0] + `<ms>${o}</ms>` : args.join(`<mo>${o}</mo>`);
var ms = s => `<ms>${s}</ms>`;
var mroot = (d, z) => `<mroot>${d}${z}</mroot>`;
var msqrt = a => `<msqrt>${a}</msqrt>`;
var mdot = a => `<mover><mn>${a}</mn><ms>・</ms></mover>`;
var mi = s => `<mi>${s}</mi>`;
var mn = s => `<mn>${s}</mn>`;
var mi2 = (s, a, n) => {
    s = n ? `<msup><mi>${s}</mi>${n}</msup>` : `<mi>${s}</mi>`;
    return s + `<ms>&thinsp;</ms>` + a + `<ms>&thinsp;</ms>`;
}
var mrow = (a, quote, deep) => {
    if (deep === 2) var tag = 'mtd';
    else tag = 'mrow';
    if (quote === true) a = `<${tag}><mi>(</mi>${a}<mi>)</mi></${tag}>`;
    else if (quote === false) a = `<${tag}>${a}</${tag}>`;
    else if (deep === 2) a = `<mtd>${a}</mtd>`;
    return a;
}
var series =/*级数*/(通项, neq, to) =>
    `<munderover><mo movablelimits=false>∑</mo>${neq}${to}</munderover>${通项}`;
var Series =/*级数*/(通项, neq, to) =>
    `<math display="block"><munderover><mo>∑</mo>${neq}${to}</munderover>${通项}</math>`;
var msub = (a, n) => `<msub>${a}${n}</msub>`;
var qt = (t, a, args) => {
    var b = args.shift();
    a = t(a, b);
    while (args.length) {
        a = `<mrow><mo>(</mo>${a}<mo>)</mo></mrow>`;
        b = args.shift();
        a = t(a, b);
    }
    return a;
}

var 三角函数 = {
    "sin"(a, n) {
        if (!a && n instanceof Array) {
            [a, n] = n;
        }
        return mi2("sin", a, n);
    },
    "cos"(a, n) {
        return mi2("cos", a, n);
    },
    "tan"(a, n) {
        return mi2("tan", a, n);
    },
    "cot"(a, n) {
        return mi2("cot", a, n);
    },
    "sec"(a, n) {
        return mi2("sec", a, n);
    },
    "csc"(a, n) {
        return mi2("csc", a, n);
    },
    "arcsin"(a, n) {
        return mi2("arcsin", a, n);
    },
    "arccos"(a, n) {
        return mi2("arccos", a, n);
    },
    "arctan"(a, n) {
        return mi2("arctan", a, n);
    },
    "arccot"(a, n) {
        return mi2("arccot", a, n);
    },
    "arcsec"(a, n) {
        return mi2("arcsec", a, n);
    },
    "arccsc"(a, n) {
        return mi2("arccsc", a, n);
    },
};
var roman = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
};
var toRoman = function (n) {
    if (n > 3888 || (n | 0) !== n || n < 1) return `<mo>(</mo><ms>Roman</ms><mo>,</mo><mn>${n}</mn><mo>)</mo>`;
    var [a = 0, b = 0, c = 0, d = 0] = n.toString().split("").reverse();
    a = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"][a];
    b = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"][b];
    c = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"][c];
    d = ["", "M", "MM", "MMM"][d];
    return d + c + b + a;
};
var circles = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿";

var tabs = {
    roman(...args) {
        return "&nbsp;&nbsp;" + args
            .map(toRoman)
            .map(a => `<mn>${a}</mn>`)
            .join('<ms>&ensp;</ms>');
    },
    circle(...args) {
        return args.map(n => circles.charAt(n - 1)).map(a => `<mn>${a}</mn>`).join('');
    }
};
tabs["@"] = tabs.circle;
tabs["$"] = tabs.roman;
var mtable = function (args, prefix, postfix) {
    if (prefix) prefix = `<mo>${prefix}</mo>`;
    if (postfix) postfix = `<mo>${postfix}</mo>`;
    if (args.length === 1) return [prefix, args[0], postfix].join('');
    return `${prefix}<mtable>${args.join("")}</mtable>${postfix}`;
}
var funcmap = {
    "+"(...args) {
        return mo3("+", args);
    },
    "+."(a, ...args) {
        return a + args.join('<mo>+</mo>');
    },
    "-"(...args) {
        return mo3("–", args);
    },
    "+-"(...args) {
        return mo3("±", args);
    },
    "-+"(...args) {
        return mo3("∓", args);
    },
    "*"(...args) {
        return args.join("");
    },
    ">="(...args) {
        return mo3("≥", args);
    },
    "<="(...args) {
        return mo3("≤", args);
    },
    "vector"(name, ...args) {
        name = `<mover>${name}<mo>→</mo></mover>`;
        if (args.length) {
            name += `<mrow><mi>(</mi>${args.join("<mo>,</mo>")}<mi>)</mi></mrow>`
        }
        return name;
    },
    "MUL"(...args) {
        return args.join('');
    },
    mul(...args) {
        return mo3("×", args);
    },
    Mul(...args) {
        return mo3("·", args);
    },
    conj(A) {
        var m = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'math');
        m.innerHTML = A;
        css(m, 'opacition:0;position:absolute:left-10px;top:-10px;pointer-events:none;z-index:-10');
        document.documentElement.appendChild(m);
        var sp = Array(2 + (m.clientWidth / 6 | 0)).join("\u23bc");
        remove(m);
        return `<mover>${A}<mo stretchy=true symmetric=true fence=true accent=true>${sp}</mo></mover>`
    },
    abs(a) {
        return `<mo>|</mo>${a}<mo>|</mo>`;
    },
    log(x, n) {
        return `<msub><mo>log</mo>${n}</msub>${x}`
    },
    ln(x) {
        return `<mo>ln</mo>${x}`
    },
    "div"(...args) {
        return mo3("÷", args);
    },
    "\\"(a, ...args) {
        return qt((a, b) => `<msup>${a}<mn>-1</mn></msup>${b}`, a, args);
    },
    '.*'(...args) {
        return args.join('<mo>·</mo>');
    },
    "="(...args) {
        return mo3("=", args);
    },
    limit(a, x, n) {
        return `<munder><ms>limit</ms><mrow>${x}<mo>→</mo>${n}</mrow></munder>${a}`
    },
    sigma: series,
    Sigma: Series,
    Series,
    series,
    '!='(...args) {
        return mo3("≉", args);
    },
    '!=='(...args) {
        return mo3("≢", args);
    },
    "~="(...args) {
        return mo3("≈", args);
    },
    integral(a, b = '', c = '') {
        return `<msubsup><mo>∫</mo>${b}${c}</msubsup>${a}`;
    },
    Integral(a, b = '', c = '') {
        return `<math display="block"><msubsup><mo>∫</mo>${b}${c}</msubsup>${a}</math>`;
    },
    "'"(...args) {
        var b = args.pop();
        if (!args.length) return `<msup>${b}<mo>T</mo></msup>`;
        // 导数
        return args.map((a) => `${a}<mo>&apos;</mo>`).join('') + `<mi>(</mi>${b}<mi>)</mi>`;
    },
    "!"(...args) {
        return args.map(a => a + `<mo>!</mo>`).join('');
    }
};
funcmap["&|"] = funcmap.abs;
var unary = (u, a) => `<ms>${u}</ms>${a}`;
var unarymap = {
    "+"(a) {
        return unary("+", a);
    },
    "-"(a) {
        return unary("–", a);
    },
    "+-"(a) {
        return unary("±", a);
    },
    "-+"(a) {
        return unary("∓", a);
    },
    "!"(a) {
        return unary("!", a);
    },
    "~"(a) {
        return unary("~", a);
    },
};
var puncmap = {
    "**"(a, ...args) {
        return qt((a, b) => `<msup>${a}${b}</msup>`, a, args);
    },
    "/"(a, ...args) {
        while (args.length) {
            var b = args.shift();
            a = `<mfrac>${a}${b}</mfrac>`;
        }
        return a;
    },
    "sqrt"(a) {
        return msqrt(a);
    },
    "root"(d, z) {
        return mroot(d, z);
    },
    "√‌"(z, d) {
        if (z) return mroot(d, z);
        return msqrt(d);
    },
    "_"(a, ...args) {
        return qt(msub, a, args);
    },
    corner(name) {
        return mo2("∠", name);
    },

    // "积分": "∫",
    // "summa": "∫",
    // "sigma": "∑",
    // "求和": "∑",
    // "-+": "±",
    // "pi": '∏',
    // "直积": '∏',
    // "any": "∀",
    // "任意": "∀",
    // "exist": "∃",
    // "存在": "∃",
    // "!<": "≮",
    // "!>": "≯",
    // ">=": "≥",
    // "<=": '≤',
};
puncmap["^*"] = puncmap["**"];
var pmap = {};

[
    '=,+=,-=,*=,/=,%=,|=,&=,^=,||=,&&=,??=,<<=,>>=,>>>=,**=,~=,:=,?,:,=>'/* 1 */,
    '&&,||,^^,??'/* 3 */, '|,^'/* 4 */, '&'/*5*/,
    'instanceof,in,==,>=,<=,>,<,!=,!==,===,!in,!instanceof'/* 6 */,
    '>>,>>>,<<'/* 7 */, '+,-'/* 8 */, '*,/,%'/* 9 */, '**'/* 10 */,
    '++,--'/* 11 */,
    "typeof,await,yield,delete,void,..."/*12*/,
    '!,~,#,new'/* 13 */,
    "::,?.,->,."/*14*/,
].forEach((pp, i) => {
    pp.split(",").forEach(p => {
        pmap[p] = i + 1;
    })
});

var 希腊 = {
    alpha: "α", Alpha: "Α",
    beta: "β", Beta: "Β",
    gamma: "γ", Gamma: "‌Γ",
    delta: "δ‌", Delta: "Δ",
    epsilon: "ε", Epsilon: "Ε",
    zeta: "ζ‌", Zeta: "Ζ",
    eta: "η‌", Eta: "Η",
    theta: "θ", Theta: "Θ",
    iota: "ι", Iota: "Ι",
    kappa: 'κ', Kappa: 'Κ',
    lambda: 'λ‌', Lambda: '‌Λ',
    mu: 'μ', Mu: 'Μ',
    nu: 'ν', Nu: 'Ν',
    xi: 'ξ‌', Xi: '‌Ξ',
    omicron: 'ο', Omicron: 'Ο',
    pi: 'π‌', Pi: '‌Π',
    rho: 'ρ', Rho: 'Ρ',
    sigma: 'σ', Sigma: 'Σ',
    tau: 'τ', Tau: 'Τ',
    upsilon: 'υ', Upsilon: 'Υ',
    phi: 'φ', Phi: 'Φ',
    chi: 'χ‌', Chi: 'Χ',
    psi: 'ψ', Psi: 'Ψ',
    omega: 'ω', Omega: '‌Ω',
};
var lineBroken = false;
var br = function () {
    lineBroken = true;
    return '</mtd></mtr><mtr><mtd style="text-align:left">';
};
var Number_isFinite = Number.isFinite;
var isPostFinite = function (n) {
    return /[^\d]$/.test(n[n.length - 1]);
}
var isFinite = function (n, post) {
    if (Number_isFinite(n)) return true;
    if (!n) return false;
    if (n["/"]) return true;
    if (n["+."]) return true;
    if (n["."]) return !post || isPostFinite(n);
    if (n[".."]) return !post || isPostFinite(n);
    n = n["*"] || n.mul || n.Mul || n.MUL;
    if (n) return isFinite(n[0]);
    return false;
}
var toCell = function (eq, k) {
    var left, right;
    var res = [];
    if (eq instanceof Array) {
        left = toString(eq[0], 0, 0);
        right = toString(eq.slice(1), 0, 0);
    }
    else left = ``, right = toString(eq);
    if (left instanceof Array) left = left.join("&ensp;&ensp;");
    else if (right instanceof Array) right = right.join(`<mi>${k}</mi>`);
    res.push(
        `<mtd style="text-align:right;text-align:-webkit-right;padding-right:0;">`,
        left,
        `</mtd><mtd><mi>${k}</mi></mtd><mtd style="text-align:left;padding-left:0;">`,
        right,
        '</mtd>',
    );
    return res.join("");
};
var num = function (prefix, rep, dots, e, s, p, deep) {
    prefix = String(prefix).replace(/^\-/, '–');
    if (typeof rep === 'number') rep = String(rep);
    if (rep && !/\./.test(prefix)) prefix += '.';
    if (typeof e === 'number') e = String(e);
    if (!rep) rep = '';
    else if (rep.length === 1) {
        rep = mdot(rep);
    }
    else if (rep.length >= 2) {
        rep = mdot(rep.charAt(0)) + mn(rep.slice(1, rep.length - 1)) + mdot(rep.charAt(rep.length - 1));
    }
    else rep = mn(rep);
    if (dots) dots = mn(dots);
    else dots = '';
    if (e) e = `<mo>×</mo><msup><mn>10</mn><mn>${String(e).replace(/^\-/, '–')}</mn></msup>`;
    else e = '';
    if (s) s = `<mi>${s}</mi>`;
    else s = '';
    prefix = mn(prefix);
    return mrow([prefix, rep, dots, e, s].join(''), e ? p >= pmap["*"] : false, deep);

}
var makemap = {
    ".."(origin, p, deep) {
        var [prefix, rep, dots, e, s] = origin;
        return num(prefix, rep, dots, e, s, p, deep);
    },
    "."(origin, p, deep) {
        var [prefix, e, s] = origin;
        if (/[^\d]$/.test(e)) s = e, e = '';
        return num(prefix, '', '', e, s, p, deep);
    },
    "@"(origin, p, deep) {
        return mrow(tabs.circle(origin), -1, deep);
    },
    "$"(origin, p, deep) {
        return mrow(tabs.roman(origin), -1, deep);
    },
    tab(origin, p, deep) {
        var k = origin.shift();
        if (!origin.length || !(k in tabs)) {
            var args = origin.map(a => toString(a, 0, deep));
            return mrow(`<ms>(</ms>${k}${args.length ? "<ms>,</ms>" + args.join('<ms>,</ms>') : ''}<ms>)</ms>`, -1, deep);
        }
        return mrow(tabs[k](...origin), -1, deep);
    },
    "{"(origin, p, deep) {
        return mrow(mtable(origin.map(toRows), "{", ''), false, 0);
    },
    "^:"(origin, p, deep) {
        return `<ms style="font-weight:bolder">${origin}</ms>`;
    },
    "["(origin, p, deep) {
        return toMatrix(origin, '[', ']');
    },
    "^|"(origin, p, deep) {
        console.log(origin);
        if (origin instanceof Array) return toMatrix(origin, '|', '|');
        return mrow(funcmap.abs(toString(origin[0])), false, 0);
    },
};
var toMatrix = function (origin, prev, post) {
    var res = origin.map(o => {
        if (o instanceof Array) return `<mtr><mtd>${o.map(a => {
            return toString(a);
        }).join('</mtd><mtd>')}</mtd></mtr>`
        return `<mtr><mtd>${toString(o)}</mtd></mtr>`;
    });
    return mrow(mtable(res, prev, post), false, 0);
}
function toString(obj, p, deep, index) {
    if (obj instanceof Array) {
        deep++;
        var args = obj.map((a, i) => toString(a, deep > 1 ? 0 : p, deep, i));
        deep--;
        if (args instanceof Array) {
            if (deep >= 2) {
                if (args.length > 1) args = `<mrow><mo>(</mo>${args.join('<mo>,</mo>')}<mo>)</mo></mrow>`;
            }
            else if (deep === 1) {
                args = args.join('');
            }
        }
        return args;
    }
    var res;
    if (obj instanceof Object) {
        for (var k in obj) break;
        if (!k) return '';
        var origin = obj[k];
        if (k in makemap) {
            return makemap[k](origin, p, deep);
        }
        if (k === '**') {
            if (origin instanceof Array) {
                var [left, right] = origin;
                if (left instanceof Object && !(left instanceof Array)) {
                    for (var k1 in left) break;
                    if (!(left[k1] instanceof Array)) {
                        var obj = mi2(k1, toString(left[k1], pmap["*"], 0), toString(right));
                        return mrow(obj, p >= pmap["**"], deep);
                    }
                }
            }
        }

        if (k in 三角函数) {
            if (origin instanceof Array) {
                var args = origin.map(a => toString(a, pmap["*"], 0));
                obj = 三角函数[k](...args);
            }
            else {
                obj = 三角函数[k](toString(origin, pmap["*"], 0));
            }
            return mrow(obj, p >= pmap["**"], deep);
        }
        if (k === '+.') {
            var args = toString(origin, pmap[k], -1);
        }
        else var args = toString(origin, k === '/' ? 0 : pmap[k], 0);
        var addqt = (pmap[k] < p || pmap[k] === p && index > 0) && (p < pmap["**"] || pmap[k] < pmap["*"]);
        if (args instanceof Array) {
            if (k === "'" && args.length === 1 && !origin[0]["["]) {
                return mrow(args[0] + `<mo>&apos;</mo>`, p > pmap["**"], 0);
            }
            var f = funcmap[k];
            if (!f) {
                addqt = -1;
                f = puncmap[k];
            }
        }
        else f = unarymap[k];
        if (!f) {
            return mrow(`<mi>${希腊[k] || k}</mi>${mrow(args instanceof Array ? args.join('<mo>,</mo>') : args, true)}`, false, deep);
        }
        if (args instanceof Array) {
            if (k === '*') {
                var simple = true;
                var pisnum = isFinite(origin[0], true);
                var bx = +pisnum;
                var allnum = pisnum;
                for (var cx = 1, dx = args.length; cx < dx; cx++) {
                    var o = origin[cx];
                    var isnum = isFinite(o);
                    if (!isnum) allnum = false;
                    if (!pisnum && isnum) {
                        if (cx > bx) {
                            while (bx < cx) {
                                args[bx] = args[bx] + "<mo>·</mo>";
                                bx++;
                            }
                        }
                        bx = cx;
                    }
                    pisnum = isnum && isPostFinite(o);
                }
                if (allnum) {
                    return mrow(funcmap.mul(...args), false, deep);
                }
            }
            return mrow(f(...args), addqt, deep);
        }
        return mrow(f(args), addqt, deep);
    }
    var isCap = /^[A-Z]/.test(obj);
    obj = 希腊[obj] || obj;
    if (typeof obj === "number") {
        if (obj === Infinity) obj = '∞';
        if (obj < 0) obj = "–" + -obj;
        return mrow(mn(obj), -1, deep);
    }
    if (/^[\s,;]+$/.test(obj)) {
        obj = obj.replace(/(\r\n|\r|\n)\s*/g, br);
        if (lineBroken) return obj;
        obj = obj.replace(/\s/g, '&ensp;');
        return `<ms>${obj}</ms>`;
    }
    if (isCap && obj.length === 1) return mrow(ms(obj), -1, deep);
    obj = String(obj).replace(/\-/g, '–');
    return mrow(obj ? mi(obj) : '', -1, deep);
}
function toRows(args) {
    var res = [];
    var row = [];
    var q = true;
    var br = lineBroken;
    lineBroken = false;
    var inBlock = false;
    var inLine = false;
    var prevIsEqual = false;
    var prevIsBroken = false;
    for (var a of args) {
        if (a instanceof Object && !(a instanceof Array)) {
            for (var k in a) break;
            if (pmap[k] === pmap['=']) {
                if (row.length) {
                    if (prevIsBroken) {
                        var row1 = row.pop();
                        res.push(`<mtd style="text-align:left">`, row.join(''));
                        row1 = row1.replace(/\<mtd[^\>]*\>$/, '');
                        res.push(row1);
                    }
                    else {
                        res.push('<mtd style="text-align:left">', row.join(''), '</mtd>');
                    }
                    if (!prevIsEqual) {
                        res.push('<mtable><mtr>');
                        inBlock = true;
                    }
                }
                prevIsEqual = true;
                row = [];
                var r = toCell(a[k], k);
                res.push(r);
                q = true;
                continue;
            }
        }

        if (a instanceof Object) {
            if (!q) row.push('<ms>&ensp;</ms>');
            if (inBlock) {
                row.push("</mtr></mtable>");
                inBlock = false;
            }
            q = false;
            prevIsEqual = false;
            var r = toString(a, 0, 1);
            row.push(r);
        }
        else if (/^,/.test(a)) {
            row.push('<ms>,&ensp;</ms>'), q = true;
        }
        else if (a === ' ') {
            row.push(`<ms>&ensp;</ms>`), q = true;
        }
        else {
            if (!q) row.push('<ms>&ensp;</ms>');
            var r = toString(a, 0, 1);
            row.push(r);
            var prevIsBroken = lineBroken && /<mtd[^\>]*>$/i.test(r);
            if (prevIsBroken) q = true;
        }
    }
    if (inBlock) {
        row.push('</mtr></mtable>');
    }
    if (!res.length && !lineBroken) {
        res = row.join('');
    }
    else {
        if (row.length) res.push(`<mtd style="text-align:left">`, row.join(""), `</mtd>`);
        res = `<mtr>${res.join('')}</mtr>`;
    }
    lineBroken = br;
    return res;
};
function math(mathObj) {
    if (mathObj.tagName) return mathObj;
    var res = toRows(arguments);
    if (/^\<mtr/.test(res)) res = `<mtable>${res}</mtable>`;
    return `<math>${res}</math>`;
}
