function map(keeys,values) {
    var obj={};
    for(var cx=0,dx=keeys.length;cx<dx;cx++){
        obj[keeys[cx]]=values[cx];
    }
    return obj;
}