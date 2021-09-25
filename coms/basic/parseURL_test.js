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
test('http//:80', 'hostname', 'http')
test('http//:80', 'pathname', '//:80')
test('//h:80', 'host', 'h:80')
test('?80', 'path', '?80')
test('?80', 'search', '?80')
test('?80', 'query', '80')
test('#?80', 'hash', '#?80')
