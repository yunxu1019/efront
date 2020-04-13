"use strict";
var fs = require("fs");
var path = require("path");
var packdec = function (filedata, exportpath) {
    filedata = String(filedata);
    // console.log(filedata)
    var module_names = {},
        module_map = [];
    var declare_reg =
        // 1 变量名称
        // 2 模块下标
        //      1            ////////////////////////////////     2      //
        /([\$_A-Za-z][\$_\w]*)\s*=\s*__webpack_require__\s*\(\s*(\d+)\s*\)/g;
    filedata.replace(
        declare_reg,
        function (match, declare_name, position_index) {
            if (declare_name && declare_name in module_names) {
                if (module_names[declare_name] !== position_index) {
                    // console.error(declare_name, position_index);
                    module_names[declare_name]++;
                }
            } else {
                module_names[declare_name] = 0;
            }
            module_map[position_index] = declare_name + (module_names[declare_name] ? module_names[declare_name] : "");
            return match;
        }
    );
    var modules_reg = /([\s\S]*)\/\*\*\*\*\*\*\/\s*(\(\[[\s\S]+\]\))/;

    var module_reg = /function\s*([\$_a-zA-Z][\$_\w]*)?\s*\(([\$_\w,\s]*)?\)\s*\{([\s\S]*)\}/;
    var require_reg = /__webpack_require__\s*\(\s*(\d+)\s*\)/
    var modules_match = filedata.match(modules_reg);
    var modules = eval(modules_match[2]);
    var modules_with_name = modules.map(function (module, cx) {
        return `\r\n/* ${cx} */\r\n` + module.toString().replace(module_reg, function (match, name, args, body) {
            if (!name) {
                name = module_map[cx] || "";
            }
            // if (!name) {
            //     body.replace(
            //         /\/(?:\*(?:.*?)\*\/|\/\/(.*?)[\r\n\u2028\u2029])*\(function\(([\$_\w,\s*]+)\)\{[\s\S]*\}\.call\(\s*exports\s*,\s*__webpack_require\s*\(\s*(\d+)\s*\)\)/,
            //         function (match, ) {
            //             return match;
            //         }
            //     );
            // }
            if (!args) {
                args = "";
            }
            return `function ${name}(${args}){${body}}`;
        });
    }).join(",");
    fs.writeFileSync(path.join(exportpath, "index.dec.js"), modules_match[1] + "/******/([" + modules_with_name + "])");
    // var indexed = 0;
    // files.forEach(function (filedata, cx) {
    //     var name = module_map[cx];
    //     if (!name) {
    //         if (indexed) {
    //             console.warn(" more than 1 unnamed files");
    //         }
    //         name = "index" + (indexed ? indexed : "");
    //         indexed++;
    //     }
    //     name = name + ".js";
    //     fs.writeFileSync(path.join(exportpath, name), filedata);
    // });
    // filedata.replace(declare_reg, function (match, declare_name, position_index) {
    //     return declare_name + "=" + "require('./" + declare_name + "')";
    // });
};
module.exports = packdec;