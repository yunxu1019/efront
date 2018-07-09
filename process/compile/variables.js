"use strict";
/**
 * 读取全局变量
 */
var keyword = `break do in typeof case else instanceof var catch export new void class extends return while const finally super with continue for switch yield debugger function this default if throw delete import try enum await null true false arguments`;
var keywords = {};
keyword.split(/\s+/g).forEach(function (key) {
    keywords[key] = true;
});
var ieSpecialWords = Object.assign({
    valueOf: true
}, keywords);
var merge = function (dst, o) {
    for (var k in o) {
        dst[k] = dst[k] || o[k];
    }
};
var getVariables = function (ast) {
    var DeclaredVariables = {},
        unDeclaredVariables = {};
    if (ast instanceof Object) {
        switch (ast.type) {
            case "VariableDeclaration":
                var {
                    DeclaredVariables,
                    unDeclaredVariables
                } = getVariables(ast.declarations);
                for (var k in DeclaredVariables) {
                    if (DeclaredVariables[k] === true) {
                        DeclaredVariables[k] = ast.kind;
                    }
                }
                for (var k in unDeclaredVariables) {
                    if (unDeclaredVariables[k] === true) {
                        DeclaredVariables[k] = ast.kind;
                    }
                }
                break;
            case "AssignmentPattern":
                var {
                    DeclaredVariables,
                    unDeclaredVariables
                } = getVariables(ast.left);
                var {
                    DeclaredVariables: d,
                    unDeclaredVariables: u,
                } = getVariables(ast.right);
                for (var k in u) {
                    u[k] = "assign";
                }
                for (var k in d) {
                    d[k] = "assign";
                }
                merge(unDeclaredVariables, u);
                merge(DeclaredVariables, d);
                break;
            case "VariableDeclarator":
                var {
                    DeclaredVariables,
                    unDeclaredVariables
                } = getVariables(ast.id);
                var {
                    DeclaredVariables: d,
                    unDeclaredVariables: u
                } = getVariables(ast.init);
                for (var k in u) {
                    u[k] = "initer";
                }
                for (var k in d) {
                    d[k] = "initer";
                }
                merge(unDeclaredVariables, u);
                merge(DeclaredVariables, d);

                break;
            case "BlockStatement":
                var {
                    DeclaredVariables,
                    unDeclaredVariables
                } = getVariables(ast.body);
                for (var k in unDeclaredVariables) {
                    unDeclaredVariables[k] = "block";
                }
                for (var k in DeclaredVariables) {
                    if (DeclaredVariables[k] !== "var") {
                        delete DeclaredVariables[k];
                    }
                }
                break;
            case "MemberExpression":
                var {
                    DeclaredVariables,
                    unDeclaredVariables
                } = getVariables(ast.object);
                if (ast.property.type === "Identifier") {
                    //用以兼容IE5-9
                    var name = ast.property.name
                    if (name in ieSpecialWords) {
                        ast.property = {
                            "type": "Literal",
                            "value": name,
                            "raw": "\"" + name + "\""
                        };
                        ast.computed = true;
                    }
                }
                break;
            case "Property":
                var {
                    DeclaredVariables,
                    unDeclaredVariables
                } = getVariables(ast.value);
                if (ast.key.type === "Identifier") {
                    //用以兼容IE5-9
                    var name = ast.key.name;
                    if (name in ieSpecialWords) {
                        ast.key = {
                            "type": "Literal",
                            "value": name,
                            "raw": "\"" + name + "\""
                        }
                        // ast.computed = true;
                    }
                }
                ast.shorthand = false; //让esmangle兼容shorthand
                break;
            case "CatchClause":
                var {
                    DeclaredVariables,
                    unDeclaredVariables
                } = getVariables(ast.body);
                var {
                    DeclaredVariables: d,
                    unDeclaredVariables: u
                } = getVariables(ast.param);
                for (var k in u) {
                    delete unDeclaredVariables[k];
                }
                break;
            case "FunctionDeclaration":
            case "FunctionExpression":
            case "ArrowFunctionExpression":
                var {
                    DeclaredVariables,
                    unDeclaredVariables
                } = getVariables(ast.body);
                var {
                    DeclaredVariables: d,
                    unDeclaredVariables: u
                } = getVariables(ast.params);
                for (var k in u) {
                    delete unDeclaredVariables[k];
                }
                for (var k in unDeclaredVariables) {
                    unDeclaredVariables[k] = "function";
                }
                ast.id ? DeclaredVariables = {
                    [ast.id.name]: "function"
                } :
                    DeclaredVariables = {};
                break;
            case "Identifier":
                unDeclaredVariables[ast.name] = true;
                break;
            case "":
            case "LabeledStatement":
            case "BreakStatement":
            case "ContinueStatement":
                break;
            case "ExpressionStatement":
                //去除测试脚本
                var expression = ast.expression;
                if (expression.type === "CallExpression" && expression.callee.type === "Identifier" && expression.callee.name.toLowerCase() === "describe") {
                    for (var k in ast) {
                        delete ast[k];
                    }
                    ast.type = "EmptyStatement";
                    break;
                }
            default:
                for (var k in ast) {
                    var {
                        DeclaredVariables: d,
                        unDeclaredVariables: u
                    } = getVariables(ast[k]);
                    merge(DeclaredVariables, d);
                    merge(unDeclaredVariables, u);
                }
                break;
        }
        for (var k in DeclaredVariables) {
            delete unDeclaredVariables[k];
        }
    }
    for (var k in unDeclaredVariables) {
        if (k in keywords) {
            delete unDeclaredVariables[k];
        }
    }
    return {
        DeclaredVariables,
        unDeclaredVariables
    };
};
module.exports = getVariables;