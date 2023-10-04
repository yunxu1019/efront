function readCSV(data) {
    var reg = /""?|,|\r\n|\r|\n|\u2028|\u2029/g;
    var str = [];
    var instr = false;
    var lastIndex = 0;
    var row = [];
    var table = [];
    while (true) {
        var m = reg.exec(data);
        if (!m) break;
        var s = data.slice(lastIndex, m.index);
        lastIndex = reg.lastIndex;
        if (s) str.push(s);
        switch (m[0]) {
            case `""`:
                str.push('"');
                break;
            case `"`:
                instr = !instr;
                break;
            case `,`:
                if (instr) {
                    str.push(',');
                }
                else {
                    row.push(str.join(''));
                    str = [];
                }
                break;
            case "\r\n":
            case "\r":
            case "\n":
            case "\u2028":
            case "\u2029":
                if (instr) {
                    str.push("\r\n");
                }
                else {
                    row.push(str.join(""));
                    table.push(row);
                    row = [];
                    str = [];
                }
                break;
        }
    }
    if (str.length || row.length) row.push(str.join(''));
    if (row.length) table.push(row);
    row = [];
    str = [];
    var fields = table.shift();
    if (fields) fields = fields.map((a, i) => { return { name: a, key: i } })
    return Table.from(fields, table);
}