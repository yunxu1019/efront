function main() {
    var page = div();
    page.innerHTML = template;
    renderWithDefaults(page, {
        async load() {
            this.clusters = data.from("cluster", { opt: "list" });
            await this.clusters;
            this.active();
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
    page.$scope.load();
    return page;
}