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
            var result = [];
            var current_name_prefix;
            names.filter(a => !test_file_reg.test(a) && comm_file_reg.test(a)).forEach(function (name) {
                if (current_name_prefix !== name.charAt(0).toUpperCase()) {
                    current_name_prefix = name.charAt(0).toUpperCase();
                    result.push({
                        name: current_name_prefix,
                        tab: 1
                    });
                }
                result.push({
                    name,
                    tab: 2
                });
            });
            ok(result);
        });
    });
}
module.exports = getAllcomponents;