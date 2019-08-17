"use strict";
var getvariables = require("./compile/variables");
var esprima = require("./esprima/index");
var esmangle = require("./esmangle/esmangle");
var escodegen = require("./escodegen/escodegen");
var typescript = require("./typescript/typescript");
var less = require("./less/less-node")();
less.PluginLoader = function () { };
var fs = require("fs");
var path = require("path");
var cwd = process.cwd();
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
                        return replacer(data.toString(), realPath);
                    }
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
                })
            });
        });
    });
};
var loadUseBody = function (data, fullpath, watchurls, commName) {
    var useInternalReg = /^\s*(['"`])(?:(?:use|#?include)\b)\s*(.*?)\1(\s*;)?\s*$/img;
    var replacer = function (data, realPath) {
        watchurls.push(realPath);
        var realName = path.basename(realPath).replace(/\..*$/, "") || "main";
        if (!commName) commName = realName;
        if (/module.exports\s*=/.test(data)) {
            return data.replace(/\bmodule.exports\s*=/g, commName ? "var " + commName : "return ");
        }
        console.log(commName, realName);
        return data + `;var ${realName},${commName}=${realName};`;
    };
    return bindLoadings(useInternalReg, data, fullpath, replacer);
}
var getRequiredPaths = function (data) {
    var pathReg = /\b(?:go|popup)\(\s*(['"`])([^\{\}]+?)\1[\s\S]*?\)/g;
    var requiredPaths = {};
    var result = pathReg.exec(data);
    while (result) {
        requiredPaths[result[2].replace(/^[@#!]+/, "")] = true;
        result = pathReg.exec(data);
    };
    return Object.keys(requiredPaths);
};

var createExpression = function (expression) {
    return esprima.parse(expression).body;
};
var loadJsBody = function (data, filename, lessdata, commName, className) {
    data = data.replace(/\bDate\(\s*(['"`])(.*?)\1\s*\)/g, (match, quote, dateString) => `Date(${+new Date(dateString)})`);
    var destpaths = getRequiredPaths(data);
    data = typescript.transpile(data);
    var code = esprima.parse(data);
    var {
        DeclaredVariables: declares,
        unDeclaredVariables: undeclares
    } = getvariables(code);
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
                random_variable = "cless_" + Math.random().toString(36)
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
            }];
    } else if (!commName) {
        if (filename !== "main") console.warn("缺少可导出的变量", `文件：${filename}`, `变量：${commName}`);
        code_body = code.body;
    } else {
        code_body = code.body.concat({
            "type": "ReturnStatement",
            "argument": hasless ? {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": globalsmap.cless
                },
                "arguments": [
                    {
                        "type": "Identifier",
                        "name": commName
                    },
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
            } : {
                    "type": "Identifier",
                    "name": commName
                }
        });
    }
    code_body = prepareCodeBody.concat(code_body);
    globals = Object.keys(globalsmap);
    if (process.env.IN_TEST_MODE) {
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
        }

        code = esmangle.optimize(code, null);
        code = esmangle.mangle(code);
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
    var _arguments = [...globals, ...params].join();
    var length = (_arguments.length << 1).toString(36);
    if (length.length === 1) {
        length = "00" + length;
    } else if (length.length === 2) {
        length = "0" + length;
    }
    data = (_arguments.length ? length + _arguments : "") + data.replace(/[\u0100-\uffff]/g, m => "\\u" + (m.charCodeAt(0) > 0x1000 ? m.charCodeAt(0).toString(16) : 0 + m.charCodeAt(0).toString(16)));
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
            })
        });
    });
};
var renderLessData = function (data = '', lesspath, watchurls, className) {
    var importLessReg = /^\s*@(?:import)\s*(['"`]?)(.*?)\1(\s*;)?\s*$/im;
    var replacer = function (data, realpath) {
        if (watchurls.indexOf(realpath) < 0) {
            watchurls.push(realpath);
        }
        return data;
    };
    var lessresult = bindLoadings(importLessReg, data, lesspath, replacer);
    return Promise.resolve(lessresult).then(function (lessdata) {
        watchurls.push(lesspath);
        var lessData;
        less.render(`.${className}{${String(lessdata)}}`, {
            compress: !process.env.IN_TEST_MODE
        }, function (err, data) {
            if (err) return console.warn(err);
            lessData = data.css;
        });
        return lessData;
    });
};
module.exports = function commbuilder(buffer, filename, fullpath, watchurls) {
    var commName = fullpath.match(/(?:^|[^\w])([\$_\w][\w]*)\.(?:[tj]sx?|html?|json)$/i);
    if (!commName) console.warn("文件名无法生成导出变量！", fullpath);
    commName = commName && commName[1];
    var data = String(buffer);
    var className = filename.replace(/[\\\/\:\.]+/g, "-");
    var shortName = className.replace(/^.*?(\w*?)$/g, "$1");
    var lessName = /\s/.test(className) ? className.split(/\s+/)[0] : className;
    if (shortName !== className) className = className + " " + shortName;
    var lessData, jsData;
    var promise;
    if (/\.json$/.test(fullpath)) {
        data = "return " + JSON.stringify(new Function("return " + data.toString())());
    } else if (/\.html?$/i.test(fullpath)) {
        let lesspath = fullpath.replace(/\.html?$/i, ".less");
        jsData = "`\r\n" + data.replace(/>\s+</g, "><").replace(/(?<=[^\\]|^)\\['"]/g, "\\$&") + "`";
        promise = getFileData(lesspath).then(function (lessdata) {
            if (lessdata instanceof Buffer) {
                return renderLessData(lessdata, lesspath, watchurls, lessName).then(function (data) {
                    lessData = data;
                });
            }
        });
    } else if (/\.(?:[jt]sx?)$/i.test(fullpath)) {
        let htmlpath = fullpath.replace(/\.[jt]sx?$/i, ".html");
        let lesspath = fullpath.replace(/\.[jt]sx?$/i, ".less");
        let replace = loadUseBody(data, fullpath, watchurls, commName);
        promise = Promise.all([lesspath, htmlpath].map(getFileData).concat(replace)).then(function ([lessdata, htmldata, data]) {
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
                htmldata = "`" + String(htmldata).replace(/>\s+</g, "><").replace(/(?<=[^\\]|^)\\['"]/g, "\\$&") + "`"
                htmldata = htmldata.replace(/\>\s+/g, ">").replace(/\s+\</g, "<").replace(/\<\!\-\-.*?\-\-\>/g, "");
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
                return renderLessData(lessdata, lesspath, watchurls, lessName).then(data => lessData = data);
            }
        });
    }
    if (promise) {
        promise = promise.then(function () {
            try {
                var timeStart = new Date;
                var data = loadJsBody(jsData, filename, lessData, commName, className);
                data = Buffer.from(data);
                data.time = new Date - timeStart;
                return data;
            } catch (e) {
                console.error(fullpath, e);
            }
        });
    }
    return promise || data;
};