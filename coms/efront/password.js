"use strict";
var encrypt = require("../crypt/encode62");
var readline = require("readline");
function createReadline() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function requestPassword() {
    return new Promise(function (ok, oh) {
        var rl = createReadline();
        rl.question("输入新密码:", function (a) {
            readline.moveCursor(process.stdout, 0, -1);
            readline.clearScreenDown(process.stdout);
            rl.question("确认密码:", function (b) {
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearScreenDown(process.stdout);
                if (a === b) {
                    rl.close();
                    ok(a);
                }
                else {
                    oh('两次输入密码不一致');
                }
            });
        });
    }).then(function (a) {
        require("./userdata").setPassword(a);
    });
}
module.exports = {
    checkPassword(a) {
        return require("./userdata").checkPassword(a);
    },
    requestPassword,
};