var { createString } = require("./common");
var autoeval = require("./autoeval");
var autoenum = require("./autoenum");
var scanner2 = require("./scanner2");
var t = function (str, want) {
    var code = scanner2(str);
    code = autoenum(code);
    code = autoeval(code);
    var result = createString(code);
    assert(result, want);
};

var tc = function (str, want) {
    var parseColor = color.parse4;
    var toRGBA = color.stringify;
    var macros = Object.create(null);
    var color4 = function (name, a) {
        if (a.length === 1) a = a[0].split(/[\s\,]+/);
        var c = parseColor(name, ...a);
        if (!c) return a;
        return toRGBA(c);
    };
    macros.calc = a => a;
    ["oklch", 'oklab', 'lch', 'lab', 'hwb', 'hsl', 'rgb'].forEach(n => {
        macros[n] = function (from) {
            console.log(n, arguments)
            return color4(n, arguments);
        }
    });
    var css = new Javascript;
    css.number_reg = 素馨.number_reg;
    var code = scanner2(str, css);
    code = autoeval(code, macros);
    var result = createString(code);
    assert(result, want);
}
var tf = function (fullpath) {
    var data = require("fs").readFileSync(fullpath).toString()
    t(data, data);
}
t("1+1", "2");
t("1+3", "4");
t("(1+3)", "4");
t("(-1)*(1+3)", "-4");
t("(-+-+-2)*(1+3)", "-8");
t("(~1)*(1+3)", "-8");
t("(1*-1)+(1+3)", "3");
t("1+(1+3)", "5");
t("a(1+3)", "a(4)");
t("(1+3,5,3+4)", "(4, 5, 7)");
t("(1>>3,5,3+4)", "(0, 5, 7)");
t("a=1,b=2;(a|b)&c", "a = 1, b = 2; 3 & c");
t("(1+2).toString()", "3 .toString()");
t("(1n+2n).toString()", "3n.toString()");
t("Math.log2(2)", "1");
t("Math.log2(4)>Math.E", "false");
t("[1,2,3,4][2]", "3");
t("var log2=Math.log2;console.log(log2(4))", "var log2 = Math.log2; console.log(2)");
t("var {log2}=Math; console.log(log2(4))", "var { log2 } = Math; console.log(2)");
t("(-1).toString()", "(-1).toString()");
t("(-(2n*324n)).toString()", "(-648n).toString()");
t("a+ 2*3", "a + 6");
t("a+ 2*3**2", "a + 18");
t("a+ b*3**2", "a + b * 9");
t("a+ 2*3**b", "a + 2 * 3 ** b");
t("a+ 2*3 +c", "a + 6 + c");
t("a+ 2*3 +4+c", "a + 10 + c");
t("a- 2*3 +4+c", "a - 2 + c");
t("a- 1 +4", "a + 3");
t("a / 6 * 3", "a * 0.5");
t("a * 6 / 3", "a * 2");
t("a >>> 1 << 1", "a >>> 1 << 1");
t("a >> 1 << 1", "a >> 1 << 1");
t("a << 1 >>> 1", "a << 1 >>> 1");
t("a = 1 >>> 1", "a = 0");
t("a+ b*Math.sqrt(3**2)", "a + b * 3");
t("Math.sqrt", "Math.sqrt");
t("rgb(0xff 0xff 0xff)", "rgb(255 255 255)");
tc("rgb(0xff 0xff 0xff)", "#fff");
tc("hwb(120 0 0)", "#0f0");
tc("hwb(120turn 0 0)", "#f00");
tc("calc(10 / 20)", "0.5");
tc("calc(10 / 20)", "0.5");
tc("Math.log(f) / Math.LN2 / 10 | 0", "Math.log(f) * 0.14426950408889633 | 0");
tc("Math.log(f) / Math.LN2 / 10 * 10 | 0", "Math.log(f) * 1.4426950408889634 | 0");
tc("Math.log(f) / Math.LN2 / 10 ** 2 | 0", "Math.log(f) * 0.014426950408889633 | 0");
// tf(path.join(__dirname, "../zimoli/spacechar_test.js"))
t("1<<0", '1');
t("1<<3", '8');
t("(1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0)", '1335')
t("(1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0)", "7973")
t("(1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1)", "21522")
t('1n<<32n', '4294967296n');
t('4294967296n*4294967296n', '18446744073709551616n');
t('4294967296n*2147483648n', '9223372036854775808n');
t('0x20000000n*0x1000000n', '9007199254740992n');
t("1 + 1 / 2 + 1 / 3 + 1 / 4 + 1 / 5 + 1 / 6 + 1 / 7 + 1 / 8 + 1 / 9 + 1 / 10 + 1 / 11 + 1 / 12 + 1 / 13 + 1 / 14 + 1 / 15 + 1 / 16 + 1 / 17 + 1 / 18 + 1 / 19 + 1 / 20", "3.5977396571436824")
t(`2**2**3`, '256');
t(`1+2**2**3`, '257');
t(`a+2**2**3`, 'a + 256');
t(`a+2*2**2**3`, 'a + 512');
t(`4/2/2`, '1');
t(`4-2-2`, '0');
t(`1<<5-2-2`, '2');
t(`1<<5-2-2<<1`, '4');
t(`a<<5-2-2<<1`, 'a << 1 << 1');
autoeval.debug = true;
t(`1 + a<<5-2-2<<1`, '1 + a << 1 << 1');
t(`1+1 + a<<5-2-2<<1`, '2 + a << 1 << 1');
t(`1<<1 + a<<5-2-2<<1`, '1 << 1 + a << 1 << 1');
autoeval.debug = false;
t(`1+5*2*2+1`, '22');
