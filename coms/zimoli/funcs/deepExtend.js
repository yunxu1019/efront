/* 
 * 不枝雀
 * 2017-3-18 11:20:41
 */


function deepExtend(o1,o2){
    for (var k in o2){
        var v=o2[k];
        if(v instanceof Object){
            if(v instanceof Array){
                
            }else if(v instanceof Date){
                
            }else if (v instanceof Element){
                o1[k]=v.clone();
            }else if(v instanceof Function){
                
            }
        }else{
            o1[k]=v;
        }
    }
}