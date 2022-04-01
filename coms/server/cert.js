var memery = require('../efront/memery');
var fs = require("fs");
var path = require("path");
var readFileAsync = function (fullpath) {
    return new Promise(function (ok, oh) {
        fs.readFile(fullpath, function (err, chunk) {
            if (err) oh(`读取文件<gray>${fullpath}</gray>出错:` + err);
            else ok(chunk);
        });
    });
}
var loadCertFile = function (reletivepath) {
    var fullpath = path.join(__dirname, "../../data/keystore", reletivepath);
    return readFileAsync(fullpath);
};
var cert = {

};
if (memery.PFX_PATH) {
    cert.pfx = await readFileAsync(memery.PFX_PATH);
    cert.passphrase = memery.PFX_PASSWORD;
}
else {
    cert.key = await loadCertFile("cross-key.pem");
    cert.cert = await loadCertFile("cross-cert.pem");
}
module.exports = cert;