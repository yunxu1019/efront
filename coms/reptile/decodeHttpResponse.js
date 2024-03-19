function decodeHttpResponse(response) {
    var zlib = require("zlib");
    var headers = response.headers;
    var decoder = null;
    switch (headers["content-encoding"]) {
        case "gzip":
            decoder = zlib.createGunzip();
            break;
        case "br":
            decoder = zlib.createBrotliDecompress();
            break;
        case "deflate":
            decoder = zlib.createInflate();
            break;
        case null:
        case "":
        case undefined:
            break;
        default:
            console.warn(i18n`内容格式不支持:`, response.headers["content-encoding"]);
    }
    if (decoder) response = response.pipe(decoder);
    return response;
}