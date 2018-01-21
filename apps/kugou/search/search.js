css(titlebar("搜索"), { backgroundColor: "rgb(44, 162, 249)" });
var inputBox = createWithClass(div, "input-box");
var textInput = createWithClass(input, "input");
appendChild(inputBox, textInput);
var page = createVboxWithState(state);
appendChild(page, inputBox);
var hot_keywords = [/*热搜*/], history_keywords = state().keywords || [];
var keywords_pad = createWithClass(div, "keyword-pad");
var updateKeywords = function () {
    remove(keywords_pad.children);
    var keywords = history_keywords.concat(hot_keywords).map(function (str) {
        var label = div();
        text(label, str);
        onclick(label, function () {
            textInput.value = str;
            dispatch(textInput, "input");
        });
        return label;
    });
    appendChild(keywords_pad, keywords);
};
appendChild(page, keywords_pad);
var result_pad = createWithClass(div, "result-pad");

var getKugouJsonpData = function (xhr) {
    return JSON.parse(String(xhr.responseText || xhr.response || "").replace(/^.*?\(([\s\S]*?)\)$/, "$1")).data;
};
var updateHotKeyword = function () {
    cross("get", "http://mobilecdn.kugou.com/api/v3/search/hot?format=jsonp&plat=0&count=30&callback=kgJSONP").done(function (xhr) {
        var data = getKugouJsonpData(xhr);
        hot_keywords = data.info.map(a => a.keyword);
        updateKeywords();
    });
};
var updateResultWithKeyword = function () {
    var keyword = textInput.value;
    if (updateResultWithKeyword.ing) updateResultWithKeyword.ing.abort();
    updateResultWithKeyword.ing = cross("get", `http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword=${encodeURIComponent(keyword)}&page=1&pagesize=30&showtype=1&callback=kgJSONP`).done(function (xhr) {
        if (keyword !== textInput.value) return;
        var data = getKugouJsonpData(xhr);
        remove(result_pad.children);
        var songs = data.info.map(function (data) {
            var singer = String(data.singername);
            var song = String(data.songname);
            var block = createElement(div);
            var _singer = createElement(div);
            var _song = createElement(div);
            text(_singer, singer.trim());
            text(_song, song.trim());
            appendChild(block, _singer, _song);
            block.hash = data.hash;
            onclick(block, function () {
                kgplayer.play(this.hash);
            });
            return block;
        });
        appendChild(result_pad, songs)
    });
};
var input_timer = 0;
oninput(textInput, function () {
    clearTimeout(input_timer);
    var value = textInput.value;
    if (value) {
        updateResultWithKeyword.ing && updateResultWithKeyword.ing.abort();
        input_timer = setTimeout(function () {
            if (textInput.value === value) updateResultWithKeyword(value);
        }, 300);
        appendChild(page, result_pad);
        remove(keywords_pad);
    } else {
        remove(result_pad);
        appendChild(page, keywords_pad);
    }
});
onback(function () {
    textInput.value = "";
});
onappend(function () {
    textInput.value = state.keyword || "";
    dispatch(textInput, "input");
});
onremove(function () {
    var _state = state();
    _state.keyword = textInput.value;
    state(_state);
});
updateHotKeyword();
function main() {
    return page;
}