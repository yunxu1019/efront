var page = div();
var template = `<div>
<div class=close ng-click=go(-1)><btn>×</btn></div>
<div class=logo></div>
<div class=option>
    <btn ng-click=go('/user/login')>登录</btn>
    <btn ng-click=go('/user/register')>注册</btn>
</div>
<div class=line><span>其他登录方式</span></div>
<div class=methods>
    <btn>
        微博
    </btn>
    <btn ng-click=go("/login/qq")>
        QQ
    </btn>
    <btn>
        微信
    </btn>
</div>
<div class=tips>登录代表你同意<a>酷狗服务</a>和<a>隐私条款</a></div>
</div>`.replace(/>\s+</g, "><");
page.innerHTML = template;
render(page, {
    btn: button,
    go
});
page.initialStyle = {
    transform: "scale(1.36)",
    opacity: 0,
    zIndex: 2
};
function main() {
    return page;
}