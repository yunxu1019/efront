var console=this.console;
var Array=this.Array;
function map(f,o){
    var res=Array(this.length);
    for(var cx=this.length-1;cx>=0;cx--){
        res[cx]=f.call(o,this[cx],cx,this);
    }
    return res;
}
