
var strings = require("./strings");
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
    else data = strings.decode(data);
    return data;
};
var scan = function (text) {
    var rows = text.split(/\r\n|\r|\n/);
    var rowtype = 0;
    var data = '';
    var span = 0;
    var prop;
    var parents = [];
    var jsonlikes = [];
    var push = function (value) {
        if (data && prop === undefined && jsonlikes[jsonlikes.length - 1] === '{') {
            prop = strings.decode(data);
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
        rows.unshift(row);
    };
    while (rows.length) {
        var row = rows.shift();

        if (/^['"]$/.test(rowtype)) {
            if (jsonlikes.length) {
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
                continue;
            }
            data += row.slice(0, index + +!!jsonlikes.length);
            row = row.slice(index + 1);
            if (!row) push();
            else unshift(spacesize, row);
            rowtype = 0;
            continue;
        }

        var spacesize = /^\s*/.exec(row)[0].length;
        if (spacesize === row.length) {
            rowtype = 0;
            if (prop || data) push();
            continue;
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
            continue;
        }
        rowtype = 0;
        if (/^#/.test(row)) {
            // comment 
            continue;
        }
        if (/^["']/.test(row)) {
            if (data) push();
            rowtype = row[0];
            if (jsonlikes.length) {
                data += row[0];
            }
            row = row.slice(1);
            unshift(0, row);
            continue;
        }
        if (/^\-\-+$/.test(row)) {
            continue;
        }

        if (/^\-(\s|$)/.test(row)) {
            if (data || span && span >= spacesize) push();
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
            continue;
        }
        if (!data && /^[\[\{]/.test(row)) {
            var obj = row[0] === "{" ? {} : [];
            push(obj);
            parents.push(obj);
            jsonlikes.push(row[0]);
            row = row.slice(1);
            unshift(spacesize + 1, row);
            continue;
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
                    prop = strings.decode(data);
                    data = '';
                }
                else {
                    switch (pre) {
                        case ",":
                            push();
                            break;
                        case "]":
                            if (jsonlikes[jsonlikes.length - 1] !== "[") console.warn('数据存在错误！', jsonlikes, pre);
                            if (data) push();
                            jsonlikes.pop();
                            parents.pop();
                            break;
                        case "}":
                            if (jsonlikes[jsonlikes.length - 1] !== "{") console.warn("数据存在错误！", jsonlikes, pre);
                            if (prop !== undefined || data) push();
                            jsonlikes.pop();
                            parents.pop();
                            break;
                    }
                }
                if (row) unshift(0, row);
                if (!jsonlikes.length) continue;
                if (pre === ']' || pre === '}') {
                    row = rows.shift();
                    row = row.replace(/^\s*,/, '');
                    if (row) rows.unshift(row);
                }
            }
            continue;
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
                var [_, prop, value] = match;
                if (!prop) prop = data, data = '';
                value = value.trim();
                if (value) {
                    unshift(spacesize + 1, value);
                }
                prop = strings.decode(prop);
                span = spacesize;
                parents = parents.slice(0, span + 1);
                continue;
            }
        }

        if (row === "|" || row === ">") {
            rowtype = "|"
            continue;
        }
        if (row) data += row + "\r\n";
    }
    if (data || prop) push();
    while (parents[0] === undefined && parents.length > 0) parents.shift();
    return parents[0];
}
module.exports = scan;