function main(options) {
    var page = view();
    page.innerHTML = template;
    on("submit")(page, e => e.preventDefault());
    render(page, {
        options, a: button, input, _search: '',
        add() {
            var a = this._search;
            a = a.trim();
            if (!a) return;
            if (this.filtered.hasFullmatch) return;
            options.push({ name: a, value: a });
            this.research();
        },
        del(o) {
            for (var cx = 0, dx = options.length; cx < dx; cx++) {
                if (options[cx] === o || options[cx] === o.item) {
                    var i = cx;
                    break;
                }
            }
            if (i >= 0) options.splice(i, 1);
            this.research();
        },
        get search() {
            return this._search;
        },
        research() {
            var v = this._search;
            if (v) {
                this.filtered = search(v, options);
            }
        },
        set search(v) {
            this._search = v;
            if (v) {
                this.research();
            }
        },
        btn: button,
        remove() {
            remove(page);
        },
        save() {
            remove(page);
        },
        filtered: []
    });
    drag.on(page.firstChild, page);
    on("append")(page, function () {
        setTimeout(function () {
            page.querySelector("input").focus();
        });
    });
    on("mousedown")(page, e => {
        if (e.target !== page.querySelector("input")) {
            e.preventDefault();
        }
    });
    page.onback = function () {
        if (page.$scope.search) {
            page.$scope.search = '';
            return false;
        }
    };
    return page;
}