var path = require("path");
var fullpath = path.join(__dirname, 'build-efront');
require("child_process").spawn(fullpath, {
    stdio: "inherit",
    shell: true
});
console.log(fullpath);