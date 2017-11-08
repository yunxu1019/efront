var getvariables = require("../process/variables");
var esprima = require("../process/esprima/index");
var esmangle = require("../process/esmangle/esmangle");
var escodegen = require("../process/escodegen/escodegen");
var typescript = require("./typescript/typescript");
var less = require("./less/less-node")();
less.PluginLoader=function(){};
var fs = require("fs");
var path = require("path");
var cwd = path.join(__dirname, "..");
module.exports = function commbuilder(buffer, filename, fullpath, watchurls) {
    var data = String(buffer);
    data = typescript.transpile(data);
    var code = esprima.parse(data);
    var {
        DeclaredVariables: declares,
        unDeclaredVariables: undeclares
    } = getvariables(code);
    var globals = Object.keys(undeclares);
    var globalsmap = {};
    globals.forEach(g => globalsmap[g] = g);
    var commName = filename.match(/([\$_\w][\w]*)\.[tj]sx?$/i);
    commName = commName && commName[1];
    var className = path.relative(cwd, fullpath).replace(/[\\\/\:\.]+/g, "-");
    if (commName) {
        if (!declares[commName]) {
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
                less.render(`.${className}{${fs.readFileSync(lessFile).toString()}}`, function (err, data) {
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
    var code_body = code.body.concat(commName ? {
        "type": "ReturnStatement",
        "argument": lessData ? {
            "type": "SequenceExpression",
            "expressions": [{
                    "type": "CallExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": globalsmap.cless
                    },
                    "arguments": [{
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
                },
                {
                    "type": "Identifier",
                    "name": commName
                }
            ]
        } : {
            "type": "Identifier",
            "name": commName
        }
    } : []);
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

    data = (_arguments.length ? length + _arguments : "") + data.replace(/[\u0100-\uffff]/g, m => "\\u" + m.charCodeAt(0).toString(16));
    return data;
}