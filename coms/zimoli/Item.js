function Item(value) {
    this.value = value;
    this.valueOf = function () {
        return value;
    };
    this.toString = function () {
        return String(value);
    };
    this.children = this;
    if (value instanceof Object) {
        this.name = value.name;
        this.tab = value.tab;
        this.icon = name.icon;
        this.color = name.color;
        this.test = value.test;
        this.closed = value.closed;
        this.class = value.class;
    }
    this.count = 0;
}
Item.prototype = [];
