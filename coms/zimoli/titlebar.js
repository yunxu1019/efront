var nav = createElement(div);

function btn(element) {
    var opt = button(element);
    addClass(opt, "btn");
    return opt;
}
function back() {
    var _icon = icon("back", 0xf0f0f0);
    css(_icon, "width:30px;height:30px;top:50%;margin-top:-15px;left:10px;position:absolute;");
    var _btn = btn(_icon);
    css(_btn, "left:0;")
    onclick(_btn, function () {
        history.back();
    })
    return _btn;
}


function titlebar(page_title, option_buttons, use_back) {
    use_back = use_back !== false;
    var bar = createElement(nav);
    var title = createElement(label);
    var _back = createElement(back);
    text(title, page_title || document.title);
    appendChild(bar, title);
    if (use_back) {
        appendChild(bar, _back);
        css(title, "padding-left:46px;");
    }
    option_buttons && appendChild(bar, option_buttons);
    return bar;
}
titlebar.button = btn;