"use strict";
var { Http2ServerResponse } = require("http2");
/**
 * @type {Http2ServerResponse[]}
 */
var liveload = module.exports = [];
liveload.version = +new Date;