"use strict";
// var document=this.document;
// document["body"].appendChild(this.document.createElement("input"));
titlebar("组件加载工具", false, false);
var page = createElement(div);
var outerbox = createElement(input);
outerbox.value = state();
appendChild(page, outerbox);
onkeydown(outerbox, function (event) {
    var {
        keyCode
    } = event;
    if (keyCode === 13) {
        state(this.value);
        load();
    }
});
var load = function () {
    component && remove(component);
    if (!outerbox.value) return;
    console.info(`load ${outerbox.value}!`);
    init(outerbox.value, function (comm) {
        component = createElement(comm);
        component && appendChild(page, component);
    });
}
var component;

function main() {
    load();
    return page;
}