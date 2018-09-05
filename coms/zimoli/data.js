function decodeStructure(object) {
    var { source, head, body } = object;
    if (body instanceof Array) {
        return body.map(function (arr) {
            var o = {};
            arr.map(function (a, cx) {
                var k = head[cx];
                var v = source[k][a];
                o[k] = v;
            });
            return o;
        })
    }
    return [];
}
function encodeStructure(array) {
    if (!array instanceof Array) return;
    var source = {};
    array.map(function (obj) {
        for (var k in obj) {
            var v = obj[k];
            if (v instanceof Object) continue;
            if (!source[k]) {
                source[k] = { inc: 0 };
            }
            var o = source[k];
            var s = JSON.stringify(v);
            if (!(s in o)) o[s] = o.inc++;
        }
    });
    var head = keys(source);
    var body = array.map(function (obj) {
        return head.map(function (k) {
            var v = JSON.stringify(obj[k]);
            return source[k][v];
        });
    });
    head.map(function (key) {
        var valuesmap = source[key];
        delete valuesmap.inc;
        source[key] = keys(valuesmap).map(JSON.parse);
    });
    return {
        source,
        head,
        body
    };
}
var data = {
    decodeStructure,
    encodeStructure
};