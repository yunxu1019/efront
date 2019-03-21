var load = function (text) {
    var page = grap(/class="pagelist"[\s\S]*?class='current'[\s\S]*?href='([^'"`]*)'/ig,
        text, (m, href) => ({ href: "https:" + href }));
    var result = grap(/class="audio-name">([^'"`\<]*)[\s\S]*?([^'"`]*?\.mp3)\b[\s\S]*?<\/li>/ig,
        text, (m, name, href) => ({ name: name + ".mp3", href: 'https:' + href }));
    download(result, "d:\\work\\audios").then(function () {
        if (page.length > 0) {
            console.log(page[0]);
            init(page[0].href, load);
        }
    });
};
init("https://ibaotu.com/yinxiao/10-0-0-0-0-223.html", load);