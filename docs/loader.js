"use strict";
// var document=this.document;
// document["body"].appendChild(this.document.createElement("input"));
if (window.require) {
    var c = button('×');
    c.onclick = window.close.bind(window);
    var topbar = titlebar("组件加载工具", [c], false);
    drag.on(topbar, window);
}
var leftArea = tree();
addClass(leftArea, "left-bar");
var mainArea = createWithClass(vbox, "main-area");
var nameArea = createWithClass(div, "name-area");
var page = createElement(div);
if (topbar) {
    css(page, 'border-top:50px solid transparent')
}
/**
 * commNameInput
 */
var commNameInput = createElement(input);
commNameInput.value = state().value || "";
onkeydown(commNameInput, function (event) {
    var {
        keyCode
    } = event;
    if (keyCode === 13) {
        build();
        state({ value: this.value });
    }
});
api("/getAllComponents").success(function (result) {
    leftArea.setData(result.result);
    leftArea.go(state().scroll);
}).error(function (err) {
    alert(err);
});
var actived = null;
onactive(leftArea, function (event) {
    if (event.value.tab === 1) {
        return;
    }
    if (!event.value.test) return alert("仅可以测试点击以_test结尾的哦");
    commNameInput.value = event.value.name + "_test";
    event.value.actived = true;
    if (actived) {
        actived.actived = false;
    }
    actived = event.value;
    state({
        scroll: leftArea.index(),
        value: commNameInput.value
    })
    build();
});
/**
 * clearCacheResponse
 */


window.modules = modules;
var baseUrl = "";
var build = function () {
    try {
        var logpad = document.createElement("logpad");
        remove(mainArea.children);
        execute(commNameInput.value, function (comm, logs) {
            remove(mainArea.children);
            if (comm === undefined && !logs.length) {
                mainArea.innerHTML = `<span style="line-height:20px">该模块未发现使用信息</span>`;
                return;
            }
            if (isNode(comm)) {
                if (!comm.isMounted) appendChild(mainArea, comm);
            }
            else mainArea.innerHTML = `<div>${JSON.stringify(comm)}</div>`
            appendChild(mainArea, logpad);
        }, logpad);
    } catch (e) {
        console.error(e);
    }
};
appendChild(nameArea, commNameInput);
appendChild(page, leftArea, nameArea, mainArea);
function main() {
    build();
    return page;
}