var jsonpid = 0;
function jsonp(url, params) {
    var extras = {};
    jsonpid++;
    var jsonpcb = 'jsonp' + jsonpid;
    var callbacks = [];
    for (var k in params) {
        var f = params[k]
        if (isFunction(f)) {
            callbacks.push(f);
            extras[k] = jsonpcb;
        } else {
            extras[k] = params[k];
        }
    }
    window[jsonpcb] = function (a) {
        delete window[jsonpcb];
        callbacks.forEach(c => c(a));
        remove(s);
    };
    var search = serialize(extras);
    if (search) {
        url += /\?/.test(url) ? "&" + search : "?" + search;
    }
    var s = script(url);
    s.abort = function () {
        remove(this);
    };
    return s;
}