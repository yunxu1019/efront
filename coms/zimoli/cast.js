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
            throw new Error(i18n`参数数量不正确`);
    }
    if (!isObject(target)) return;
    var cared = $cared.get(target);
    var listeners = cared[type];
    if (listeners) listeners.cast(data);
    else {
        var casted = $casted.get(target);
        if (!casted) {
            casted = {};
            $casted.set(target, casted);
        }
        var datas = casted[type];
        if (!datas) {
            datas = casted[type] = [];
        }
        datas.push(data);
    }
}