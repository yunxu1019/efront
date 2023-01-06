var trim0 = function (data) {
    var start = data.indexOf("{") + 1;
    while (/\s/.test(data.charAt(start))) start++;
    var end = data.lastIndexOf("}") - 1;
    while (/\s/.test(data.charAt(end))) end--;
    data = data.slice(start, end + 1);
    return data;
};
var trim1 = function (data) {
    var start = data.indexOf('{');
    var end = data.lastIndexOf("}");
    data = data.slice(start + 1, end).trim();
    return data;
}
var trim2 = function (data) {
    data = data.replace(/^\s*function\s*\(\s*\)\s*\{\s*/, '').replace(/\s*\}\s*$/, "");
    return data;
};
var r3 = /^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
var trimr3 = function (data) {
    data = data.replace(r3, "$1");
    return data;
};
var trim3 = function (data) {
    data = data.replace(/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/, "$1");
    return data;
};
var trim4 = function (data) {
    data = data.replace(/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*)\s*\}\s*$/, "$1");
    return data;
};
var trim5 = function (data) {
    data = data.replace(/^\s*function\s*\(\s*\)\s*\{\s*|\s*\}\s*$/g, "");
    return data;
};
var test = function (call, time) {
    var testdata = test.toString();
    // var timestart = performance.now(); node deno
    var timestart = Date.now(); //quickjs
    for (var cx = 0, dx = time; cx < dx; cx++) {
        call(testdata);
    }
    var timespend = Date.now() - timestart;
    console.log(`执行${call.name} ${time}次，耗时${timespend} 毫秒`)
};
test(trim0, 1000000);  // node 执行trim0 1000000次，耗时307.44369983673096 毫秒		deno	执行trim0 1000000次，耗时292 毫秒	quickjs	执行trim0 1000000次，耗时27287 毫秒
test(trim1, 1000000);  // node 执行trim1 1000000次，耗时90.22100019454956 毫秒		deno	执行trim1 1000000次，耗时94 毫秒	quickjs	执行trim1 1000000次，耗时760 毫秒
test(trim2, 1000000);  // node 执行trim2 1000000次，耗时1868.7370998859406 毫秒		deno	执行trim2 1000000次，耗时1910 毫秒	quickjs	执行trim2 1000000次，耗时27090 毫秒
test(trimr3, 1000000); // node 执行trimr3 1000000次，耗时123.13910007476807 毫秒	deno	执行trimr3 1000000次，耗时130 毫秒	quickjs	执行trimr3 1000000次，耗时8272 毫秒
test(trim3, 1000000);  // node 执行trim3 1000000次，耗时129.80400013923645 毫秒		deno	执行trim3 1000000次，耗时134 毫秒	quickjs	执行trim3 1000000次，耗时8493 毫秒
test(trim4, 1000000);  // node 执行trim4 1000000次，耗时135.37520003318787 毫秒		deno	执行trim4 1000000次，耗时132 毫秒	quickjs	执行trim4 1000000次，耗时8411 毫秒
test(trim5, 1000000);  // node 执行trim5 1000000次，耗时1793.7154998779297 毫秒		deno	执行trim5 1000000次，耗时1796 毫秒	quickjs	执行trim5 1000000次，耗时20186 毫秒
test(trim0, 100000);   // node 执行trim0 100000次，耗时31.9229998588562 毫秒		deno	执行trim0 100000次，耗时32 毫秒		quickjs	执行trim0 100000次，耗时4157 毫秒
test(trim1, 100000);   // node 执行trim1 100000次，耗时8.434499979019165 毫秒		deno	执行trim1 100000次，耗时8 毫秒		quickjs	执行trim1 100000次，耗时65 毫秒
test(trim2, 100000);   // node 执行trim2 100000次，耗时186.96269989013672 毫秒		deno	执行trim2 100000次，耗时184 毫秒	quickjs	执行trim2 100000次，耗时2722 毫秒
test(trimr3, 100000);  // node 执行trimr3 100000次，耗时13.523599863052368 毫秒		deno	执行trimr3 100000次，耗时16 毫秒	quickjs	执行trimr3 100000次，耗时827 毫秒
test(trim3, 100000);   // node 执行trim3 100000次，耗时13.966799974441528 毫秒		deno	执行trim3 100000次，耗时12 毫秒		quickjs	执行trim3 100000次，耗时813 毫秒
test(trim4, 100000);   // node 执行trim4 100000次，耗时14.078500032424927 毫秒		deno	执行trim4 100000次，耗时14 毫秒		quickjs	执行trim4 100000次，耗时864 毫秒
test(trim5, 100000);   // node 执行trim5 100000次，耗时184.33949995040894 毫秒		deno	执行trim5 100000次，耗时182 毫秒	quickjs	执行trim5 100000次，耗时1986 毫秒
test(trim0, 10000);    // node 执行trim0 10000次，耗时3.7204999923706055 毫秒		deno	执行trim0 10000次，耗时6 毫秒		quickjs	执行trim0 10000次，耗时421 毫秒
test(trim1, 10000);    // node 执行trim1 10000次，耗时0.9958999156951904 毫秒		deno	执行trim1 10000次，耗时2 毫秒		quickjs	执行trim1 10000次，耗时14 毫秒
test(trim2, 10000);    // node 执行trim2 10000次，耗时20.23900008201599 毫秒		deno	执行trim2 10000次，耗时20 毫秒		quickjs	执行trim2 10000次，耗时279 毫秒
test(trimr3, 10000);   // node 执行trimr3 10000次，耗时1.438499927520752 毫秒		deno	执行trimr3 10000次，耗时0 毫秒		quickjs	执行trimr3 10000次，耗时86 毫秒
test(trim3, 10000);    // node 执行trim3 10000次，耗时1.467400074005127 毫秒		deno	执行trim3 10000次，耗时0 毫秒		quickjs	执行trim3 10000次，耗时78 毫秒
test(trim4, 10000);    // node 执行trim4 10000次，耗时1.3108999729156494 毫秒		deno	执行trim4 10000次，耗时2 毫秒		quickjs	执行trim4 10000次，耗时83 毫秒
test(trim5, 10000);     // node 执行trim5 10000次，耗时18.876699924468994 毫秒		deno	执行trim5 10000次，耗时18 毫秒		quickjs	执行trim5 10000次，耗时197 毫秒
