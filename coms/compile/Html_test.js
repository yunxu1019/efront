var Html = require("./Html");
var fs = require("fs");
var path = require("path");
var test = function (source, pick, value) {
    var h = new Html;
    var b = h.exec(source);
    if (arguments.length === 2) source = pick;
    assert(h.createString(b), source);
    if (arguments.length === 3) {
        assert(seek(b, pick), value);
    }
};
var test2 = function (source) {
    var s = scanner2(source, 'html');
    assert(s.toString(), source);
}
test("<h><a #c>b</a><c b=x>d</c><d/><e>2px</e></h>");
test("<a>Let's Encrypt</a>");
test("<style>{a-b:2}</style>");
assert(scanner2("<a>Let's Encrypt</a>", Html).length, 1);
test('<a href="${i18n``}">Let\'s Encrypt</a>');
test('加载中..<a class="loading"></a>');
test('<input ng-model=data.name />');
test('<input ng-model=data.name/>', '<input ng-model=data.name />');
test('<!--<input ng-model=data.name/>-->');
test('<div><!--<input ng-model=data.name/>--></div>');
test('<div><div>{</div><div>}</div></div>');
test('<div>${`<div></div>`}</div>');
test('<div>\\${${`<div></div>`}</div>');
test('<div>$\\{${`<div></div>`}</div>');
test('<div>$\\{${typeof `<div></div>`}</div>');
test('<div>$\\{${\\a+typeof`<div></div>`}</div>', '<div>$\\{${\\a + typeof `<div></div>`}</div>');
