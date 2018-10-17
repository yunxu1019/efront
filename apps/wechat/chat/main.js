var page = div();
var left = createWithClass(div, "left");
var road = createWithClass(div, "main");
var wechatBase = `https://wx2.qq.com`;
var wechatGet = function (uri) {
    return cross("get", `${wechatBase}${uri}`);
};
html(left, `
<div class=header>
    <div class=avatar><img src="images/avatar.png" mm-src="UserAvatar" /></div>
    <div class=info>
        <div>
            <div class=name>王勇慧</div>
            <div class=opt></div>
        </div>
    </div>
</div>
<div class=search>
    <div class=icon></div>
    <input placeholder=搜索 />
</div>
<div class=tab><div chat><i></i></div><div public><i></i></div><div friends><i></i></div></div>
<div class=tip><i class=pot></i><a>下载微信 PC 版</a></div>
<div class=list></div>
`);
var active = function () {
    var target = this;
    if (active.ing === target) return;
    active.ing && removeClass(active.ing, "active");
    active.ing = target;
    addClass(target, "active");
};
[].slice.call(left.querySelectorAll(".tab>div"), 0).map(function (a) {
    onclick(a, active);
    return a;
})[0].click();
onclick(left.querySelector(".tip>a"), function () {
    alert("不支持下载！");
});
onclick(left.querySelector(".tip>.pot"), function () {
    remove(left.querySelector(".tip"));
});

html(road, `
<div class=head>&nbsp;</div>
<div class=body><i></i></div>
<div class=foot></div>
`);
appendChild(page, left, road);
var $scope = $rootScope.$new();

function main(user) {
    accountFactory.setSkey(user.SKey);
    accountFactory.setSid(user.Sid);
    accountFactory.setUin(user.Uin);
    accountFactory.setPassticket(user.Passticket);
    // contactFactory.initContact();
    render(page, $scope);
    if (user) {
        state({
            login: user
        });
    }
    return page;
}