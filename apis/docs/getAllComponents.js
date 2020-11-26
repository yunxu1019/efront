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
            names.filter(name => {
                if (

                    !comm_file_reg.test(name)
                ) return false;
                if (test_file_reg.test(name)) {
                    name = name.replace(test_file_reg, "");
                    map[name] = {
                        test: true
                    };
                    return false;

                }
                return true;

            }).map(name => {
                name = name.replace(comm_file_reg, "");
                return name;
            }).sort((a, b) => {
                a0 = a[0].toLowerCase();
                b0 = b[0].toLowerCase();
                if (a0 > b0) return 1;
                if (a0 < b0) return -1;
                var delta = (b in map) - (a in map);
                if (delta) return delta;
                return a > b ? 1 : a < b ? -1 : 0;
            }).forEach(function (name) {
                if (current_name_prefix !== name.charAt(0).toUpperCase()) {
                    current_name_prefix = name.charAt(0).toUpperCase();
                    result.push({
                        name: current_name_prefix,
                        tab: 1
                    });
                }
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

            });
            ok(result);
        });
    });
}
module.exports = getAllcomponents;