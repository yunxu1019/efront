function main() {
    var page = div();
    page.innerHTML = template;
    renderWithDefaults(page, {
        async load() {
            var cs = this.clusters = data.from("cluster", { opt: "list" });
            await cs.loading_promise;
            this.active();
        },
        index: 0,
        clusters: [],
        filterTime(d) {
            return ((new Date - d) / 1000 | 0) + "秒";
        },
        clients: [],
        async active() {
            var index = this.index;
            var clusters = this.clusters;
            if (index >= clusters.length) index = clusters.length - 1;
            this.clients = data.lazyInstance("cluster", { opt: "list", id: clusters[index] });
        },
    });
    page.$scope.load();
    return page;
}