var fs = require("fs");
var pack = require("./pack");
var exepath = require("path").join(__dirname, "../../data/packexe-setup.sfx");
function packexe(readfrom, writeto) {
    fs.open(writeto, 'w+', function (error, hd) {
        if (error) return console.error(error);
        fs.readFile(exepath, function (error, data) {
            if (error) return console.error(error);
            if (data[data.length - 4] | data[data.length - 3] | data[data.length - 2] | data[data.length - 1] !== 0) {
                data = Buffer.concat(data, new Uint8Array(4));
            }
            fs.write(hd, data, function (error) {
                if (error) return console.error(error);
                pack(readfrom, hd);
            });
        });
    });
}
module.exports = packexe;