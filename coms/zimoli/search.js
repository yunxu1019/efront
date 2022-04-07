function search(seartext, options, path = "name") {
    var a = new SearchResult;
    a.searchPath = path;
    a.searchText = seartext;
    a.source = options;
    if (a.searchText) a.start();
    return a;
}
function minusPower(a, b) {
    return a.power - b.power >= 0;
}
function returnName() {
    return this.name;
}
class SearchResult extends Array {
    searchPath = 'name';
    searchText = null;
    source = null;
    complete = true;
    searched = 0;
    searchid = 0;
    hasFullmatch = false;
    callback = null;
    addItem(o) {
        var path = this.searchPath;
        var seartext = this.searchText;
        if (isEmpty(o)) return;
        var name = seek(o, path);
        if (name === seartext) this.hasFullmatch = true;
        var [power, m] = mark.power(name, seartext);
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
        o.power = power;
        if (isString(path)) o[path] = m;
        else o.name = m, o.toString = returnName, o.valueOf = returnName;
        if (o.power > 0) {
            saveToOrderedArray(this, o, minusPower);
        }
    }
    search(text, callback) {
        if (isFunction(callback)) this.callback = callback;
        if (text === this.searchText) return;
        this.searchText = text;
        this.start();
    }
    async start() {
        this.searched = 0;
        this.splice(0, this.length);
        var searchid = ++this.searchid;
        this.complete = false;
        if (this.searchText) for (var o of this.source) {
            this.addItem(o);
            if (++this.searched % 6000 === 0) {
                if (isFunction(this.callback)) this.callback();
                await new Promise(function (ok) {
                    setTimeout(ok, 20)
                });
                if (this.searchid !== searchid) break;
            }
        }
        this.complete = true;
        if (isFunction(this.callback)) this.callback();
    }
    abort() {
        this.searchid++;
    }
}