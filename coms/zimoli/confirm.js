var isOptionalReg = /^是否|是[吗吧]$|[？?]$|请|^难道|^确认/i;
var conflictReg = /^确[\s\u00a0]*?认[\s\u00a0]*?取[\s\u00a0]*?消/i;
var defaultOptions = {
    是: ["是的", "不是"],
    确认: ["确认", "取消"],
    是否: ["是", "否"],
    是吗: ["是", "不是"],
    请: ["完成", "取消"],
}
function confirm() {
    var message, title, options, callback, closable = true, selected = 0;
    [].map.call(arguments, function (arg) {
        if (typeof arg === "boolean") {
            closable = arg;
        } else if (isNode(arg)) {
            if (isString(message) || isNode(message)) {
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
        } else if (isFunction(arg)) {
            callback = arg;
        }
    });
    var element = div();
    element.innerHTML = `<div class=head></div><div class=body></div><div class=option></div>`;
    var [head, body, option] = element.children;
    if (closable) {
        var closebtn = document.createElement("i");
        closebtn.title = "关闭";
        closebtn.className = "close";
        onclick(closebtn, function () {
            remove(element);
        });
        appendChild(head, closebtn);
    }
    if (isString(title)) {
        head.innerHTML = title;
    } else if (isNode(title)) {
        head.appendChild(title);
    }
    if (isString(message)) {
        var message_length = message.length + message.slice(0, 100).replace(/[\u0000-\u0100]/g, '').length;
        var width = Math.sqrt(message_length > 16 ? message_length - 16 : 0) * 16;
        element.style.width = fromPixel(width + 260);
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
            options = ["确认 ", "取消"];
        }
    }
    var buttons = options.map(function (label, index, options) {
        if (isNode(label)) return label;
        if (options.length === 2) for (var k in defaultOptions) {
            if (label === defaultOptions[k][1]) {
                label += " #white";
                break;
            }
        }
        var btn = button(label);
        onclick(btn, function () {
            if (isFunction(callback) && callback(options[index], index, options) === false) return;
            remove(element);
        });
        return btn;
    });
    onclick(element, function () {
        css(this, { zIndex: zIndex() });
    });
    drag.on(head, element);
    preventOverflowScrolling(element);
    appendChild(option, buttons);
    element.initialStyle = "transform:scale(.9);opacity:0;transition:transform .3s,opacity .2s";
    setTimeout(function () {
        if (element.parentNode) return;
        popup(element);
        move.setPosition(element, [.5, .5]);
    });
    return element;
}