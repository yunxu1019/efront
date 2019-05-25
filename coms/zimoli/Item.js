function Item(value) {
    this.value = value;
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
    if (value instanceof Object) {
        this.name = value.name;
        this.tab = value.tab;
        this.icon = value.icon;
        this.color = value.color;
        this.test = value.test;
        this.closed = value.closed;
        this.class = value.class;
    }
    this.count = 0;
}
Item.prototype = [];
