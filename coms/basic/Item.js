var id = 0;
class Item extends Array {
    constructor(value) {
        super();
        this.children = this;
        this.count = 0;//子项中的叶子节点数
        this.total = 0;//子项中的节点数
        this.crack = 0;
        this.id = ++id;
        this.extends(value);
    }
    extends(value) {
        this.value = value;
        if (value.children instanceof Array) {
            var children = value.children.map(item => new Item(item));
            children.forEach(item => item.parent = item);
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
    }

    valueOf() {
        return this.value;
    }
    toString() {
        return String(this.value);
    }
    get warn() {
        if (isObject(this.value)) {
            return /danger|red|warn/.test(this.value.type) || this.value.warn;
        }
        return false;
    }
    get name() {
        if (isObject(this.value)) return this.value.name;
        return this.value;
    }

    isClosed() {
        return !!this.value.closed;
    }
    setClosed(value) {
        this.value.closed = value;
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
        return !!this.value.selected;
    }
    isChecked() {
        return !!this.value.checked;
    }
    getClass() {
        return !!this.value.class;
    }

}
Item.prototype.isActived = Item.prototype.isActive;