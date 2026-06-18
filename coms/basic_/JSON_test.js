var JSON0 = this.JSON;
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
            } catch {
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
var test2 = function (JSON) {
    var data = [{
        "name": i18n(`\u4ee3\u7406\u8def\u5f84`, `Proxy Path`),
        "type": "input",
        "key": "url",
        "comment": "",
        "size": "120",
        "unit": "bit",
        "ratio": 0.125,
        "required": true
    }, {
        "name": i18n(`\u4e8c\u7ef4\u7801`, `QR code`),
        "type": "1byte",
        "key": "url",
        "comment": "",
        "size": "1",
        "unit": "byte",
        "ratio": 1,
        "readonly": true
    }, {
        "name": i18n(`\u771f\u5b9e\u8def\u5f84`, `Real path`),
        "type": "url",
        "key": "realpath",
        "comment": "",
        "size": "300",
        "unit": "bit",
        "ratio": 0.125
    }, {
        "name": i18n(`\u52a8\u4f5c`, `action`),
        "type": "select",
        "key": "action",
        "comment": "",
        "options": [{
            "name": "跳转",
            "value": 0
        }, {
            "name": "转发",
            "value": 1
        }],
        "size": "100",
        "unit": "bit",
        "ratio": 0.125
    }, {
        "name": i18n(`\u72b6\u6001`, `state`),
        "type": "select",
        "key": "status",
        "comment": "",
        "options": [{
            "name": "启用",
            "value": 0
        }, {
            "name": "禁用",
            "value": 1
        }],
        "size": "100",
        "unit": "bit",
        "ratio": 0.125
    }, {
        "name": i18n(``, ``),
        "type": "byte",
        "key": "",
        "comment": "",
        "options": {
            name: "访问",
            do(o) {
                var url = o.url;
                if (!/^\//.test(url))
                    url = "/" + url;
                window.open(url, null);
            }
        },
        "size": 1,
        "unit": "byte",
        "ratio": 1,
        "readonly": true
    }];
    var unicode = a => a.replace(/\\u([a-f\d]{4})/g, (_, a) => String.fromCharCode(parseInt(a, 16)));
    assert(unicode(JSON.stringify(data, null, 4)), JSON0.stringify(data, null, 4))
    var filter = function (k, o) {
        if (typeof o !== 'object' || o.length) return o;
        return { name: o.name };
    }
    assert(unicode(JSON.stringify(data, filter, 4)), JSON0.stringify(data, filter, 4));
    assert(unicode(JSON.stringify(JSON.parse(JSON.stringify(data)))), unicode(JSON0.stringify(data)))
    assert(JSON.parse(`/**/1`), 1)
    assert(JSON.parse(`/**/"1"`), "1")
    assert(JSON.parse(`"1"//`), "1")
    assert(JSON.parse(`["1"//\r\n,2]`), ["1", 2])
    assert(JSON.parse(`{"1"/*a*/:\r\n2}`), { "1": 2 })
    assert(JSON.parse(`{"1":\r\n/*a*/2}`), { "1": 2 })
    assert(JSON.parse(`{/*a*/"1":\r\n2}`), { "1": 2 })
    assert(JSON.parse(`{"1/*a*/":\r\n2}`), { "1/*a*/": 2 })
}
var test3 = function (JSON, name) {
    var start_time = performance.now();
    for (var cx = 0, dx = 0xffff; cx < dx; cx++) {
        var str = String.fromCodePoint(cx);
        var enc = JSON.stringify(str);
        var dec = JSON.parse(enc);
        assert(dec, str);
        var obj = { [str]: str };
        enc = JSON.stringify(obj);
        dec = JSON.parse(enc);
        assert(dec, obj);
        obj = { [enc]: dec, [str]: obj };
        var enc = JSON.stringify(obj);
        dec = JSON.parse(enc);
        if (!assert(dec, obj)) {
            console.log(cx, str, cx.toString(16), enc, dec, obj);
            process.exit(1);
        }
    }
    console.log(performance.now() - start_time, name);
};
var test4 = function (JSON) {
    var data = {};
    assert(JSON.stringify({ a() { } }), "{}");
    data.refund_amount = data;
    JSON.stringify(data);
}
try {
    var JSON1 = require("./JSON.js");
    test2(JSON1);
    test3(JSON1, '替补JSON, basic_/JSON.js');
    test3(JSON0, '原生JSON');
    test3(JSAM, 'JSAM, basic/JSAM');
    test4(JSON1);
}
catch (e) {
    console.log(e)
}