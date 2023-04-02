var string = function (a) {
    if (/^#|\s#|\:\s|\[\]\{\}\'\"/i.test(a)) {
        a = strings.encode(a);
    }
    return a;
}

var stringify = function (data) {
    var result = [];
    var objpath = [data];
    var kesize = [];
    var origins = [];
    var save = function (data) {
        var v = String(data);
        if (kesize.length) {
            var isrow = /^\s*\-/.test(result[result.length - 2]);
            if (isrow) {
                var ksize = kesize[kesize.length - 1] - result[result.length - 1].length + 1;
            }
            else {
                var ksize = kesize[kesize.length - 1] - result[result.length - 1].length + (kesize.length << 1);
            }
            v = new Array(ksize + 3).join(" ") + v;
        }
        result.push(v);
    };
    var circelError = new Error("YAML无法处理环形数据，请使用JSAM代替！");
    loop: while (objpath.length) {
        var data = objpath[objpath.length - 1];
        if (isArray(data)) {
            if (kesize.length < objpath.length) {
                if (!data.length) {
                    objpath.pop();
                    save("[]");
                    continue;
                }
                if (origins.indexOf(data) >= 0) throw circelError;
                origins.push(data);
                objpath.pop();
                data = data.slice(0);
                objpath.push(data);
                kesize.push(0);
            }
            if (!data.length) {
                objpath.pop();
                kesize.pop();
                origins.pop();
                if (objpath.length === 1) result.push("\r\n");
                continue;
            }
            var data = data.shift();
            var k = "-";
            if (result.length > 0) k = "\r\n" + new Array(objpath.length).join("  ") + k;
            result.push(k);
            objpath.push(data);
        }
        else if (isObject(data)) {
            if (kesize.length < objpath.length) {
                if (origins.indexOf(data) >= 0) throw circelError;
                var size = 0, count = 0;
                var temp = {};
                for (var k in data) {
                    if (size < k.length) size = k.length;
                    temp[k] = data[k];
                    count++;
                }
                if (count === 0) {
                    objpath.pop();
                    save("{}");
                    continue;
                }
                origins.push(data);
                data = temp;
                objpath.pop();
                objpath.push(data);
                kesize.push(size);
            }
            for (var k in data) {
                var v = data[k];
                delete data[k];
                k = string(k);
                if (/\-$/.test(result[result.length - 1])) {
                    k = " " + k + ":";
                }
                else {
                    k = k + ":";
                    if (result.length > 0) k = "\r\n" + new Array(objpath.length).join('  ') + k;
                }
                objpath.push(v);
                result.push(k);
                continue loop;
            }
            objpath.pop();
            kesize.pop();
            origins.pop();
            if (objpath.length === 1) result.push("\r\n");
        }
        else {
            if (data === undefined || typeof data === 'number' && !isFinite(data)) data = null;
            data = string(data);
            save(data);
            objpath.pop();
        }
    }
    return result.join("");
}
var YAML = {
    stringify,
    parse: parseYML
};