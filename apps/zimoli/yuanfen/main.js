// 中文编码 utf-8
var qq_icon = icon("QQ", 0xffffff);
var loginBtn = button(qq_icon);
onclick(loginBtn, function () {
    go("/user/login");
});
css(qq_icon, "width:28px;height:28px;margin:-14px;top:50%;left:50%;position:absolute;");
css(loginBtn, "display:inline-block;position:absolute;right:0;top:0;height:100%;width:60px;background-color:transparent");
var tbar = titlebar("EFRONT.cc", [loginBtn], false);
css(tbar,"text-align:left;padding-left:20px;")
var page = createElement(div, tbar, slider());
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