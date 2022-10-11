var clean = removeFromList;
function Cleanup(list) {
    if (isArray(list)) return function (target) {// 兼容老用法
        if (isNode(this) && !isNode(target)) {
            target = this;
        }
        clean(list, target);
        return list.length;
    }
    if (isNode(list && list.target) && isNode(this)) {
        var target = list.target, list = this.with;
        clean(list, target);
        if (!list.length) remove(this);
    }
}