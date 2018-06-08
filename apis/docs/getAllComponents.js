var fs = require("fs");
var path = require("path");
var commspath = path.join(__dirname, "../../coms/zimoli");
var test_file_reg = /_test\.[tj]sx?$/i;
var comm_file_reg = /\.[tj]sx?$/i;
function getAllcomponents() {
    return new Promise(function (ok, oh) {
        fs.readdir(commspath, function (error, names) {
            if (error) {
                return oh(error);
            }
            var result = [], map = {};
            var current_name_prefix;
            names.filter(a => comm_file_reg.test(a)).forEach(function (name) {
                if (current_name_prefix !== name.charAt(0).toUpperCase()) {
                    current_name_prefix = name.charAt(0).toUpperCase();
                    result.push({
                        name: current_name_prefix,
                        tab: 1
                    });
                }
                if (test_file_reg.test(name)) {
                    name = name.replace(test_file_reg, "");
                    if (map[name]) {
                        map[name].test = true;
                    } else {
                        map[name] = {
                            test: true
                        };
                    }
                } else {
                    name = name.replace(comm_file_reg, "");
                    var obj = {
                        name,
                        tab: 2
                    };
                    if (map[name]) {
                        obj.test = map[name].test;
                    } else {
                        map[name] = obj;
                    }
                    result.push(obj);
                }
            });
            ok(result);
        });
    });
}
module.exports = getAllcomponents;