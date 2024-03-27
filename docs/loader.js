"use strict";
// var document=this.document;
// document["body"].appendChild(this.document.createElement("input"));
if (window.require) {
    var c = button('×', 'close');
    c.onclick = window.close.bind(window);
    var topbar = titlebar("组件加载工具", [c], false);
    drag.on(topbar, window);
}
var leftArea = tree();
addClass(leftArea, "left-bar");
var mainArea = createWithClass(div, "main-area");
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
    });
    setTimeout(build, 0);
});
/**
 * clearCacheResponse
 */


window.modules = modules;
var baseUrl = "";
var loadings_length = 0, loaded_length = 0, response_length = 0;
var refresh = function () {
    var loadings = Object.keys(loadingTree);
    if (!loadings.length) {
        removeClass(progress, 'error');
        css(progress, "width:100%");
        return;
    }
    var responsed = Object.keys(responseTree);
    if (loadings_length !== loadings.length || response_length !== responsed.length) {
        loadings_length = loadings.length;
        response_length = responsed.length - loaded_length;
        css(progress, {
            width: (100 * response_length / (response_length + loadings_length)).toFixed(4) + "%"
        });
    }
    if (loadings.filter(k => !!loadingTree[k].error).length > 0) {
        for (var k in loadingTree) {
            if (loadingTree[k].error) {
                delete loadingTree[k];
            }
        }
        addClass(progress, 'error');
    } else {
        removeClass(progress, 'error');
        setTimeout(refresh, 20);
    }
}

var clean = function (tree) {
    Object.keys(tree).forEach(key => {
        if (tree[key].error) {
            delete tree[key];
        }
    })
};

var build = function () {
    removeClass(progress, 'loaded');
    clean(loadingTree);
    clean(responseTree);
    clean(loadedModules);
    loaded_length = Object.keys(responseTree).length - 1;
    setTimeout(refresh, 20);
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
                if (!comm.$mounted) appendChild(mainArea, comm);
            }
            else mainArea.innerHTML = `<div>[Data Object]{\r\n${isObject(comm) ? Object.keys(comm).join("\r\n\t") : comm}</div>`
            appendChild(mainArea, logpad);
            addClass(progress, 'loaded');

        }, logpad);
    } catch (e) {
        console.error(e);
    }
};
nameArea.innerHTML = '<div class="progress"></div>';
var progress = nameArea.children[0];
appendChild(nameArea, commNameInput);
appendChild(page, leftArea, nameArea, mainArea);
function main() {
    build();
    return page;
}