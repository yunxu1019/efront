var avatar = createElement(div);
css(avatar, "border-radius:50%;background-color:#ccc;width:60px;height:60px;");
var tbar = createElement(div, avatar);
css(tbar, "width:100%;height:120px;background-color:#fff;");
//money about
var w96 = 96;
var mymember = option("我的会员", "清凉一夏·领取会员福利", w96);
var chongzhi = option("积分充值", "8401", w96);
var zhanghu = option("我的账户", "", w96);
var money_about = group(mymember, chongzhi, zhanghu);
//life circle
var contacts = option("通讯录  ", "", w96);
var share = option("分享    ", "", w96);
var life_circle = group(contacts, share);
//live connect
var fangke = option("访客    ", "", w96);
var likeme = option("喜欢我  ", "", w96);
var live_connect = group(fangke, likeme);
//recived gift
var meili = option("魅力    ", "", w96);
var gifts = option("我的礼物", "", w96);
var recived_gift = group(meili, gifts);
//id account
var id = option("房车号  ", "", w96);
var nb = option("社交账号", "QQ:WeChat", w96);
var id_account = group(id, nb);
var setting = option("设置    ", "", w96);
onclick(setting, function (event) {
    go("setting", {
        initialStyle: "marginLeft:100%;"
    });
});
var setting_about = group(setting);
var page = createVboxWithState(state);
appendChild(page, beian, tbar, money_about, life_circle, live_connect, recived_gift, id_account, setting_about);
css(page, "font-size:40px;color:#fff;");

function main() {
    return page;
}