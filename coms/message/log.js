"use strict";
var colors = require("../reptile/colors");
module.exports = function ({ log, args }) {
    args.unshift(`${colors.FgPurple}<${colors.FgRed2}< ${colors.FgYellow}${this.threadId}${colors.FgGreen2} >${colors.FgCyan}>${colors.Reset}`);
    console[log].apply(console, args);
}