
/**
 * 确定就继续，取消就中断
 */
function yousure(title = "您确定要这么做吗？", content = "当前操作需要您再次确认") {
    var options = [button("确定(Y)"), button("取消(N)", "white")];
    options[0].tabindex = -1;
    options[1].tabindex = -1;
    var changeFocus = function (event) {
        if (event) event.preventDefault();
        if (page.focused) removeClass(page.focused, 'focused');
        page.focused = page.focused === options[0] ? options[1] : options[0];
        addClass(page.focused, 'focused');
    };
    var page = confirm(title, content, options, function (b) {
        if (options[0] === b) {
            if (isFunction(page.onload)) page.onload();
        }
        else {
            if (isFunction(page.onerror)) page.onerror();
        }
    });
    on("keydown.left.only")(page, function () {
        if (page.focused !== options[0]) changeFocus();
    });
    on("keydown.right.only")(page, function () {
        if (page.focused !== options[1]) changeFocus();
    });
    on("keydown.tab.only")(page, changeFocus);
    var clickbtn = function () {
        if (page.focused) page.focused.click();
    };
    on("keydown.space")(page, clickbtn);
    on("keydown.enter")(page, clickbtn);
    var setFocus = function () {
        if (page.focused !== this) changeFocus();
    };
    on("pointerdown")(options[0], setFocus)
    on("pointerdown")(options[1], setFocus);
    page.tabindex = 0;
    var focuspage = function () {
        setTimeout(function () {
            page.focus();
        });
    };
    onappend(page, function () {
        focuspage();
        on("pointerdown")(page.$mask, focuspage);
    });
    changeFocus();
    awaitable(page);
    return page;
}