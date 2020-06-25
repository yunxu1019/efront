"use strict";
module.exports = function ({
    fullpath,
    data,
    info
}) {
    if ("data" in arguments[0]) {
        return this[fullpath](data, info);
    } else {
        delete require.cache[fullpath];
        this[fullpath] = require(fullpath);
    }
};