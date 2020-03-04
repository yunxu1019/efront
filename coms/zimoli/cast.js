function cast(target, type, data) {
    switch (arguments.length) {
        case 2:
            data = type;
            type = "default";
            break;
        case 3:
            if (!isString(type) && isString(data)) {
                var temp = type;
                type = data;
                data = temp;
            }
            break;
        case 1:
            data = target;
            target = this;
            type = "default";
            break;
        default:
            throw new Error("参数数量不正确");
    }
    if (!(target instanceof Object)) throw new Error("cast只能使用在对象上！");

    var datakey = `cast(${type})`;
    type = `care(${type})`;
    if (target[type] instanceof Array) {
        target[type].forEach(function (listener) {
            if (listener instanceof Function) {
                listener.call(target, data, target[datakey]);
            }
        });
        target[datakey] = data;
        if (listener instanceof Function) {
            target[type].push(listener);
        }
    }
}