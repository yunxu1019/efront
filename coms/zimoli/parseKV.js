function parseKV(string) {
    var object = {};
    isString(string) && string.replace(/([\-\w\$_]*)\:([\-\w\$_#\(\)'"]*)/g, function (match, k, v) {
        object[k.replace(/\-+(\w)/g,function(match,m){return m.toUpperCase()})] = v;
        return match;
    });
    return object;
}