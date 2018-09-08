var page = createVboxWithState(state);
page.innerHTML = `<div class=user-info>
    <div><img src=images/avatar.png class=avatar /></div>
    <div class=info>
        <div class=name>不枝雀</div>
        <div class=level>LV.5</div>
    </div>
</div>
<div>
    <div>本地音乐</div>
    <div>喜欢·歌单</div>
    <div>下载</div>
    <div>最近</div>
</div>
<div>
    <div>乐库</div>
    <div>歌单</div>
    <div>电台·酷群</div>
    <div>猜你喜欢</div>
    <div>每日推荐</div>
    <div>音乐圈</div>
</div>`;
function main() {
    return page;
}