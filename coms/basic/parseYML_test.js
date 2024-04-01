var fs = require("fs");
var path = require("path");
var fullpath = path.join(__dirname, "../../.github/workflows/npmpublish.yml");
var text = fs.readFileSync(fullpath).toString();
var test = function (source, expect) {
    var result = parseYML(source);
    var same = assert(result, expect);
    if (!same) console.log(result);
}
test('true', true);
test('- true', [true]);
test('true true', "true true");
test('a: true', { a: true });
test('false', false);
test('null', null);
test('a', "a");
test('"a"', "a");
test(`'a'`, "a");
test("[0,12]", [0, 12]);
test("[0,12,a,b]", [0, 12, 'a', 'b']);
test("[0,12,a,b,'c','d']", [0, 12, 'a', 'b', 'c', 'd']);
test(`[0,12,a,b,"c","d"]`, [0, 12, 'a', 'b', "c", "d"]);
test(`{}`, {});
test(`{a: b}`, { a: 'b' });
test(`{"a":b}`, { a: 'b' });
test(`{a:[b,c,d]}`, { a: ['b', 'c', 'd'] });
test(`{a:[b,{a},[c],[{}],c,d]}`, { a: ['b', { a: null }, ["c"], [{}], "c", 'd'] });
test(`{"a":{a: b},c:{},d:[c],e:[{j}]}`, { a: { a: 'b' }, c: {}, d: ["c"], e: [{ j: null }] });
test(`{"a":"[b,c,d]"}`, { a: "[b,c,d]" });
test(`{"a":false}`, { a: false });
test(`{"a":13e1}`, { a: 13e1 });
test(`{"a":13e+1}`, { a: 13e1 });
test(`{"a":13e-1}`, { a: 13e-1 });
test(`{"a":1.21}`, { a: 1.21 });
test(`{"a":-1.21}`, { a: -1.21 });
test(`{"a":0x1a}`, { a: 0x1a });
test(`{"a":null}`, { a: null });
test(`{"a":true}`, { a: true });
test(`{"a":-12e71}`, { a: -12e71 });
test(`{"a":12e+71}`, { a: 12e+71 });
test(`12e+71`, 12e+71);
test(`-12e+71`, -12e+71);
test(`-12e-71`, -12e-71);
test(`-12.0`, -12.0);
test(`-12.e-61`, -12.e-61);
test(`+12.e-61`, 12.e-61);
test(`12.e-61`, 12.e-61);
test(`{"a":"[b,c,\r\n\\"d]"}`, { a: "[b,c,\r\n\"d]" });
test(`
 - zh-CN: "跳过了缺少参数的请求:$1 $2 $3\\r\\n缺少参数：$4"
   en:    "Skipped request with missing parameters: $1 $2 $3"`,
    [{
        "zh-CN": "跳过了缺少参数的请求:$1 $2 $3\r\n缺少参数：$4",
        "en": "Skipped request with missing parameters: $1 $2 $3"
    }]);
test(`
- zh-CN: 未没找到匹配的资源：$1
  en:    "No matching resources found: $1"
`, [{
    "zh-CN": "未没找到匹配的资源：$1",
    "en": "No matching resources found: $1"
}]);
test(`- a:: b`, [{ "a:": "b" }]);
test(`- a::b`, ["a::b"]);
test(`a::b`, "a::b");
test(`a:":b`, `a:":b`);
test(`a:": b`, { 'a:"': "b" });
test(`a: :b`, { "a": ":b" });
test(`a:: b`, { "a:": "b" });
test(`"a:": b`, { "a:": "b" });
test(`"a:":b`, { "a:": "b" });
test(`
c: d
"a:": b
`, { c: "d", "a:": "b" });

test(`"@"`, "@")
test(`"\\"@\\""`, "\"@\"")
test(`@""@""`, "@\"@\"")
test(`""@""`, "\"@\"")