"use strict";
function toApplication(responseTree) {
    var versionTree = {};
    Object.keys(responseTree).sort().forEach(function (k) {
        if (/^@|^\/.*?\.[^\\\/]+$/.test(k)) return;
        var v = responseTree[k];
        versionTree[v.url] = v.version;
    });
    delete versionTree["main"];
    delete versionTree["[].map"];
    delete versionTree["promise"];
    delete versionTree["fastclick"];
    delete versionTree["/index.html"];
    delete versionTree["@index.html"];
    var mainScript = responseTree["main"].data;
    var indexHtml = responseTree["/index.html"] || responseTree["@index.html"];
    var indexHtmlData = indexHtml.data;
    var versionTreeName = /\.versionTree\s*=\s*(.*?)[,;$]/m.exec(mainScript)[1];
    var code = JSON.stringify(versionTree, null, "\t")//.replace(/[<>]/g, s => "\\x" + `0${s.charCodeAt(0).toString(16)}`.slice(-2));
    var versionVariableName;
    code = mainScript.toString()
        .replace(/\.send\((.*?)\)/g, (match, data) => (versionVariableName = data || "", ".send()"))
        .replace(/(['"])post\1\s*,(.*?)\s*\)/ig, `$1get$1,$2${versionVariableName && `+"?"+` + versionVariableName})`)
        .replace(
            new RegExp(versionTreeName + "(\s*)=(\s*)\{.*?\}"),
            function (m, s1, s2) {
                return versionTreeName + `${s1}=${s2}${code}`;
            }
        );
    var html = indexHtmlData.toString()
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<title>(.*?)<\/title>/i, `<title>${process.env.TITLE || "$1"}</title>`)
        .replace(/<script\s[\s\S]*?<\/script>/ig, function (script) {
            if (/\bdeleteoncompile\b/i.test(script.replace(/(['"]).*?\1/g, ""))) {
                return "";
            }
            return script;
        })
        .replace(/<\/head>/i, `<script compiledinfo="${new Date().toString()} by efront">\r\n<!--\r\n-function(){${code}}.call(this)\r\n-->\r\n</script>\r\n</head>`);
    indexHtml.data = html;
    delete responseTree["main"];
    return responseTree;
}
module.exports = toApplication;