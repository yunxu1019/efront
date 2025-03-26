return function (req) {
    return getHeader(req.headers, "accept-language");
};