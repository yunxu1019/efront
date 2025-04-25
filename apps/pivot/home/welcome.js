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
        platform: i18n`未知`,
        arch: i18n`未知`,
        nodeVersion: i18n`未知`,
        size,
        progbar,
        usercode: null,
        async register() {
            await yousure(i18n`获取注册号时，请确保您的服务器可以通过公网访问。暂不支持非公网服务器获取注册号。`, [i18n`继续` + "(C)", i18n`取消` + "(Q)#white"]);
            var usercode = await data.from("register");
            serverStatus.userid = scope.usercode = usercode;
        },
        async run(id) {
            await new Promise(ok => setTimeout(ok, 2000));
            var info = await data.from("run", {
                run: id
            }).loading_promise;
            if (info) alert(info, 'pass');
        }
    };
    renderWithDefaults(page, scope);
    (function (a) {
        var [mr, mt] = a.memery;
        scope.memeryUsed = mt - mr;
        scope.memery = a.memery;
        scope.nodeVersion = a.nodeVersion;
        scope.platform = a.platform;
        scope.arch = a.arch;
        scope.usercode = a.userid;
    }(serverStatus));
    return page;
}