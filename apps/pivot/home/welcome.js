function main() {
    var page = div();
    page.innerHTML = template;
    var scope = {
        status: [],
        version: data.from("version"),
        hrtime: data.from("uptime", a => new Date - a * 1000),
        filterTime,
        memeryUsed: 0,
        memery: [0, 1],
        platform: '未知',
        arch: '未知',
        nodeVersion: "未知",
        size,
        progbar,
        async run(id) {
            await new Promise(ok => setTimeout(ok, 2000));
            var info = await data.from("run", {
                run: id
            }).loading_promise;
            if (info) alert(info, 'pass');
        }
    };
    renderWithDefaults(page, scope);
    data.from("status").then(a => {
        var [mr, mt] = a.memery;
        scope.memeryUsed = mt - mr;
        scope.memery = a.memery;
        scope.nodeVersion = a.nodeVersion;
        scope.platform = a.platform;
        scope.arch = a.arch;
    });
    return page;
}