"use strict";
module.exports = function count({ path, update }, then) {
    if (update) {
        if (!counts[path]) {
            counts[path] = 0;
        }
        counts[path]++;
    }
    if (!counts[path]) {
        return then(0);
    }
    then(counts[path]);
}