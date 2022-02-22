"use strict";
var crc = require("../basic/crc");
var path = require("path");
var fs = require("fs");
var report = require("./report");
var setting = require("./setting");
var getArgs = require('./getArgs');
var strings = require("../basic/strings");
var r21 = "'()*+,-./0123456789:;"
var r29 = "?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[";
var r34 = "]^_`abcdefghijklmnopqrstuvwxyz{|}~";
var memory = require("../efront/memery");
var codetemp = function (delta) {
    var temp = [];
    while (delta > 0) {
        var mode = delta % 84;
        if (mode < 21) {
            temp.push(r21[mode])
        }
        else if (mode < 50) {
            temp.push(r29[mode - 21]);
        }
        else {
            temp.push(r34[mode - 50]);
        }
        delta = delta / 84 | 0;
    }
    return temp;
}
var encrypt = function (text, efrontsign) {
    text = String(text);
    if (!encoded) return text;
    var start = parseInt(efrontsign, 36) % 128;
    var rest = [];
    for (var cx = 0, dx = text.length; cx < dx; cx++) {
        var code = text.charCodeAt(cx);
        var delta = code - start;
        if (delta < 0) {
            delta = -delta;
            if (delta < 5) {
                rest.push(r21[delta])
            } else if (delta < 34) {
                rest.push(r29[delta - 5]);
            } else {
                var temp = codetemp(delta - 33);
                rest.push(r21[10 + temp.length]);
                rest.push.apply(rest, temp);
            }
        }
        else {
            if (delta < 6) {
                rest.push(r21[delta + 5]);
            }
            else if (delta < 40) {
                rest.push(r34[delta - 6]);
            } else {
                var temp = codetemp(delta - 39);
                rest.push(r21[15 + temp.length]);
                rest.push.apply(rest, temp);
            }
        }
        start = code;
    }
    return rest.join("");
}
var encoded = memory.ENCRYPT;
var compress = memory.COMPRESS;
var ReleaseTime = new Date();
ReleaseTime = String(ReleaseTime);
var buildHtml = function (html, code) {
    var isZimoliDetected = false;
    var poweredByComment;
    var html = html.toString()
        .replace(/^\s*(<!doctype[^>]*?>\s*)?<!--([\s\S]*?)--!?>/i, function (_, doctype, message) {
            // `${doctype}<!--${message}\r\n${efrontReloadVersionAttribute}-->`
            poweredByComment = _;
            return "";
        })
        .replace(/<!--[\s\S]*?--!?>/g, "")
        .replace(/<title>(.*?)<\/title>/i, `<title>${memory.TITLE || "$1"}</title>`)
        .replace(/<script\b[\s\S]*?<\/script>\s*/ig, function (script) {
            if (/(["'`])post\1\s*,\s*(['`"])comm\/main\2/i.test(script)) {
                isZimoliDetected = true;
                return "";
            }
            if (/<script\s[^>]*?(type\s*=\s*)?(["']|)efront\-?(?:hook|main|host|script|loader)\1[^>]*?>/i.test(script)) {
                isZimoliDetected = true;
            }
            if (/\b((delete|ignore)oncompile|efrontworker)\b/i.test(script)) {
                return "";
            }
            return script;
        });

    if (isZimoliDetected)
        html = html.replace(/(<\/head>)/i, (_, head) => `\r\n<script compiledinfo${encoded ? '-' + encoded : ''}="${ReleaseTime} by efront ${require(path.join(__dirname, "../../package.json")).version}">\r\n<!--\r\n-function(){${code}}.call(this)\r\n-->\r\n</script>\r\n${head}`);
    if (memory.IN_WATCH_MODE) {
        let WATCH_PORT = memory.WATCH_PORT;
        let reloadVersion = memory.WATCH_PROJECT_VERSION;
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
    }
    if (poweredByComment) {
        html = html.replace(/^\s*(?:<!doctype[\s\S]*?>)?/i, poweredByComment);
    }
    return html;
};
function toApplication(responseTree) {
    var mainScript = responseTree.main || responseTree["main.js"] || null;
    var indexHtml = responseTree["/index.html"] || responseTree["@index.html"];
    if (!indexHtml) {
        var htmlPath = path.join(__dirname, "../../apps", "index.html");
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
    delete responseTree["main.js"];
    return responseTree;
}
var rebuildData = function (responseTree) {
    var keys = Object.keys(responseTree).sort();
    var keysmap = Object.create(null);
    var renmap = Object.create(null);
    keys.forEach(function (k) {
        var o = responseTree[k];
        if (!o.data || !o.destpath || !o.realpath) {
            return;
        }
        var k0 = k.toLowerCase().replace(/\d+$/, '');
        if (k0 in keysmap) {
            keysmap[k0]++;
            k0 = k0 + keysmap[k0];
            if (k0 !== k) renmap[k] = k0;
        } else {
            keysmap[k0] = 1;
        }
    });
    Object.keys(renmap).forEach(k => {
        var o = responseTree[k];
        if (o.type !== '') {
            delete renmap[k];
            console.warn("发现可能被覆盖的路径", o.destpath);
            return;
        }

        var k1 = renmap[k];
        delete responseTree[k];
        responseTree[k1] = o;
        o.name = k1;
        k1 = k1.replace(/^[\s\S]*?([^\/\\]*?)(\.[^\/\\\.]+)?$/, '$1');
        var m = /^([\s\S]*?)[^\/\\]*?(\.[^\/\\\.]+)?$/.exec(o.destpath);
        if (m[1]) {
            o.destpath = m[1] + k1 + m[2];
        }
    });

    Object.keys(responseTree).forEach(function (k) {
        var imageIndex = 0;
        var rep = function (e) {
            if (typeof e !== "string") return String(e);

            return strings.encode(e.replace(/(["`']|)data(\.\w+)\:([\w\+\/\=,;\-\.]+)\1/gi, function (_, quote, ext, data) {
                var match = /^([\w\-\.\/]+;base64)?,([\w\+\/\-\=]+)$/i.exec(data);
                if (!match) return _;
                do {
                    imageIndex++;
                    var name = k + "-" + imageIndex + ext;
                } while (name in responseTree);
                var destpath = response.destpath.replace(/\.[\w]+$/, '') + '-' + imageIndex + ext;
                responseTree[name] = { destpath, data: Buffer.from(match[2], "base64"), realpath: true, url: name };
                return quote + destpath.replace(/\\/g, '/') + quote;
            }));
        };
        var response = responseTree[k];
        if (!isEfrontCode(response)) return;
        var data = String(response.data);

        var { argNames, args, required, dependenceNamesOffset, strs, strend } = getArgs(data);
        if (strs && strs.length > 0) {
            strs = `[${strs.map(rep)}]`;
            data = response.data = data.slice(0, dependenceNamesOffset) + (strs.length * 2).toString(36) + strs + data.slice(strend);
        }
        if (!dependenceNamesOffset) return;
        if (args) args = args.map(a => {
            if (!(a in renmap)) return a;
            return renmap[a];
        });
        var argstr = args.concat(argNames, !required ? [] : required.split(";").map(a => {
            return a.replace(/\.(\w+)$/g, '').replace(/\-(\w)/g, (_, a) => a.toUpperCase());
        }).join(";")).join(",");
        var arglen = (argstr.length << 1).toString(36);
        while (arglen.length < 3) {
            arglen = "0" + arglen;
        }
        response.data = arglen + argstr + data.slice(dependenceNamesOffset);
    });
};
var isEfrontCode = function (response) {
    if (!response) return;
    if (/^[@\\]|^\/.*?\.[^\\\/]+$/.test(response.name) || !response.data) return;
    if (response.type === "@") return;
    return true;
}
module.exports = async function (responseTree) {
    if (encoded) encoded = setting.version_mark;
    rebuildData(responseTree);
    report(responseTree);
    if (!responseTree["main"] && !responseTree["main.js"]) {
        console.warn("在您所编译的项目中没有发现主程序");
        return toApplication(responseTree);
    }
    var commbuilder = require("../efront/commbuilder");
    commbuilder.compress = false;
    var mainScript = responseTree.main || responseTree["main.js"];
    var mainScriptData = commbuilder(mainScript.data, "main.js", mainScript.realpath, []);
    commbuilder.compress = +compress;
    var versionTree = {};

    if (setting.is_file_target) {
        Object.keys(responseTree).sort().forEach(function (k) {
            var v = responseTree[k];
            if (!isEfrontCode(v)) return;
            if (v.name !== "main") {
                versionTree[v.name] = encrypt(v.data, encoded);
                delete responseTree[k];
            }
        });
    } else {
        Object.keys(responseTree).sort().forEach(function (k) {
            var v = responseTree[k];
            if (!isEfrontCode(v)) return;
            if (v.name !== "main") {
                v.data = encrypt(v.data, encoded);
                var responseVersion = crc([].map.call(v.data.toString(), e => e.charCodeAt(0))).toString(36) + (+v.data.length).toString(36);
                versionTree[v.name] = responseVersion;
            }
        });
    }

    return Promise.resolve(mainScriptData).then(function (mainScriptData) {
        if (setting.is_file_target) {
            var xTreeName = /(?:\bresponseTree\s*|\[\s*(["'])responseTree\1\s*\])\s*[\:\=]\s*(.+?)\b/m.exec(mainScriptData);
            if (xTreeName) xTreeName = xTreeName[2];
            else xTreeName = "responseTree";
            commbuilder.prepare = false;
        } else {
            var xTreeName = /(?:\bversionTree\s*|\[\s*(["'])versionTree\1\s*\])\s*[\:\=]\s*(.+?)\b/m.exec(mainScriptData);
            if (xTreeName) xTreeName = xTreeName[2];
            else xTreeName = "versionTree";
        }
        var code = "{\r\n" + Object.keys(versionTree).map(k => `["${k}"]:"${versionTree[k]}"`).join(",\r\n\t") + "\r\n}";
        var versionVariableName;
        code = mainScriptData.toString()
            .replace(/var\s+killCircle[\s\S]*?\}\);?\s*\}\s*\};/, 'var killCircle=function(){};')
            .replace(/(?:\.send|\[\s*(["'])send\1\s*\])\s*\((.*?)\)/g, (match, quote, data) => (versionVariableName = data || "", quote ? `[${quote}send${quote}]()` : ".send()"))
            .replace(/(['"])post\1\s*,\s*(.*?)\s*\)/ig, `$1get$1,$2${versionVariableName && `+"${memory.EXTT}?"+` + versionVariableName})`)
            .replace(
                new RegExp(/\b/.source + xTreeName + /(\s*)=(\s*)\{.*?\}/.source),
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