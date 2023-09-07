class join {
    constructor(t) {
        this.text = t;
    }
}
var seek = function (object, seeker) {
    if (seeker === null || seeker === undefined || isEmpty(object)) return;
    if (seeker instanceof Function) {
        return seeker(object);
    }
    if (typeof seeker === 'number') return object[seeker];
    if (typeof seeker === "string") {
        if (/^(['"`])[\s\S]*$/i.test(seeker)) return seeker.replace(/^(['"`])([\s\S*])\1?$/, "$2");
        if (seeker === '' || seeker === ".") return object;
        var s = [];
        s.unshift(seeker.replace(/[\.]([^\.\[]*)|\[([^\]]*)\]|\<([^\>]*)\>/g, (a, b, c, d) => {
            if (b) s.push(b);
            else if (d) {
                s.push(new join(c));
            }
            else if (c) {
                s.push(c || '0');
            }
            return '';
        }));
        seeker = s;
    }
    if (seeker instanceof Array) {
        if (!seeker.length) return;
        loop: for (var cx = 0, dx = seeker.length; cx < dx; cx++) {
            var key = seeker[cx];
            if (typeof key === "string") {
                if (/[\^]/.test(key)) {
                    key = key.split(/[\^]/);
                    for (var k of key) {
                        if (k in object) {
                            object = object[k];
                            continue loop;
                        }
                    }
                    object = undefined;
                } else {
                    object = object[key];
                }
            }
            else if (key instanceof join) {
                if (object instanceof Array) {
                    var restk = seeker.slice(cx + 1, dx);
                    object = object.map(a => seek(a, restk)).join(key.text);
                }
                else {
                    object = '';
                }
                break;
            }
            else {
                object = seek(object, key);
            }
            if (object === undefined || object === null) return;
        }
        return object;
    }
    if (isObject(seeker)) {
        var dist = {};
        for (var k in seeker) {
            var { [k]: v = k } = seeker;
            var o = seek(object, v);
            if (o === undefined) return;
            dist[k] = o;
        }
        return dist;
    }
};
