
function minusPower(a, b) {
    return a.$power - b.$power >= 0;
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
    summaryFields = [];
    $summaryData = [];
    $filterFields = [];
    $unsummaryFileds = [];
    callback = null;
    static from(fields, data) {
        var t = new Table;
        t.fields = fields;
        t.source = data;
        t.searchFields = fields.filter(searchThis);
        t.summaryFields = fields.filter(s => s.summary);
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
    summary(o) {
        var data = this.$summaryData;
        var is = this.summaryFields.map((f, i) => {
            if (!isHandled(f.key)) return;
            var d = seek(o, f.key);
            if (!isHandled(d)) d = '';
            var dt = data[i];
            var di = dt.indexOf(d);
            if (di < 0) di = dt.length, dt.push(d);
            return "-" + di;
        }).join("");
        var dis = data[is];
        if (!dis) {
            dis = data[is] = Object.assign({}, o);
            dis.$summary = this.$unsummaryFileds.map(function (f, i) {
                if (typeof f.key !== "string") return;
                Object.defineProperty(dis, f.key, {
                    get() {
                        var s = this.$summary[i];
                        if (s.length === 1) return s[0];
                        return `共${this.$summary[i].length}个不同的项`;
                    },
                })
                return [];
            });
            saveToOrderedArray(this, dis, minusPower);
        }
        var undata = dis.$summary;
        this.$unsummaryFileds.forEach((f, i) => {
            if (typeof f.key !== 'string') return;
            var d = seek(o, f.key);
            if (!isHandled(d)) d = '';
            var dt = undata[i];
            var di = dt.indexOf(d);
            if (di < 0) di = dt.length, dt.push(d);
        });
    }
    addItem(o) {
        if (!isHandled(o)) return;
        var searchtext = this.searchText;
        var fields = this.$filterFields;
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
            if (p > power) power = p;
            if (p >= searchtext.length) this.coverCount++;
            if (!isEmpty(f.key) && !isFunction(f.key)) o[f.key] = m;
            else o.name = m, o.toString = returnName, o.valueOf = returnName;
        }
        o.$power = power;
        if (o.$power > 0) {
            var summary = this.$summaryData;
            if (!summary.length) saveToOrderedArray(this, o, minusPower);
            else this.summary(o);
        }
    }
    search(text, callback) {
        if (isFunction(callback)) this.callback = callback;
        if (text === this.searchText) return;
        this.searchText = text;
        this.update();
    }
    async update() {
        var origin = this.splice(0, this.length)
        if (this.searched && this.source && this.searched !== this.source.length) {
            origin = origin.map(o => o.$origin);
        }
        else {
            origin = [];
        }
        this.searched = 0;
        var source = this.sorted ? this.sorted : this.source;
        if (!source) return;
        var summaryData = this.$summaryData = this.summaryFields.map(_ => []);
        this.$unsummaryFileds = this.fields.filter(f => this.summaryFields.indexOf(f) < 0);
        var $filterFields = this.searchFields?.length ? this.searchFields : this.fields;
        if (this.summaryFields.length) this.$filterFields = $filterFields.filter(f => this.summaryFields.indexOf(f) >= 0);
        else this.$filterFields = $filterFields;
        var useSummaryOnly = !this.searchText && summaryData.length > 0;
        var searchid = ++this.searchid;
        this.complete = false;
        this.coverCount = 0;
        if (origin.length) {
            if (origin.length >= 160) origin = origin.slice(0, 80);
            source = source.filter(a => origin.indexOf(a) < 0);
            source = origin.concat(source);
        }
        if (this.searchText || summaryData.length > 0) for (var o of source) {
            if (useSummaryOnly) this.summary(o);
            else this.addItem(o);
            if (++this.searched % 600 === 0) {
                if (isFunction(this.callback)) this.callback();
                await new Promise(requestAnimationFrame);
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