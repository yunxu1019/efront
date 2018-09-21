// 中文编码 utf-8
"use strict";
var view = div();
appendChild(view, kugou$menu, kugou$page);
view.initialStyle = "transform:scale(.92)";
css(view, "width:100%;height:100%;position:absolute;left:0;top:0;bottom:0;right:0;overflow:hidden");
css(view, "background-image: linear-gradient(0deg, #0b3b5d, 5%, #031341, 90%, #235b71)");
css("body", "background:#000");
function main() {
    return view;
}