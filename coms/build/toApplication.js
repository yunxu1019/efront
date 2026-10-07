var crc = require("../basic/crc");
var path = require("path");
var fs = require("fs");
var report = require("./report");
var setting = require("./setting");
var strings = require("../basic/strings");
var r21 = "'()*+,-./0123456789:;"
var r29 = "?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[";
var r34 = "]^_`abcdefghijklmnopqrstuvwxyz{|}~";
var memory = require("../efront/memery");
var toComponent = require("./toComponent");
var scanner2 = require("../compile/scanner2");
var { createString } = require('../compile/common');
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
    var isZimoliDetected = html.isZimoliDetected;
    var poweredByComment = html.poweredByComment;
    var iswebindex = html.iswebindex;
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
                attrs[p.text] = strings.decode(createString([n]));
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
                var href = attrValues.href;
                if (href.length) href.splice(0, href.length);
                href.text = strings.encode(data);
                href.type = scanned.QUOTED;
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
    if (!iswebindex) [html, isZimoliDetected, poweredByComment] = checkIndex(html);
    let efrontReloadVersionAttribute = "efront-reload-version";
    html = html
        .replace(/<title>(.*?)<\/title>/i, `<title>${memory.TITLE || "$1"}</title>`)
        .replace(/<script\b[\s\S]*?<\/script>(\s*)/ig, function (script, s) {
            if (script.slice(8, efrontReloadVersionAttribute.length + 8) === efrontReloadVersionAttribute) return s;
            if (/<script\scompiledinfo="[^"]+ with efront/.test(script)) return isZimoliDetected = true, s;
            a: if (!outsideMain && setting.is_file_target) {
                var match = /\ssrc=(["']|)(.*?)\1/.exec(script);
                if (!match) break a;
                var [, quote, src] = match;
                var k = findTreeKey(responseTree, src);
                if (!k) break a;
                var scriptData = responseTree[k].data;
                if (!scriptData) break a;
                if (!responseTree[k].isrest) delete responseTree[k];
                if (memory.COMPRESS) {
                    scriptData = scanner2(scriptData.toString()).press(memory.KEEPSPACE).toString();
                }
                return `<script>\r\n//<![CDATA[\r\n${scriptData}\r\n//]]>\r\n</script>${s}`;
            }
            return script;
        });

    if (isZimoliDetected)
        html = html.replace(/(<\/head>)/i, (_, head) => `\r\n<script compiledinfo="${ReleaseTime} with efront ${require("../../package.json").version}"${outsideMain ? ` src="${outsideMain}"` : ''}>${outsideMain ? "" : `\r\n<!--\r\n${code}\r\n-->\r\n`}</script>\r\n${head}`);
    if (memory.IN_WATCH_MODE) {
        let WATCH_PORT = memory.WATCH_PORT;
        let reloadVersion = memory.WATCH_PROJECT_VERSION;
        html = html.replace(/(<\/head>)/i, (_, head) => `\r\n<script ${efrontReloadVersionAttribute}=${reloadVersion}>
        -function(){
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
                    console.info("${i18n`当前版本`}:${reloadVersion},${i18n`目标版本`}:" + targetVersion + "${i18n`正在重新加载`}..");
                    if( !version || +version[1] !== ${reloadVersion}) location.reload() | console.warn("reload..", new Date);
                    else setTimeout(reloader, 200);
                }, "get");
            };
            var targetVersion = ${reloadVersion};
            var checkUpdate = function(xhr){
                targetVersion = xhr.responseText||xhr.response;
                reloader();
            };
            load("http://localhost${WATCH_PORT ? ":" + WATCH_PORT : ""}/reload/${reloadVersion}", checkUpdate, "efront");
        }();
        </script>\r\n${head}`);
    }
    if (poweredByComment) {
        html = html.replace(/^\s*(?:<!doctype[\s\S]*?>)?/i, poweredByComment);
    }
    return html;
};

