var getvariables = require("../process/variables");
var esprima = require("../process/esprima/index");
var esmangle = require("../process/esmangle/esmangle");
var escodegen = require("../process/escodegen/escodegen");
module.exports = function (buffer, filename) {

    var data = String(buffer);
    var code = esprima.parse(data);
    var {
        DeclaredVariables: declares,
        unDeclaredVariables: undeclares
    } = getvariables(code);
    var globals=Object.keys(undeclares);
    var commName = filename.match(/([\$_\w][\w]*)\.js$/);
    commName = commName && commName[1];
    if (commName) {
        if (!declares[commName]) {
            commName=commName[0].toUpperCase() + commName.slice(1);
            if (!declares[commName]){
                commName=null;
            }
        }
    }
    code = {
        type: "FunctionExpression",
        params: globals.map(n => ({
            type: "Identifier",
            name: n
        })),
        body: {
            type: "BlockStatement",
            body: code.body.concat(commName ? {
                "type": "ReturnStatement",
                "argument": {
                    "type": "Identifier",
                    "name": commName
                }
            }:[])
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
            // compact: true, //去空格
            semicolons: false, //分号
            parentheses: false //圆括号
        }
    });
    // console.log(data);
    var _arguments = [...globals, ...params].join();
    var length = (_arguments.length << 1).toString(36);
    if (length.length === 1) {
        length = "00" + length;
    } else if (length.length === 2) {
        length = "0" + length;
    }

    data = (_arguments.length ? length + _arguments : "") + data.replace(/[\u1000-\uffff]/g, m => "\\u" + m.charCodeAt(0).toString(16));
    return data;
}