function map(f,o){
    var res=Array(this.length)
    for(var cx=0,dx=this.length;cx<dx;cx++){
        res[cx]=f.call(o,this[cx],cx,this);
    }
    return res;
}