var seek = function (object, seeker) {
    if (seeker === null || seeker === undefined || !object) return;
    if (seeker instanceof Function) {
        return seeker(object);
    }
    if (typeof seeker === "string") {
        if (/^(['"`])[\s\S]*$/i.test(seeker)) return seeker.slice(1);
        seeker = seeker.split(".");
    }
    if (seeker instanceof Array) {
        if (!seeker.length) return;
        for (var cx = 0, dx = seeker.length; cx < dx; cx++) {
            var key = seeker[cx];
            if (typeof key === "string") {
                object = object[key];
            } else {
                object = seek(object, key);
            }
            if (object === undefined || object === null) return;
        }
        return object;
    }
    if (isObject(seeker)) {
        var dist = {};
        for (var k in seeker) {
            var o = seek(object, seeker[k]);
            if (o === undefined) return;
            dist[k] = o;
        }
        return dist;
    }
};
