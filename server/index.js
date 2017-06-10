require("../process/setupenv");
require("../process/console");
var env = process.env;
var PUBLIC_PATH="./public";
if(env.APP){
    PUBLIC_PATH=PUBLIC_PATH+"/"+env.APP;
}

Object.assign(global,{
    PUBLIC_PATH
})
require("./main");