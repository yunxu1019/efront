var float = function () {
    return Math.random();
};
var int = function () {
    return Math.random() * 10 | 0;
};
var str = function () {
    return Math.random().toString(36).slice(2, 3);
}
var test = function (gen, isle, sort = isle) {
    var array = [];
    for (var cx = 0, dx = 10; cx < dx; cx++)saveToOrderedArray(array, gen(), isle);
    var res = array.slice();
    assert(res.join(','), array.sort(sort).join(','));
    console.log(res)
}
test(float, undefined, (a, b) => a - b);
test(float, (a, b) => a >= b, (a, b) => b - a);
test(float, (a, b) => a > b, (a, b) => b - a);
test(int, (a, b) => a <= b, (a, b) => a - b);
test(int, (a, b) => a > b, (a, b) => b - a);
test(int, (a, b) => a >= b, (a, b) => b - a);
test(str, (a, b) => a > b);
test(str, (a, b) => a <= b);

