"use strict";
var crc = require("../../process/crc");
function toApplication(responseTree) {
    var versionTree = {};
    Object.keys(responseTree).sort().forEach(function (k) {
        var v = responseTree[k];
        if (/^@|^\/.*?\.[^\\\/]+$/.test(k) || !v.data) return;
        var responseVersion = crc([].map.call(v.data.toString(), e => e.charCodeAt(0))).toString(36) + (+v.version).toString(36);
        versionTree[v.url] = responseVersion;
    });
    delete versionTree["main"];
    delete versionTree["[].map"];
    delete versionTree["promise"];
    delete versionTree["/index.html"];
    delete versionTree["@index.html"];
    var mainScript = responseTree["main"].data;
    var indexHtml = responseTree["/index.html"] || responseTree["@index.html"];
    var indexHtmlData = indexHtml.data;
    var versionTreeName = /\.versionTree\s*=\s*(.+)\b/m.exec(mainScript)[1];
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
    var isZimoliDetected = false;
    var html = indexHtmlData.toString()
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<title>(.*?)<\/title>/i, `<title>${process.env.TITLE || "$1"}</title>`)
        .replace(/<script\b[\s\S]*?<\/script>/ig, function (script) {
            if (/(["'`])post\1\s*,\s*(['`"])comm\/main\2/i.test(script)) {
                isZimoliDetected = true;
                return "";
            };
            if (/\bdeleteoncompile\b/i.test(script.replace(/(['"]).*?\1/g, ""))) {
                return "";
            }
            return script;
        });
    if (isZimoliDetected)
        html = html.replace(/(<\/head>)/i, (_, head) => `\r\n<script compiledinfo="${new Date().toString()} by efront">\r\n<!--\r\n-function(){${code}}.call(this)\r\n-->\r\n</script>\r\n${head}`);
    if (process.env.IN_WATCH_MODE) {
        let WATCH_PORT = +process.env.WATCH_PORT;
        let reloadVersion = +new Date();
        let efrontReloadVersionAttribute = "efront-reload-version";
        html = html.replace(/(<\/head>)/i, (_, head) => `\r\n<script ${efrontReloadVersionAttribute}=${reloadVersion}>
        -function(){
            "use strict";
            var load = function(url, onload, method){
                var xhr = new XMLHttpRequest;
                xhr.open(method, url);
                xhr.timeout = 0;
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4 && xhr.status === 200) onload(xhr);
                };
                xhr.send("haha");
            };
            var checkUpdate = function(){
                load(location.pathname + "?" + +new Date(), function(xhr){
                    var version = xhr.responseText.match(/\\b${efrontReloadVersionAttribute}\\s*=\\s*(\\d+)\\b/);
                    console.log(version)
                    if( !version || +version[1] !== ${reloadVersion}) location.reload()|console.warn("reload..",new Date);
                    else setTimeout(checkUpdate, 200);
                }, "get");
            };
            load("http://localhost${WATCH_PORT ? ":" + WATCH_PORT : ""}/reload", checkUpdate, "post");
        }();
        </script>\r\n${head}`);
    }
    indexHtml.data = html;
    delete responseTree["main"];
    return responseTree;
}
module.exports = toApplication;