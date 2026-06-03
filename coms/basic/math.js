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
    return s + `<ms>&thinsp;</ms>` + a;
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
    `<munderover><mo>∑</mo>${neq}${to}</munderover>${通项}`;
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
var circles = "①②③④⑤⑥⑦⑧⑨⑩";

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
}

var funcmap = {
    "+"(...args) {
        return mo3("+", args);
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
    series,
    group(...args) {
        return `<mo>{</mo><mtable><mtr><mtd>${args.join("</mtd></mtr><mtr><mtd>")}</mtd></mtr></mtable>`
    },
    '!='(...args) {
        return mo3("≉", args);
    },
    '!=='(...args) {
        return mo3("≢", args);
    },
    "~="(...args) {
        return mo3("≈", args);
    },
    "integral"(a, b = '', c = '') {
        return `<msubsup><mo>∫</mo>${b}${c}</msubsup>${a}`;
    },
    "'"(...args) {
        var b = args.pop();
        if (!args.length) return `<msup>${b}<mo>'</mo></msup>`;// 转置
        // 导数
        return args.map((a) => `${a}<mo>'</mo>`).join('') + `<mi>(</mi>${b}<mi>)</mi>`;
    },
    "!"(...args) {
        return args.map(a => a + `<mo>!</mo>`).join('');
    }
};
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
    return '</mtd></mtr><mtr><mtd>';
};
function toString(obj, p, deep) {
    if (obj instanceof Array) {
        if (deep == 1 && obj.length === 2 && obj[1].tab) {
            return toString(obj[0], 0, deep) + "</mtd><mtd>" + obj.slice(1, obj.length).map(a => toString(a, 0, 0)).join("</mtd><mtd>");
        }
        deep++;
        var args = obj.map(a => toString(a, deep > 1 ? 0 : p, deep));
        deep--;
        if (args instanceof Array) {
            if (deep > 2) {
                if (args.length > 1) args = `<mrow><mo>(</mo>${args.join('<mo>,</mo>')}<mo>)</mo></mrow>`;
            }
            else if (deep === 2) {
                args = `<mtd>${args.join('</mtd><mtd>')}</mtd>`;
            }
            else if (deep === 1) {
                args = `<mrow><mo>[</mo><mtable><mtr>${args.join("</mtr><mtr>")}</mtr></mtable><mo>]</mo></mrow>`;
            }
        }
        return args;
    }
    var res;
    if (obj instanceof Object) {
        for (var k in obj) break;
        if (!k) return '';
        var origin = obj[k];
        if (k === '.' || k === '..') {
            if (k === '.') {
                var [prefix, e, s] = origin;
                if (/[^\d]$/.test(e)) s = e, e = '';
            }
            else var [prefix, rep, dots, e, s] = origin;
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
        if (k === 'tab') {
            k = origin.shift();
            if (!origin.length || !(k in tabs)) {
                var args = origin.map(a => toString(a, 0, deep));
                return mrow(`<ms>(</ms>${k}${args.length ? "<ms>,</ms>" + args.join('<ms>,</ms>') : ''}<ms>)</ms>`, -1, deep);
            }
            return mrow(tabs[k](...origin), -1, deep);
        }
        if (k in 三角函数) {
            var args = origin.map(a => toString(a, pmap["*"], 0));
            obj = 三角函数[k](...args);
            return mrow(三角函数[k](...args), p >= pmap["**"], deep);
        }
        var args = toString(origin, pmap[k], 0);
        var addqt = pmap[k] < p && p < pmap["**"];
        if (args instanceof Array) {
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
                var allnum = true;
                var bx = 1;
                var simple = true;
                for (var cx = 0, dx = args.length; cx < dx; cx++) {
                    if (typeof origin[cx] !== 'number') {
                        allnum = false;
                        if (cx > bx) {
                            while (bx < cx) {
                                args[bx] = args[bx] + "<mo>·</mo>";
                                bx++;
                            }
                        }
                        bx = cx;
                    }
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
        obj = obj.replace(/(\r\n|\r|\n)/g, br)
        if (lineBroken) return obj;
        obj = obj.replace(/\s/g, '&ensp;');
        return `<mtext>${obj}</mtext>`;
    }
    if (isCap && obj.length === 1) return mrow(ms(obj), -1, deep);
    obj = String(obj).replace(/\-/g, '–');
    return mrow(obj ? mi(obj) : '', -1, deep);
}
function math(mathObj) {
    if (mathObj.tagName) return mathObj;
    lineBroken = false;
    var res = [];
    for (var a of arguments) {
        res.push(toString(a, 0, 1));
    }
    res = res.join('');
    if (lineBroken) {
        res = `<mtable style="text-align:justify"><mtr><mtd>${res}</mtd></mtr></mtable>`;
    }
    return `<math>${res}</math>`;
}
