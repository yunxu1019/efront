"use strict";
var readline = require("readline");
var userdata = require("./userdata");
var memery = require("./memery");
async function getPassword(name) {
    var passwords = [];
    process.stdout.write(name);
    var p = new Promise(function (ok, oh) {
        var ondata = function (a) {
            a = String(a);
            switch (a.charCodeAt(0)) {
                case 27: case 9: // tab
                    break;
                case 8:// backspace
                    if (passwords.length) {
                        process.stdout.write("\b  \b\b");
                        passwords.pop();
                    }
                    break;
                case 3:// cancel
                    process.stdin.off("data", ondata);
                    oh("已取消");
                    break;
                case 13:// enter
                    process.stdin.off("data", ondata);
                    process.stdin.uncork();
                    process.stdout.write('\r\n');
                    ok(passwords.join(''));
                    break;
                default:
                    process.stdout.write("•")
                    passwords.push(a);
            }
        }
        process.stdin.on("data", ondata);
        process.stdin.setRawMode(true);
        process.stdin.ref();
    });
    p.then(a => {
        process.stdin.setRawMode(false);
        process.stdin.unref()
    }, function () {
        process.stdin.unref();
    });
    return p;
}
var clearRow = function () {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearScreenDown(process.stdout);
};
async function requestPassword() {
    if (!memery.FORCE && await userdata.hasPassword()) {
        var p = await getPassword("输入原密码：");
        clearRow();
        if (!await userdata.checkPassword(p)) {
            throw new Error("密码不正确！");
        }
    }
    var a = await getPassword("输入新密码：");
    clearRow();
    var b = await getPassword("确认密码：");
    clearRow();
    if (a !== b) throw new Error('两次输入密码不一致');
    return a;
}
module.exports = {
    checkPassword(a) {
        return userdata.checkPassword(a);
    },
    requestPassword() {
        requestPassword().then(function (a) {
            userdata.setPassword(a);
        }, function () { });
    },
};