var secret = [64, 71, 97, 119, 94, 50, 116, 71, 81, 54, 49, 45, 206, 210, 110, 105];
var isTrident = /Trident/i.test(navigator.userAgent);
function krc(list = div()) {
    care(list, function (info) {
        if (!info.krc) {
            remove(list.children);
            if (info.lrc) {
                var children = createLRC(info.lrc);
                appendChild(list, children);
                list.process = children.process;
            }
            else {
                list.process = Function.prototype;
                document.title = `${info.songName} - ${info.singerName}`;
            }
            return;
        }
        var content = info.krc.slice(4).map((a, i) => a ^ secret[i % 16]);
        var bufff = thirdParty$inflate(content.slice(2));
        var krc = decodeUTF8(bufff);
        remove(list.children);
        var children = createKRC(krc);
        appendChild(list, children);
        list.process = children.process;
    })
    return list;
}
function createLRC(lrc) {
    var saved_rows = [];
    var reg = /^\s*\[(.*?)\](.*?)$/;
    for (var row of lrc.split(/[\r\n]+/)) {
        var data = reg.exec(row);
        if (!data) {
            if (!isProduction) console.info("%c未解析%c", "color:#c28", "color:#333", row, data);
            continue;
        }
        var times = [];
        while (data) {
            var [, time, words] = data;
            times.push(time);
            data = reg.exec(words);
        }
        while (times.length) {
            var time = times.pop();
            var startTime = 0;
            let t = time.split(":");
            while (t.length) {
                startTime = startTime * 60 + +t.shift();
            }
            saveToOrderedArray(saved_rows, {
                value: startTime,
                startTime,
                text: words
            });
        }
    }
    var krcList = saved_rows.map(a => {
        var r = document.createElement('div');
        text(r, a.text);
        return r;
    });
    var savedIndex = 0;
    krcList.process = function (offset, length) {
        var index = getIndexFromOrderedArray(saved_rows, offset);
        var current_row = saved_rows[index];
        if (current_row) {
            var ele = krcList[index];
            var firstChild = krcList[0];
            if (index > 0) {
                if (index !== savedIndex) {
                    savedIndex = index;
                    setClass(krcList, index);
                }
            }
            if (ele && firstChild && firstChild.isMounted) {
                var marginTop = (firstChild.parentNode.offsetHeight - ele.offsetHeight >> 1) - ele.offsetTop + firstChild.offsetTop;
                css(firstChild, `margin-top:${marginTop | 0}px;`);
            }
        }
    };
    return krcList;
}

function setClass(krcList, index) {
    var ele = krcList[index];
    krcList.slice(0, index).map(function (a, cx, arr) {
        removeClass(a, "active after after-active before-active");
        addClass(a, "before");
    });
    removeClass(ele, "after before after-active before-active");
    addClass(krcList[index - 1], 'before-active');
    addClass(ele, "active");
    if (ele.innerText) document.title = ele.innerText;
    krcList.slice(index + 1).map(function (a) {
        removeClass(a, "before active after-active before-active");
        addClass(a, "after");
    });
    if (index + 2 < krcList.length) addClass(krcList[index + 1], 'after-active');
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
            if (!isProduction) console.info("%c未解析%c", "color:#c28", "color:#333", row, data);
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
            if (ele && firstChild && firstChild.isMounted) {
                var marginTop = (firstChild.parentNode.offsetHeight - ele.offsetHeight >> 1) - ele.offsetTop + firstChild.offsetTop;
                if (index > 0) {
                    if (markerLabel.parentNode !== ele) {
                        setClass(krcList, index);
                        ele.insertBefore(markerLabel, ele.firstChild);
                    }
                    var word_ele = ele.children[current_row_index + 1];
                    var rowData = current_words.map(a => a.label).join("");
                    if (text(markerLabel) !== rowData) {
                        text(markerLabel, rowData);
                    }
                    var widthRatio = (current_row_offset - current_row_word.value) / current_row_word.timeLength;
                    if (widthRatio > 1) {
                        widthRatio = 1;
                    }
                    var word_first = ele.children[1];
                    var targetWidth = (word_ele.offsetLeft - word_first.offsetLeft + word_ele.offsetWidth * widthRatio).toFixed(0);
                    if (+targetWidth !== freeOffset(markerLabel.style.width)) {
                        css(markerLabel, `width:${fromOffset(targetWidth)}`);
                    }
                    if (isTrident) {
                        css(markerLabel, `left:${fromOffset(ele.children[1].offsetLeft)}`);
                    }
                }
                css(firstChild, `margin-top:${marginTop | 0}px;`);
            }
        }
    };
    var markerLabel = document.createElement("div");
    return krcList;
}
function createCell(word) {
    var label = word.label;
    var cell = document.createElement("span");
    text(cell, label);
    return cell;
}
function createRow(data) {
    var row = document.createElement("div");
    var cells = data.words.map(createCell);
    appendChild(row, cells);
    return row;
}