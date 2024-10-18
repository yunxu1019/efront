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
    if (isFunction(checker.test)) {
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
    var value = '';
    for (var arg of arguments) {
        if (isNode(arg)) ipt = arg;
        else if (typeof arg === 'string') msg = arg;
        else if (isArray(arg)) opts = arg;
        else if (isFunction(arg) || arg instanceof RegExp) check = arg;
        else if (isObject(arg)) {
            if (isFunction(arg.test)) check = arg;
            if (isFunction(arg.submit)) submit = arg;
            if (isString(arg.msg || arg.title)) msg = arg.msg || arg.title;
            if (isHandled(arg.value)) value = arg.value;
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
        ipt.value = value;
    }
    else {
        ipt.setAttribute('textarea', '');
    }
    var tip = document.createElement("tip");
    var buttons = [isNode(opts[0]) ? opts[0] : button(opts[0] || i18n`确认`), isNode(opts[1]) ? opts[1] : button(opts[1] || i18n`取消`, 'white')];
    var getValue = () => isFunction(ipt.getValue) ? ipt.getValue() : ipt.value;
    if (check || wrap) {
        var setDisable = function (event) {
            var bd = c.body;
            if (wrap && bd) {
                if (p) move.setPosition(c, p);
                var cp = getCursorPosition();
                var bp = getScreenPosition(bd);
                var s = getComputedStyle(ipt);
                var pl = parseFloat(s.paddingLeft) * 2 + ipt.clientLeft + ipt.offsetLeft;
                var pr = parseFloat(s.borderRightWidth) + parseFloat(s.paddingRight) * 2 + (bd.scrollWidth - ipt.offsetLeft - ipt.offsetWidth);
                var pt = parseFloat(s.paddingTop) * 2 + ipt.clientTop + ipt.offsetTop;
                var pb = parseFloat(s.borderBottomWidth) + parseFloat(s.paddingBottom) * 2 + (bd.scrollHeight - ipt.offsetTop - ipt.offsetHeight);

                if (cp.left < bp.left + pl) {
                    bd.scrollLeft -= bp.left + pl - cp.left;
                }
                if (cp.right > bp.right - pr) {
                    bd.scrollLeft += cp.right + pr - bp.right;
                }
                if (cp.top < bp.top + pt) {
                    bd.scrollTop -= bp.top + pt - cp.top;
                }
                if (cp.bottom > bp.bottom - pb) {
                    bd.scrollTop += cp.bottom + pb - cp.bottom;
                }
            }
            if (!check) return;
            var valid = validate(getValue(), check, tip);
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
            var value = getValue();
            if (check && !validate(value, check, tip)) return false;
            if (submit) {
                var res = await submit.submit(value);
                if (!settip(tip, res)) return false;
            }
            c.result = value;
        } else {
            c.errored = true;
        }
    });
    on('mounted')(ipt, function () {
        if (setDisable) setDisable();
        setTimeout(function () {
            ipt.focus();
        });
    })
    on("mousedown")(c, e => !getTargetIn(ipt, e.target) && e.preventDefault() | ipt.focus());
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