"use strict";
module.exports = function ({
    fullpath,
    data,
    info
}, then) {
    if ("data" in arguments[0]) {
        try {
            Promise.resolve(this[fullpath](data, info)).then(function (result) {
                then({
                    result,
                    status: 200
                });
            }).catch(function (error) {
                then({
                    result: error instanceof Object ? String(error) : error,
                    status: 403
                });
            });
        } catch (e) {
            then({
                result: e instanceof Object ? String(e) : e,
                status: 403
            });
        }
    } else {
        try {
            delete require.cache[fullpath];
            this[fullpath] = require(fullpath);
            then("success");
        } catch (e) {
            then("error");
        }
    }
};