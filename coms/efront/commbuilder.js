"use strict";
var scanner2 = require("../compile/scanner2");
var breakcode = require("../compile/breakcode");
var strings = require("../basic/strings");
var less;
var isDevelop = require("./isDevelop");
var inCom = require("./inCom");
var inPage = require("./inPage");
var fs = require("fs");
var path = require("path");
var memery = require("./memery");

var bindLoadings = function (reg, data, rootfile, replacer = a => a, deep) {
    if (!data) return data;
    var regs = [].concat(reg);
    var regindex = 0;
    var run = function (data, fullpath, increase = 0) {
        var reg = regs[regindex];
        data = String(data);
        var loadurls = [];
        var skipreg = /^\s*(['"`])use\s+(strict|asm|strip)\1\s*;?\s*$/;
        data.replace(reg, function (match, quote, relative) {
            if (skipreg.test(match)) return match;
            loadurls.push(relative);
        });
        var trimurl = url => {
            var u = path.join(path.dirname(fullpath), url);
            if (!fs.existsSync(u)) return;
            return path.relative(path.dirname(rootfile), u).replace(/\\/g, '/');
        };
        if (fullpath !== rootfile) {
            data = data.replace(/\b(url|require|init)\(\s*(['"`]|)([^'"`;\:,\u2029\u2028\r\n]+)\2\s*\)/i, function (_, type, quote, url) {
                if (/^(https?|ftp|data):|^[\/\\]/i.test(url)) return _;
                if (!quote && deep !== 0) return _;
                var url = trimurl(url);
                if (!url) return _;
                return `${type}(${quote}${url}${quote})`;
            }).replace(/\b(src|href)\s*=\s*(['"`]|)([^'"`\r\n\u2028\u2029\:;,]+)\2/, function (_, type, quote, url) {
                if (/^(https?|ftp|data):|^[\/\\]/i.test(url)) return _;
                if (!quote && deep !== 0) return _;
                url = trimurl(url);
                if (!url) return _;
                return `${type}=${quote}${url}${quote}`;
            });
        }
        if (!loadurls.length) {
            if (regindex + 1 >= regs.length || increase === 0) return Promise.resolve(data);
            return regindex++, run(data, fullpath, increase);
        }
        return new Promise(function (ok, oh) {
            var pathmap = {};
            var accessready = function () {
                var loaded = loadurls.filter(a => pathmap[a]).map(function (key) {
                    var realpath = pathmap[key];
                    if (deep !== false) {
                        return getFileData(realpath).then(a => run(a, realpath));
                    } else {
                        return getFileData(realpath);
                    }
                });
                Promise.all(loaded).then(function (datas) {
                    var dataMap = Object.create(null);
                    datas.forEach((data, cx) => {
                        dataMap[loadurls[cx]] = data;
                    });
                    data = data.replace(reg, function (match, quote, relative) {
                        if (skipreg.test(match)) return match;
                        var data = dataMap[relative];
                        if (data && relative in pathmap) {
                            var result = replacer(data, pathmap[relative], match);
                            if (result !== false && result !== null && result !== undefined) return result;
                        }
                        if (deep !== false) console.warn(`没有处理${match} ${fullpath}`);
                        return match;
                    });
                    if (regindex + 1 >= regs.length || increase === 0) ok(data);
                    else regindex++, run(data, fullpath, increase).then(ok, oh);
                }, oh);
            };
            var loadingcount = loadurls.length;
            loadurls.forEach(relative => {
                var realPath = path.join(path.dirname(fullpath), relative);
                fs.access(realPath, function (error) {
                    loadingcount--;
                    if (!error) {
                        pathmap[relative] = realPath;
                    }
                    if (!loadingcount) accessready();
                });
            });
            if (!loadingcount) accessready();
        })
    };
    return run(data, rootfile, 1);
};

var useInternalReg = /^\s*(['"`])(?:(?:use|#?include)\b)\s*(.*?)\1(\s*;)?\s*$/img;
var replaceIncludes = function (data) {
    return data.replace(useInternalReg, function (m, q, p, c) {
        if (/^\s*(['"`])use\s+strict\1/i.test(m)) return m;
        var realName = path.basename(p).replace(/\..*$/, "") || "main";
        realName = realName.replace(/\-(\w)/g, (_, a) => a.toUpperCase());
        return `var ${realName}=require(${q}${p}${q})${c || ''}`;
    });
};
var loadUseBody = function (source, fullpath, watchurls, commName) {
    var replacer = function (data, realPath) {
        watchurls.push(realPath);
        var realName = path.basename(realPath).replace(/\..*$/, "") || "main";
        realName = realName.replace(/\-(\w)/g, (_, a) => a.toUpperCase());
        if (/\.(?:pem|html?|xml|glsl|txt|log)$/i.test(realPath)) {
            return `var ${realName}=\`${data.toString()}\`;`;
        }
        if (/\.json$/i.test(realPath)) {
            return `var ${realName}=${data};`;
        }
        data = data.toString();
        data = trimNodeEnvHead(data);
        data = data.replace(/^\s*(["`'])use strict\1\s*;?/, '');
        if (!new RegExp(useInternalReg.source, 'ig').test(source)) {
            commName = realName;
        }
        if (!commName) commName = realName;
        if (~loadJsBody(data, 'main.js', '', 'main', '').imported.indexOf('module')) {
            var module_reg = /\bmodule(.exports|\[(['"`])exports\1\])\s*=/g;
            if (module_reg.test(data)) {
                data = data.replace(module_reg, commName ? "var " + commName + " =" : "return ");
                return data;
            }
        }
        return data + `;var ${realName},${commName}=${realName};`;
    };
    return bindLoadings(useInternalReg, source, fullpath, replacer);
};
var getRequiredPaths = function (data) {
    var pathReg = /\b(?:go|popup)\(\s*(['"`])([^\{\}]+?)\1[\s\S]*?\)/g;
    var requiredPaths = {};
    var result = pathReg.exec(data);
    while (result) {
        requiredPaths[result[2].replace(/^[@#!]+/, "")] = true;
        result = pathReg.exec(data);
    }
    return Object.keys(requiredPaths);
};

var convertColor = function (a) {
    return a.replace(/\#([\da-f]{8}|[\da-f]{4}\b)/gi, function (m, a) {
        switch (a.length) {
            case 4:
                return `rgba(${a.slice(0, 3).split("").map(a => parseInt(a + a, 16))},${(parseInt(a[3], 16) / 15).toFixed(4)})`;
            case 8:
                return `rgba(${a.slice(0, 6).replace(/\w{2}/g, a => parseInt(a, 16) + ",")}${(parseInt(a.slice(6), 16) / 255).toFixed(4)})`;
        }
    });
};
var trimNodeEnvHead = function (data) {
    data = String(data || "").replace(/^\s*\#\!/, '//');
    return data;
};
var loadJsBody = function (data, filename, lessdata, commName, className, htmlData) {
    data = trimNodeEnvHead(data);
    data = data.replace(/\bDate\(\s*(['"`])(.*?)\1\s*\)/g, (match, quote, dateString) => `Date(${+new Date(dateString)})`);
    var destpaths = commbuilder.prepare === false ? [] : getRequiredPaths(data);
    if (/x$|ts$|ue$|\.mjs$/i.test(filename) || /^\s*(ex|im)port\s/m.test(data)) data = require("../typescript").transpile(data, { noEmitHelpers: true, jsx: "react", target: 'esnext', module: "commonjs" });
    var code = scanner2(data);
    var {
        vars: declares,
        used: allVariables,
        envs: undeclares,
        async: isAsync,
        return: hasReturn,
        yield: isYield
    } = code;
    var globalsmap = {};
    var templateName;
    if (htmlData) {
        if (undeclares.template) {
            templateName = 'template';
        }
        else if (undeclares[commName]) {
            templateName = commName;
        }
        else if (undeclares.main) {
            templateName = "main";
        }
        else if (undeclares.Main) {
            templateName = "Main";
        }
        else if (undeclares.MAIN) {
            templateName = "MAIN";
        }
        else {
            var commHtmlName = commName[0].toUpperCase() + commName.slice(1);
            if (undeclares[commHtmlName]) templateName = commHtmlName;
        }
    }

    if (commName) {
        //如果声明了main方法或main对象，默认用main作为返回值
        if (declares.main) {
            commName = "main";
        } else if (declares.Main) {
            commName = "Main";
        } else if (declares.MAIN) {
            commName = "MAIN";
        } else if (!declares[commName]) {
            commName = commName[0].toUpperCase() + commName.slice(1);
            if (!declares[commName]) {
                commName = null;
            }
        }
    }
    var hasless = typeof lessdata === "string";
    if (hasless) {
        if (!declares.cless) {
            globalsmap.cless = "cless";
        } else {
            var random_variable;
            do {
                random_variable = "cless_" + Math.random().toString(36);
            } while (declares[random_variable]);
            globalsmap.cless = random_variable;
        }
    }
    var prepareCodeBody = [];
    if (destpaths.length) {
        var stringifiedpaths = destpaths.length === 1 ? JSON.stringify(destpaths[0]) : JSON.stringify(destpaths);
        if (!declares.prepare) {
            globalsmap.prepare = "prepare";
            prepareCodeBody = scanner2(`prepare(${stringifiedpaths});`);
        } else if (!declares.go) {
            globalsmap.go = "go";
            prepareCodeBody = scanner2(`go.prepare(${stringifiedpaths});`);
        } else if (!declares.state) {
            globalsmap.state = "state";
            prepareCodeBody = scanner2(`state.prepare(${stringifiedpaths});`);
        } else {
            console.warn(`将不处理此文件的页面自动预载<gray>${filename}</gray>`);
        }
    }
    scanner2.debug = /back/.test(filename);
    var code_body = code;
    if (code.isExpress()) {
        //如果整个函数只有一个表达式或一个变量，直接反回其本身
        while (code_body[code_body.length - 1].type === code_body.SPACE || code_body[code_body.length - 1].type === code_body.STAMP && /[,;]/.test(code_body[code_body.length - 1].text)) {
            code_body.pop();
        }
        if (hasless) code_body.unshift(
            { type: code_body.EXPRESS, text: 'cless' },
            code.relink(Object.assign(
                code_body.splice(0, code_body.length).concat(
                    { type: code_body.STAMP, text: ',' },
                    {
                        type: code_body.QUOTED,
                        text: JSON.stringify(lessdata),
                    },
                    { type: code_body.STAMP, text: ',' },
                    {
                        type: code_body.QUOTED,
                        text: JSON.stringify(className)
                    }
                ), { type: code_body.SCOPED, entry: "(", leave: ")" }))
        ), code_body.first = code_body[0];
        code_body.splice(
            code_body.indexOf(code_body.first), 0,
            { type: code_body.STRAP, text: "return" },
            { type: code_body.SPACE, text: " " }
        );

    } else {
        if (undeclares.module) {
            commName = `module["exports"]`;
        } else if (undeclares.exports) {
            commName = "exports";
        }
        if (commName) {
            code_body.push(
                { type: code_body.STAMP, text: ";\r\n" },
                { type: code_body.STRAP, text: "return" },
                { type: code_body.SPACE, text: " " }
            )
            if (hasless) {
                code_body.push(
                    { type: code_body.EXPRESS, text: "cless" },
                    code.relink(Object.assign([
                        { type: code_body.EXPRESS, text: commName },
                        { type: code_body.STAMP, text: ',' },
                        { type: code_body.QUOTED, text: JSON.stringify(lessdata) },
                        { type: code_body.STAMP, text: ',' },
                        { type: code_body.QUOTED, text: JSON.stringify(className) },
                    ], {
                        entry: "(",
                        type: code_body.SCOPED,
                        leave: ")"
                    })),
                )
            } else {
                code_body.push({ type: code_body.EXPRESS, text: commName });
            }
        } else {
            if (!/\bmain|\bindex|\.(jsp|asp|php)$/i.test(path.basename(filename))) {
                if (filename.length > 48) {
                    filename = ".." + filename.slice(filename.length - 46);
                }
                if (!hasReturn) console.info(`没有导出变量 文件：<gray>${shortpath(filename)}</gray>\r\n`);
            }
        }
    }
    if (templateName) {
        var template = scanner2(`var ${templateName}=${htmlData};\r\n`);
        var { envs, vars, used } = template;
        Object.assign(declares, vars);
        for (var k in vars) {
            delete undeclares[k];
        }
        for (var k in envs) {
            if (k in declares);
            else {
                undeclares[k] = true;
            }
        }
        for (var k in used) {
            if (!allVariables[k]) allVariables[k] = [];
            for (var u of used[k]) {
                allVariables[k].unshift(u);
            }
        }
        for (var k in declares) {
            if (!allVariables[k]) allVariables[k] = used[k];
        }
        code_body.unshift.apply(code_body, template);
    }
    code_body.unshift.apply(code_body, prepareCodeBody);
    if (!isDevelop || commbuilder.compress === false) {
        code.relink();
        code.break();
        data = code.toString();
        data = require("./downLevel")(data);
        var code = scanner2(data);
        // code.break();
        var {
            vars: declares,
            used: allVariables,
            async: isAsync,
            yield: isYield,
            envs: undeclares
        } = code;
        code_body = code;
    }
    else if (memery.MSIE) {
        data = code.toString();
        data = require("./downLevel")(data);
        code = scanner2(data);
        code.detour();
        var {
            vars: declares,
            used: allVariables,
            async: isAsync,
            yield: isYield,
            envs: undeclares
        } = code;
        code_body = code;
    }

    if (undeclares.require) var required = allVariables.require;
    var globals = Object.keys(undeclares);
    globals.forEach(g => globalsmap[g] = g);
    globals = Object.keys(globalsmap);
    var required_map = {}, required_paths = [];
    if (required instanceof Array) required.forEach(({ next }, cx) => {
        if (!next || next.type !== code_body.SCOPED || next.entry !== "(") return;
        var r = next.first;
        if (r.type !== code_body.QUOTED || r.length || r.text[0] === '/') return;
        r.value = strings.decode(r.text).replace(/[\\]+/g, '/');
        if (!required_map[r.value]) {
            required_map[r.value] = required_paths.length;
            required_paths.push(r.value);
        }
        if (commbuilder.compress !== false) {
            r.value = required_map[r.value];
            r.text = String(r.value);
        }
    })
    data = code_body.toString();
    var params = globals.map(g => globalsmap[g]);
    data = convertColor(data);

    return {
        imported: globals,
        required: required_paths,
        occurs: allVariables,
        data,
        isAsync,
        isYield,
        params
    };
};

var buildPress2 = function (imported, params, data, args, strs) {
    if (imported.length > 0) {
        var code = scanner2(`var [${params.concat(args || [])}];${data}`);
        if (memery.COMPRESS) code.press();
        params = code[1].filter(a => a.type !== code.STAMP).map(c => c.text);
        code.splice(0, 2);
    }
    else if (args.length > 0) {
        strs = eval(strs);
        var code = scanner2(`var ${args.map((a, i) => {
            var s = strs[i];
            if (typeof s === 'string') s = strings.encode(s);
            else if (s instanceof RegExp) s = `/${s.source}/${s.flags}`;
            return `${a}=${s}`;
        }).join(',')};${data}`);
        if (memery.COMPRESS) code.press();
    }
    else {
        var code = scanner2(data);
        if (memery.COMPRESS) code.press();
    }
    data = code.toString();
    return [imported, params, data];
}

var buildResponse = function ({ imported, params, data, required, occurs, isAsync, isYield }, compress) {
    if (!isDevelop && compress !== false) {
        var [data, args, strs] = breakcode(data, occurs);
        strs = `[${strs}]`;
        if (!memery.UPLEVEL) data = require("./downLevel")(data);
        // var [imported1, params1, data1] = buildPress1(imported, params, data, args, strs);
        var [imported2, params2, data2] = buildPress2(imported, params, data, args, strs);
        data = data2;
        imported = imported2;
        params = params2;
        if (imported.length > 0) {
            var strlength = (strs.length * 2).toString(36);
        } else {
            strs = '';
        }
    } else {
        strs = '';
    }

    var _arguments = [...imported, ...params];
    if (required.length >= 1) {
        _arguments.push(required.join(';'));
    }
    _arguments = _arguments.join(',');
    var length = (_arguments.length << 1).toString(36);
    if (length.length === 1) {
        length = "00" + length;
    } else if (length.length === 2) {
        length = "0" + length;
    }
    if (isYield) data = "*" + data;
    if (isAsync) data = "@" + data;
    // [参数长度*2 参数列表]? [字符串列表长度*2 字符串数组]? 代码块
    data = (_arguments.length ? length + _arguments : "") + (strs && strs.length > 2 && imported.length > 0 ? strlength + strs : '') + (parseInt(data.slice(0, 3), 36) % 2 === 0 || /^\w{1,6}\[/.test(data) && parseInt(data.slice(0, 6), 36) % 2 === 0 ? ";" : "") + data;
    return data;
};
var getFileData = function (fullpath) {
    return new Promise(function (ok, oh) {
        if (!fs.existsSync(fullpath)) return ok(false);
        fs.stat(fullpath, function (error, stat) {
            if (error) return ok(error);
            if (!stat.isFile()) return ok(false);
            fs.readFile(fullpath, function (error, buffer) {
                if (error) return ok(error);
                ok(buffer);
            });
        });
    });
};
var mimeTypes = require("../efront/mime");
var shortpath = require("../basic/shortpath");
var renderImageUrl = function (data, filepath) {
    var urlReg = [
        /\b(?:efront\-|data\-)?(?:src|ur[il])\s*\(\s*(['"`])([^,;\('"`\r\n\u2028\u2029]*?)\1\s*\)/ig,
        /\b(?:efront\-|data\-)?(?:src|ur[il])\s*\=\s*(['"`])([^,;\('"`\r\n\u2028\u2029\s]*?)\1/ig,
    ];
    var replacer = function (data, realpath, match) {
        var mime = mimeTypes[path.extname(realpath).slice(1)];
        var compath = inCom(realpath);
        var pagepath = inPage(realpath);
        if (!mime || !compath && !pagepath) return match;
        if (pagepath) {
            data = pagepath.replace(/\\/g, '/');
        } else {
            data = `data:${mime};base64,` + Buffer.from(data).toString("base64");
            if (data.length > 8 * 1024) {
                if (isDevelop || commbuilder.compress === false) {
                    data = ":comm/" + compath.replace(/\\/g, '/');
                } else {
                    data = "data" + path.extname(realpath) + data.slice(4);
                }
            }
        }
        var quote = match[match.length - 1];
        if (quote === ')') {
            return `url(${data})`;
        }
        return `src=${quote}${data}${quote}`;
    };
    return bindLoadings(urlReg, data, filepath, replacer, false);
};
var renderLessData = function (data, lesspath, watchurls, className) {
    if (!less) less = require("../less-node")(), less.PluginLoader = function () { };
    data = data || '';
    var importLessReg = /^\s*@(?:import)\s*(['"`]?)(.*?)\1(\s*;)?\s*$/im;
    var replacer = function (data, realpath) {
        if (watchurls.indexOf(realpath) < 0) {
            watchurls.push(realpath);
        }
        return data;
    };
    var lessresult = bindLoadings(importLessReg, data, lesspath, replacer, 0);
    watchurls.push(lesspath);
    var promise = Promise.resolve(lessresult)
        .then(function (data) {
            return renderImageUrl(data, lesspath);
        })
        .then(function (lessdata) {
            var timeStart = new Date;
            var lessData;
            less.render(`.${className}{\r\n${convertColor(String(lessdata))}\r\n}`, {
                compress: !isDevelop,
                filename: lesspath
            }, function (err, data_2) {
                if (err)
                    return console.warn(err);
                lessData = data_2.css.replace(/\{([^\}]+)\}/g, function (_, c) {
                    var o = parseKV(c, ';', ":");
                    if (o["user-select"]) o["-webkit-user-select"] = o["user-select"];
                    return `{${serialize(o, ';', ':')}}`;
                });
            });
            promise.time = new Date - timeStart;
            return lessData;
        });
    return promise;
};

function prepare(filename, fullpath) {
    var commName = fullpath.match(/(?:^|[^\w\u3000-\uffff])([\$_\w\u3000-\uffff][\w\u3000-\uffff]*?)(\.[^\.]*)?$/i);
    if (!commName) console.warn("文件名无法生成导出变量！", fullpath);
    commName = commName && commName[1];
    var className = filename.replace(/[\\\/\:\.]+/g, "-");
    if (!/\-/.test(className)) className += "- " + className;
    var shortName = className.replace(/^.*?(\w*?)$/g, "$1");
    var lessName = /\s/.test(className) ? className.split(/\s+/)[0] : className;
    if (shortName !== className) className = className + " " + shortName;
    return [commName, lessName, className];
}

function getMouePromise(data, filename, fullpath, watchurls) {
    filename = filename.replace(/\.vuex?$/i, '');
    var [commName, lessName, className] = prepare(filename, fullpath);
    var time = 0;

    var jsData = '', htmlData = '', lessData = '';
    // js中可能出现一些特殊字符，这里优先匹配
    data = data.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/i, function (_, script) {
        jsData = script + `;\r\nif(exports)exports=extendIfNeeded(exports["default"]||exports,exports,{call:moue$call,apply:moue$apply});exports["default"]=exports`;
        return '';
    });
    data = data.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, function (_, style) {
        lessData += style;
        return '';
    });
    data = data.replace(/<([^\s>]+)([^>]*)>([\s\S]*)<\/\1>/i, function (_, tagName, attr, template) {
        if (tagName.toLowerCase() !== 'template') {
            htmlData += _;
        }
        else if (/\bv\-if\b/i.test(attr)) {
            htmlData += _;
        }
        else {
            htmlData += template;
        }
        return '';
    });
    if (!/^[\s]*$/i.test(data)) {
        data = data.trim();
        console.warn(`文件中存在冗余数据<gray>${fullpath}</gray>:<data>${data.length > 12 ? data.slice(0, 10) + '...' : data}</data>`);
    }
    var promise = new Promise(function (ok, oh) {
        function fire() {
            var timeStart = new Date;
            if (htmlData) {
                jsData = `var template=\`${htmlData.replace(/>\s+</g, "><").replace(/\\[^`]/g, "\\$&")}\`;\r\n` + jsData;
                if (lessData) {
                    jsData += `;\r\ntemplate=cless(template,\`${lessData}\`,"${className}")`;
                }
                jsData += `;\r\nextend(exports,Vue.compile(template))`;
            }
            var data = loadJsBody(jsData, fullpath, null, commName);
            time += new Date - timeStart;
            promise.time = time;
            ok(data);
        }
        if (htmlData) {
            var htmlpromise = renderImageUrl(htmlData, fullpath).then(function (a) {
                htmlData = a;
            });
        }
        if (lessData) {
            var lesspromise = renderLessData(lessData, fullpath, watchurls, lessName).then(data => {
                lessData = data;
                time += lesspromise.time;
            });

        }
        Promise.all([htmlpromise, lesspromise]).then(fire, oh);
    });
    return promise;
}

function getHtmlPromise(data, filename, fullpath, watchurls) {
    var [commName, lessName, className] = prepare(filename, fullpath);
    let lesspath = fullpath.replace(/\.html?$/i, ".less");
    var jsData = "`" + data.replace(/>\s+</g, "><").replace(/\\[^`]/g, "\\$&") + "`";
    var lessData;
    var time = 0;
    var promise = getFileData(lesspath).then(function (lessdata) {
        if (lessdata instanceof Buffer) {
            var lessPromise = renderLessData(lessdata, lesspath, watchurls, lessName);
            return lessPromise.then(data => {
                lessData = data;
                time += lessPromise.time;
            });
        }
    }).then(function () {
        var timeStart = new Date;
        var data = loadJsBody(jsData, filename, lessData, commName, className);
        time += new Date - timeStart;
        promise.time = time;
        return data;
    });
    return promise;
}

function getScriptPromise(data, filename, fullpath, watchurls) {
    if (path.isAbsolute(fullpath)) console.info("编译", fullpath);
    var [commName, lessName, className] = prepare(filename, fullpath);
    let htmlpath = fullpath.replace(/\.[cm]?[jt]sx?$/i, ".html");
    let lesspath = fullpath.replace(/\.[cm]?[jt]sx?$/i, ".less");
    let replace = loadUseBody(data, fullpath, watchurls, commName);
    var htmlpromise = getFileData(htmlpath)
        .then(function (htmldata) {
            if (htmldata && !htmldata.length) htmldata = "<!-- efront template -->";
            return renderImageUrl(htmldata, htmlpath);
        });
    var jsData, lessData, htmlData;
    var time = 0;
    var promise = Promise.all([lesspath].map(getFileData).concat(htmlpromise, replace)).then(function ([lessdata, htmldata, data]) {
        var timeStart = new Date;
        if (htmldata && !/^\s*(<!--[\s\S]*?-->\s*)*(<!doctype\b|<script\b)/i.test(htmldata)) {
            htmldata = "{toString:()=>`" + String(htmldata).replace(/>\s+</g, "><").replace(/\\[^`]/g, "\\$&") + "`}";
            htmldata = htmldata.replace(/\>\s+/g, ">").replace(/\s+</g, "<").replace(/<\!\-\-.*?\-\-\>/g, "");
            htmlData = htmldata;
            watchurls.push(htmlpath);
        }
        jsData = String(data);
        if (lessdata instanceof Buffer) {
            var lessPromise = renderLessData(lessdata, lesspath, watchurls, lessName);
            lessPromise.then(data => {
                lessData = data;
                time += lessPromise.time || 0;
            });
            return lessPromise;
        }
        time += new Date - timeStart;
    }).then(function () {
        var timeStart = new Date;
        var data = loadJsBody(jsData, fullpath, lessData, commName, className, htmlData);
        time += new Date - timeStart;
        promise.time = time;
        console.drop();
        return data;
    });
    return promise;

}
function commbuilder(buffer, filename, fullpath, watchurls) {
    filename = String(filename || '');
    fullpath = String(fullpath || "");
    var compress = commbuilder.compress;
    var data = String(buffer), promise;
    if (/\.json$/i.test(fullpath)) {
        var timeStart = new Date;
        var data = loadJsBody("(" + String(buffer) + ")", fullpath);
        promise = Promise.resolve(data);
        promise.time = new Date - timeStart;
    } else if (/\.html?$/i.test(fullpath)) {
        if (/^(\s*<!--[\s\S]*?--!?>)*\s*<!Doctype\b/i.test(data)) {
            return data;
        }
        promise = getHtmlPromise(data, filename, fullpath, watchurls);
    } else if (/\.vuex?$/i.test(fullpath)) {
        promise = getMouePromise(data, filename, fullpath, watchurls);
    } else if (/\.(?:[cm]?[jt]sx?)$/i.test(fullpath) || !/[\\\/]/i.test(fullpath)) {
        promise = getScriptPromise(data, filename, fullpath, watchurls);
    } else {
        data = buffer;
        var extname = path.extname(fullpath);
        if (extname) buffer.mime = mimeTypes[extname.slice(1)];
    }
    if (promise) {
        var promise1 = promise.then(function (data) {
            var timeStart = new Date;
            data = buildResponse(data, compress);
            data = Buffer.from(data);
            data.path = fullpath;
            data.time = new Date - timeStart + promise.time;
            return data;
        });
    }
    return promise1 || data;
}
commbuilder.parse = function (data, filename = 'main', fullpath = './main.js', compress, breakcode = false) {
    var savedIsDevelop = isDevelop;
    isDevelop = !breakcode;
    var savedCompress = commbuilder.compress;
    commbuilder.compress = compress;
    var [commName, lessName, className] = prepare(filename, fullpath);
    if (/\.(?:pem|html?|xml|glsl|txt|log)$/i.test(fullpath)) data = `return ${strings.encode(data)}`;
    else if (/\.(?:json)$/i.test(fullpath)) data = `return ` + data;
    else if (/\.[mc]?[tj]sx?$/i.test(fullpath)) data = replaceIncludes(data);
    var res = loadJsBody(data, filename, null, commName, lessName, className);
    if (savedCompress === undefined) delete commbuilder.compress;
    else commbuilder.compress = savedCompress;
    isDevelop = savedIsDevelop;
    return res;
};
commbuilder.break = function (data, filename, fullpath, compress) {
    var parsed = commbuilder.parse(data, filename, fullpath, compress, true);
    var { imported, params, data, required, occurs, isAsync, isYield } = parsed;
    var [data, res, val] = breakcode(data, occurs);
    return [data, res, val, isAsync, isYield];
}
module.exports = commbuilder;