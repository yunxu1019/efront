var page = createVboxWithState(state);

cross("get", "http://m.kugou.com/").done(function (xhr) {
    var bodyHTML = String(xhr.responseText || xhr.responseText || "").replace(RegBodyExp, "$1").replace(RegScriptExp, "").replace(/\son/ig, " no").replace(/\s(src|href)/g, " s$1");
    var sandbox = createElement(div);
    sandbox.innerHTML = bodyHTML;
    var images = [].map.call(sandbox.querySelector(".mod-slider").children[0].children, function (child) {
        var a = child.children[0];
        var src = a.children[0].getAttribute("ssrc");
        var href = a.getAttribute("shref");
        var image = createElement(div);
        css(image, `background:url('${src}') center no-repeat;background-size:contain;`)

        return image;
    });
    var _slider = slider(images).go(0).play();
    css(_slider, "height:" + (window.innerWidth * 0.38) + "px;max-height:240px;");
    appendChild(page, _slider);
    var songs = [].map.call(sandbox.querySelector(".panel-songslist").children, function (child) {
        var id = child.getAttribute("id");
        var [singer, song] = child.children[0].innerText.split(/\s*\-\s*/);
        var block = createElement(div);
        var _singer = createElement(div);
        var _song = createElement(div);
        text(_singer, singer.trim());
        text(_song, song.trim());
        appendChild(block, _singer, _song);
        block.hash = id.replace(/^songs_(.*?)$/g, "$1");
        onclick(block, function () {
            kgplayer.play(this.hash);
        });
        return block;
    });
    var _songsList = createElement(div);
    addClass(_songsList, "list");
    appendChild(_songsList, songs);
    appendChild(page, _songsList);
});

function main() {
    return page;
}