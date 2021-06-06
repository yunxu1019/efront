"use strict";
var getvariables = require("../compile/variables");
var esprima = require("../esprima");
var esmangle = require("../esmangle");
var escodegen = require("../escodegen");
var typescript = require("../typescript");
var breakcode = require("../compile/breakcode");
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

var loadUseBody = function (source, fullpath, watchurls, commName) {

    var useInternalReg = /^\s*(['"`])(?:(?:use|#?include)\b)\s*(.*?)\1(\s*;)?\s*$/img;
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
            if (/module.exports\s*=/.test(data)) {
                data = data.replace(/\bmodule.exports\s*=/g, commName ? "var " + commName + " =" : "return ");
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
var createExpression = function (expression) {
    return esprima.parse(expression).body;
};
var trimNodeEnvHead = function (data) {
    data = String(data || "").replace(/^\s*\#\!/, '//');
    return data;
};
var loadJsBody = function (data, filename, lessdata, commName, className) {
    data = trimNodeEnvHead(data);
    data = data.replace(/\bDate\(\s*(['"`])(.*?)\1\s*\)/g, (match, quote, dateString) => `Date(${+new Date(dateString)})`);
    var destpaths = commbuilder.prepare === false ? [] : getRequiredPaths(data);
    data = typescript.transpile(data, { noEmitHelpers: true });
    try {
        var code = esprima.parse(data);
    } catch (e) {
        console.error(filename, e);
        return data;
    }
    getvariables.computed = !isDevelop || commbuilder.compress === false;
    var {
        DeclaredVariables: declares,
        allVariables,
        unDeclaredVariables: undeclares
    } = getvariables(code);
    var { require: required } = undeclares;
    var globals = Object.keys(undeclares);
    var globalsmap = {};
    globals.forEach(g => globalsmap[g] = g);
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
            prepareCodeBody = createExpression(`prepare(${stringifiedpaths});`);
        } else if (!declares.go) {
            globalsmap.go = "go";
            prepareCodeBody = createExpression(`go.prepare(${stringifiedpaths});`);
        } else if (!declares.state) {
            globalsmap.state = "state";
            prepareCodeBody = createExpression(`state.prepare(${stringifiedpaths});`);
        } else {
            console.warn(`将不处理此文件的页面自动预载<gray>${filename}</gray>`);
        }
    }
    var code_body;
    if (code.body.length === 1 && "ExpressionStatement" === code.body[0].type) {
        //如果整个函数只有一个表达式或一个变量，直接反回其本身
        code_body = [
            {
                "type": "ReturnStatement",
                "argument": hasless ? {
                    "type": "CallExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": globalsmap.cless
                    },
                    "arguments": [
                        code.body[0].expression,
                        {
                            "type": "Literal",
                            "value": lessdata,
                            "raw": JSON.stringify(lessdata)
                        },
                        {
                            "type": "Literal",
                            "value": className,
                            "raw": JSON.stringify(className)
                        }
                    ]
                } : code.body[0].expression
            }
        ];
    } else {
        code_body = code.body;
        if (undeclares.module) {
            commName = "module.exports";
        } else if (undeclares.exports) {
            commName = "exports";
        }
        if (commName) {
            code_body = code.body.concat({
                "type": "ReturnStatement",
                "argument": hasless ? {
                    "type": "CallExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": globalsmap.cless
                    },
                    "arguments": [
                        esprima.parse(commName).body[0].expression,
                        {
                            "type": "Literal",
                            "value": lessdata,
                            "raw": JSON.stringify(lessdata)
                        },
                        {
                            "type": "Literal",
                            "value": className,
                            "raw": JSON.stringify(className)
                        }
                    ]
                } : esprima.parse(commName).body[0].expression

            });
        } else {
            if (!/\bmain|\bindex/i.test(path.basename(filename))) {
                if (filename.length > 48) {
                    filename = ".." + filename.slice(filename.length - 46);
                }
                console.info(`没有导出变量 文件：<gray>${shortpath(filename)}</gray>\r\n`);
            }
        }
    }
    code_body = prepareCodeBody.concat(code_body);
    globals = Object.keys(globalsmap);
    var required_map = {}, required_paths = [];
    if (required instanceof Array) required.forEach((r, cx) => {
        if (typeof r.value !== "string") return;
        r.value = r.value.replace(/\\/g, '/');
        if (!required_map[r.value]) {
            required_map[r.value] = required_paths.length;
            required_paths.push(r.value);
        }
        if (commbuilder.compress !== false) {
            r.value = required_map[r.value];
        }
        r.raw = String(r.value);
    });
    code = {
        "type": "Program",
        "sourceType": "script",
        body: code_body
    };
    data = escodegen.generate(code, {
        format: {
            renumber: true,
            hexadecimal: true, //十六进位
            escapeless: false,
            compact: false, //去空格
            semicolons: true, //分号
            parentheses: true //圆括号
        }
    });
    var params = globals.map(g => globalsmap[g]);
    data = convertColor(data);
    return {
        imported: globals,
        required: required_paths,
        occurs: allVariables,
        data,
        params
    };
};
var optimize = memery.OPTIMIZE;

var buildResponse = function ({ imported, params, data, required, occurs }, compress) {
    if (!isDevelop && compress !== false) {
        var [data, args, strs] = breakcode(data, occurs);
        strs = `[${strs}]`;
        var data = imported.length > 0 ? `function f(${params.concat(args || [])}){${data}}` : args.length ? `function f(){var [${args}]=${strs};${data}}` : `function f(){${data}}`;
        data = typescript.transpile(data, { noEmitHelpers: true });
        var code = esprima.parse(data);
        if (optimize) code = esmangle.optimize(code, null);
        code = esmangle.mangle(code);
        code = code.body[0];
        params = code.params.map(id => id.name);
        code = {
            "type": "Program",
            "sourceType": "script",
            body: code.body.body
        };
        data = escodegen.generate(code, {
            format: {
                renumber: true,
                hexadecimal: true, //十六进位
                escapeless: true,
                compact: +compress !== 0, //去空格
                semicolons: false, //分号
                parentheses: false //圆括号
            }
        });
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
            less.render(`.${className}{${convertColor(String(lessdata))}}`, {
                compress: !isDevelop,
                filename: lesspath
            }, function (err, data_2) {
                if (err)
                    return console.warn(err);
                lessData = data_2.css;
            });
            promise.time = new Date - timeStart;
            return lessData;
        });
    return promise;
};

function prepare(filename, fullpath) {
    var commName = fullpath.match(/(?:^|[^\w])([\$_\w][\w]*?)(\.\w*)?$/i);
    if (!commName) console.warn("文件名无法生成导出变量！", fullpath);
    commName = commName && commName[1];
    var className = filename.replace(/[\\\/\:\.]+/g, "-");
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
        jsData = script + `;\r\nif(exports)exports=extendIfNeeded(exports.default||exports,exports,{call:moue$call,apply:moue$apply});exports.default=exports`;
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
                jsData = `var template=\`${htmlData.replace(/>\s+</g, "><").replace(/(?<=[^\\]|^)\\['"]/g, "\\$&")}\`;\r\n` + jsData;
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
    var jsData = "`" + data.replace(/>\s+</g, "><").replace(/(?<=[^\\]|^)\\['"]/g, "\\$&") + "`";
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
    if (path.isAbsolute(fullpath)) console.info("正在编译", fullpath);
    var [commName, lessName, className] = prepare(filename, fullpath);
    let htmlpath = fullpath.replace(/\.[cm]?[jt]sx?$/i, ".html");
    let lesspath = fullpath.replace(/\.[cm]?[jt]sx?$/i, ".less");
    let replace = loadUseBody(data, fullpath, watchurls, commName);
    var htmlpromise = getFileData(htmlpath)
        .then(function (htmldata) {
            return renderImageUrl(htmldata, htmlpath);
        });
    var jsData, lessData;
    var time = 0;
    var promise = Promise.all([lesspath].map(getFileData).concat(htmlpromise, replace)).then(function ([lessdata, htmldata, data]) {
        var timeStart = new Date;
        if (htmldata && !/^\s*(<!--[\s\S]*?-->\s*)?(<!doctype\b|<script\b)/i.test(htmldata)) {
            var commHtmlName;
            if (/^main/.test(commName)) {
                commHtmlName = 'Main';
            } else {
                commHtmlName = commName[0].toUpperCase() + commName.slice(1);
                if (commHtmlName !== commName) {
                    commHtmlName = `${commName},${commHtmlName},template,template=${commHtmlName}=${commName}`;
                }
            }
            htmldata = "`" + String(htmldata).replace(/>\s+</g, "><").replace(/(?<=[^\\]|^)\\['"]/g, "\\$&") + "`";
            htmldata = htmldata.replace(/\>\s+/g, ">").replace(/\s+</g, "<").replace(/<\!\-\-.*?\-\-\>/g, "");
            if (data) {
                jsData = `\r\nvar ${commHtmlName}={toString:()=>${htmldata}};\r\n` + data;
            } else {
                jsData = htmldata;
            }
            watchurls.push(htmlpath);
        } else {
            jsData = String(data);
        }
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
        var data = loadJsBody(jsData, fullpath, lessData, commName, className);
        time += new Date - timeStart;
        promise.time = time;
        return data;
    });
    return promise;

}
function commbuilder(buffer, filename, fullpath, watchurls) {
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
            try {
                var timeStart = new Date;
                data = buildResponse(data, compress);
                data = Buffer.from(data);
                data.path = fullpath;
                data.time = new Date - timeStart + promise.time;
                return data;
            } catch (e) {
                console.error(fullpath, e);
            }
        });
    }
    return promise1 || data;
}
commbuilder.parse = function (data, filename = 'main', fullpath = './main.js', compress) {
    var savedCompress = commbuilder.compress;
    commbuilder.compress = compress;
    var [commName, lessName, className] = prepare(filename, fullpath);
    var res = loadJsBody(data, filename, null, commName, lessName, className);
    if (savedCompress === undefined) delete commbuilder.compress;
    return res;
};
commbuilder.break = function (data, filename, fullpath, compress) {
    var parsed = commbuilder.parse(data, filename, fullpath, compress);
    var { imported, params, data, required, occurs } = parsed;
    var [data, res, val] = breakcode(data, occurs);
    return [data, res, val];
}
module.exports = commbuilder;