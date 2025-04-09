var autoreload = true;
function main() {
    var page = div();
    page.innerHTML = template;
    var scope = {
        load: lazy(async function () {
            this.clusters = data.lazyInstance("cluster");
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
        async active(index = this.index.index | 0, c) {
            data.setInstance('index', { index });
            var clusters = this.clusters;
            if (index >= clusters.length) index = clusters.length - 1;
            if (c) this.clients = [];
            this.clients = await data.asyncInstance("clients", { id: clusters[index] });
        },
    };
    renderWithDefaults(page, scope);
    var loadid = 0;
    on("append")(page, function () {
        if (autoreload) loadid = setInterval(function () {
            scope.load();
        }, 30);
    });
    on('remove')(page, function () {
        clearInterval(loadid);
    });
    scope.load();
    return page;
}