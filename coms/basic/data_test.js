data.setConfig({
    'http://baidu.com/ a=`1&b=c': {
        'baidu': 'get .'
    }
});

var baiduapi = await data.getApi("baidu");
assert(baiduapi.base, "http://baidu.com/")
assert(baiduapi.id, "baidu")
assert(baiduapi.headers.a, "`1")
assert(baiduapi.headers.b, "c")
assert(baiduapi.method, "get")