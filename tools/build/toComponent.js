var escodegen = require("../../process/escodegen/escodegen");
var esprima = require("../../process/esprima");
var esmangle = require("../../process/esmangle/esmangle");
var scanner = require("../../process/compile/scanner");
var typescript = require("../../process/typescript/typescript");
function toComponent(responseTree) {
    var array_map = responseTree["[]map"];
    delete responseTree["[]map"];
    var resultMap = {}, result = [];
    for (var k in responseTree) {
        var response = responseTree[k];
        var dependence = response.dependence;
        if (response.data instanceof Buffer) {
            response.data = String(response.data);
        }
        if (!response.data && /^(number|function|string)$/.test(typeof response.builtin)) {
            response.data = response.builtin instanceof Function ? response.builtin.toString() : JSON.stringify(response.builtin);
        }
        result.push([k].concat(dependence).concat(dependence.args).concat(responseTree[k].toString().slice(dependence.offset)));
    }
    var dest = [], last_result_length = result.length;
    var $$_efront_map_string_key = "$$__efront_const";

    while (result.length) {
        for (var cx = result.length - 1, dx = 0; cx >= dx; cx--) {
            var [k, ...module_body] = result[cx];
            var ok = true;
            module_body.slice(0, module_body.length >> 1).forEach(function (k) {
                if (!resultMap[k] && responseTree[k]) ok = false;
                if (!responseTree[k].data && !resultMap[k]) resultMap[k] = dest.length + 1, dest.push(k);
            });
            if (!responseTree[k].data) {
                result.splice(cx, 1);
                continue;
            }
            if (ok) {
                var this_module_params = {};
                var setMatchedConstString = function (match, type, k, isProp) {

                    if (/^(['"])user?\s+strict\1$/i.test(k)) return `"use strict"`;
                    if (k.length < 3) return match;
                    switch (type) {
                        case "'":
                        case "\"":
                            k = k.replace(/^(['"])(.*?)\1$/, function (match, quote, string) {
                                return "\"" + string.replace(/\\([\s\S])/g, (a, b) => b === "'" ? b : a).replace(/"/g, "\\\"") + "\"";
                            });
                            break;
                        case ".":
                            k = "\"" + k + "\"";
                            break;
                    }
                    var key = k.replace(/[^\w]/g, a => "$" + a.charCodeAt(0).toString(36) + "_");
                    var $key = $$_efront_map_string_key + "_string_" + key;

                    if (!resultMap[$key]) {
                        dest.push(k);
                        resultMap[$key] = dest.length;
                    }
                    if (!this_module_params[$key]) {
                        this_module_params[$key] = true;
                        module_body.splice(module_body.length >> 1, 0, $key);
                        module_body.splice(module_body.length - 1, 0, $key);
                    }
                    return (isProp || type === ".") ? `[${$key}]` : " " + $key + " ";
                };
                var setMatchedConstRegExp = function (match, type, k) {
                    var key = k.replace(/[^\w]/g, a => "$" + a.charCodeAt(0).toString(36) + "_")
                    var $key = $$_efront_map_string_key + "_regexp_" + key;
                    if (!resultMap[$key]) {
                        dest.push(k.toString());
                        resultMap[$key] = dest.length;
                    }
                    if (!this_module_params[$key]) {
                        this_module_params[$key] = true;
                        module_body.splice(module_body.length >> 1, 0, $key);
                        module_body.splice(module_body.length - 1, 0, $key);
                    }
                    return type + " " + $key + " ";
                }
                var module_string = module_body[module_body.length - 1]
                var code_blocks = scanner(module_string);
                var extentReg = /\s*[\:\(]/gy, prefixReg = /(?<=[,\{]\s*)\s|[\,\{}]/gy;
                module_string = code_blocks.map(function (block, index, blocks) {
                    var block_string = module_string.slice(block.start, block.end);
                    var isPropEnd = (
                        extentReg.lastIndex = block.end,
                        extentReg.exec(module_string)
                    );
                    var isPropStart = (
                        prefixReg.lastIndex = block.start - 1,
                        prefixReg.exec(module_string)
                    );
                    var isProp = !!(isPropStart && isPropEnd);
                    if (block.type === block.single_quote_scanner) {
                        return setMatchedConstString(block_string, "'", block_string, isProp);
                    }
                    if (block.type === block.double_quote_scanner) {
                        return setMatchedConstString(block_string, "\"", block_string, isProp);
                    }
                    if (block.type === block.regexp_quote_scanner) {
                        return setMatchedConstRegExp(block_string, "", block_string);
                    }
                    return module_string.slice(block.start, block.end);
                }).join("").replace(/(\.)\s*((?:\\u[a-f\d]{4}|\\x[a-f\d]{2}|[\$_a-z\u0100-\u2027\u2030-\uffff])(?:\\u[a-f\d]{4}|\\x[a-f\d]{2}|[\$_\w\u0100-\u2027\u2030-\uffff])*)/ig, setMatchedConstString);
                module_string = typescript.transpile(module_string);
                var module_code = esprima.parse(`function ${k.replace(/^.*?([\$_a-z]\w*)\.[tj]sx?$/ig, "$1")}(${module_body.slice(module_body.length >> 1, module_body.length - 1)}){${module_string}}`);
                module_code = esmangle.optimize(module_code, null);
                module_code = esmangle.mangle(module_code);
                module_string = escodegen.generate(module_code, {
                    format: {
                        renumber: true,
                        hexadecimal: true, //十六进位
                        escapeless: true,
                        compact: true, //去空格
                        semicolons: false, //分号
                        parentheses: false //圆括号
                    }
                }).replace(/^function\s+[\$_A-Za-z][\$_\w]*\(/, "function(");
                dest.push(`[${module_body.slice(0, module_body.length >> 1).map(a => resultMap[a]).concat(module_string)}]`);
                resultMap[k] = dest.length;
                result.splice(cx, 1);
            }
        }
        if (last_result_length === result.length) throw new Error(`处理失败！`);
        last_result_length = result.length;
    }
    var PUBLIC_APP = k;
    var realize = function (a, c) {
        if (!(a instanceof Array)) return this[c + 1] = a;
        var g = a.slice(0, a.length - 1)
            .map(function (a) {
                return this[a];
            }, this);
        var f = a[a.length - 1];
        var l = /^function[^\(]*?\(([^\)]+?)\)/.exec(f);
        if (l) {
            l = l[1].split(',');
            g = g.concat([l]);
        }
        return this[c + 1] = f.apply(this[0], g);
    };

    var template = `this["${PUBLIC_APP.replace(/([a-zA-Z_\$][\w\_\$]*)\.js$/, "$1")}"]=([].map||function(){${array_map.data}}.call(this.window||global)).call([${dest}],${realize.toString().replace(/\s+/g, ' ').replace(/(\W)\s+/g, "$1").replace(/\s+(\W)/g, "$1")},[this.window||global])[${dest.length - 1}]`;
    // var tester_path = responseTree[PUBLIC_APP].realpath.replace(/\.[tj]sx?$/, "_test.js");
    // if (tester_path) {
    //     try {
    //         let vm = require("vm");
    //         let globals = require("../../tester/core/suit");
    //         let context = vm.createContext(globals);
    //         vm.runInContext(template, context);
    //         vm.runInContext(fs.readFileSync(tester_path).toString(), context);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
    responseTree[PUBLIC_APP].data = template;
    return {
        [PUBLIC_APP]: responseTree[PUBLIC_APP]
    };
}
module.exports = toComponent;