function parseKV(string,div,eq) {
    var object = {};
    if(isString(string)){
        var kvs=string.split(div)
        for (var cx=0,dx=kvs.length;cx<dx;cx++){
            var kv=kvs[cx].split(eq);
            object[kv[0]]=kv[1];
        }
    }
    return object;
}