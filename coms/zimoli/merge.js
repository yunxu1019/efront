function mergeToElement(node,src){
    var name=node.getAttributes("");
}

function merge(dst, src) {
    if (isFunction(src)) {
        src = src();
    }
    if(isElement(dst)){

    }else if(isDate(src)){
        dst= new Date(src);
    }else if(isNode(src)){
    }else if (src instanceof Object) {
        for (var k in src) {
            var v = src[k];
            dst[k] = v;
        }
    }
}
