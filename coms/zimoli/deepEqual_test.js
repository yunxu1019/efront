var createDeepObject = function (deep, width, leaf = {}) {
    if (deep <= 0) return leaf;
    var origin = {};
    try {
        for (var cx = 0, dx = width; cx < dx; cx++) {
            origin[(width * 26 + cx).toString(36)] = createDeepObject(deep - 1, width);
        }
    } catch (e) {
        console.log(deep)
    }
    return origin;
}
var checkUnEqual = function () {
    return !deepEqual({}, { a: 1 })
        && !deepEqual(0, 1)
        && !deepEqual(0, [])
        && !deepEqual("", [])
        && !deepEqual("", false)
        && !deepEqual(0, "")
        && !deepEqual(0, false)
        && !deepEqual(null, 0)
        && !deepEqual(undefined, 0)
        && !deepEqual({}, 1)
        && !deepEqual({}, { a: 0 })
        && !deepEqual({ a: 1 }, { a: 0 })
        && !deepEqual({ b: 0 }, { a: 0 })
        && !deepEqual({ b: 0 }, { a: 0 })
        && !deepEqual(new Date(1), new Date(2))
        && !deepEqual(document.createElement("a"), document.createElement("b"))
        && !deepEqual(window, document)
        && !deepEqual(function () { }, function (a) { return a })
        && !deepEqual({ a: {} }, { a: new Date() })
        && !deepEqual({ a: { c: {} } }, { a: { b: {} } })
        && !deepEqual({ a: { b: { c: { d: { 1: 2 } } } } }, { a: { b: { c: { d: {} } } } })
        && !deepEqual([1], [0])
        && !deepEqual([1], { 0: 1 })
        && !deepEqual([1], new String("1"))
        ;
};
var checkCircle = function () {
    var a = {};
    var b = {};
    a.a = a;
    b.a = b;
    return deepEqual(a, b);
};
var checkDoubleCircle = function () {
    a = { a: {} };
    b = { a };
    c = { a: {} };
    c.a.a = c;
    a.a.a = a;
    return deepEqual(a, b) && deepEqual(a, a.a) && deepEqual(c, a);
};
var checkMultiCircle = function () {
    a = { a: {} };
    b = { a: { a: { a } } };
    c = { a: {} };
    c.a.a = c;
    a.a.a = a;
    // b与a出现环形的节点不一样
    return deepEqual(a, b) && deepEqual(a, a.a) && deepEqual(c, a);
};
var checkDeep = function () {
    var a = createDeepObject(SAFE_CIRCLE_DEPTH * 8, 1);
    var b = createDeepObject(SAFE_CIRCLE_DEPTH * 8, 1);
    return deepEqual(a, b);
};
var checkDeepDepth = function () {
    var a = [1];
    var b = [1];
    console.log("checkDeepDepth data start", +new Date)
    for (var cx = 0, dx = 2 * SAFE_CIRCLE_DEPTH + 10; cx < dx; cx++) {
        if (cx === SAFE_CIRCLE_DEPTH + 3) {
            a = new Array(SAFE_CIRCLE_DEPTH << 8).fill(a);
            b = new Array(SAFE_CIRCLE_DEPTH << 8).fill(b);
        } else if (cx > 2 * SAFE_CIRCLE_DEPTH) {
            a = [a, a];
            b = [b, b];
        } else {
            a = [a];
            b = [b];
        }
    }
    console.log("checkDeepDepth data end", +new Date)
    return deepEqual(a, b);
}
var checkDeepCircle = function () {
    var a = createDeepObject(10, 3);
    var b = createDeepObject(10, 3);
    a = createDeepObject(1, 3, a);
    b = createDeepObject(1, 3, b);
    return deepEqual(a, b);
};
function deepEqual_test() {
    console.log(
        checkUnEqual(),
        checkCircle(),
        checkDoubleCircle(),
        checkMultiCircle(),
        checkDeep(),
        checkDeepCircle(),
        checkDeepDepth(),
    );
}