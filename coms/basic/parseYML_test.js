var fs = require("fs");
var path = require("path");
var fullpath = path.join(__dirname, "../../.github/workflows/npmpublish.yml");
var text = fs.readFileSync(fullpath).toString();
var parseYML = require("./parseYML");
var text = [
    `true`,
    `- true`,
    ` true true`,
    ` a: true `,
    `false`,
    `null`,
    `a`,
    `"a"`,
    `'a'`,
    `[0,12]`,
    `[0,12,a,b]`,
    `[0,12,a,b,"c","d"]`,
    `{}`,
    `{a: b}`,
    `{"a":b}`,
    `{"a":[b,c,d]}`,
    `{"a":[b,{a},[c],[{}],c,d]}`,
    `{"a":{a: b},c: {},d: [c],e: [{j}]}`,
    `{"a":"[b,c,d]"}`,
    `{"a":false}`,
    `{"a":13e1}`,
    `{"a":1.21}`,
    `{"a":0x1a}`,
    `{"a":null}`,
    `{"a":true}`,
    `{"a":-12e71}`,
    `{"a":-12e+71}`,
    `{"a":-12}`,
    `{"a":-12.0}`,
    `{"a":-12.e-61}`,
    `{"a":+12.e-61}`,
    `{"a":12.e-61}`,
    `{"a":"[b,c,\\"d]"}`,
    text
];
var test = function (text) {
    var data = parseYML(text);
    console.log(data);
};
text.forEach(test);