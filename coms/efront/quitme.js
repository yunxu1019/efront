var readline = require("readline");
var exit;
if (require("cluster").isMaster) {
    if (process.stdin.isTTY) {
        var rl = readline.createInterface({
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
} else {
    process.on("SIGINT", function () { });
    process.on("SIGTERM", function () { });
}

module.exports = function (a) {
    exit = a;
};