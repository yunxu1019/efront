/**
 * @param {Item} item
 */
function pathTo(find, item, path) {
    path.push(item);
    if (item === find || find === item.value) {
        return path;
    }
    for (var m of item) {
        if (pathTo(find, m, path)) return path;
    }
}
var id = 0;
class Item extends Array {
    extended = false;
    constructor(value) {
        super();
        this.count = 0;//子项中的叶子节点数
        this.total = 0;//子项中的节点数
        this.crack = 0;
        this.id = ++id;
        this.extends(value, false);
    }
    extends(value, mark) {
        this.extended = mark !== false;
        if (value && value.constructor === Item) this.value = value.value;
        else this.value = value;
        if (value && value.children instanceof Array) {
            var children = value.children.map(item => new Item(item));
            children.forEach(item => item.parent = item);
            this.children = this;
            this.push.apply(this, children);
        }
        if (isObject(value)) {
            this.tab = value.tab;
            this.icon = value.icon;
            this.color = value.color;
            this.test = value.test;
            this.line = value.line;
            if (value.path) this.path = value.path;
            if (value.id) this.id = value.id;
            if (value.url) this.url = value.url;
            if (value.href) this.href = value.href;
            if (value.src) this.src = value.src;
        }
        else {
            this.tab = 1;
        }
    }
    get disabled() {
        if (isObject(this.value)) return this.value.disabled || this.value.enabled === false;

        return false;
    }
    get hotkey() {
        if (isObject(this.value)) return this.value.hotkey;
    }

    valueOf() {
        return this.value;
    }
    toString() {
        return String(this.name);
    }
    get warn() {
        if (isObject(this.value)) {
            return /danger|red|warn/.test(this.value.type) || this.value.warn;
        }
        return false;
    }
    get name() {
        if (isObject(this.value)) return getName(this.value);
        return String(this.value);
    }
    pathTo(menu) {
        return pathTo(menu, this, []);
    }
    isClosed() {
        if (isObject(this.value)) return !!this.value.closed;
        return this.closed;
    }
    setClosed(value) {
        if (isObject(this.value)) this.value.closed = value;
        else this.closed = value;
        var c = this;
        while (c.joined) {
            c = c[0];
            c.setClosed(value);
        }
    }
    isActive() {
        if (isObject(this.value)) {
            if ("active" in this.value) return this.value.active;
            if ('actived' in this.value) return this.value.actived;
        }
        return !!this.actived;
    }
    setActive(value) {
        if (isObject(this.value)) {
            if ('active' in this.value) {
                this.value.active = value;
            } else {
                this.value.actived = value;
            }
        }
        this.actived = value;
    }
    isSelected() {
        if (isObject(this.value)) return !!this.value.selected;
        return this.selected;
    }
    isChecked() {
        if (isObject(this.value)) return !!this.value.checked;
        return !!this.value.checked;
    }
    getClass() {
        if (isObject(this.value)) return !!this.value.class;
        return this.class;
    }

}
Item.prototype.isActived = Item.prototype.isActive;
