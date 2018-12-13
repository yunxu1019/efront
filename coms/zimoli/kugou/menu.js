var menu = div();
menu.innerHTML = `
<div class=user-info ng-if=user.isLogin>
    <div><img class=avatar src=images/avatar.png /></div><div class=info><div class=name>${user.name || ""}</div><div><span class=level>LV.5</span></div></div>
</div>
<div class=user-info ng-if=!user.isLogin>
    <btn class=login ng-click="go('/user/welcome')">${i18n("点击登录", "Sign in")}</btn>
</div>
<div class=options-list>
<btn ng-click=go('/message/main')><i>&#xe602;</i>${i18n('消息中心', 'Messages')}</btn>
<btn ng-click=go('/skin/main')><i>&#xe647;</i>${i18n("皮肤中心", 'Appearance')}</btn>
<btn><i>&#xe604;</i>${i18n("会员中心", 'Members')}</btn>
<btn><i>&#xe651;</i>${i18n("流量包月", 'Month')}</btn>
<btn><i>&#xe62a;</i>${i18n("私人云盘", 'Net Disk')}</btn>
<btn><i>&#xe7bd;</i>${i18n("定时关闭", "Auto Close")}</btn>
<btn><i>&#xe60b;</i>${i18n("蝰索音效", "Effect")}</btn>
<btn><i>&#xe614;</i>${i18n("音乐工具", "Tools")}</btn>
<btn><i>&#xe68b;</i>${i18n("个性彩铃", "CRBT")}</btn>
<switch><i>&#xe6ab;</i>${i18n("仅wifi联网", "Wifi Only")}</switch>
<switch><i>&#xe62f;</i>${i18n("通知栏歌词", "KRC Notification")}</switch>
</div>
<div class=setting-button>
<btn ng-click="go('/personal/setting')"><i>&#xe630;</i>${i18n("设置", "Settings")}</btn>
</div>
`.replace(/>\s+</g, "><");
render(menu, {
    user,
    go,
    btn(text) {
        return button(text);
    },
    switch(text) {
        return field(text, Switch(), false, 180);
    }
});
var optionsList = menu.querySelector(".options-list");
vbox(optionsList);
kugou$dragview.menu = menu;
ontouchstart(menu, kugou$dragview);
onmousedown(menu, kugou$dragview);