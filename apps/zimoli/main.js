// var document=this.document;
// document["body"].appendChild(this.document.createElement("input"));
function main() {
    var nav = createElement(div);
    var login = createElement(button);
    var title = createElement(div);
    text(title, document.title);
    text(login, "登录");
    appendChild(nav, title, login);
    css(login, "position:absolute;right:0px;top:0;bottom:0;height:100%;width:60px;")
    css(nav, "color:#ffffff;text-align:center;line-height:50px;font-size:24px;background-color:#664d8a;height:50px;position:absolute;top:0px;left:0px;right:0px;width:100%;");
    var page = createElement("div");
    css(page, "position:absolute;top:0px;left:0px;right:0px;bottom:0px;background-color:#f2f4f9;width:100%;height:100%;overflow:hidden;font:14px arial,\"hiragino Sans GB\",\"微软雅黑\",\"黑体-简\",Helvetica,sans-serif");
    appendChild(page, nav);
    return page;
}