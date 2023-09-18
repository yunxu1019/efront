var singleEqual = isSame;
var deepEqualMarkLabel = "__zimo1i_deep_equal_mark_label";
var restcompare = [];
var ALLOW_CACHE_LENGTH = Math.min(SAFE_CIRCLE_DEPTH, 1024) * Math.min(SAFE_CIRCLE_DEPTH, 1024);
var ALLOW_REST_DEPTH = 16;
var count = 0, inc = ALLOW_CACHE_LENGTH;
var checkMemery = function (msg) {
    if (count > inc) {
        inc = (count / ALLOW_CACHE_LENGTH + 1 | 0) * ALLOW_CACHE_LENGTH;
        if (inc >= ALLOW_REST_DEPTH * ALLOW_CACHE_LENGTH) {
            console.warn("对象过大，deepEqual未能完成比对");
            return false;
        }
        console.warn(msg);
    }
    return true;
}
var objectEqual = function (o1, o2, deep) {
    if (o1 === o2) return true;
    if (o1.constructor !== o2.constructor) return false;
    var keys1 = Object.keys(o1), keys2 = Object.keys(o2);
    if (keys1.length !== keys2.length) return false;
    keys1.sort(), keys2.sort();
    var restkeys = [];
    for (var cx = 0, dx = keys1.length; cx < dx; cx++) {
        var k = keys1[cx];
        if (keys2[cx] !== k) return false;
        var v1 = o1[k], v2 = o2[k];
        if (isObject(v1) && isObject(v2)) {
            if (v1 !== v2) restkeys.push(k);
            continue;
        }
        if (!singleEqual(v1, v2)) return false;
    }
    count += keys1.length;
    if (!checkMemery("对象过大，deepEqual将消耗更多的时间")) return false;
    if (restkeys.length && !(o1[deepEqualMarkLabel] && o2[deepEqualMarkLabel])) {
        for (var cx = 0, dx = restkeys.length; cx < dx; cx++) {
            var k = restkeys[cx];
            count += 3;
            if (!checkMemery("深层对象过多，deepEqual将消耗更多的内存")) return false;
            restcompare.push(o1[k], o2[k], deep + 1);
        }
    }
    if (o1.valueOf instanceof Function && o2.valueOf instanceof Function) {
        var v1 = o1.valueOf(), v2 = o2.valueOf();
        if (!(isObject(v1) && isObject(v2))) return singleEqual(v1, v2);
    }
    try {
        if (deep === 0 && o1.toString instanceof Function && o2.toString instanceof Function && !o1.join && !o2.join) return o1.toString() === o2.toString();
    } catch (e) {
        console.warn(e);
    }
    return true;
};
function deepEqual(o1, o2) {
    if (o1 === o2) return true;
    if (isObject(o1) && isObject(o2)) {
        var result = objectEqual(o1, o2, 0);
        if (result) for (var cx = 0; cx < restcompare.length; cx += 3) {
            var v1 = restcompare[cx], v2 = restcompare[cx + 1], deep1 = restcompare[cx + 2];
            if (!objectEqual(v1, v2, deep1)) {
                result = false;
                break;
            }
            v1[deepEqualMarkLabel] = true;
            v2[deepEqualMarkLabel] = true;
        }
        while (cx > 0) {
            cx -= 3;
            var v1 = restcompare[cx], v2 = restcompare[cx + 1];
            delete v1[deepEqualMarkLabel];
            delete v2[deepEqualMarkLabel];
        }
        restcompare.splice(0, restcompare.length);
        inc = ALLOW_CACHE_LENGTH, count = 0;
        return result;
    } else {
        return singleEqual(o1, o2);
    }
}
deepEqual.shallow = shallowEqual;