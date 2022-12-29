var parseURL = require("./parseURL");
require("../efront/console");
var test = function (url, key, value) {
    var parsed = parseURL(url);
    if (parsed[key] !== value) console.log(parsed), console.fail(`url:${url}, key:${key}, expect:${value}, result:${parsed[key]}`);
    else console.pass(`url:${url}, key:${key}, expect:${value}, result:${parsed[key]}`);
};

test('http://efront.cc/kugou', 'pathname', '/kugou')
test('http://efront.cc/kugou?a', 'path', '/kugou?a')
test('http://yunxu1019@live.cn@github.com/?a', 'username', 'yunxu1019@live.cn')
test('localhost', 'host', 'localhost')
test('localhost:80', 'port', '80')
test('localhost:80/', 'port', '80')
test('magnet:?xt=::', 'search', '?xt=::')
test('magnet:?xt=::', 'protocol', 'magnet:')
test('magnet:?xt=::', 'host', '')
test('magnet:?xt=::', 'pathname', undefined)
test('efront.cc', 'host', 'efront.cc')
test('127.0.0.1', 'host', '127.0.0.1')
test(':80', 'port', '80')
test('80', 'port', '80')
test('/80', 'pathname', '/80')
test('a80', 'host', 'a80')
test('a:80', 'host', 'a:80')
test('a:b:80', 'host', 'b:80')
test('a:b@a80', 'auth', 'a:b')
test('c:a:b@a80', 'auth', 'a:b')
test('c:d:a:b@a80', 'password', 'a:b')
test('localhost:', 'protocol', 'localhost:')
test('localhost:80', 'hostname', 'localhost')
test('efront.cc', 'hostname', 'efront.cc')
test('efront.', 'hostname', undefined)
test('efront.', 'pathname', "efront.")
test('http//:80', 'hostname', 'http')
test('http//:80', 'pathname', '//:80')
test('//h:80', 'host', 'h:80')
test('?80', 'path', '?80')
test('?80', 'search', '?80')
test('?80', 'query', '80')
test('#?80', 'hash', '#?80')
test("http://[fe80::caa:a647:ef1d:b4db]/", "host", "[fe80::caa:a647:ef1d:b4db]")
test("http://[::1]/", "host", "[::1]")
test("http://[::]/", "host", "[::]")
test("http://[::%12]/", "host", "[::%12]")
test("http://[::]:80/", "hostname", "[::]")
test("[::]:80/", "hostname", "[::]")
test("[fd64:f52:f52:f52:f52:f52:f52:97]", "hostname", "[fd64:f52:f52:f52:f52:f52:f52:97]")
test("./cluster-opt.html", "pathname", "./cluster-opt.html")
test(":cluster-opt.html", "pathname", ":cluster-opt.html")
test("d:/cluster-opt.html", "pathname", "d:/cluster-opt.html")
test("d:\\cluster-opt.html", "pathname", "d:\\cluster-opt.html")
test("d:\\work\\cluster-opt.html", "pathname", "d:\\work\\cluster-opt.html")
test("ftp:\\\\cluster-opt.html", "host", "cluster-opt.html")
test("\\\\cluster-opt.html", "host", "cluster-opt.html")
test("https://a:b@測試?abc#foo", "host", "測試")