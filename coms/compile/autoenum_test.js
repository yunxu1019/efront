var scanner2 = require("./scanner2");
var { createString } = require("./common");
var autoenum = require("./autoenum");
var t = function (str, want) {
    var code = scanner2(str)
    var code = autoenum(code);
    var result = createString(code);
    assert(result, want);
}
t("{a = 1, b = console.log(a)}=[2];", "{ a = 1, b = console.log(a) } = [2];");
t("{a = 1, b = console.log(a)}", "{ a = 1, b = console.log(1) }");
t("{a = 1, b = console.log(a)} console.log(a)", "{ a = 1, b = console.log(1) } console.log(1)");
t("if(a){a = 1, b = console.log(a)} console.log(a)", "if (a) { a = 1, b = console.log(1) } console.log(a)");
t("m:{a = 1; break m; b = console.log(a)} console.log(a)", "m: { a = 1; break m; b = console.log(1) } console.log(1)");
t("m:{break m; a = 1; b = console.log(a)} console.log(a)", "m: { break m; a = 1; b = console.log(1) } console.log(a)");
t("m:{ if(){break m;} a = 1; b = console.log(a)} console.log(a)", "m: { if () { break m; } a = 1; b = console.log(1) } console.log(a)");
t("m:{ if(){break ;} a = 1; b = console.log(a)} console.log(a)", "m: { if () { break; } a = 1; b = console.log(1) } console.log(a)");
t("m:{ while(){break;} a = 1; b = console.log(a)} console.log(a)", "m: { while () { break; } a = 1; b = console.log(1) } console.log(1)");
t("m:{ while(){break m;} a = 1; b = console.log(a)} console.log(a)", "m: { while () { break m; } a = 1; b = console.log(1) } console.log(a)");
t("var a=1;console.log(a)", "var a = 1; console.log(1)");
t("a.b = 2;console.log(a.b)", "a.b = 2; console.log(2)");
t("a/*a*/.b = 2;console.log(a.b)", "a/*a*/.b = 2; console.log(2)");
t("a.b = 2;console.log(a/*aaaa*/.b)", "a.b = 2; console.log(2)");
t("a.b = 2;console.log(/*bbbb*/a.b)", "a.b = 2; console.log(/*bbbb*/2)");
t("var {a=1};console.log(a)", "var { a = 1 }; console.log(a)");
t("if(c) a=1;console.log(a)", "if (c) a = 1; console.log(a)");
t("console.log(a);a=1;", "console.log(a); a = 1;");
t("console.log(a);var a=1;", "console.log(a); var a = 1;");
t("var a=1;console.log(a++);", "var a = 1; console.log(a++);");
t("for(;;){let a =1; console.log(a)}", "for (;;) { let a = 1; console.log(1) }");
t("for(;;){a =1; console.log(a)}", "for (;;) { a = 1; console.log(1) }");
t("a=2;for(;;){var a =1; console.log(a)}", "a = 2; for (;;) { var a = 1; console.log(1) }");
t("for(;;){var a =1; console.log(a)} console.log(a)", "for (;;) { var a = 1; console.log(1) } console.log(a)");
t("function (a=1){ console.log(a)}", "function (a = 1) { console.log(a) }");
t("for(a=1;;a++){ console.log(a)} console.log(a)", "for (a = 1;; a++) { console.log(a) } console.log(a)");
t("for(a=1;a<10;a++){ console.log(a)} console.log(a)", "for (a = 1; a < 10; a++) { console.log(a) } console.log(a)");
t("for(;a=1;a++){ console.log(a)} console.log(a)", "for (; a = 1; a++) { console.log(a) } console.log(a)");
t("for(;a=1;){ console.log(a)} console.log(a)", "for (; a = 1;) { console.log(1) } console.log(1)");
t("for(;a=1;){ console.log(a)} console.log(a)", "for (; a = 1;) { console.log(1) } console.log(1)");
t("for(;;a=1){ console.log(a)} console.log(a)", "for (;; a = 1) { console.log(a) } console.log(a)");
t("for(var a = 1;;){ console.log(a)} console.log(a)", "for (var a = 1;;) { console.log(1) } console.log(1)");
t("for(let a = 1;;){ console.log(a)} console.log(a)", "for (let a = 1;;) { console.log(1) } console.log(a)");
t("for(let a = 1;;a++){ console.log(a)} console.log(a)", "for (let a = 1;; a++) { console.log(a) } console.log(a)");
t("for(let a = 1;;++a){ console.log(a)} console.log(a)", "for (let a = 1;; ++a) { console.log(a) } console.log(a)");
t("var a=-1; console.log(-a)", "var a = -1; console.log(- -1)");
t("var a=-1; console.log(--a)", "var a = -1; console.log(--a)");
t("var a=-1; return ++a", "var a = -1; return ++a");
t("var a=-1; typeof ++a", "var a = -1; typeof ++a");
t("var a=-1; ++a", "var a = -1; ++a");
t("b?a=1:b=2;console.log(a)", "b ? a = 1 : b = 2; console.log(a)");
t(
    "switch () { case 1: a = 1; console.log(a) } console.log(a)",
    "switch () { case 1: a = 1; console.log(1) } console.log(a)"
);
t(
    "switch () { default: a = 1; console.log(a); case 1: console.log(a) }",
    "switch () { default: a = 1; console.log(1); case 1: console.log(a) }",
);
t(
    "switch () { case 0: a = 1; console.log(a); case 1: console.log(a) }",
    "switch () { case 0: a = 1; console.log(1); case 1: console.log(a) }",
)
t(`a[1]=1;console.log(a)`, `a[1] = 1; console.log(a)`);
t(`a[1]=1;console.log(a[1])`, `a[1] = 1; console.log(1)`);
t(`a[b]=1;console.log(a[b])`, `a[b] = 1; console.log(a[b])`);
t(
    `p => tmp = 2025; console.log(tmp)`,
    "p => tmp = 2025; console.log(tmp)",
);
t(
    `p = () => tmp = 2025; tmp = 1; p(); console.log(tmp)`,
    "p = () => tmp = 2025; tmp = 1; p(); console.log(tmp)",
);
t(
    `tmp = 1; p(); console.log(tmp); function p() { tmp = 2025 }`,
    `tmp = 1; p(); console.log(tmp); function p() { tmp = 2025 }`,
);
t(
    `p = () => tmp = 2025; tmp = 1; console.log(tmp)`,
    "p = () => tmp = 2025; tmp = 1; console.log(tmp)",
);
t(
    `tmp = 1; console.log(tmp); function p() { tmp = 2025 }`,
    `tmp = 1; console.log(tmp); function p() { tmp = 2025 }`,
);
// t(fs.readFileSync(path.join(__dirname,"../zimoli/spacechar_test.js")).toString())