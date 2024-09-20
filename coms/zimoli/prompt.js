var settip = function (tip, res) {
    if (isEmpty(res)) valid = true;
    else if (typeof res === 'boolean') valid = res;
    else if (isNode(res)) remove(tip.childNodes), appendChild(tip, res);
    else html(tip, res), valid = false;
    if (valid) html(tip, '');
    return valid;
}
var validate = function (text, checker, tip) {
    var valid;
    if (checker instanceof RegExp) {
        valid = checker.test(text);
    }
    if (isFunction(checker)) {
        valid = checker(text);
    }
    valid = settip(tip, valid);
    return valid;
};
function prompt() {
    var msg = i18n`请输入`, check, ipt;
    var opts = [];
    var submit = null;
    var wrap = false;
    for (var arg of arguments) {
        if (isNode(arg)) ipt = arg;
        else if (typeof arg === 'string') msg = arg;
        else if (isArray(arg)) opts = arg;
        else if (isFunction(arg) || arg instanceof RegExp) check = arg;
        else if (isObject(arg)) {
            if (isFunction(arg.test)) check = arg;
            if (isFunction(arg.submit)) submit = arg;
            if (isString(arg.msg || arg.title)) msg = arg.msg || arg.title;
            if (arg.multiple || arg.wrap) wrap = true;
        }
    }
    if (!ipt) {
        if (wrap) {
            ipt = document.createElement('div');
            ipt.setAttribute('textarea', '');
            ipt.contentEditable = true;
        }
        else ipt = input();
    }
    else {
        ipt.setAttribute('textarea', '');
    }
    var tip = document.createElement("tip");
    var buttons = [isNode(opts[0]) ? opts[0] : button(opts[0] || i18n`确认`), isNode(opts[1]) ? opts[1] : button(opts[1] || i18n`取消`, 'white')];
    var h260 = freeOffset(260);
    var h80 = freeOffset(80);
    if (isFunction(check) || wrap) {
        var setDisable = function (event) {
            if (wrap) {
                var lastElementChild = ipt.lastElementChild;
                a: if (lastElementChild) {
                    var targetHeight = Math.min(ipt.scrollHeight, h260, lastElementChild.offsetTop + lastElementChild.offsetHeight);
                    if (Math.abs(targetHeight - ipt.clientHeight - ipt.clientTop) < 2) break a;
                    if (targetHeight < h80) targetHeight = h80;
                    css(ipt, { height: targetHeight + 20 });
                }
            }
            if (p) move.setPosition(c, p);
            if (!check) return;
            var valid = validate(ipt.value, check, tip);
            if (event) attr(body, "error", !valid);
            attr(buttons[0], 'disabled', !valid);
        };
        on('keyup')(ipt, setDisable);
        on('keypress')(ipt, setDisable);
        on('cut')(ipt, setDisable);
        on('paste')(ipt, setDisable);
        on('input')(ipt, setDisable);
    }
    var body = document.createElement("div");
    appendChild(body, [ipt, tip]);
    var c = confirm(msg, body, buttons, async function (_) {
        if (_ === buttons[0]) {
            if (check && !validate(ipt.value, check, tip)) return false;
            if (submit) {
                var res = await submit.submit(ipt.value);
                if (!settip(tip, res)) return false;
            }
        }
    });
    on('mounted')(ipt, function () {
        if (setDisable) setDisable();
        setTimeout(function () {
            ipt.focus();
        });
    })
    on("mousedown")(c, e => e.target !== ipt && e.preventDefault() | ipt.focus());
    on(wrap ? "keydown.ctrl.enter" : "keydown.enter")(c, function (event) {
        if (event.defaultPrevented) return;
        event.preventDefault();
        buttons[0].click();
    });
    var p = null;
    if (wrap) {
        oncemount(c, function () {
            requestAnimationFrame(function () {
                p = move.getPosition(c);
            });
            once('dragend')(c, function () {
                p = move.getPosition(c);
            })
        })
    }
    return c;
}