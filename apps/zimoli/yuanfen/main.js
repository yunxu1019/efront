// 中文编码 utf-8
var tbar = titlebar("缘分", null, false);
var page = createElement(div, beian, tbar, slider());
css(page, "font-size:40px;color:#fff;padding-top:50px;");

var group_sample = createElement(div);
css(group_sample, "width:100%;height:auto;position:relative;");
var title_sample = createElement(div);
css(title_sample, "width:100%;height:50px;position:relative;");
var body_sample = createElement(div);
css(body_sample, "width:");
// var group=function(title,objects){
//     var title=createElement(div);
//     appendChild(div,title);
//     var images=objects.map(function(object){
//         var image=new Image;
//         image.src=object.image||object.images[0];
//         image.onclick=function(){
//             go(object.url);
//         };
//         return image;
//     });
//     var body=createElement(div);
//     appendChild(body,images);
//     var group=createElement(div);

// };
appendChild(page, group(
    option(icon("menu"), ""),
    option(icon("menu"), ""),
    option(icon("menu"), ""),
    option(icon("menu"), ""),
    option(icon("menu"), ""),
    option(icon("menu"), ""),
    option(icon("menu"), "")
), group(
    option(icon("menu"), ""),
    option(icon("menu"), ""),
    option(icon("menu"), ""),
    option(icon("menu"), ""),
    option(icon("menu"), ""),
    option(icon("menu"), "")
));

function main() {
    return vbox(page);
}