var findTreeKey = function (tree, k) {
    if (!k) return k;
    k = path.normalize(k).replace(/\\/g, '/');
    if (k in tree) return k;
    var k1 = "/" + k;
    if (k1 in tree) return k1;
    var k2 = '*' + k;
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
    var htmls = Object.keys(responseTree).map(key => responseTree[key]).filter(r => r.isindex);
    if (htmls.length) indexHtml = true;
    else var indexHtml = getWebIndex(responseTree);
    if (!indexHtml) {
        var indexnames = memory.webindex;
        var htmlPath = path.join(__dirname, "../../apps", "_index.html");
        indexHtml = new BuildInfo(...{
            time: 0,
            fullpath: htmlPath,
            data: fs.readFileSync(htmlPath),
            realpath: htmlPath,
            version: fs.statSync(htmlPath).mtime,
            destpath: path.join(indexnames[0]),
        });
        htmls.push(indexHtml);
        responseTree["/" + indexnames[0]] = indexHtml;
    }
    var { EXTRACT = htmls.length > 1 } = memory;
    if (mainScript) {
        var outsideMain = EXTRACT ? "main-" + mainScript.queryfix + ".js" : "";
        htmls.forEach(function (response) {
            delete response.writed;
            response.data = buildHtml(response.data, mainScript.data, outsideMain, responseTree);
        });
        if (outsideMain) {
            mainScript.destpath = outsideMain;
            responseTree[outsideMain] = mainScript;
        }
    }
    return responseTree;
}
var imageIndex = 0;
var imagerep = function (e, k, destpath, responseTree) {
    if (typeof e !== "string") return String(e);
    return strings.recode(e.replace(/(["`']|)data(\.\w+)\:([\w\+\/\=,;\-\.]+)\1/gi, function (_, quote, ext, data) {
        var match = /^([\w\-\.\/]+;base64)?,([\w\+\/\-\=]+)$/i.exec(data);
        if (!match) return _;
        do {
            imageIndex++;
            var name = k + "-" + imageIndex + ext;
        } while (name in responseTree);
        var dp = destpath.replace(/\.[\w]+$/, '') + '-' + imageIndex + ext;
        responseTree[name] = { destpath: dp, type: '*', data: Buffer.from(match[2], "base64"), realpath: true, url: name };
        return quote + dp.replace(/\\/g, '/') + quote;
    }));
};
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
            console.warn(i18n`发现可能被覆盖的路径`, o.destpath);
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
    imageIndex = 0;
    var quoted = compile$breakcode2.quoted;
    Object.keys(quoted).forEach(function (k) {
        if (/^\\T/.test(k)) {
            quoted[k] = imagerep(quoted[k], "image", "image", responseTree);
        }
    });
    Object.keys(responseTree).forEach(function (k) {
        var response = responseTree[k];
        if (response.writed) return;
        if (markIndex(k, response)) return;
        if (!isEfrontCode(response)) return;
        imageIndex = 0;
        var { imported, required, requiredMap, destpath, strkeeps } = response;
        if (strkeeps) strkeeps.forEach(o => {
            o.text = imagerep(o.text, k, destpath, responseTree);
        });
        response.imageid = imageIndex;
        if (imported) response.imported = imported.map(a => {
            if (!(a in renmap)) return a;
            return renmap[a];
        });
        if (required) response.required = required.map(a => {
            a = requiredMap[a] || a;
            if (a in renmap) a = renmap[a];
            return a;
        });
    });
};
var markIndex = function (key, r) {
    if (!/\.(jsp|php|html?|asp)$/i.test(key) || !r.data) return false;
    var data = String(r.data).replace(/^(\s*<!--[\s\S]*?--!?>)*/g, '');
    if (/^\s*\<\!doctype\s/i.test(data)) {
        r.data = data;
        r.isindex = true;
        return true;
    }
    return false;
};
var isEfrontCode = function (response) {
    if (!response) return;
    if (!response.data) return;
    var type = response.type;
    if (type !== "" && type !== '/') return;
    if (response.isindex) return;
    return true;
};
var commbuilder = require("../efront/commbuilder");

