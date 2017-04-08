/* 
 * 不枝雀
 * 2017-3-24 20:46:04
 */


function sleep(a){
    var stack=[a];
    var run=function(){
        var a=stack.shift();
        if(isFunction(a)){
            if(stack.length){
                setTimeout(run,0);
            }
            return a();
        }else if(isNumber(a)){
            setTimeout(run,a);
        }
    };
    var then=function(a){
        stack.push(a);
    };
    then.then=then.sleep=then;
    return then;
};