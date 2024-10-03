var isOptionalReg = /^是否|是[吗吧]$|[？?]$|请|^难道|^确认/i;
var conflictReg = /^确[\s\u00a0]*?认[\s\u00a0]*?取[\s\u00a0]*?消/i;
var defaultOptions = {
    是否: ["否", "是"],
    确认: ["取消", "确认"],
    是吗: ["不是", "是"],
    "": [i18n`取消`, i18n`继续`],
}
function confirm() {
    var message, title, options, callback, closable = true, selected = -1, target;
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
        } else if (isObject(arg)) {
            target = arg.currentTarget || arg.target;
        }
    });
    var element = view();
    element.innerHTML = `<div class=head></div><div class=body></div><div class=foot></div>`;
    var [head, body, option] = element.children;
    if (closable) {
        var closebtn = drop();
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
        throw new Error(i18n`消息体不合法！`);
    }
    message = String(body.innerText).replace(/\s+/g, " ");
    if (conflictReg.test(String(body.innerText).replace(/\s+/g, ""))) {
        throw new Error(i18n`您传达了有歧义的信息：${message}`);
    }
    if (!options) {
        for (var k in defaultOptions) {
            if (message.indexOf(k) >= 0) {
                options = defaultOptions[k];
                break;
            }
        }
        if (!options) {
            options = [i18n`取消`, i18n`确认`];
        }
        options = options.map((label, index) => {
            if (index === 0) label += '#white';
            var btn = button(label);
            btn.result = index;
            return btn;
        }).reverse();
    }
    var clickbtn = function (event) {
        event.preventDefault();
        if (element.hasAttribute("locked")) {
            return;
        }
        if (isFunction(callback)) {
            var index = this.index;
            var res = callback(options[index], index, options);
            if (res === false) return;
            if (res instanceof Promise) {
                element.setAttribute("locked", '');
                this.setAttribute("loading", "");
                res.then((res) => {
                    element.removeAttribute('locked');
                    this.removeAttribute('loading');
                    if (res === false) return;
                    element.result = res;
                    remove(element);
                }, () => {
                    this.removeAttribute('loading');
                    element.removeAttribute('locked');
                });
            }
            else {
                element.result = res;
                remove(element);
            }
        }
        else {
            element.result = isHandled(this.result) ? this.result : this;
            remove(element);
        }
    };
    on('remove')(element, function () {
        this.onload();
    });
    var buttons = options.map(function (label, index, options) {
        if (isNode(label)) {
            label.index = index;
            onclick(label, clickbtn);
            return label;
        }
        if (options.length === 2) for (var k in defaultOptions) {
            if (label === defaultOptions[k][0]) {
                label += " #white";
                break;
            }
        }
        var btn = button(label);
        btn.index = index;
        btn.result = options[index];
        onclick(btn, clickbtn);
        return btn;
    });
    preventOverflowScrolling(element);
    appendChild(option, buttons);
    if (!target) element.initialStyle = "transform:scale(0.96);opacity:0;transition:transform .3s,opacity .2s ease-out";
    else element.initialStyle = "opacity:0;transition:margin .3s,opacity .2s ease-out;";
    element.tabIndex = -1;

    Promise.resolve().then(function () {
        if (isMounted(element)) return;
        element.$mask = true;
        popup(element, target || [.5, .5], target ? 'rhomb' : true);
        element.focus();
        if (!target) drag.on(head, element);
        else {
            on("blur")(element, blur, true);
        }
    });
    return awaitable(element, 'result');
}
var blur = lazy(function () {
    var element = this;
    if (!getTargetIn(element, document.activeElement)) remove(element);
});