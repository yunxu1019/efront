var isOptionalReg = /^是否|是[吗吧]$|[？?]$|请|^难道|^确认/i;
var conflictReg = /^确[\s\u0060]*?认[\s\u0060]*?取[\s\u0060]*?消/i;
var defaultOptions = {
    是: ["是的", "不是"],
    确认: ["确认", "取消"],
    是否: ["是", "否"],
    是吗: ["是", "不是"],
    请: ["完成", "取消"],
}
function confirm() {
    var message, title, options, callback, selected = 0;
    [].map.call(arguments, function (arg) {
        if (isNode(arg)) {
            if (isString(message)) {
                title = message;
            }
            message = arg;
        } else if (isString(arg)) {
            if (isNode(message)) {
                title = arg;
            } else {
                if (isString(message)) {
                    title = message;
                }
                message = arg;
            }
        } else if (isArray(arg)) {
            options = arg;
        } else if (isFinite(arg)) {
            selected = arg | 0;
        }
    });
    var element = div();
    element.innerHTML = `<div class=head></div><div class=body></div><div class=option></div>`;
    var [head, body, option] = element.children;
    if (isString(title)) {
        head.innerHTML = title;
    }
    if (isString(message)) {
        body.innerHTML = message;
    } else if (isNode(message)) {
        appendChild(body, message);
    } else {
        throw new Error(`消息体不合法！`);
    }
    message = String(body.innerText).replace(/\s+/g, " ");
    if (conflictReg.test(String(body.innerText).replace(/\s+/g, ""))) {
        throw new Error(`您的传达了有歧义的信息：${message}`);
    }
    if (!options) {
        for (var k in defaultOptions) {
            if (message.indexOf(k) >= 0) {
                options = defaultOptions[k];
                break;
            }
        }
        if (!options) {
            options = ["确认", "取消"];
        }
    }
    var buttons = options.map(function (label, index, options) {
        var btn = button(label);
        onclick(btn, function () {
            if (isFunction(callback) && callback(label, index, options) === false) return;
            remove(element);
        })
        return btn;
    });
    onclick(element, function () {
        css(this, { zIndex: zIndex() });
    });
    drag.on(element);
    preventOverflowScrolling(element);
    appendChild(option, buttons);
    setTimeout(function () {
        popup(element);
        css(element, {
            marginLeft: -element.offsetWidth / 2 + "px",
            marginTop: -element.offsetHeight / 2 + "px",
            left: "50%",
            top: "50%"
        });
    });
    return element;
}