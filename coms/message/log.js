"use strict";
module.exports = function ({ log, args }) {
    console[log].apply(console, args);
}