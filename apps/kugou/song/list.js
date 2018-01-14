var page = vbox();

cross("get", "http://m.kugou.com/").done(function (xhr) {
    var bodyHTML = String(xhr.responseText || xhr.responseText || "").replace(/^.*?<body>(.*?)<\/body>.*?$/, "$1").replace(/<script.*?<\/script>/g, "").replace(/\son/ig, " no").replace(/\s(src|href)/g, " s$1");
    var sandbox = createElement(div);
    sandbox.innerHTML = bodyHTML;
    var images = [].map.call(sandbox.getElementsByClassName("mod-slider")[0].children[0].children, function (child) {
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
    var songs = [].map.call(sandbox.getElementsByClassName("panel-songslist")[0].children, function (child) {
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
            play(this.hash);
        });
        return block;
    });
    var _songsList = createElement(div);
    addClass(_songsList, "list");
    appendChild(_songsList, songs);
    appendChild(page, _songsList);
});
var getMusicInfo = function (hash) {
    return cross("get", `http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}&from=mkugou`);
};
var getLrc = function () {
    `http://m.kugou.com/app/i/krc.php?cmd=100&keyword=%E9%99%88%E6%98%9F%E3%80%81%E5%BC%A0%E7%BF%94%E8%BD%A9%20-%20%E5%86%B3%E4%B8%8D%E5%9B%9E%E5%A4%B4&hash=77AFF2715498A86AA28AC2DAA29C3FEB&timelength=280000&d=0.2984004589282503`;
};
var getSingerAvatar = function () {
    `http://tools.mobile.kugou.com/api/v1/singer_header/get_by_hash?hash=77AFF2715498A86AA28AC2DAA29C3FEB&size=200&format=jsonp&callback=kgJSONP857041635`;
};
var oncanplay = on("canplay"), ondataloaded = on("loadeddata");
var play = function (hash) {
    /**
     * ios 只能由用户创建audio，所以请在用户触发的事件中调用play方法
     */
    var audio = document.createElement("audio");

    getMusicInfo(hash).done(function (xhr) {
        var data = JSON.parse(xhr.responseText);
        ondataloaded(audio, function () {
        });
        oncanplay(audio, function () {
            audio.play();
        })
        audio.src = data.url;
        audio.load();
    });
    // audio.autoplay = true;
    audio.play();
    // appendChild(document.body, audio);
};
function main() {
    return page;
}