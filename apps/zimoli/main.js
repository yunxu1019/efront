// 中文编码 utf-8
"use strict";
var menu = div();
appendChild(menu, kugou$menu, kugou$page);
var _state = state();
if (_state.isRight) {
    kugou$dragview.toRight();
}
kugou$dragview.onchange = function () {
    _state.isRight = kugou$dragview.isRight;
    state(_state);
};
var view = layer$leftCenter(menu);
menu.initialStyle = "transform:scale(.92)";
css(menu, "background-image: linear-gradient(0deg, #0b3b5d, 5%, #031341, 90%, #235b71);height:100%;width:100%");
css("body", "background:url('images/background.jpg') no-repeat;background-size:cover;");
css(":after,:before,*", "box-sizing:border-box;");
function main() {
    return view;
}