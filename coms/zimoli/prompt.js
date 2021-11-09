function prompt(msg = "请输入") {
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
    var c = confirm(msg, ipt, ["确认", "取消"], function (_) {
        if (oked || ohed) return;
        if (_ === "确认") {
            oked = true;
        } else {
            ohed = true;
        }
        fire();
    });
    on('append')(ipt, function () {
        setTimeout(function () {
            ipt.focus();
        });
    })
    on("mousedown")(c, e => e.target !== ipt && e.preventDefault() | ipt.focus());
    on("keydown.enter")(c, function () {
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