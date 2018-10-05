var menu = div();
menu.innerHTML = `
<div class=user-info>
    <div><img class=avatar src=images/avatar.png /></div><div class=info><div class=name>不枝雀</div><div><span class=level>LV.5</span></div></div>
</div>
<div class=options-list>
<btn>消息中心</btn>
<btn>皮肤中心</btn>
<btn>会员中心</btn>
<btn>流量包月</btn>
<btn>定时关闭</btn>
<btn>蝰索音效</btn>
<btn>音乐工具</btn>
<btn>个性彩铃</btn>
<btn>私人云盘</btn>
<switch>仅Wi-Fi联网</switch>
<switch>通知栏歌词</switch>
</div>
<div class=setting-button>
<btn ng-click="go('/personal/setting')">设置</btn>
</div>
`.replace(/>\s+</g, "><");
render(menu, {
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