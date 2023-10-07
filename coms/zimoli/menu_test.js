var columns = `首页
广告设计
背景元素
电商淘宝
多媒体
办公文档
装饰装修
插画配图
`.replace(/^\s+|\s+$/g, "").split(/\s+/);
var menu_buttons = columns.map(a => button(a));
function main() {
    var page = div();
    page.innerHTML = template;
    var data = random([{
        name: '${inc} 一级目录',
        children: [{
            name: "${inc} 二级目录",
            children: [
                {
                    name: "${inc} 三级目录"
                }
            ]
        }]
    }], 20);
    render(page, {
        ylist: menu,
        menus: []
    });
    on("append")(page, function () {
        page.$scope.menus = data;
        page.querySelector("ylist").go(0)
    });
    return page;
}