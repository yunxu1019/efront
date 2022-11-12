var fs = require("fs");
var path = require("path");
var test_file_reg = /_test\.([tj]sx?|xht)$/i;
var comm_file_reg = /\.([tj]sx?|xht)$/i;
var readdir = function (a) {
    return new Promise(function (ok, oh) {
        a = path.join(__dirname, "../../coms", a);

        fs.readdir(a, function (error, names) {
            if (error) oh(error);
            else ok(names);
        });
    })
}
function getAllcomponents() {
    return Promise.all(["basic", "zimoli"].map(readdir)).then(function (n) {
        var names = [].concat.apply([], n);
        var result = [], map = {};
        var current_name_prefix;
        names.filter(name => {
            if (
                /#/.test(name) ||
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
            var a0 = a[0].toLowerCase();
            var b0 = b[0].toLowerCase();
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
        return result;
    });
}
module.exports = getAllcomponents;