var autoreload = true;
function main() {
    var page = div();
    page.innerHTML = template;
    renderWithDefaults(page, {
        load: lazy(async function () {
            this.clusters = data.lazyInstance("cluster", { opt: "list" });
            await this.clusters;
            this.active();
        }, -1000),
        chat(id) {
            popup("/link/chat", id);
        },
        get autoreload() {
            return autoreload;
        },
        set autoreload(v) {
            autoreload = v;
            clearInterval(loadid);
            if (autoreload) page.$reload();
        },
        index: data.getInstance("index"),
        clusters: [],
        filterTime(d) {
            return ((new Date - d) / 1000 | 0) + "秒";
        },
        clients: [],
        active(index = this.index.index | 0) {
            data.setInstance('index', { index });
            var clusters = this.clusters;
            if (index >= clusters.length) index = clusters.length - 1;
            this.clients = data.from("cluster", { opt: "list", id: clusters[index] });
        },
    });
    var loadid = 0;
    on("append")(page, function () {
        if (autoreload) loadid = setInterval(function () {
            page.$scope.load();
        }, 30);
    });
    on('remove')(page, function () {
        clearInterval(loadid);
    });
    page.$scope.load();
    return page;
}