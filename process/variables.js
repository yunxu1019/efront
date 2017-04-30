var keyword = `break do in typeof case else instanceof var catch export new void class extends return while const finally super with continue for switch yield debugger function this default if throw delete import try enum await null true false arguments`;
var keywords = {};
keyword.split(/\s+/g).forEach(function (key) {
    keywords[key] = true;
});
// var getUnDeclaredVariables = function (ast) {
//     return Object.keys(getVariables(ast).unDeclaredVariables);
// };
var merge = function (dst, o) {
    for (var k in o) {
        dst[k] = dst[k] || o[k];
    }
}
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
                break;
            case "Property":
                var {
                    DeclaredVariables,
                    unDeclaredVariables
                } = getVariables(ast.object);
            case "CatchClause":
                // "type": "CatchClause",
                // "param": {
                //     "type": "Identifier",
                //     "name": "e"
                // },
                // "body": {
                //     "type": "BlockStatement",
                //     "body": []
                // }
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

    // switch (ast && ast.type) {
    //     case "Program":
    //         ast.body.forEach(function (a) {
    //             DeclaredVariables = getDeclaredVariables(a, preDeclaredVariables);
    //         });
    //         break;
    //     case "VariableDeclaration":
    //         ast.declarations.forEach(function (decl) {
    //             DeclaredVariables[decl.id.name] = true;
    //             var aftDeclaredVariables = getDeclaredVariables(decl.init);
    //         });
    //         break;
    //     case "ObjectExpression":
    //         ast.properties.forEach(function (a) {
    //             DeclaredVariables = getDeclaredVariables(a, preDeclaredVariables);
    //         })
    //         break;
    //     case "EmptyStatement":
    //         break;
    //     case "ExpressionStatement":
    //         getDeclaredVariables(ast.expression, preDeclaredVariables);
    //         break;
    //     case "CallExpression":
    //         ast.arguments.forEach(function (a) {
    //             getDeclaredVariables(a);
    //         });
    //         break;
    //     case "Literal": // 字面量
    //         break;
    //     case "FunctionExpression":
    //         DeclaredVariables = getDeclaredVariables(ast.params, DeclaredVariables);
    //         getDeclaredVariables(ast.body, DeclaredVariables);
    //         break;
    //     case "BlockStatement":
    //         ast.body.forEach(function (a) {
    //             getDeclaredVariables(a, DeclaredVariables);
    //         });
    //         break;
    //     case "IfStatement":
    //         getDeclaredVariables(ast.test);
    //         getDeclaredVariables(ast.consequent);
    //         getDeclaredVariables(ast.alternate);
    //         break;
    //     default:
    //         // console.log(ast&&ast.type)
    // }
};
module.exports = getVariables;