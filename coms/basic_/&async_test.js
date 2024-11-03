var async_ = require("./&async.js");
var test = async function (queue, expect) {
    var res = await async_.apply(null, queue);
    assert(res, expect);
}
test([function () {
    return [1, 0]
}, function () {
    return [2, 2];
}], 2);

var i = 0;
test(compile$unstruct(compile$scanner2(`return 1+2`), a => '_' + ++i).map(a => {
    return new Function(compile$common.createString(a))
}), 3);