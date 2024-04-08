var { STAMP, STRAP, createString } = require("./common");
var suggest = {
    "while($2[$1++]!==$3)": "while($1<$2.length&&$2[$1++]!==$3)",
    "while($2[$1]!==$3)$1++": "while($1<$2.length&&$2[$1]!==$3)$1++"
};
var roles = Object.keys(suggest).map(s => {
    var r = scanner2(s);
    var { used, envs } = r;
    for (var k in envs) {
        used[k].forEach(f => {
            f.suggest = /^\$\d+$/.test(f.text) ? f.text : null;
        });
    }
    r.suggest = scanner2(suggest[s]);
    return r;
});
var match = function (role, c, nameMap = {}) {
    var temp = role.first;
    var matched = [];
    while (temp) {
        if (!c || c.type !== temp.type) return;
        if (temp.suggest) {
            var name = temp.suggest;
            if (name in nameMap) {
                if (nameMap[name] !== c.text) return;
            }
            else nameMap[name] = c.text;
        }
        else {
            if (temp.entry !== c.entry && temp.leave !== c.leave && temp.text !== c.text) return;
            if (temp.length) {
                if (temp.length !== c.length) return;
                if (!match(temp, c.first, nameMap)) return;
            }
        }
        temp = temp.next;
        matched.push(c);
        c = c.next;
    }
    if (role.suggest) {
        var { used } = role.suggest;
        for (var k in nameMap) {
            if (used[k]) patchlist('', used[k], nameMap[k]);
        }
        matched.suggest = createString(role.suggest);
    }
    return matched;
}
var audit = function (code) {
    var checked = [];
    for (var r of roles) {
        var rest = [code];
        while (rest.length) {
            var c = rest.pop();
            if (c.length) {
                rest.push.apply(rest, c);
            }
            var m = match(r, c);
            if (!m) continue;
            checked.push(m);
        }
    }
    return checked;
};
