"use strict";
var encrypt = require("./crypt/encode62");
var readline = require("readline");
var path = require("path");
var fs = require("fs");
var password_path = path.join(__dirname, '../data/crypto-key.txt');
var encodedPasswordMark = '';
var encodedPassowrd = '';
function requirePassword() {

    readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }).question("请输入密码：");
}
function createReadline() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}
function questionPassword() {
    return new Promise(function (ok) {
        var rl = createReadline();
        rl.question("请输入密码：", function (a) {
            rl.close();
            ok("user:" + a);
        });
    });
}

function requestPassword() {
    return new Promise(function (ok) {
        var rl = createReadline();
        rl.question("输入新密码:", function (a) {
            rl.question("确认密码:", function (b) {
                if (a === b) {
                    rl.close();
                    ok("user:" + a);
                }
            });
        });
    }).then(function (p) {
        encodedPassowrd = encrypt.timeencode(p);
        encodedPasswordMark = require("crypto").createVerify("md5").update(p);
    });
}
module.exports = {
    questionPassword,
    requestPassword,
};