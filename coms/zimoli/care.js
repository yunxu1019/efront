/**
 * 接收对象参数
 * ie7 及以下不受支持
 * @param {Object|Function} target 
 * @param {Function|string} type 
 * @param {Function} listener 
 */
function care(target, type, listener) {
    var [target, type, listener, allowMultiHandle] = parse.apply(this, arguments);
    if (!target[type]) {
        target[type] = [];
    }
    var listeners = target[type];
    if (listeners.length && !allowMultiHandle) return;
    if (listener instanceof Function && !~listeners.indexOf(listener)) {
        if (listeners.length > 600) throw new Error(i18n`请不要在同一个对象上使用过多的同类型的care!`);
        listeners.push(listener);
    }
}
function parse(target, type, listener) {
    var allowMultiHandle = arguments[arguments.length - 1];
    if (typeof allowMultiHandle !== "boolean") {
        allowMultiHandle = true;
    }
    switch (arguments.length - !allowMultiHandle) {
        case 2:
            listener = type;
            type = "default";
            break;
        case 3:
            if (type instanceof Function) {
                var temp = type;
                type = listener;
                listener = temp;
            }
            break;
        case 1:
            target = this;
            if (target instanceof Function) {
                listener = target;
                type = "default";
            }
            break;
        default:
            throw new Error(i18n`参数数量不正确`);
    }
    if (!isObject(target)) throw new Error(i18n`care只能使用在对象上！`);
    type = `care(${type})`;
    return [target, type, listener, allowMultiHandle];
}
function clean(target, type, listener) {
    var [target, type, listener] = parse.apply(this, arguments);
    var listeners = target[type];
    if (listener instanceof Function) {
        for (var cx = listeners.length - 1; cx >= 0; cx--) {
            if (listeners[cx] === listener) listeners.splice(cx, 1);
        }
    } else if (listeners) {
        listeners.splice(0, listeners.length);
    }
}
care.clean = clean;