"use strict";
var getvariables = require("../compile/variables");
var esprima = require("../esprima");
var esmangle = require("../esmangle");
var escodegen = require("../escodegen");
var typescript = require("../typescript");
var less = require("../less-node")();
var isDevelop = require("./isDevelop");
less.PluginLoader = function () { };
var fs = require("fs");
var path = require("path");
var bindLoadings = function (reg, data, fullpath, replacer = a => a) {
    data = String(data);
    if (!reg.test(data)) return data;
    var loadurls = {};
    data.replace(reg, function (match, quote, relative) {
        loadurls[relative] = true;
    });
    return new Promise(function (ok, oh) {
        var loaddingcount = 0;
        var accessready = function () {
            loaddingcount++;
            if (loaddingcount < loadings.length) return;
            var dataMap = {};
            var loaddings = Object.keys(loadurls).map(function (key) {
                var realpath = loadurls[key];
                return getFileData(realpath).then(function (data) {
                    dataMap[key] = data;
                });
            });
            Promise.all(loaddings).then(function () {
                data = data.replace(reg, function (match, quote, relative) {
                    var data = dataMap[relative];
                    var realPath = loadurls[relative];
                    if (data instanceof Buffer) {
                        return replacer(data, realPath);
                    }
                    if (/^\s*(['"`])use\s+strict\1\s*;?\s*$/.test(match)) return match;
                    console.warn(`没有处理${match}`, fullpath);
                    return match;
                });

                ok(data);
            });
        };
        var loadings = Object.keys(loadurls).map(function (relative) {
            var realPath = path.join(path.dirname(fullpath), relative);
            fs.access(realPath, function (err) {
                if (!err) {
                    loadurls[relative] = realPath;
                    accessready();
                    return;
                }
                realPath = path.join(__dirname, "..", relative);
                fs.access(realPath, function (err) {
                    if (!err) {
                        loadurls[relative] = realPath;
                    } else {
                        delete loadurls[relative];
                    }
                    accessready();
                });
            });
        });
    });
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
    var destpaths = getRequiredPaths(data);
    data = typescript.transpile(data, { noEmitHelpers: true });
    var code = esprima.parse(data);
    var {
        DeclaredVariables: declares,
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
            console.warn(`将不处理此文件的页面自动预载${filename}`);
        }
    }
    var code_body;
    if (code.body.length === 1 && /(ExpressionStatement)$/.test(code.body[0].type)) {
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
                    filename = ".." + filename.slice(46);
                }
                console.warn("缺少可导出的变量", `文件：${filename}`, `变量：${commName}`);
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
        if (!getvariables.computed) {
            r.value = required_map[r.value];
        }
        r.raw = String(r.value);
    });
    if (isDevelop) {
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
    } else {
        code = {
            type: "FunctionExpression",
            params: globals.map(n => ({
                type: "Identifier",
                name: globalsmap[n]
            })),
            body: {
                type: "BlockStatement",
                body: code_body
            },
            "generator": false,
            "expression": false
        };
        if (!getvariables.computed) {
            code = esmangle.optimize(code, null);
            code = esmangle.mangle(code);
        }
        var params = code.params.map(id => id.name);
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
                compact: true, //去空格
                semicolons: false, //分号
                parentheses: false //圆括号
            }
        });
    }
    data = convertColor(data);
    return {
        imported: globals,
        required: required_paths,
        data,
        params
    };
};
var buildResponse = function ({ imported, params, data, required }) {
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
    data = (_arguments.length ? length + _arguments : "") + data.replace(/[\u0100-\uffff]/g,
        m => "\\u" + (m.charCodeAt(0) > 0x1000 ?
            m.charCodeAt(0).toString(16) : 0 + m.charCodeAt(0).toString(16)
        )
    );
    return data;
};
var getFileData = function (fullpath) {
    return new Promise(function (ok, oh) {
        fs.exists(fullpath, function (exists) {
            if (!exists) return ok(false);
            fs.stat(fullpath, function (error, stat) {
                if (error) return ok(error);
                if (!stat.isFile()) return ok(false);
                fs.readFile(fullpath, function (error, buffer) {
                    if (error) return ok(error);
                    ok(buffer);
                });
            });
        });
    });
};
var renderLessData = function (data, lesspath, watchurls, className) {
    data = data || '';
    var importLessReg = /^\s*@(?:import)\s*(['"`]?)(.*?)\1(\s*;)?\s*$/im;
    var replacer = function (data, realpath) {
        if (watchurls.indexOf(realpath) < 0) {
            watchurls.push(realpath);
        }
        return data;
    };
    var lessresult = bindLoadings(importLessReg, data, lesspath, replacer);
    watchurls.push(lesspath);
    var promise = Promise.resolve(lessresult).then(function (lessdata) {
        var timeStart = new Date;
        var lessData;
        less.render(`.${className}{${convertColor(String(lessdata))}}`, {
            compress: !isDevelop
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
function buildJson(buff) {
    return "return " + JSON.stringify(new Function("return " + buff.toString())());
}

function prepare(filename, fullpath) {
    var commName = fullpath.match(/(?:^|[^\w])([\$_\w][\w]*)\.(?:[tj]sx?|html?|json|asp|jsp|php)$/i);
    if (!commName) console.warn("文件名无法生成导出变量！", fullpath);
    commName = commName && commName[1];
    var className = filename.replace(/[\\\/\:\.]+/g, "-");
    var shortName = className.replace(/^.*?(\w*?)$/g, "$1");
    var lessName = /\s/.test(className) ? className.split(/\s+/)[0] : className;
    if (shortName !== className) className = className + " " + shortName;
    return [commName, lessName, className];
}
function getHtmlPromise(data, filename, fullpath, watchurls) {
    var [commName, lessName, className] = prepare(filename, fullpath);
    let lesspath = fullpath.replace(/\.html?$/i, ".less");
    var jsData = "`\r\n" + data.replace(/>\s+</g, "><").replace(/(?<=[^\\]|^)\\['"]/g, "\\$&") + "`";
    var lessData;
    var time = 0;
    var promise = getFileData(lesspath).then(function (lessdata) {
        if (lessdata instanceof Buffer) {
            var lessPromise = renderLessData(lessdata, lesspath, watchurls, lessName);
            lessPromise.then(data => {
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
    console.info("正在编译", fullpath);
    var [commName, lessName, className] = prepare(filename, fullpath);
    let htmlpath = fullpath.replace(/\.[jt]sx?$/i, ".html");
    let lesspath = fullpath.replace(/\.[jt]sx?$/i, ".less");
    data = String(data).replace(/(;|^)import\s+([a-zA-Z\$_][\w]*)\s+from\s*(["'`])([a-zA-Z\$_]\w*)\3\s*;?(;|$)/mg, (_, f1, v, q, p, f2) => {
        return `${f1}var ${v}=require(${q}${p}${q})${f2}`;
    });
    let replace = loadUseBody(data, fullpath, watchurls, commName);
    var jsData, lessData;
    var time = 0;
    var promise = Promise.all([lesspath, htmlpath].map(getFileData).concat(replace)).then(function ([lessdata, htmldata, data]) {
        var timeStart = new Date;
        if (htmldata instanceof Buffer) {
            var commHtmlName;
            if (/^main/.test(commName)) {
                commHtmlName = 'Main';
            } else {
                commHtmlName = commName[0].toUpperCase() + commName.slice(1);
                if (commHtmlName !== commName) {
                    commHtmlName = `${commName},${commHtmlName},${commHtmlName}=${commName}`;
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
    var data = String(buffer), promise;
    if (/\.json$/i.test(fullpath)) {
        let timeStart = new Date;
        data = buildJson(data);
        data = Buffer.from(data);
        data.time = new Date - timeStart;
    } else if (/\.html?$/i.test(fullpath)) {
        promise = getHtmlPromise(data, filename, fullpath, watchurls);
    } else if (/\.(?:[jt]sx?)$/i.test(fullpath)) {
        promise = getScriptPromise(data, filename, fullpath, watchurls);
    }
    if (promise) {
        var promise1 = promise.then(function (data) {
            try {
                var timeStart = new Date;
                data = buildResponse(data);
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
commbuilder.parse = function (data, filename = 'main', fullpath = './main.js') {
    var [commName, lessName, className] = prepare(filename, fullpath);
    return loadJsBody(data, filename, null, commName, lessName, className);
};
module.exports = commbuilder;