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
commNameInput.value = state();
onkeydown(commNameInput, function (event) {
    var {
        keyCode
    } = event;
    if (keyCode === 13) {
        state(this.value);
        build();
    }
});
api("/getAllComponents").success(function (result) {
    leftArea.src(result.result);
    leftArea.go(0);
}).error(function (err) {
    alert(err);
});
onclick(leftArea, function (event) {
    var data = leftArea.src[event.target.parentNode.index];
    console.log(data);
})

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
    execute(commNameInput.value, function (comm) {
        isNode(comm) && appendChild(mainArea, comm);
    });
}
appendChild(nameArea, commNameInput, exportButton);
appendChild(page, leftArea, nameArea, mainArea);
function main() {
    build();
    return page;
}