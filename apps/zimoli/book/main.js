// 中文编码 utf-8
var tbar = titlebar("预订", null, false);
var page = createElement(div, beian, tbar);
css(page, "font-size:40px;color:#fff;");

function main() {
    return vbox(page);
}