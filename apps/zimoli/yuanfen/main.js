var tbar = titlebar("缘分", null, false);
var page = createElement(div, tbar, slider());
css(page, "font-size:40px;color:#fff;padding-top:50px;");


appendChild(page, group(
    option(icon("menu"),""),
    option(icon("menu"),"")
), group(
    option(icon("menu"),""),
    option(icon("menu"),"")
));

function main() {
    return page;
}