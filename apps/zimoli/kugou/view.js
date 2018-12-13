var page = createVboxWithState(state);
page.innerHTML = `<div class=rank-area >
    <div>
        <div class=head>${i18n("小时榜", "Rank")}</div>
        <div class=disp>${i18n("统计本小时主播的收礼排名", "Statistical Hour Anchor's Gift Ranking.")}</div>
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
        <div class=name>${i18n("新秀", "Rising")}</div>
    </div>
    <div>
        <div class=icon></div>
        <div class=name>${i18n("附近", "Nearby")}</div>
    </div>
    <div>
        <div class=icon></div>
        <div class=name>${i18n("好声音", "Pleasant")}</div>
    </div>
    <div>
        <div class=icon></div>
        <div class=name>${i18n("搜索", "Search")}</div>
    </div>
    <div>
        <div class=icon></div>
        <div class=name>${i18n("我的", "Mine")}</div>
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