var readline = require("readline");
var exits = [], rl;
var remove = function () {
    if (rl) {
        var _rl = rl;
        setTimeout(function () {
            _rl.close();
        });
        rl = null;
    }
    if (exits.length) {
        for (var exit of exits) exit();
    }
};
var hook = function () {
    hook = function () { };
    if (require("../message").isPrimary) {
        if (process.stdin.isTTY) {
            rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.addListener("SIGINT", remove);
        }
        else {
            process.on("SIGINT", remove);
            process.on("SIGTERM", remove);
        }
    }
}
module.exports = function (a) {
    if (!a) {
        remove();
    }
    else {
        hook();
        exits.push(a);
    }
};