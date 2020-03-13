var page = div();
page.innerHTML = list;
var scope = {
    slider,
    songs: [],
    padding,
    list: zimoli$lattice,
    song: kugou$song,
    musicList: kugou$musicList,
    play(info) {
        kgplayer.play(info.hash);
    }
};
// data.asyncInstance("slider-src").loading_promise.then(function (data) {
//     var images = data.map(({ src }) => {
//         var image = div();
//         css(image, `background:url('${src}') center no-repeat;background-size:contain;`)
//         return image;
//     });
//     var _slider = slider(images).go(0).play();
//     appendChild(page, _slider);
// });
data.asyncInstance("songs-list").loading_promise.then(function (data) {
    var songs = data.map(function (data) {
        var [singer, name] = data.name.split(/\s*\-\s*/);
        var hash = data.id.replace(/^songs_(.*?)$/g, "$1");
        return { singer, name, hash };
    });
    scope.songs = songs;
    render.refresh();
});
render(page, scope);

function main() {
    return page;
}