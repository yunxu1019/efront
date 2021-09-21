var menu = list(function (index) {
    var buttons = [
        "更换主页"
    ];
    if (index >= buttons.length) return false;
    var label = button(buttons[index]);
    onclick(label, function () {
        menu.blur();
        var pages = [
            `/user/register`,
            `/user/login`,
            `/kugou/home`,
            `/baotu/home`,
            `/main`
        ];
        var scope = {
            go(index) {
                go(pages[index]);
            }
        };
        var body = list(function (index) {
            var pageTitles = [
                `注册`,
                `登录`,
                `酷狗`,
                `包图网`,
                `欢迎屏幕`
            ];
            if (index >= pageTitles.length) return;
            var item = div();
            html(item, pageTitles[index]);
            attr(item, "ng-click", `go(${index})`);
            render(item, scope);
            return item || false;
        });
        body.go(0);
        confirm("<b>请选择主页</b>", body);
    });
    return label || false;
});
css(menu, "width:200px;height:100px;");
css("body", "background-color:#000");
menu.go(0);
contextmenu(document.body, menu);
