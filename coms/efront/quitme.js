var readline = require("readline");
var exit, rl;
var remove = function () {
    if (rl) {
        var _rl = rl;
        setTimeout(function () {
            _rl.close();
        });
        rl = null;
    }
};
if (require("../message").isPrimary) {
    if (process.stdin.isTTY) {
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.addListener("SIGINT", function () {
            if (exit instanceof Function) {
                rl.close();
                exit();
            } else {
                process.exit();
            }
        });
    }
    module.exports = function (a) {
        exit = a;
        if (!exit) {
            remove();
        }
    };
} else {
    process.on("SIGINT", function () { });
    process.on("SIGTERM", function () { });
}