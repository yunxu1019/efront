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
var cwd = path.join(__dirname, "..");
var useInternalReg = /^\s*(['"`])(?:(?:use|#?include)\b)?\s*(.*?)\1(\s*;)?\s*$/i;
module.exports = function commbuilder(buffer, filename, fullpath, watchurls) {
    var data = String(buffer);
    var commName = filename.match(/([\$_\w][\w]*)\.[tj]sx?$/i);
    commName = commName && commName[1];
    if (useInternalReg.test(data)) {
        data = data.replace(useInternalReg, function (match, quote, relative) {
            var realPath = path.join(path.dirname(fullpath), relative);
            if (!fs.existsSync(realPath)) {
                realPath = relative;
            }
            if (!fs.existsSync(realPath)) {
                realPath = path.join(__dirname, "..", relative);
            } else {
                watchurls.push(realPath);
            }
            if (!fs.existsSync(realPath) || !fs.statSync(realPath).isFile()) {
                console.warn("没有处理include:" + filename, realPath);
                return match;
            }
            var data = fs.readFileSync(realPath).toString();
            if (/module.exports\s*=/.test(data)) {
                return data.replace(/\bmodule.exports\s*=/g, commName ? "var " + commName : "return ");
            }
            var realName = path.basename(realPath).replace(/\..*$/, "")
            return data + `;var ${realName},${commName}=${realName};`;
        });
    }
    data = typescript.transpile(data);
    var code = esprima.parse(data);
    var {
        DeclaredVariables: declares,
        unDeclaredVariables: undeclares
    } = getvariables(code);
    var globals = Object.keys(undeclares);
    var globalsmap = {};
    globals.forEach(g => globalsmap[g] = g);
    var className = path.relative(cwd, fullpath).replace(/[\\\/\:\.]+/g, "-");
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
        var lessFile = fullpath.replace(/\.[jt]sx?$/i, ".less"),
            lessData;
        if (fs.existsSync(lessFile)) {
            watchurls.push(lessFile);
            if (fs.statSync(lessFile).isFile()) {
                watchurls.push(lessFile);
                less.render(`.${className}{${fs.readFileSync(lessFile).toString()}}`, {
                    compress: !process.env.IN_TEST_MODE
                }, function (err, data) {
                    if (err) return;
                    lessData = data.css;
                });
            }
        }
        if (lessData) {
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
    }
    var code_body;
    if (code.body.length === 1 && /(ExpressionStatement)$/.test(code.body[0].type)) {
        //如果整个函数只有一个表达式或一个变量，直接反回其本身
        code_body = [{
            "type": "ReturnStatement",
            "argument": lessData ? {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": globalsmap.cless
                },
                "arguments": [
                    code.body[0].expression,
                    {
                        "type": "Literal",
                        "value": lessData,
                        "raw": JSON.stringify(lessData)
                    },
                    {
                        "type": "Literal",
                        "value": className,
                        "raw": JSON.stringify(className)
                    }
                ]
            } : code.body[0].expression
        }]
    } else {
        code_body = code.body.concat(commName ? {
            "type": "ReturnStatement",
            "argument": lessData ? {
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
                        "value": lessData,
                        "raw": JSON.stringify(lessData)
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
        } : []);
    }
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
    // console.log(data);
    var _arguments = [...globals, ...params].join();
    var length = (_arguments.length << 1).toString(36);
    if (length.length === 1) {
        length = "00" + length;
    } else if (length.length === 2) {
        length = "0" + length;
    }

    data = (_arguments.length ? length + _arguments : "") + data.replace(/[\u0100-\uffff]/g, m => "\\u" + (m.charCodeAt(0) > 0x1000 ? m.charCodeAt(0).toString(16) : 0 + m.charCodeAt(0).toString(16)));
    return data;
}