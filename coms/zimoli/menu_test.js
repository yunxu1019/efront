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
var menus = {
    '首页':{
    }
}
function main() {
    return menu(menu_buttons);
}