"use strict";
var crc = require("../efront/crc");
var path = require("path");
var fs = require("fs");
var environment = require("./environment");
var report = require("./report");
var setting = require("./setting");
var buildHtml = function (html, code) {
    var isZimoliDetected = false;
    var poweredByComment;
    var ReleaseTime = new Date().toString();
    var html = html.toString()
        .replace(/^\s*(<!doctype[^>]*?>\s*)?<!--([\s\S]*?)--!?>/i, function (_, doctype, message) {
            // `${doctype}<!--${message}\r\n${efrontReloadVersionAttribute}-->`
            poweredByComment = _;
            return "";
        })
        .replace(/<!--[\s\S]*?--!?>/g, "")
        .replace(/<title>(.*?)<\/title>/i, `<title>${process.env.TITLE || "$1"}</title>`)
        .replace(/<script\b[\s\S]*?<\/script>/ig, function (script) {
            if (/(["'`])post\1\s*,\s*(['`"])comm\/main\2/i.test(script)) {
                isZimoliDetected = true;
                return "";
            }
            if (/<script\s[^>]*?(type\s*=\s*)?(["']|)efront\-?(?:hook|main|host|script|loader)\1[^>]*?>/i.test(script)) {
                isZimoliDetected = true;
            }
            if (/\bdeleteoncompile\b/i.test(script)) {
                return "";
            }
            return script;
        });

    if (isZimoliDetected)
        html = html.replace(/(<\/head>)/i, (_, head) => `\r\n<script compiledinfo="${ReleaseTime} by efront ${require("../../package.json").version}">\r\n<!--\r\n-function(){${code}}.call(this)\r\n-->\r\n</script>\r\n${head}`);
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
                xhr.send("${reloadVersion}");
            };
            var reloader = function(){
                load(location.pathname + "?time=" + +new Date(), function(xhr){
                    var version = xhr.responseText.match(/\\b${efrontReloadVersionAttribute}\\s*=\\s*(\\d+)\\b/);
                    console.info("当前版本:${reloadVersion},目标版本:" + targetVersion + "正在重新加载,..");
                    if( !version || +version[1] !== ${reloadVersion}) location.reload() | console.warn("reload..", new Date);
                    else setTimeout(reloader, 200);
                }, "get");
            };
            var targetVersion = ${reloadVersion};
            var checkUpdate = function(xhr){
                targetVersion = xhr.responseText||xhr.response;
                reloader();
            };
            load("http://localhost${WATCH_PORT ? ":" + WATCH_PORT : ""}/reload/${reloadVersion}", checkUpdate, "post");
        }();
        </script>\r\n${head}`);
        global.WATCH_PROJECT_VERSION = reloadVersion;
    }
    if (poweredByComment) {
        html = html.replace(/^\s*(?:<!doctype[\s\S]*?>)?/i, poweredByComment);
    }
    return html;
};
function toApplication(responseTree) {
    var mainScript = responseTree.main ? responseTree.main : null;
    var indexHtml = responseTree["/index.html"] || responseTree["@index.html"];
    if (!indexHtml) {
        var htmlPath = path.join(__dirname, "../apps", "index.html");
        indexHtml = {
            time: 0,
            needed: true,
            fullpath: htmlPath,
            data: fs.readFileSync(htmlPath),
            realpath: htmlPath,
            version: fs.statSync(htmlPath).mtime,
            destpath: path.join("index.html"),
        };
        responseTree["/index.html"] = indexHtml;
    }
    if (mainScript) {
        Object.keys(responseTree).forEach(function (key) {
            if (/\.(jsp|php|html|asp)$/i.test(key)) {
                var response = responseTree[key];
                if (response && response.data) {
                    response.data = buildHtml(response.data, mainScript.data);
                }
            }
        });
    }
    delete responseTree["main"];
    return responseTree;
}
module.exports = function (responseTree) {
    report(responseTree);
    if (!responseTree["main"]) {
        console.warn("在您所编译的项目中没有发现主程序");
        return toApplication(responseTree);
    }
    var commbuilder = require("../efront/commbuilder");
    commbuilder.compress = false;
    var mainScript = responseTree.main;
    var mainScriptData = commbuilder(mainScript.data, "main.js", mainScript.realpath, []);
    delete commbuilder.compress;
    var versionTree = {};
    if (setting.is_file_target) {
        Object.keys(responseTree).sort().forEach(function (k) {
            var v = responseTree[k];
            if (/^[@\\]|^\/.*?\.[^\\\/]+$/.test(k) || !v.data) return;
            if (v.url !== "main") versionTree[v.url] = String(v.data);
        });
        delete versionTree["/index.html"];
        delete versionTree["@index.html"];
        for (var k in versionTree) {
            delete responseTree[k];
        }
    } else {
        Object.keys(responseTree).sort().forEach(function (k) {
            var v = responseTree[k];
            if (!v) return;
            if (/^@|^\/.*?\.[^\\\/]+$/.test(k) || !v.data) return;
            var responseVersion = crc([].map.call(v.data.toString(), e => e.charCodeAt(0))).toString(36) + (+v.data.length).toString(36);
            versionTree[v.url] = responseVersion;
        });
        delete versionTree["main"];
        delete versionTree["[]map"];
        delete versionTree["promise"];
        delete versionTree["/index.html"];
        delete versionTree["@index.html"];
    }

    return Promise.resolve(mainScriptData).then(function (mainScriptData) {
        if (setting.is_file_target) {
            var xTreeName = /\bresponseTree\s*[\=\:]\s*(.+?)\b/m.exec(mainScriptData)[1];
            commbuilder.prepare = false;
        } else {
            var xTreeName = /\bversionTree\s*[\=\:]\s*(.+?)\b/m.exec(mainScriptData)[1];
        }
        var code = JSON.stringify(versionTree, null, "\t").replace(/\-\-\>/g, s => "-- >");
        var versionVariableName;
        code = mainScriptData.toString()
            .replace(/\.send\((.*?)\)/g, (match, data) => (versionVariableName = data || "", ".send()"))
            .replace(/(['"])post\1\s*,(.*?)\s*\)/ig, `$1get$1,$2${versionVariableName && `+"${environment.EXTT}?"+` + versionVariableName})`)
            .replace(
                new RegExp(xTreeName + /(\s*)=(\s*)\{.*?\}/.source),
                function (m, s1, s2) {
                    return xTreeName + `${s1}=${s2}${code}`;
                }
            );
        return commbuilder(code, "main.js", mainScript.realpath, []);
    }).then(function (mainScriptData) {
        mainScript.data = mainScriptData;
        return toApplication(responseTree);
    });
};