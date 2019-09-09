var page = createVboxWithState(state);
data.asyncInstance("slider-src").loading_promise.then(function (data) {
    var images = data.map(({ src }) => {
        var image = div();
        css(image, `background:url('${src}') center no-repeat;background-size:contain;`)
        return image;
    });
    var _slider = slider(images).go(0).play();
    appendChild(page, _slider);
});
data.asyncInstance("songs-list").loading_promise.then(function (data) {
    var songs = data.map(function (data) {

        var block = createElement(div);
        var _singer = createElement(div);
        var _song = createElement(div);
        var [singer, song] = data.name.split(/\s*\-\s*/);
        text(_singer, singer);
        text(_song, song);
        appendChild(block, _singer, _song);
        block.hash = data.id.replace(/^songs_(.*?)$/g, "$1");
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