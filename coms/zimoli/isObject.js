// 用Object.create(null)创建的对象不继承Object，所以用 o instanceof Object可能会出错
function isObject(o) {
    return o !== null && typeof o === 'object';
}