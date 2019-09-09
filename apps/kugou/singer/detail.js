var _titlebar = titlebar(" ");
css(_titlebar, "background:transparent");
var tbar = _titlebar.children[0];
var page = createVboxWithState(state);
page.initialStyle = "margin-left:100%";
bindScroll(_titlebar, page);
function main({ _text, href }) {
    document.title = _text;
    text(_titlebar.children[0], _text);
    remove([].slice.call(page.children, 0));
    cross("get", href, { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1" }).done(function (xhr) {
        var bodyHTML = String(xhr.responseText || xhr.responseText || "").replace(RegBodyExp, "$1").replace(RegScriptExp, "").replace(/\son/ig, " no").replace(/\s(_?src|href)/g, " s$1");
        var sandbox = createElement(div);
        sandbox.innerHTML = bodyHTML;
        var topImgSrc = String(xhr.responseText || xhr.responseText || "").replace(/^[\s\S]*\s*singerPic\s*\=\s*(['"`])(.*?)\1[\s\S]*$/, '$2');
        var imageBox = createWithClass(div, "top-image");
        css(imageBox, {
            backgroundImage: `url(${topImgSrc})`
        });
        appendChild(page, imageBox);
        var songsList = [].map.call(sandbox.querySelector(".singer-songs-list").children, function (child) {
            var id = child.getAttribute("id");
            var name = child.children[0].innerText.replace(/^\s*|\s*$/g, "");
            var item = createWithClass(div, "song");
            text(item, name);
            item.hash = id.replace(/^songs_(.*?)$/g, "$1");
            onclick(item, function () {
                kgplayer.play(this.hash);
            });
            return item;
        });
        appendChild(page, songsList);
    });
    return page;
}