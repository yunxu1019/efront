
function minusPower(a, b) {
    return a.power - b.power >= 0;
}
function returnName() {
    return this.name;
}
function searchThis(field) {
    return /^$|text|input|html/i.test(field.type);
}
class Table extends Array {
    searchText = null;
    sortFields = [];
    searchFields = null;
    fields = [];
    sorted = null;
    source = null;
    complete = true;
    searched = 0;
    searchid = 0;
    coverCount = 0;
    hasFullmatch = false;
    callback = null;
    static from(fields, data) {
        var t = new Table;
        t.fields = fields;
        t.source = data;
        t.searchFields = fields.filter(searchThis);
        t.update();
        return t;
    }
    /**
     * @param {Field} field
     */
    sort(field) {
        removeFromList(this.sortFields, field);
        this.sortFields.push(field);
        var sorted = this.sorted || this.source.slice(0);
        if (isEmpty(field.sort)) field.sort = 0;
        field.sort = field.sort > 0 ? -1 : 1;
        this.sorted = sorted.sort(function (a, b) {
            a = seek(a, field.key);
            b = seek(b, field.key);
            if (a > b) return field.sort;
            if (a < b) return -field.sort;
            return 0;
        });
        this.update();
    }
    unsort() {
        this.sorted = null;
        this.update();
    }
    addItem(o) {
        if (isEmpty(o)) return;
        var searchtext = this.searchText;
        var fields = this.searchFields ? this.searchFields : this.fields;
        var power = 0;
        var s = o;
        if (isNode(o)) {
            o = extend({
                name: o.name,
                title: o.title,
                value: o.value,
                key: o.key,
                nodeType: o.nodeType,
                tagName: o.tagName,
                nodeValue: o.nodeValue,
            }, o);
        }
        else o = isObject(o) ? Object.create(o) : new o.constructor(o);
        o.$origin = s;
        for (var f of fields) {
            var name = seek(o, f.key);
            if (isEmpty(name) || !isString(name)) continue;
            if (name === searchtext) this.hasFullmatch = true;
            var [p, m] = mark.power(name, searchtext);
            power += p;
            if (p >= searchtext.length) this.coverCount++;
            if (!isEmpty(f.key)) o[f.key] = m;
            else o.name = m, o.toString = returnName, o.valueOf = returnName;
        }
        o.power = power;
        if (o.power > 0) {
            saveToOrderedArray(this, o, minusPower);
        }
    }
    search(text, callback) {
        if (isFunction(callback)) this.callback = callback;
        if (text === this.searchText) return;
        this.searchText = text;
        this.update();
    }
    async update() {
        var origin = this.searched ? this.splice(0, this.length).map(o => o.$origin) : [];
        this.searched = 0;
        var source = this.sorted ? this.sorted : this.source;
        if (!source) return;
        var searchid = ++this.searchid;
        this.complete = false;
        this.coverCount = 0;
        if (this.searchText) for (var o of origin.length ? origin.concat(source) : source) {
            this.addItem(o);
            if (++this.searched % 600 === 0) {
                if (isFunction(this.callback)) this.callback();
                await new Promise(function (ok) {
                    requestAnimationFrame(ok)
                });
                if (this.searchid !== searchid) break;
            }
        }
        else {
            while (this.searched < source.length) {
                this.push.apply(this, source.slice(this.searched, this.searched += 6000));
            }
            this.searched = source.length;
        }
        this.complete = true;
        if (isFunction(this.callback)) this.callback();
    }
    abort() {
        this.searchid++;
    }
}