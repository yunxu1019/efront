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
var fixContainer = function (elem, ipt) {
    var lastChild = ipt.lastChild;
    if (!lastChild) return;
    var deltaHeight = lastChild.offsetHeight + lastChild.offsetTop - ipt.clientHeight;
    if (Math.abs(deltaHeight) < 1) return;
    var offsetHeight = elem.offsetHeight;
    var targetHeight = offsetHeight + deltaHeight;
    if (targetHeight > innerHeight) targetHeight = +innerHeight;
    else if (offsetHeight > 260 && targetHeight < 260) targetHeight = 260;
    css(elem, { height: targetHeight });
    move.fixPosition(elem);
};
function prompt() {
    var msg, check, ipt, info;
    var opts = [];
    var submit = null;
    var wrap = false;
    var value = '';
    var attrs = {
        type: null,
        max: null,
        min: null,
        step: null,
        maxLength: null,
    };
    for (var arg of arguments) {
        if (isNode(arg)) ipt = arg;
        else if (msg && typeof arg === 'string' || typeof arg === 'integer') value = arg;
        else if (typeof arg === 'string') msg = arg;
        else if (isArray(arg)) opts = arg;
        else if (isFunction(arg) || arg instanceof RegExp) check = arg;
        else if (isObject(arg)) {
            if (isFunction(arg.test)) check = arg;
            if (isFunction(arg.check)) check = arg.check;
            if (isFunction(arg.submit)) submit = arg;
            if (isString(arg.msg || arg.title)) msg = arg.msg || arg.title;
            if (isHandled(arg.info)) info = arg.info;
            if (isHandled(arg.value)) value = arg.value;
            for (var k in attrs) {
                if (k in arg) attrs[k] = arg[k];
            }
            if (arg.multiple || arg.wrap) wrap = true;
        }
    }
    if (!msg) msg = i18n`请输入`;
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
    for (var k in attrs) {
        if (isHandled(attrs[k])) ipt.setAttribute(k, attrs[k]);
    }
    var tip = document.createElement("tip");
    var buttons = [isNode(opts[0]) ? opts[0] : button(opts[0] || i18n`确认`), isNode(opts[1]) ? opts[1] : button(opts[1] || i18n`取消`, 'white')];
    var getValue = () => isFunction(ipt.getValue) ? ipt.getValue() : ipt.value;
    if (check || wrap) {
        var setDisable = function (event) {
            fixContainer(c, ipt);
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
    var content = [ipt, tip];
    if (info) {
        if (isNode(info)) content.push(info);
        else {
            var info_node = document.createElement('div');
            info_node.innerHTML = info;
            content.push(info_node);
        }
    }
    appendChild(body, content);
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
                css(c, {
                    height: c.offsetHeight
                });
            });
            once('dragend')(c, function () {
                p = move.getPosition(c);
            });
        });
        resize.on(c);
    }
    return c;
}