var page = createVboxWithState(state);
page.innerHTML = `
<div class=option-buttons>
    <div ng-click="go('/extra/pending',this.innerText)">
        <div class=icon></div>
        <div class=name>${i18n('发现', "Discover")}</div>
    </div>
    <div ng-click="go('/extra/pending',this.innerText)">
        <div class=icon style=font-size:50px;></div>
        <div class=name>${i18n('我要唱', "Sing by Myself")}</div>
    </div>
    <div ng-click="go('/extra/pending',this.innerText)">
        <div class=icon></div>
        <div class=name>${i18n('我的', 'Mine')}</div>
    </div>
</div>
<div class=news-slider>
    <div class=head  ng-click="go('/extra/pending',this.innerText)">
        <span>${i18n('头条', 'First Line')}</span>
        ${i18n("装了这个app，不用再去ktv", "With this app installed, you don't have to go to KTV anymore.")}
        <i>&#xe602;</i>
    </div>
</div>
<div class=slider-options>
    <div ng-click="go('/extra/pending',this.innerText)">${i18n('关注', 'Follow')}</div>
    <div ng-click="go('/extra/pending',this.innerText)">${i18n('好友', 'Friends')}</div>
    <div ng-click="go('/extra/pending',this.innerText)">${i18n('热门', 'Hot')}</div>
    <div ng-click="go('/extra/pending',this.innerText)">${i18n('附近', 'Nearby')}</div>
</div>
<div class=message-list>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
`.replace(/>\s+</g, "><");
render(page, {
    go
});
function main() {
    return page;
}