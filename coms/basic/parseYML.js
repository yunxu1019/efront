
var eval2 = function (data) {
    if (typeof data === 'string') data = data.replace(/(\r\n|\r|\n)$/, '');
    if (/^(true|TRUE|True)$/.test(data)) data = true;
    else if (/^(False|false|FALSE)$/.test(data)) data = false;
    else if (/^(NULL|null|Null)$/.test(data)) data = null;
    else if (/^[\+\-]?(\d+|\d*\.\d+|\d+\.)(e[\-\+]?\d+)?$/.test(data)) data = parseNumber(data);
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
    var push = function (value) {
        if (!value) value = eval2(data);
        data = '';
        parents = parents.slice(0, span + 1);
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
        var spacesize = /^\s*/.exec(row)[0].length;
        if (spacesize === row.length) {
            rowtype = 0;
            continue;
        }
        if (!data && !prop) span = spacesize;
        row = row.trim();
        if (/^['"]$/.test(rowtype)) {
            var index = row.indexOf(rowtype);
            if (index < 0) {
                data += row + "\r\n";
                continue;
            }
            rowtype = 0;
            data += row.slice(0, index + 1);
            row = row.slice(index + 1)
            unshift(spacesize, row);
            continue;
        }
        if (rowtype === '|') {
            rowtype = spacesize;
            continue;
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
            rowtype = row[0];
            data += row.slice(1);
            continue;
        }
        if (/^\-\-+$/.test(row)) {
            continue;
        }

        if (/^\-(\s|$)/.test(row)) {
            if (data) push();
            if (!parents[spacesize]) {
                var obj = [];
                push(obj);
                parents[spacesize] = obj;
            } else {
                parents = parents.slice(0, spacesize + 1);
            }
            span = spacesize;
            rowtype = row[0];
            row = row.slice(1);
            unshift(spacesize + 1, row);
            continue;
        }
        var match = /^([\s\S]*?)\:(|\s+[\s\S]*)$/.exec(row);
        if (match) {
            if (data) push();
            if (prop) {
                var obj = {};
                push(obj);
                parents[spacesize] = obj;
            }
            span = spacesize;
            var [_, prop, value] = match;
            value = value.trim();
            if (value) {
                unshift(spacesize + 1, value);
            }
            prop = strings.decode(prop);
            continue;
        }
        if (row === "|") {
            rowtype = "|"
            continue;
        }
        data += row + "\r\n";
    }
    if (data) push();
    return parents[0];
}
function parseYML(text) {
    text = scan(text);
}
module.exports = parseYML;