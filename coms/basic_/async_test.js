var test = async function (queue, expect) {
    var res = await async_.apply(null, queue);
    assert(res, expect);
}
test([function () {
    return [1, 0]
}, function () {
    return [, 2];
}], 2);

test(compile$unstruct(compile$scanner2(`1+2`)), 3);