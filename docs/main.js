"use strict";
// var document=this.document;
// document["body"].appendChild(this.document.createElement("input"));
titlebar("组件加载工具", false, false);
var leftArea = tree();
addClass(leftArea, "left-bar");
var mainArea = createWithClass(vbox, "main-area");
var nameArea = createWithClass(div, "name-area");
var page = createElement(div);
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
        appendChild(mainArea.innerHTML);
        execute(commNameInput.value, function (comm, logs) {
            remove(mainArea.children);
            if (comm === undefined && !logs.length) {
                mainArea.innerHTML = `<span style="line-height:20px">该模块未发现使用信息</span>`;
                return;
            }

            if (isNode(comm)) appendChild(mainArea, comm);
            else mainArea.innerHTML = `<div>${JSON.stringify(comm)}</div>`
            appendChild(mainArea, logpad);
        }, logpad);
    } catch (e) {
        console.error(e);
    }
}
zimoli.clearHistory();
appendChild(nameArea, commNameInput);
appendChild(page, leftArea, nameArea, mainArea);
function main() {
    build();
    return page;
}