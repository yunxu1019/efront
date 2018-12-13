var page = div();
var template = `<div>
<div class=close ng-click=go(-1)><btn>×</btn></div>
<div class=logo></div>
<div class=option>
    <btn ng-click=go('/user/login')>${i18n("登录", 'Login')}</btn>
    <btn ng-click=go('/user/register')>${i18n("注册", 'Register')}</btn>
</div>
<div class=line><span>${i18n("其他登录方式", 'Other way to login')}</span></div>
<div class=methods>
    <btn>
        ${i18n('微博', 'weblog')}
    </btn>
    <btn ng-click=go("/login/qq")>
        QQ
    </btn>
    <btn>
        ${i18n('微信', 'Wechat')}
    </btn>
</div>
<div class=tips>${i18n("登录代表你同意<a>酷狗服务</a>和<a>隐私条款</a>", "Login represent that you agree <a>酷狗服务</a> and <a>隐私条款</a>")}</div>
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