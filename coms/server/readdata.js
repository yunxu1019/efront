var { Http2ServerRequest } = require("http2");
/**
 * @param {Http2ServerRequest} req;
 */
var readdata = function (req, max_length) {
    return new Promise(function (ok, oh) {
        var buff = [], length = 0;
        req.on("data", function (buf) {
            length += buf.length;
            if (length > max_length) return oh("数据过载...");
            buff.push(buf);
        });
        req.on("end", function () {
            ok(Buffer.concat(buff));
        });
        req.on("close", oh);
        req.on("aborted", oh);
        req.on("error", oh);
    })
};
module.exports = readdata;