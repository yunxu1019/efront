var fs=require("fs");
var path=require("path");
var commspath=path.join(__dirname,"../../coms/zimoli");
var test_file_reg=/_test\.[tj]sx?$/i;
var comm_file_reg=/\.[tj]sx?$/i;
function getAllcomponents() {
    return new Promise(function(ok,oh){
        fs.readdir(commspath,function(error,names){
            if(error){
                return oh(error);
            }
            ok(names.filter(a=>!test_file_reg.test(a)&&comm_file_reg.test(a)));
        });
    });
}
module.exports = getAllcomponents;