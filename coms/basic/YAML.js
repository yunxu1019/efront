var string = function (a) {
    if (/^#|\s#|\:\s|\[\]\{\}\'\"/i.test(a)) {
        a = strings.encode(a);
    }
    return a;
}

var stringify = function (data) {
    var result = [];
    var objpath = [data];
    loop: while (objpath.length) {
        var data = objpath[objpath.length - 1];
        if (objpath.indexOf(data) < objpath.length - 1) throw new Error("YAML无法处理环形数据，请使用JSAM代替！");
        if (isArray(data)) {
            if (!data.length) {
                objpath.pop();
                continue;
            }
            var data = data.shift();
            var k = "\r\n" + new Array(objpath.length).join("  ") + "-";
            result.push(k);
            objpath.push(data);
        }
        else if (isObject(data)) {
            for (var k in data) {
                var v = data[k];
                delete data[k];
                k = string(k);
                if (/\-$/.test(result[result.length - 1])) {
                    k = " " + k + ":";
                }
                else {
                    k = "\r\n" + new Array(objpath.length).join('  ') + k + ":";
                }
                objpath.push(v);
                result.push(k);
                continue loop;
            }
            objpath.pop();
        }
        else {
            if (data === undefined || typeof data === 'number' && !isFinite(data)) data = null;
            data = string(data);
            var v = " " + String(data);
            result.push(v);
            objpath.pop();
        }
    }
    return result.join("");
}
var YAML = {
    stringify,
    parse: parseYML
};