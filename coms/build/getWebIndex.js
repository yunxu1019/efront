var { webindex: indexnames } = require('../efront/memery');
var mixin = require("../efront/mixin");
return function (tree) {
    var names = mixin(["", "/", "*"], indexnames).map(a => a.join(''));
    for (var n of names) {
        var t = tree[n];
        if (t && t.type === '/') {
            return t;
        }
    }
};