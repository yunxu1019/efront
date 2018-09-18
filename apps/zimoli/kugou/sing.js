var page = createVboxWithState(state);
page.innerHTML = `
<div class=option-buttons>
    <div>
        <div class=icon></div>
        <div class=name>发现</div>
    </div>
    <div>
        <div class=icon style=font-size:50px;></div>
        <div class=name>我要唱</div>
    </div>
    <div>
        <div class=icon></div>
        <div class=name>我的</div>
    </div>
</div>
<div class=news-slider>
    <div class=head><span>头条</span></div>
    <div class=body>装了这个app，不用再去ktv</div>
    <div class=foot><i>&#xe602;</i></div>
</div>
<div class=slider-options>
    <div>关注</div>
    <div>好友</div>
    <div>热门</div>
    <div>附近</div>
</div>
<div class=message-list>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
`.replace(/>\s+</g, "><");
function main() {
    return page;
}