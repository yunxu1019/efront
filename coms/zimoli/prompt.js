function prompt(msg = "请输入", validate) {
    var ipt = input();
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
    if (isFunction(validate)) {
        var setDistable = function () {
            attr(buttons[0], 'disabled', validate(ipt.value) === false);
        };
        on('keyup')(ipt, setDistable);
        on('keypress')(ipt, setDistable);
        on('cut')(ipt, setDistable);
        on('paste')(ipt, setDistable);
        on('input')(ipt, setDistable);
    }
    var c = confirm(msg, ipt, buttons, function (_) {
        if (oked || ohed) return;
        if (_ === buttons[0]) {
            if (validate && validate(ipt.value) === false) return false;
            oked = true;
        } else {
            ohed = true;
        }
        fire();
    });
    on('mounted')(ipt, function () {
        setDistable();
        setTimeout(function () {
            ipt.focus();
        });
    })
    on("mousedown")(c, e => e.target !== ipt && e.preventDefault() | ipt.focus());
    on("keydown.enter")(c, function (event) {
        if (event.defaultPrevented) return;
        if (validate && validate(ipt.value) === false) return;
        event.preventDefault();
        oked = true;
        remove(c);
        fire();
    });
    c.then = function (ok, oh) {
        oks.push(ok);
        ohs.push(oh);
        fire();
    };
    return c;
}