function newInstance(node) {
    //根据工厂创建再生对象
    if (this instanceof newInstance) {
        this.cloneNode = function () {
            return new newInstance(node);
        };
        this.new = function () {
            var clone = node();
            appendChild(clone, this.nodes.map(newInstance));
            return clone;
        }
        this.nodes = [];
        return this;
    }
    //工厂模式
    if (isFunction(node)) {
        return node();
    }
    //从再生对象创建
    if (node instanceof newInstance) {
        return node.new();
    }
    //克隆模式
    var clone = node;
    if (node instanceof Object) {
        if (node.cloneNode) {
            clone = node.cloneNode();
        } else {
            // clone = cloneObject(node);
        }
    }
    return clone;
}

// function cloneObject(object) {
//     var clone = object;
//     if (object instanceof Object) {
//         if (object instanceof Date) {
//             clone = new Date(object);
//         } else if (object.cloneNode) {
//             clone = object.cloneNode();
//         } else if (isFunction(object)) {
//             clone = object();
//         } else if (isFunction(object.constructor)) {
//             var f = function () {};
//             f.prototype = object.constructor.prototype;
//             clone = new f();
//         } else {
//             f = {};
//         }
//         for (var k in object) {
//             if (k in clone) {
//                 if (!(clone[k] instanceof Object)) {
//                     clone[k] = object[k];
//                 }
//             } else {
//                 clone[k] = cloneObject(object[k]);
//             }
//         }
//     }
//     return clone;
// }