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
var toComponent = require("./toComponent");
var scanner2 = require("../compile/scanner2");
var patchDependence = require("./getDependence");
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
var ReleaseTime = new Date();
ReleaseTime = String(ReleaseTime);
var buildHtml = function (html, code, outsideMain, responseTree) {
    var isZimoliDetected = false;
    var poweredByComment;
    html = html.toString();
    cssDataMap = Object.create(null);

    if (!outsideMain && setting.is_file_target) html = html.replace(/<link(\s+[\s\S]*?)?\/?>/g, function (link, content) {
        var scanned = scanner2(link, 'html');
        var attrs = Object.create(null);
        var attrValues = Object.create(null);
        for (var a of scanned) {
            if (a.type === scanned.STAMP && a.text === '=') {
                var p = a.prev, n = a.next;
                if (!p || !n) continue;
                attrs[p.text] = strings.decode(n.text);
                attrValues[p.text] = n;
            }
        }
        var k = findTreeKey(responseTree, attrs.href);
        var data = k && responseTree[k].data;
        if (data && attrs.rel) switch (attrs.rel.toLowerCase()) {
            case "shortcut icon":
                var type = attrs.type;
                if (!type) type = {
                    ".ico": "image/x-icon",
                    ".png": "image/png",
                    ".jpg": "image/jpeg",
                    ".jpe": "image/jpeg",
                    ".jpeg": "image/jpeg",
                    ".gif": "image/gif",
                    ".svg": "image/svg+xml"
                }[path.extname(attrs.href).toLowerCase()];
                if (!type) break;
                data = `data:${attrs.type || ''};base64,` + Buffer.from(data).toString("base64");
                if (data.length > 8192) break;
                attrValues.href.text = strings.encode(data);
                delete responseTree[k];
                return scanned.toString();
            case "stylesheet":
                data = importCss(attrs.href, responseTree);
                if (data === null) break;
                if (!memory.KEEPSPACE) data = data.replace(/[\;\}\{]\s+/g, '');
                return `<style${attrs.type ? ` type=${strings.encode(attrs.type)}` : ""}>${data}</style>`;
        }
        return link;
    });
    for (var k in cssDataMap) delete responseTree[k];
    cssDataMap = null;
    var html = html
        .replace(/^\s*(<!doctype[^>]*?>\s*)?\<\!\-\-([\s\S]*?)\-\-\!?>\s*/i, function (_, doctype, message) {
            // `${doctype}<!--${message}\r\n${efrontReloadVersionAttribute}-->`
            poweredByComment = _;
            return "";
        })
        .replace(/<\!\-\-([\s\S]*?)\-\-\!?>\s*/g, (_, a) => {
            if (/^\s*\[[\s\S]*\]\s*$/.test(a)) return _;
            return '';
        })
        .replace(/<title>(.*?)<\/title>/i, `<title>${memory.TITLE || "$1"}</title>`)
        .replace(/<script\b[\s\S]*?<\/script>(\s*)/ig, function (script, s) {
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
            a: if (!outsideMain && setting.is_file_target) {
                var match = /\ssrc=(["']|)(.*?)\1/.exec(script);
                if (!match) break a;
                var [, quote, src] = match;
                var k = findTreeKey(responseTree, src);
                if (!k) break a;
                var scriptData = responseTree[k].data;
                if (!scriptData) break a;
                delete responseTree[k];
                if (memory.COMPRESS) {
                    scriptData = scanner2(scriptData.toString()).press(memory.KEEPSPACE).toString();
                }
                return `<script>\r\n//<![CDATA[\r\n${scriptData}\r\n//]]>\r\n</script>${s}`;
            }
            return script;
        });

    if (isZimoliDetected)
        html = html.replace(/(<\/head>)/i, (_, head) => `\r\n<script compiledinfo="${ReleaseTime} by efront ${require(path.join(__dirname, "../../package.json")).version}"${outsideMain ? ` src="${outsideMain}"` : ''}>${outsideMain ? "" : `\r\n<!--\r\n${code}\r\n-->\r\n`}</script>\r\n${head}`);
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
var mixin = require("../efront/mixin")
var indexnames = memory.webindex;
var getTreeIndex = function (tree) {
    var names = mixin(["/", "@"], indexnames).map(a => a.join(''));
    for (var n of names) {
        if (tree[n]) return tree[n];
    }
};
var findTreeKey = function (tree, k) {
    k = path.normalize(k).replace(/\\/g, '/');
    if (k in tree) return k;
    var k1 = "/" + k;
    if (k1 in tree) return k1;
    var k2 = '@' + k;
    if (k2 in tree) return k2;
};

var cssDataMap = null;
var importCss = function (url, responseTree) {
    var k = findTreeKey(cssDataMap, url);
    if (k) return cssDataMap[k];
    k = findTreeKey(responseTree, url);
    if (!k) return null;
    if (k in cssDataMap) return cssDataMap[k];
    cssDataMap[k] = null;
    var data = responseTree[k].data;
    if (!data) return null;
    try {
        cssDataMap[k] = String(data).replace(/@?import\s+(?:url\(([\s\S]*?)\)|([\s\S]*?))[;\r\n]/ig, function (_, a, b) {
            a = strings.decode(a || b);
            a = url.replace(/[^\/\\]+$/, '') + a;
            var d = importCss(a, responseTree);
            if (d === null) throw new Error(a);
            return d + "\r\n";
        });
    }
    catch (e) {
        return null;
    }
    return cssDataMap[k];
}
function toApplication(responseTree, mainScript) {
    var htmls = Object.keys(responseTree).filter(key => {
        if (!/\.(jsp|php|html|asp)$/i.test(key) || !responseTree[key].data) return false;
        return /<!doctype\s/i.test(String(responseTree[key].data).replace(/^(<!--[\s\S]*?-->)*/, ''));
    }).map(key => responseTree[key]);
    if (htmls.length) indexHtml = true;
    else var indexHtml = getTreeIndex(responseTree);
    if (!indexHtml) {
        var htmlPath = path.join(__dirname, "../../apps", "_index.html");
        indexHtml = {
            time: 0,
            needed: true,
            fullpath: htmlPath,
            data: fs.readFileSync(htmlPath),
            realpath: htmlPath,
            version: fs.statSync(htmlPath).mtime,
            destpath: path.join(indexnames[0]),
        };
        htmls.push(indexHtml);
        responseTree["/" + indexnames[0]] = indexHtml;
    }
    var { EXTRACT = htmls.length > 1 } = memory;
    if (mainScript) {
        var outsideMain = EXTRACT ? "main-" + mainScript.queryfix + ".js" : "";
        htmls.forEach(function (response) {
            response.data = buildHtml(response.data, mainScript.data, outsideMain, responseTree);
        });
        if (outsideMain) {
            mainScript.destpath = outsideMain;
            responseTree[outsideMain] = mainScript;
        }
    }
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
                responseTree[name] = { destpath, type: '@', data: Buffer.from(match[2], "base64"), realpath: true, url: name };
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
        var requiredMap = response.dependence.requiredMap;
        if (required) required = required.split(";").map(a => {
            a = requiredMap[a] || a;
            if (a in renmap) a = renmap[a];
            return a;
        }).join(";");
        var argstr = args.concat(argNames, !required ? [] : required).join(",");
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
    var mainScript = responseTree.main || responseTree["main.js"];
    var realmain = path.join(__dirname, "../zimoli/main.js");
    nomain: if (!mainScript || mainScript.realpath !== realmain) {
        for (var k in responseTree) {
            if (responseTree[k].realpath === realmain) {
                mainScript = responseTree[k];
                delete responseTree[k];
                break nomain;
            }
        }
        reportMissing(responseTree);
        report(responseTree);
        console.warn("<yellow2>在您所编译的项目中没有发现主程序</yellow2>");
        return responseTree;
    }
    var commbuilder = require("../efront/commbuilder");
    var mainScriptData = mainScript.data;
    var versionTree = {};
    var array_map = responseTree["[]map"] || responseTree["[]map.js"];
    if (setting.is_file_target) {
        commbuilder.ignoreUse_reg = /#decrypt_?\.js/;
        Object.keys(responseTree).sort().forEach(function (k) {
            var v = responseTree[k];
            if (!isEfrontCode(v)) return;
            if (v !== mainScript) {
                versionTree[v.name] = String(v.data);
            }
            delete responseTree[k];
        });
    } else {
        Object.keys(responseTree).sort().forEach(function (k) {
            var v = responseTree[k];
            if (!isEfrontCode(v)) return;
            if (v !== mainScript) {
                v.data = encrypt(v.data, encoded);
                var responseVersion = crc([].map.call(v.data.toString(), e => e.charCodeAt(0))).toString(36) + (+v.data.length).toString(36);
                versionTree[v.name] = responseVersion;
            }
        });
    }
    commbuilder.loadonly = true;
    var mainScriptData = await commbuilder(mainScript.data, "main.js", mainScript.realpath, []);
    if (!memory.ENCRYPT) {
        mainScriptData = scanner2(mainScriptData);
        mainScriptData.helpcode = true;
        mainScriptData = mainScriptData.toString()
    }
    commbuilder.loadonly = false;
    var mainVersion = '';
    if (setting.is_file_target) {
        var xTreeName = /(?:\bresponseTree\s*|\[\s*(["'])responseTree\1\s*\])\s*[\:\=]\s*(.+?)\b/m.exec(mainScriptData);
        if (xTreeName) xTreeName = xTreeName[2];
        else xTreeName = "responseTree";
        commbuilder.prepare = false;
    } else {
        var xTreeName = /(?:\bversionTree\s*|\[\s*(["'])versionTree\1\s*\])\s*[\:\=]\s*(.+?)\b/m.exec(mainScriptData);
        if (xTreeName) xTreeName = xTreeName[2];
        else xTreeName = "versionTree";
        mainVersion = true;
    }
    var missing = Object.keys(responseTree).filter(k => !responseTree[k].data);
    var code = "{\r\n" + Object.keys(versionTree).map(k => `["${k}"]:${strings.encode(versionTree[k])}`).join(",\r\n\t") + "\r\n}";
    var versionVariableName;
    var prebuilds = Object.create(null);
    prebuilds.state = true;
    prebuilds.prepare = true;
    prebuilds.module = true;
    prebuilds.exports = true;
    mainScriptData = mainScriptData.toString()
        .replace(/var\s+killCircle[\s\S]*?\}\);?\s*\}\s*\};/, 'var killCircle=function(){};')
        .replace(/modules\.([^\s]+)\s*\=/g, function (_, name) {
            prebuilds[name] = true;
            return _;
        })
        .replace(/(var\s+modules\s*=\s*\{\s*)([\s\S]*?)(\s*\})/, function (_, prefix, modules, aftfix) {
            var parsed = parseKV(modules, ',', ":");
            Object.keys(parsed).forEach(k => prebuilds[k] = true);
            missing = missing.filter(k => !prebuilds[responseTree[k].url] && !/^[\.\[\]]/.test(missing));
            return `${prefix}${missing.map(k => responseTree[k].warn ? `${k}:window["${k}"]` : k).join(",\r\n")}\r\n${modules}${aftfix}`;
        })
        .replace(/(?:\.send|\[\s*(["'])send\1\s*\])\s*\((.*?)\)/g, (match, quote, data) => (versionVariableName = data || "", quote ? `[${quote}send${quote}]()` : ".send()"))
        .replace(/(['"])post\1\s*,\s*(.*?)\s*\)/ig, `$1get$1,$2${versionVariableName && `+"${memory.EXTT}?"+` + versionVariableName})`)
        .replace(
            new RegExp(/\b/.source + xTreeName + /(\s*)=(\s*)\{.*?\}/.source),
            function (m, s1, s2) {
                return xTreeName + `${s1}=${s2}${code}`;
            }
        );
    if (memory.EXTRACT || !setting.is_file_target) mainScript.queryfix = crc(Buffer.from(mainScriptData)).toString(36).replace(/^\-/, "");
    if (!setting.is_file_target) mainScriptData = mainScriptData
        .replace(/(['"`]|)efrontsign\1\s*\:\s*(['"`])\2/, `$1efrontsign$1:$2?${mainScript.queryfix}$2`)
        .replace(/decrypt(\.sign|\[(['"`])sign\1\])/, `parseInt("${encoded}",36)%128`);
    commbuilder.compress = false;
    mainScriptData = await commbuilder(mainScriptData, mainScript.url, mainScript.realpath, []);
    memory.EXPORT_AS = '';
    memory.EXPORT_TO = "this";
    var maindata = { url: mainScript.url, destpath: mainScript.destpath, type: '', time: mainScript.time, realpath: mainScript.realpath, data: mainScriptData };
    patchDependence(maindata);
    var newTree = Object.create(null);
    missing.forEach(k => newTree[k] = {});
    Object.assign(newTree, { main: maindata }, array_map ? { "[]map": {} } : {});
    reportMissing(responseTree);
    report(responseTree);
    mainScript.data = toComponent(newTree, true).main.data;
    return toApplication(responseTree, mainScript);
};