"use strict";
var colors = require("../reptile/colors");
module.exports = function ({ log, args }) {
    var isWorker = this.isWorker;
    var left = isWorker ? '[' : '<';
    var right = isWorker ? ']' : '>';
    if (args.length) args.unshift(`${colors.FgPurple}${left}${colors.FgRed2}${left} ${colors.FgYellow}${this.threadId}${colors.FgGreen2} ${right}${colors.FgCyan}${right}${colors.Reset}`);
    console[log].apply(console, args);
}