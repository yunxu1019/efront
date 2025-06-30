var setPrototypeOf = Object.setPrototypeOf;
var wrapMethod = function (f) {
    return function () {
        var res = f.apply(this, arguments);
        setPrototypeOf(res, this.constructor.prototype);
        return res;
    }
};
a: if (!setPrototypeOf) {
    if ({}.__proto__ === Object.prototype) {
        setPrototypeOf = function (obj, proto) {
            obj.__proto__ = proto;
        }
    }
    else if (Object.getOwnPropertyDescriptors) {
        setPrototypeOf = function (obj, proto) {
            var descriptors = Object.getOwnPropertyDescriptors(proto);
            Object.defineProperties(obj, descriptors);
        }
    }
    else {

        if (Object.getOwnPropertyNames) {
            setPrototypeOf = function (obj, proto) {
                var keys = Object.getOwnPropertyNames(proto);
                methods.forEach(k => {
                    obj[k] = wrapMethod(proto[k]);
                });
                keys.forEach(k => {
                    var dp = Object.getOwnPropertyDescriptor(proto, k);
                    Object.defineProperty(obj, k, dp);
                })
                obj.constructor = proto.constructor;
                return obj;
            }
        }
        else {
            // <!--
            console.error(i18n`当前运行环境使用class extends Array会有难以解决的不兼容性问题，请更换代码的实现方式！`);
            // -->
            setPrototypeOf = function (obj, proto) {
                var keys = Object.keys(proto);
                methods.forEach(k => {
                    obj[k] = wrapMethod(proto[k]);
                });
                obj.constructor = proto.constructor;
                keys.forEach(k => {
                    if (!(k in obj)) obj[k] = proto[k];
                })
                return obj;
            }
        }
    }
}

function Array2() {
    var res = Array.apply(this, arguments);
    /**
     * @type {PropertyDescriptor}
     */
    setPrototypeOf(res, this.constructor.prototype);
    return res;
}
var methods = [
    'concat',
    'slice',
    'splice',
    'filter',
    'flat',
    'flatMap',
    'map',
    'toReversed',
    'toSorted',
    'toSpliced',
    'with',
].filter(k => k in Array.prototype);
Array2.prototype = Array.prototype;
return Array2;