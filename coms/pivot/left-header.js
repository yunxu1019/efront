function main() {
    var a = document.createElement("菜单之上");
    a.innerHTML = template;
    render(a, {
        setHost(a) {
            data.setInstance("hosts", this.hosts, true);
            data.setInstance("base", { base: location.protocol + "//" + a + "/", host: a });
            data.abortAll();
            zimoli();
        },
        host: data.getInstance("base").host,
        select,
        hosts: data.getInstance("hosts")
    });
    return a;
}