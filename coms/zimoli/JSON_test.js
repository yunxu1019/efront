window.JSON = void 0;
delete modules.JSON;
modules.init("JSON", function (JSON) {
    var parse = function (s) {
        try {

            console.log(s, JSON.parse(s));
        } catch (e) {
            console.log(s, e);
        }
    };
    parse("{}");
    parse("[]");
    parse("1");
    parse('""');
    parse('true');
    parse('false');
    parse('null');
    parse('0');
    parse('0.1');
    parse('{"a":1}');
    parse('{"a":"1"}');
    parse('{"a":[]}');
    parse('{"a":{}}');
    parse('{"a":[1]}');
    parse('[{"a":[1]}]');
    parse('[{"a":[1]},{}]');
    parse('[{"a":[1]},{},[]]');
})