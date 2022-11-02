var nav = createElement("titlebar");

function btn(element) {
    var opt = button(element);
    return opt;
}


function titlebar(elem) {
    if (isElement(elem)) return elem;
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
    var menu_group = div();
    addClass(menu_group, "menus");
    appendChild(bar, menu_group);
    if (use_back) {
        appendChild(bar, _back);
        addClass(_back, "back");
    }
    if (isArray(option_buttons)) {
        option_buttons = option_buttons.map(function (button) {
            return isString(button) ? btn(button) : button;
        });
        if (option_buttons.length > 1) {
            appendChild(menu_group, option_buttons);
        } else if (option_buttons.length === 1) {
            var button = option_buttons[0];
            addClass(button, "menu");
            appendChild(menu_group, button);
        }
    } else if (isNode(option_buttons)) {
        appendChild(option_buttons, option_buttons);
    } else if (isObject(option_buttons)) {
        option_buttons = Object.keys(option_buttons).map(function (key) {
            var value = option_buttons[key];
            var button = btn(key);
            if (isFunction(value)) {
                onclick(button, value);
            }
            return button;
        });
        appendChild(menu_group, option_buttons);
    }
    bar.setTitle = function (name) {
        text(title, name);
    };
    return bar;
}
titlebar.button = btn;