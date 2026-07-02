
var strings = require("./strings");
var decode = strings.decode;
var decodeString = function (str) {
    if (/^[^"']|^""[\s\S]+/.test(str)) return str.replace(/""/g, '"');
    return decode(str);
};
var eval2 = function (data) {
    if (typeof data === 'string') data = data.replace(/(\r\n|\r|\n)$/, '');
    if (!data) return null;
    if (/^(true|TRUE|True)$/.test(data)) data = true;
    else if (/^(False|false|FALSE)$/.test(data)) data = false;
    else if (/^(NULL|null|Null)$/.test(data)) data = null;
    else if (
        /^[\+\-]?(\d+|\d*\.\d+|\d+\.)(e[\-\+]?\d+)?$/i.test(data) ||
        /^(0b[01]+|0x[\da-f]+|0o[0-7]+)$/i.test(data)
    ) data = parseNumber(data);
    else data = decodeString(data);
    return data;
};
var createDecoder = function (text) {
    var rows = text.split(/\r\n|\r|\n/).reverse();
    var rowtype = 0;
    var data = '';
    var span = 0;
    var prop;
    var parents = [];
    var jsonlikes = [];
    var done = false;
    var row, prop, spacesize;
    var total = rows.length;
    var result = null;
    var push = function (value) {
        if (data && prop === undefined && jsonlikes[jsonlikes.length - 1] === '{') {
            prop = decodeString(data);
            data = '';
        }
        if (!value) {
            if (/^['"]$/.test(rowtype) && !jsonlikes.length) data = rowtype + data + rowtype;
            value = eval2(data);
        }
        data = '';
        while (parents.length) {
            if (parents[parents.length - 1]) break;
            parents.pop();
        }
        if (prop !== undefined) {
            if (!parents.length) parents.push({});
            var parent = parents[parents.length - 1];
            if (parent instanceof Array) {
                parent.push({});
                parent = parent[parent.length - 1];
                parents[span] = parent;
            }
            parent[prop] = value;
        } else {
            var parent = parents[parents.length - 1];
            if (parent instanceof Array) parent.push(value);
            else parents[span] = value;
        }
        prop = undefined;
    };
    var unshift = function (size, row) {
        if (!row) return;
        row = new Array(size + 1).join(" ") + row;
        rows.push(row);
    };
    var next = function () {
        if (!rows.length) {
            if (done) return;
            if (data || prop) push();
            while (parents[0] === undefined && parents.length > 0) parents.shift();
            result = parents[0];
            done = true;
            return;
        }
        row = rows.pop();
        isjson = false;
        if (/^['"]$/.test(rowtype)) {
            var isjson = !!jsonlikes.length || !data
            if (isjson) {
                var reg = new RegExp(/\\[\s\S]|/.source + rowtype, 'g');
                var index = -1;
                do {
                    var res = reg.exec(row);
                    if (res && res[0] === rowtype) {
                        index = res.index;
                        break;
                    }
                } while (res);
            } else {
                index = row.indexOf(rowtype);
            }
            if (index < 0) {
                data += row + "\r\n";
                return;
            }
            data += row.slice(0, index + +!!jsonlikes.length);
            if (index == 0 && !data) data = rowtype + rowtype;
            row = row.slice(index + 1);
            if (!row) push();
            else unshift(spacesize, row);
            rowtype = 0;
            return;
        }

        spacesize = /^\s*/.exec(row)[0].length;
        if (spacesize === row.length) {
            rowtype = 0;
            if (prop || data) push();
            return;
        }
        if (!data && prop === undefined && !jsonlikes.length) {
            span = spacesize;
            parents = parents.slice(0, span + 1);
        }

        row = row.trim();
        if (rowtype === '|') {
            rowtype = spacesize;
        }
        if (rowtype && spacesize >= rowtype) {
            data += row + "\r\n";
            return;
        }
        rowtype = 0;
        if (/^#/.test(row)) {
            // comment 
            return;
        }
        if (/^["']/.test(row)) {
            if (data) push();
            rowtype = row[0];
            if (jsonlikes.length) {
                data += row[0];
            }
            row = row.slice(1);
            unshift(0, row);
            return;
        }
        if (/^\-\-+$/.test(row)) {
            return;
        }

        if (/^\-(\s|$)/.test(row)) {
            if (data || span && span > spacesize) push();
            if (!parents[spacesize]) {
                var obj = [];
                push(obj);
                parents[spacesize] = obj;
            } else {
                parents = parents.slice(0, spacesize + 1);
            }
            span = spacesize;
            parents = parents.slice(0, span + 1);
            rowtype = row[0];
            row = row.slice(1);
            unshift(spacesize + 1, row);
            return;
        }
        if (!data && /^[\[\{]/.test(row)) {
            var obj = row[0] === "{" ? {} : [];
            push(obj);
            parents.push(obj);
            jsonlikes.push(row[0]);
            row = row.slice(1);
            unshift(spacesize + 1, row);
            return;
        }

        if (jsonlikes.length) {
            var match = /^\:|[\]\},]|\:[\s\[\{]/.exec(row);
            if (match) {
                if (match.index > 0) {
                    data += row.slice(0, match.index);
                    row = row.slice(match.index);
                }
                var pre = row[0];
                row = row.slice(1);
                if (pre === ":") {
                    prop = decodeString(data);
                    data = '';
                }
                else {
                    switch (pre) {
                        case ",":
                            push();
                            break;
                        case "]":
                            if (jsonlikes[jsonlikes.length - 1] !== "[") console.warn(i18n`数据存在错误！`, jsonlikes, pre);
                            if (data) push();
                            jsonlikes.pop();
                            parents.pop();
                            break;
                        case "}":
                            if (jsonlikes[jsonlikes.length - 1] !== "{") console.warn(i18n`数据存在错误！`, jsonlikes, pre);
                            if (prop !== undefined || data) push();
                            jsonlikes.pop();
                            parents.pop();
                            break;
                    }
                }
                if (row) unshift(0, row);
                if (!jsonlikes.length) return;
                if (pre === ']' || pre === '}') {
                    row = rows.pop();
                    row = row.replace(/^\s*,/, '');
                    if (row) rows.push(row);
                }
            }
            return;
        }
        else {
            var match = /^([\s\S]*?)\:(|\s+[\s\S]*)$/.exec(row);
            if (data && !match) match = /^()\:([\s\S]*)$/.exec(row);
            if (match) {
                if (data && !!match[1] || prop && span >= spacesize) push();
                if (prop) {
                    var obj = {};
                    push(obj);
                    parents[spacesize] = obj;
                }
                var value;
                [, prop, value] = match;
                if (!prop) prop = data, data = '';
                value = value.trim();
                if (value) {
                    unshift(spacesize + 1, value);
                }
                prop = decodeString(prop);
                span = spacesize;
                parents = parents.slice(0, span + 1);
                return;
            }
        }

        if (row === "|" || row === ">") {
            rowtype = "|"
            return;
        }
        if (row) data += row + "\r\n";
    }
    return {
        next,
        get index() {
            return total - rows.length;
        },
        get total() {
            return total;
        },
        get done() {
            return done
        },
        get value() {
            return result;
        }
    };
}
var scan = function (text) {
    var decoder = createDecoder(text);
    while (!decoder.done) decoder.next();
    return decoder.value;
};
scan.yield = createDecoder;

module.exports = scan;