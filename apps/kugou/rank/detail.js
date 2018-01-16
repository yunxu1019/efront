var page = createVboxWithState(state);
function main({ _text, href }) {
    document.title = _text;
    remove([].slice.call(page.children, 0));
    cross("get", href).done(function (xhr) {
        var bodyHTML = String(xhr.responseText || xhr.responseText || "").replace(RegBodyExp, "$1").replace(RegScriptExp, "").replace(/\son/ig, " no").replace(/\s(src|href)/g, " s$1");
        var sandbox = createElement(div);
        sandbox.innerHTML = bodyHTML;
        var topPict = sandbox.getElementsByClassName("rank-info-hd")[0];
        var topImgSrc = topPict.children[0].getAttribute("ssrc");
        var lastUpdateTime = topPict.children[1].innerText.replace(/^\s*|\s*$/g, "");
        var imageBox = createWithClass(div, "top-image");
        css(imageBox, {
            backgroundImage: `url(${topImgSrc})`
        })
        appendChild(page, imageBox);
        var songsList = [].map.call(sandbox.getElementsByClassName("panel-songslist")[0].children, function (child) {
            var id = child.getAttribute("id");
            var name = child.children[0].innerText.replace(/^\s*|\s*$/g, "");
            var item = createWithClass(div, "song");
            text(item, name);
            return item;
        });
        appendChild(page, songsList);
    });
    return page;
}