var replaceTree = function (data, xTreeName, code) {
    return data.replace(
        new RegExp(/\b/.source + xTreeName + /(\s*)=(\s*)\{.*?\}/.source),
        function (m, s1, s2) {
            return xTreeName + `${s1}=${s2}${code}`;
        }
    )
}

var enstring = a => typeof a === 'string' ? strings.encode(a, "'") : String(a);
var crstring = a => typeof a === 'string' ? strings.encode(a, '"') : String(a);
var cacheData = function (response) {
    var { imported, prequoted, required, params, name, async, strkeys, yield: yield1 } = response;
    var mod = `${async ? 'async ' : ''}function${yield1 ? '*' : ''}/*${name}*/(${params}){\r\n${prequoted}${String(response.data).replace(/(--!?)>/g, '$1 >')}\r\n}`;
    if (required) required = `[${required.map(crstring)}]`;
    else required = '';
    if (imported.indexOf('arriswise') < 0 && params.length > 0) params = ', []';
    else params = '';
    if (strkeys) var strs = `, [${strkeys.join(',')}]`;
    else strs = ", ";
    if (imported) imported = `[${imported.map(crstring)}]`;
    response = `[${mod}, ${imported}, ${required}${strs}${params}]`;
    return response;
};

var patchData = function (mainScriptData, mainScript, responseTree) {
    var up = memory.EFRONTUP;
    var limit = memory.EFRONTSUM && 0;
    var versionTree = {};
    var cached = [];
    if (setting.is_file_target) {
        up = Infinity;
        limit = Infinity;
    }
    var totalup = 0;
    var keeys = Object.keys(responseTree).filter(k => {
        var v = responseTree[k];
        if (!isEfrontCode(v)) return false;
        if (v === mainScript) return false;
        return true;
    });
    keeys.sort((a, b) => {
        return responseTree[a].data.length - responseTree[b].data.length;
    });
    var rests = keeys.filter((k) => {
        var v = responseTree[k];
        var data = v.data;
        if (up > 0 && data.length > up) return true;
        totalup += data.length;
        if (totalup > limit) return true;
        cached.push(k);
        return v.isrest;
    }).sort();
    if (cached.length) {
        var xTreeName = /(?:\bresponseTree\s*|\[\s*(["'])responseTree\1\s*\])\s*[\:\=]\s*(.+?)\b/m.exec(mainScriptData);
        if (xTreeName) xTreeName = xTreeName[2];
        else xTreeName = "responseTree";
        var code = "{\r\n\t" + cached.sort().map(k => {
            var v = responseTree[k];
            if (!v.isrest) delete responseTree[k];
            return `["${v.name}"]:${cacheData(v)}`;
        }).join(",\r\n\t") + "\r\n}";
        mainScriptData = replaceTree(mainScriptData, xTreeName, code);
    }
    rests.forEach(function (k) {
        var v = responseTree[k];
        if (!v.writed) {
            var data = commbuilder.live(v.data);
            v.data = encrypt(data, encoded);
        }
        var responseVersion = crc.string(String(v.data)).toString(36) + (+v.data.length).toString(36);
        versionTree[v.name] = responseVersion;
    });
    var versioned = Object.keys(versionTree);
    if (versioned.length) {
        var xTreeName = /(?:\bversionTree\s*|\[\s*(["'])versionTree\1\s*\])\s*[\:\=]\s*(.+?)\b/m.exec(mainScriptData);
        if (xTreeName) xTreeName = xTreeName[2];
        else xTreeName = "versionTree";
        var code = "{\r\n" + Object.keys(versionTree).map(k => `["${k}"]:${enstring(versionTree[k])}`).join(",\r\n\t") + "\r\n}";
        mainScriptData = replaceTree(mainScriptData, xTreeName, code)
    }
    else {
        commbuilder.ignoreUse_reg = /#decrypt_?\.js/;
    }
    return mainScriptData;
};
module.exports = async function (responseTree) {
    responseTree = Object.assign(Object.create(null), responseTree);
    if (encoded) encoded = setting.version_mark;
    var mainScript = responseTree.main || responseTree["main.js"];
    if (mainScript) delete responseTree[mainScript.url];
    rebuildData(responseTree);
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
        console.warn(`<yellow2>${i18n`在您所编译的项目中没有发现主程序`}</yellow2>`);
        return responseTree;
    }
    else {
        delete responseTree["main"];
        delete responseTree["main.js"];
    }

    var mainScriptData = mainScript.data;
    var array_map = responseTree["[]map"] || responseTree["[]map.js"];

    commbuilder.loadonly = true;
    var maincode = await commbuilder.call(BuildInfo.commap, mainScriptData, 'main', mainScript.realpath, []);
    if (!memory.ENCRYPT) {
        maincode.helpcode = true;
    }
    mainScriptData = maincode.toString();
    commbuilder.loadonly = false;
    var missing = Object.keys(responseTree).filter(k => !responseTree[k].data);
    var versionVariableName;
    var prebuilds = Object.create(null);
    prebuilds.state = true;
    prebuilds.upwith = true;
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
            missing = missing.filter(k => !responseTree[k].type && !prebuilds[responseTree[k].url] && !/^[\.\[\]]/.test(k));
            if (encoded && responseTree["\\decrypt"]) {
                if (missing.indexOf("\\decrypt") < 0) missing.push("\\decrypt");
                delete responseTree["\\decrypt"].warn;
            }
            return `${prefix}${missing.map(k => responseTree[k].warn ? `"${k}":window["${k}"]` : k).join(",\r\n")}${missing.length ? ',' : ''}\r\n${modules}${aftfix}`;
        })
        .replace(/(?:\.send|\[\s*(["'])send\1\s*\])\s*\((.*?)\)/g, (match, quote, data) => (versionVariableName = data || "", quote ? `[${quote}send${quote}]()` : ".send()"))
        .replace(/(['"])PURGE\1\s*,\s*(.*?)\s*\)/ig, `$1get$1,$2${versionVariableName && `+"${memory.EXTT}?"+` + versionVariableName})`);
    if (memory.EXTRACT || !setting.is_file_target) mainScript.queryfix = crc(Buffer.from(mainScriptData)).toString(36).replace(/^\-/, "");
    if (!setting.is_file_target) mainScriptData = mainScriptData
        .replace(/(['"`]|)efrontsign\1\s*\:\s*(['"`])\2/, `$1efrontsign$1:$2?${mainScript.queryfix}$2`)
        .replace(/decrypt(\.sign|\[(['"`])sign\1\])/, encoded ? `parseInt("${encoded}",36)%128` : '');
    mainScriptData = patchData(mainScriptData, mainScript, responseTree);
    commbuilder.prepare = false;
    commbuilder.requote = false;
    mainScriptData = await commbuilder.call(BuildInfo.commap, mainScriptData, mainScript.url, mainScript.realpath, []);
    memory.EXPORT_AS = '';
    memory.EXPORT_TO = "this";
    var maindata = new BuildInfo(...{
        url: mainScript.url,
        destpath: mainScript.destpath,
        type: '',
        time: mainScript.time,
        realpath: mainScript.realpath,
        data: mainScriptData,
    });
    var newTree = Object.create(null);
    missing.forEach(k => newTree[k] = {});
    Object.assign(newTree, { main: maindata }, array_map ? { "[]map": {} } : {});
    reportMissing(responseTree);
    report(responseTree);
    mainScript.data = toComponent(newTree, true).main.data;
    return toApplication(responseTree, mainScript);
};