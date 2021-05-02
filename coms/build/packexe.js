var fs = require("fs");
var pack = require("./pack");
var exepath = require("path").join(__dirname, "../../data/packexe-setup.sfx");
function packexe(readfrom, writeto) {
    fs.open(writeto, 'w+', function (error, hd) {
        if (error) return console.error(error);
        fs.readFile(exepath,function(error,data){
            if(error)return  console.error(error);
            fs.write(hd,data,function(error){
                if(error) return console.error(error);
                pack(readfrom,hd);
            });
        });
    });
}
module.exports = packexe;