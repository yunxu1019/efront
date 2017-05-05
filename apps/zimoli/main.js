// var document=this.document;
// document["body"].appendChild(this.document.createElement("input"));
var nav=createElement("div");
nav.innerText=document.title;
css(nav,"color:#ffffff;text-align:center;line-height:50px;font-size:24px;background-color:#664d8a;height:50px;position:absolute;top:0px;left:0px;right:0px;width:100%;");
var main=createElement("div");
css(main,"position:absolute;top:0px;left:0px;right:0px;bottom:0px;background-color:#f2f4f9;width:100%;height:100%;overflow:hidden;font:14px arial,\"hiragino Sans GB\",\"微软雅黑\",\"黑体-简\",Helvetica,sans-serif");
main.appendChild(nav);