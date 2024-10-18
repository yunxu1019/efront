var extra_func = {
    total(a) {
        return +a
    },
    offset(a) {
        return +a
    },
    language(a) {
        a = atob(a);
        a = JSON.parse(a);
    }
}
var krc_parse = function (krc_text) {
    var saved_rows = [];
    var extra = {};
    krc_text = krc_text.trim();
    krc_text.split(/[\r\n]+/).map(function (row) {
        var data = /^\s*\[(.*?),(.*?)\](.*?)$/.exec(row);
        if (data) {
            var [, startTime, schedule, words] = data;
            var wordReg = /<(.*?),(.*?)(?:,.*?)?>([^<]*)/g;
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
            var data = /^\[([^\]\:,]+)[\:,]([^,\:\]]*)\]$/.exec(row);
            if (data) {
                var [, key, value] = data;
                if (!value) value = null;
                else if (extra_func.hasOwnProperty(key)) {
                    value = extra_func[key](value);
                }
                extra[key] = value;
            }
            else if (!isProduction) console.info("%c未解析%c", "color:#c28", "color:#333", row, data);
        }
    });
    saved_rows.extra = extra;
    return saved_rows;
}