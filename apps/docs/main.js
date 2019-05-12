"use strict";
// var document=this.document;
// document["body"].appendChild(this.document.createElement("input"));
titlebar("组件加载工具", false, false);
var leftArea = tree();
addClass(leftArea, "left-bar");
var mainArea = createWithClass(div, "main-area");
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
onactive(leftArea, function (event) {
    if (event.value.tab === 1) return;
    if (!event.value.test) return alert("仅可以测试点击以_test结尾的哦");
    commNameInput.value = event.value.name + "_test";
    state({
        scroll: leftArea.index(),
        value: commNameInput.value
    })
    build();
});
/**
 * clearCacheResponse
 */



var exportButton = button("导出代码", "default");
css(exportButton, "height:50px;width:200px;")
onclick(exportButton, exportCodes);
window.modules = modules;
var baseUrl = "";
setGetMethod(function (url, then) {
    url = baseUrl + url;
    if (responseTree[url]) {
        then(responseTree[url], url);
    } else if (loaddingTree[url]) {
        loaddingTree[url].push(then);
    } else {
        loaddingTree[url] = [then];
        modules.load(url);
    }
});
var build = function () {
    try {
        execute(commNameInput.value, function (comm) {
            isNode(comm) && appendChild(mainArea, comm);
        });
    } catch (e) {
        console.error(e);
    }
}
appendChild(nameArea, commNameInput, exportButton);
appendChild(page, leftArea, nameArea, mainArea);
function main() {
    build();
    return page;
}