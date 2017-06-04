/* 
 * 不枝雀
 * 2017-5-1 19:33:14
 */
var logger=function(){
};
var console={
};
"log info error debug".split(" ").map(function(a){
    console[a]=function(){
        logger.apply(a,arguments);
    };
});