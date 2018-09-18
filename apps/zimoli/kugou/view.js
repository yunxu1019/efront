var page = createVboxWithState(state);
page.innerHTML = `<div class=rank-area >
    <div>
        <div class=head>小时榜</div>
        <div class=disp>统计本小时主播的收礼排名</div>
    </div>
    <div>
        <div class=avatar></div>
        <div class=avatar></div>
        <div class=avatar></div>
    </div>
</div>
<div class=filter-buttons>
    <div>
        <div class=icon></div>
        <div class=name>新秀</div>
    </div>
    <div>
        <div class=icon></div>
        <div class=name>附近</div>
    </div>
    <div>
        <div class=icon></div>
        <div class=name>好声音</div>
    </div>
    <div>
        <div class=icon></div>
        <div class=name>搜索</div>
    </div>
    <div>
        <div class=icon></div>
        <div class=name>我的</div>
    </div>
</div>
<div class=video-list>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
`.replace(/>\s+</g, "><");
function main() {
    return page;
}