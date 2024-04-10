var { STAMP, getDeclared, STRAP, SCOPED, QUOTED, snapSentenceHead, pickSentence, createString, getBodyWith } = require("./common");
var suggest = {
    "while($2[$1++]!==$3)": "while($1<$2.length&&$2[$1++]!==$3)",
    "while($2[$1]!==$3)$1++": "while($1<$2.length&&$2[$1]!==$3)$1++",
    "arguments"(matched) {
        var m = matched[0];
        var body = getBodyWith(m, 'arguments');
        var head = body.prev;
        if (!head?.length || body.checked) return;
        body.checked = true;
        var { used, args } = body.scoped;
        if (!args?.length) return;
        var broken = false;
        a: for (var a of args) {
            if (!used[a]) {
                continue;
            }
            for (var u of used[a]) {
                if (u.equal) {
                    broken = true;
                    break a;
                }
            }
        }
        if (!broken) return;
        var h = snapSentenceHead(body);
        var matched = [];
        while (h && h !== body) {
            matched.push(h);
            h = h.next;
        }
        matched.suggest = `${createString(matched.slice(0, matched.length - 1))}(){\r\n      var[${createString(head)}]=arguments;\r\n      // ${i18n`后续代码`}..\r\n  }`;
        return matched;
    }
};

var regSuggest = function (c) {
    if (c.type !== QUOTED) return;
    var flag = /\/(\w+)$/.exec(c.text)?.[1];
    if (!flag || !/g\w*$/.test(flag)) return;
    var h = snapSentenceHead(c);
    if (h.type === STRAP || /^(var|let|const)$/.test(h)) {
        h = h.next;
    }
    if (!h.equal) return;
    var [args] = getDeclared(h);
    var scoped = getBodyWith(c, args[0]).scoped;
    if (!scoped?.await && !scoped.yield) return;
    var matched = [c];
    matched.suggest = `new RegExp(${c.text.slice(0, c.text.length - flag.length)}.source,"${flag}")`;
    return matched;
};

var roles = Object.keys(suggest).map(s => {
    var r = scanner2(s);
    var { used, envs } = r;
    for (var k in envs) {
        used[k].forEach(f => {
            f.sname = /^\$\d+$/.test(f.text) ? f.text : null;
        });
    }
    s = suggest[s];
    if (typeof s === 'string') r.suggest = scanner2(s);
    else r.suggest = s;
    return r;
}).concat(regSuggest);
var match = function (role, c, nameMap = {}) {
    var temp = role.first;
    var matched = [];
    if (typeof role === 'function') {
        return role(c);
    }
    while (temp) {
        if (!c || c.type !== temp.type) return;
        if (temp.sname) {
            var name = temp.sname;
            if (name in nameMap) {
                if (nameMap[name] !== c.text) return;
            }
            else nameMap[name] = c.text;
        }
        else {
            if (temp.entry !== c.entry || temp.leave !== c.leave || temp.text !== c.text) return;
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
        if (isFunction(role.suggest))
            return role.suggest(matched);
        var { used } = role.suggest;
        for (var k in nameMap) {
            if (used[k]) patchlist('', used[k], nameMap[k]);
        }
        matched.suggest = createString(role.suggest);
    }
    return matched;
}
var audit = function (code) {
    code.scoped;
    var checked = [];
    for (var r of roles) {
        var rest = [code];
        while (rest.length) {
            var c = rest.pop();
            if (c.length) {
                var a = c.slice().reverse();
                rest.push.apply(rest, a);
            }
            var m = match(r, c);
            if (!m) continue;
            checked.push(m);
        }
    }
    return checked;
};
