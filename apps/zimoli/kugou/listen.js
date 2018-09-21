var page = createVboxWithState(state);
page.innerHTML = `<div class=user-info>
    <div><img src=images/avatar.png class=avatar /></div>
    <div class=info>
        <div class=name>不枝雀</div>
        <div class=level>LV.5</div>
    </div>
</div>
<div class=music-info>
    <div ng-click=go('/zimoli/files/main') ><i>&#xe610;</i>本地音乐</div>
    <div><i>&#xe616;</i>喜欢·歌单</div>
    <div><i>&#xe606;</i>下载</div>
    <div><i>&#xe64d;</i>最近</div>
</div>
<div class=button-group >
    <div><i style=background-color:#ffbd0d;>&#xe62c;</i>乐库</div>
    <div><i style=background:#2bcda2;>&#xe68c;</i>歌单</div>
    <div><i style=background:#3ab5f7;>&#xe6df;</i>电台·酷群</div>
    <div><i style=background:#e76ce8;>&#xe634;</i>猜你喜欢</div>
    <div><i style=background:#ff6565;>&#xeb85;</i>每日推荐</div>
    <div><i style=background:#ff852c;>&#xe603;</i>音乐圈</div>
</div>`.replace(/>\s+</g, "><");

render(page,{
    go
});

function main() {
    return page;
}