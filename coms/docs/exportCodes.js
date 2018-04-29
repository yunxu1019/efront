var exportCodes = function (commName) {
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