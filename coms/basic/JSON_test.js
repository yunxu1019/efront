var JSON0 = window.JSON;
console.log(JSON0);
var test = function (JSON) {
    var parse = function (s) {
        try {
            console.log(s, JSON.parse(s));
        } catch (e) {
            console.log(s, e);
        }
    };
    var stringify = function (o, f, s) {
        try {
            var res = JSON.stringify(o, f, s);
            var res0 = JSON0.stringify(o, f, s);
            if (res !== res0) console.warn(res && res.length, res, res0 && res0.length, res0, res === res0);

        } catch (e) {
            console.error(o, e);
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
    parse('1e2');
    parse('1e-2');
    parse('1.3e-2');
    parse('-1.3e-2');
    stringify(0)
    stringify(void 0)
    stringify("")
    stringify("\\\"")
    stringify("\\\"\\")
    stringify("\\\"\\'")
    stringify("\\\r\n\t")
    stringify([])
    stringify({})
    stringify(13e13)
    stringify(13e-13)
    stringify(true)
    stringify(false)
    stringify(null)
    stringify([{}], null, 4);
    stringify([{ a: 2 }], null, 4)
    stringify([{ a: '2' }], null, 4)
    stringify([{ a: '2' }], a => null, 4);
    var id = 0;
    deepEqual_test(function (arg) {
        id++;
        var timer = function (name, call, space) {
            var start = new Date();
            try {
                var res = call(arg, null, space);
            } catch{
                res = "error";
            }
            var delta = new Date - start;
            delta > 1 && console.log(id, name, delta, res && res.length, res && res.slice(0, 20));
        };
        timer("JSON1.stringify", JSON.stringify, 0);
        timer("JSON0.stringify", JSON0.stringify, 0);
        timer("JSON1.stringify", JSON.stringify, 8);
        timer("JSON0.stringify", JSON0.stringify, 8);
        timer("JSON1.stringify", JSON.stringify, '    ');
        timer("JSON0.stringify", JSON0.stringify, '    ');
    });

};
function JSON_test() {
    window.JSON0 = JSON0;
    window.JSON = void 0;
    delete modules.JSON;
    modules.init("JSON", test);
    window.JSON = JSON0;
}