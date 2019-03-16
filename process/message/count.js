"use strict";
var count = require("../count");
var counts = count() || {};
process.on('exit', function () {
    count(counts);
});

module.exports = function count({ path, update }, then) {
    if (update) {
        if (!counts[path]) {
            counts[path] = 0;
        }
        counts[path]++;
    }
    if (!counts[path]) {
        return then && then(0);
    }
    then && then(counts[path]);
}