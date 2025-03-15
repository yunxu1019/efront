var setPrototypeOf = Object.setPrototypeOf;
if (!setPrototypeOf) {
    if ({}.__proto__ === Object.prototype) setPrototypeOf = function (obj, proto) {
        obj.__proto__ = proto;
    };
    else {
        // <!--
        console.error(i18n`当前运行环境使用class extends Array会有难以解决的不兼容性问题，请更换代码的实现方式！`);
        // -->
        setPrototypeOf = function (obj, proto) {
            for (var p in proto) if (!(p in obj)) obj[p] = proto[p];
            obj.constructor = proto.constructor;
            return obj;
        }

    }
}

function Array2() {
    var obj = Array.apply(this, arguments);
    setPrototypeOf(obj, this);
    return obj;
}
Array2.prototype = Array.prototype;

return Array2;