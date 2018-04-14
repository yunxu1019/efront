var secret = [64, 71, 97, 119, 94, 50, 116, 71, 81, 54, 49, 45, 206, 210, 110, 105];
function krc(info) {
    cross("get", `http://lyrics.kugou.com/search?ver=1&man=yes&client=pc&keyword=${info.songName}&duration=${info.time}&hash=${info.hash}`).done(function (response) {
        var liric = JSON.parse(response.response);
        var info = liric.candidates[0];
        if (!info) return;
        var url = `http://lyrics.kugou.com/download?ver=1&client=pc&id=${info.id}&accesskey=${info.accesskey}&fmt=krc&charset=utf8`;
        info && cross("get", url).done(function (response) {
            var krc = JSON.parse(response.response);
            var content = fromBase64(krc.content);
            content = content.slice(4).map((a, i) => a ^ secret[i % 16]);
            var bufff = inflate(content.slice(2));
            var saved_time = new Date;
            var krc = decodeUTF8(bufff);
            remove(list.children);
            var children = createKRC(krc);
            appendChild(list, children);
            list.process = children.process;
        });
    });
    var list = div();
    return list;
}
function createKRC(krc) {
    var saved_rows = [];
    krc.split(/[\r\n]+/).map(function (row) {
        var data = /^\s*\[(.*?),(.*?)\](.*?)$/.exec(row);
        if (data) {
            var [, startTime, schedule, words] = data;
            var wordReg = /<(.*?),(.*?),.*?>([^<]*)/g;
            var saved_words = [];
            do {
                var word = wordReg.exec(words);
                if (word) {
                    var [, timeBegin, timeLength, label] = word;
                    saveToOrderedArray(saved_words, {
                        value: +timeBegin,
                        timeBegin: +timeBegin,
                        timeLength: +timeLength,
                        label
                    });
                }
            } while (word);
            saveToOrderedArray(saved_rows, {
                value: +startTime,
                startTime: +startTime,
                schedule: +schedule,
                words: saved_words
            });
        } else {
            console.warn(row, data, "error");
        }
    });
    var krcList = saved_rows.map(createRow);
    krcList.process = function (offset, length) {
        var offsetMTime = offset * 1000 | 0;
        var index = getIndexFromOrderedArray(saved_rows, offsetMTime);
        var current_row = saved_rows[index];
        if (current_row) {
            var current_value = current_row.value;
            var current_row_offset = offsetMTime - current_value;
            var current_words = current_row.words;
            var current_row_index = getIndexFromOrderedArray(current_words, current_row_offset);
            var current_row_word = current_words[current_row_index];
            var ele = krcList[index];
            var firstChild = krcList[0];
            if (firstChild && firstChild.isMounted) {
                var marginTop = (firstChild.parentNode.offsetHeight - ele.offsetHeight >> 1) - ele.offsetTop + firstChild.offsetTop;
                css(krcList[0], `margin-top:${marginTop | 0}px;color:#ccc;`)
            }
        }
    };
    return krcList;
}
function createCell(word) {
    var label = word.label;
    var cell = createElement("span");
    text(cell, label);
    return cell;
}
function createRow(data) {
    var row = createElement(div);
    var cells = data.words.map(createCell);
    appendChild(row, cells);
    return row;
}