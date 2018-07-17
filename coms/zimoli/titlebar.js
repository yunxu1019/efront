var nav = createElement(div);

function btn(element) {
    var opt = button(element);
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


function titlebar() {
    var page_title, option_buttons, use_back;
    {
        for (let cx = 0, dx = arguments.length; cx < dx; cx++) {
            let arg = arguments[cx];
            switch (typeof arg) {
                case "string":
                    page_title = arg;
                    break;
                case "object":
                    option_buttons = arg;
                    break;
                case "boolean":
                    use_back = arg;
                    break;
            }
        }
    }
    use_back = use_back !== false;
    var bar = createElement(nav);
    var title = createElement(label);
    var _back = createElement(back);
    text(title, page_title || document.title);
    appendChild(bar, title);
    if (use_back) {
        appendChild(bar, _back);
        addClass(_back, "back");
    }
    if (isArray(option_buttons)) {
        option_buttons = option_buttons.map(function (button) {
            return isString(button) ? btn(button) : button;
        });
        if (option_buttons.length > 1) {
            var menu_group = div();
            addClass(menu_group, "menus");
            appendChild(menu_group, option_buttons);
            appendChild(bar, menu_group);
        } else if (option_buttons.length === 1) {
            var button = option_buttons[0];
            addClass(button, "menu");
            appendChild(bar, button);
        }
    } else if (isNode(option_buttons)) {
        appendChild(bar, option_buttons);
    }
    return bar;
}
titlebar.button = btn;