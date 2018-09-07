var menu = div();
menu.innerHTML = `
<div class=user-info>
    <div><img class=avatar src=images/avatar.png /></div><div class=info><div class=name>不枝雀</div><div><span class=level>LV.5</span></div></div>
</div>
<div class=options-list>
<div>消息中心</div>
<div>皮肤中心</div>
<div>会员中心</div>
<div>流量包月</div>
<div>定时关闭</div>
<div>蝰索音效</div>
<div>音乐工具</div>
<div>个性彩铃</div>
<div>私人云盘</div>
</div>
<div class=setting-button>
<div>设置</div>
</div>
`;
var optionsList = menu.querySelector(".options-list");
appendChild(optionsList, group(
    field("仅Wi-Fi联网", Switch(), false, 180),
    field("通知栏歌词", Switch(), false, 180)
));
vbox(optionsList);
kugou$dragview.menu = menu;
ontouchstart(menu, kugou$dragview);