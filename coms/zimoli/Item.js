var id = 0;
function Item(value) {
    this.value = isObject(value) ? value : Object.create(value);
    this.valueOf = function () {
        return value;
    };
    this.toString = function () {
        return String(value);
    };
    this.children = this;
    if (value.children instanceof Array) {
        var children = value.children.map(item => new Item(item));
        children.forEach(item => item.parent = item);
        this.push.apply(this, children);
    }
    if (isObject(value)) {
        this.name = value.name;
        this.tab = value.tab;
        this.icon = value.icon;
        this.color = value.color;
        this.test = value.test;
        this.line = value.line;
    }
    this.count = 0;//子项中的叶子节点数
    this.total = 0;//子项中的节点数
    this.crack = 0;
    this.id = ++id;
}
Item.prototype = extend([], {
    isClosed() {
        return !!this.value.closed;
    },
    setClosed(value) {
        this.value.closed = value;
    },
    isActive() {
        return !!(this.value.active || this.value.actived);
    },
    setActive(value) {
        if ('active' in this.value) {
            this.value.active = value;
        } else {
            this.value.actived = value;
        }
    },
    isSelected() {
        return !!this.value.selected;
    },
    isChecked() {
        return !!this.value.checked;
    },
    getClass() {
        return !!this.value.class;
    }
});
