var menu = div();
menu.innerHTML = `
<div class=user-info>
    <div><img class=avatar src=images/avatar.png /></div><div class=info><div class=name>不枝雀</div><div><span class=level>LV.5</span></div></div>
</div>
<div class=options-list>
<btn><i>&#xe602;</i>消息中心</btn>
<btn><i>&#xe647;</i>皮肤中心</btn>
<btn><i>&#xe604;</i>会员中心</btn>
<btn><i>&#xe651;</i>流量包月</btn>
<btn><i>&#xe62a;</i>私人云盘</btn>
<btn><i>&#xe7bd;</i>定时关闭</btn>
<btn><i>&#xe60b;</i>蝰索音效</btn>
<btn><i>&#xe614;</i>音乐工具</btn>
<btn><i>&#xe68b;</i>个性彩铃</btn>
<switch><i>&#xe6ab;</i>仅wifi联网</switch>
<switch><i>&#xe62f;</i>通知栏歌词</switch>
</div>
<div class=setting-button>
<btn ng-click="go('/personal/setting')"><i>&#xe630;</i>设置</btn>
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