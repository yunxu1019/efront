"use strict";
module.exports=function({
    fullpath
}){
    delete require.cache[fullpath];
    console.log(this);
    
}