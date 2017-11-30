"use strict";
// var document=this.document;
// document["body"].appendChild(this.document.createElement("input"));
titlebar("组件加载工具", false, false);
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
        load();
    }
});
var component;
var load = function (then) {
    component && remove(component);
    if (!commNameInput.value) return;
    var commName = commNameInput.value;
    console.info(`load ${commName}!`);
    delete window[commName];
    init(commNameInput.value, function (comm) {
        window[commName] = function () {
            remove(component);
            try {
                component = isFunction(comm) ? comm.apply(null, arguments) : createElement(comm);
                component && appendChild(page, component);
            } catch (e) {
            }
            return component;
        };
        try {
            component = createElement(comm);
            component && appendChild(page, component);
        } catch (e) {

        }
        then && then(comm);
    });
};
/**
 * clearCacheResponse
 */
var clearCachedResponse = function () {
    for (var k in responseTree) {
        delete responseTree[k];
        delete modules[k];
        delete window[k];
    }
};
var sync = function (method, url) {
    var xhr = new XHR;
    xhr.open(method, url, false);
    xhr.send("efront");
    return xhr.responseText;
};
var exportCodes = function () {
    baseUrl = "/";
    var mainScript = sync("post", "/comm/main");
    var indexHtml = sync("get", "/");
    clearCachedResponse();
    load(function () {
        var commName = commNameInput.value;
        var code = JSON.stringify(responseTree, null, 4);
        code = mainScript.replace(/var\s+responseTree\s*=\s*\{\};?/, function () {
            return `var responseTree = ${code};`;
        });
        var html = indexHtml.replace(/<!--[\s\S]*?-->/g, "").replace(/<title>.*?<\/title>/, "<title>http://efront.cc</title>").replace(/<script[\s\w\"\']*>[\s\S]*<\/script>/, function () {
            return `<script>-function(){${code}}.call(window)</script>`;
        });
        // var blob = new Blob([code], { type: "text/plain" });
        download(html, commName + ".html", "text/html");
        console.log(html.length);
    });
};
var exportButton = button("导出代码", "default");
css(exportButton, "height:50px;width:200px;")
onclick(exportButton, exportCodes);
window.modules = modules;
var baseUrl = "";
setGetMethod(function (url, then) {
    url = baseUrl + url;
    if (responseTree[url]) {
        then(responseTree[url]);
    } else if (loaddingTree[url]) {
        loaddingTree[url].push(then);
    } else {
        loaddingTree[url] = [then];
        modules.load(url);
    }
});
appendChild(page, commNameInput, exportButton);
function main() {
    load();
    return page;
}