var validate = function (text, checker, tip) {
    var valid;
    if (checker instanceof RegExp) {
        valid = checker.test(text);
    }
    if (isFunction(checker)) {
        var res = checker(text);
        if (isEmpty(res)) valid = true;
        else if (typeof res === 'boolean') valid = res;
        else if (isNode(res)) remove(tip.childNodes), appendChild(tip, res);
        else html(tip, res), valid = false;
    }
    if (valid) html(tip, '');
    return valid;
};
function prompt() {
    var msg = "请输入", check, ipt;
    for (var arg of arguments) {
        if (isNode(arg)) ipt = arg;
        else if (typeof arg === 'string') msg = arg;
        else if (isFunction(arg) || arg instanceof RegExp) check = arg;
    }
    var ipt = input();
    var tip = document.createElement("tip");
    var oked, ohed;
    var oks = [], ohs = [];
    var fire = function () {
        if (!oked && !ohed) return;
        if (oked) oks.forEach(o => o(ipt.value));
        if (ohed) ohs.forEach(o => o(ipt.value));
        oks.splice(0, oks.length);
        ohs.splice(0, ohs.length);
    };
    var buttons = [button("确认"), button("取消", 'white')];
    if (isFunction(check)) {
        var setDisable = function (event) {
            if (oked || ohed) return;
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
    var body = div();
    appendChild(body, [ipt, tip]);
    var c = confirm(msg, body, buttons, function (_) {
        if (oked || ohed) return;
        if (_ === buttons[0]) {
            if (check && !validate(ipt.value, check, tip)) return false;
            oked = true;
        } else {
            ohed = true;
        }
        fire();
    });
    on('mounted')(ipt, function () {
        if (setDisable) setDisable();
        setTimeout(function () {
            ipt.focus();
        });
    })
    on("mousedown")(c, e => e.target !== ipt && e.preventDefault() | ipt.focus());
    on("keydown.enter")(c, function (event) {
        if (event.defaultPrevented) return;
        event.preventDefault();
        buttons[0].click();
    });
    c.then = function (ok, oh) {
        oks.push(ok);
        ohs.push(oh);
        fire();
    };
    return c;
}