"use strict";
function toApplication(responseTree) {
    var versionTree = {};
    for (var k in responseTree) {
        if (/@/.test(k)) continue;
        var v = responseTree[k];
        versionTree[k] = v.version;
    }
    delete versionTree["main"];
    delete versionTree["[].map"];
    delete versionTree["promise"];
    delete versionTree["fastclick"];
    delete versionTree["/index.html"];
    var mainScript = responseTree["main"].data;
    var indexHtml = responseTree["/index.html"].data;
    var versionTreeName = /\.versionTree\s*=\s*(.*?)[,;$]/m.exec(mainScript)[1];
    var code = JSON.stringify(versionTree, null, "\t")//.replace(/[<>]/g, s => "\\x" + `0${s.charCodeAt(0).toString(16)}`.slice(-2));
    code = mainScript.replace(/(['"])post\1/ig, "$1get$1").replace(/\.send\(.*?\)/g, ".send()").replace(new RegExp(versionTreeName + "(\s*)=(\s*)\{.*?\}"), function (m, s1, s2) {
        return versionTreeName + `${s1}=${s2}${code}`;
    });
    var html = indexHtml
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<title>(.*?)<\/title>/, `<title>${process.env.TITLE || "$1"}</title>`)
        .replace(/<script[\s\w\"\']*>[\s\S]*<\/script>/, function () {
            return `<script>\r\n<!--\r\n-function(){${code}}.call(this)\r\n-->\r\n</script>`;
        });
    responseTree["/index.html"].data = html;
    responseTree["/index.html"].destpath = "/index.html";
    delete responseTree["main"];
    return responseTree;
}
module.exports = toApplication;