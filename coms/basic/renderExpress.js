function splitSeek(express) {
    var dist = [];
    var x = 0;
    express.forEach((e, i) => {
        if (i > x && /^\?/.test(e)) {
            var exp = express.slice(x, x = i);
            dist.push(exp);
        }
    });
    if (x < express.length) dist.push(express.slice(x, express.length));
    dist.forEach(d => d[0] = d[0].replace(/^\?/, ''))
    return dist;
}
function getTmpvar(explist) {
    var varset = {};
    explist.forEach(e => {
        e = e[0].replace(/^([^\.\[]]+)[\s\S]*$/, "$1");
        varset[e] = true;
    });
    var tmpvar = 'b', n = 0;
    while (tmpvar in varset) {
        tmpvar = 'b' + n++;
    }
    return tmpvar;
}
var autoDefine = false;
function createSeek(express, split = true) {
    var tmpvar = 'a', undef = '_', _null = '$';
    if (express.length <= 1) return express[0];
    var notmp = !/[\.\[\(\{]/.test(express[0]);
    if (express.length === 2) {
        if (split && /^\?/.test(express[1])) {
            if (notmp) return `typeof ${tmpvar}!=='undefined'&&${tmpvar}!==null?${tmpvar}:${express[1].slice(1)}`;
            return `function(${tmpvar},${undef}){return ${tmpvar}===${undef}||${tmpvar}===null?${express[1].slice(1)}:${tmpvar}}(${express[0]})`;
        }
        if (notmp) {
            tmpvar = express[0];
            if (autoDefine) {
                return `typeof ${tmpvar}==='undefined'||${tmpvar}===null?void 0:${tmpvar}${express[1]}`;
            }
            return `${tmpvar}===void 0||${tmpvar}===null?void 0:${tmpvar}${express[1]}`;
        };
        return `function(${tmpvar},${undef}){return ${tmpvar}===${undef}||${tmpvar}===null?${undef}:${tmpvar}${express[1]}}(${express[0]})`;
    }
    if (!split) {
        var dist = express.slice(1).map((search, i, a) => {
            return `if(${tmpvar}===${undef}||${tmpvar}===${_null})return;${tmpvar}=${tmpvar}${search};`;
        }).join('');
        dist = `function(${tmpvar},${_null},${undef}){${dist}return ${tmpvar}}(${express[0]},null)`;
        if (notmp && autoDefine) {
            dist = `typeof ${express[0]}==='undefined'&&${express[0]}===null?void 0:${dist}`;
        }
        return dist;
    }
    var explist = splitSeek(express);
    if (explist.length === 1) {
        return createSeek(explist[0], false);
    }
    tmpvar = getTmpvar(explist);
    var dist = explist.slice(0, explist.length - 1).map(express => {
        var dist = createSeek(express, false);
        return `${tmpvar}=${dist};if(${tmpvar}!==void 0&&${tmpvar}!==null)return ${tmpvar};`;
    }).join("") + `return ${createSeek(explist[explist.length - 1], false)}`;
    return `function(${tmpvar}){${dist}}()`;
}
function main(express, autodef = true) {
    autoDefine = autodef;
    if (!/\?\s*\.(?=[^\d])|\?\s*[\?\]\}\)\:\,=|%&;\>\<]|\?\s*$/.test(express)) return express;
    var reg = /\\[\s\S]|\?\s*([\.](?!\d)|\?|$|(?=[\?\]\}\)\:\,=|%&;\>\<\*\/]))|[\:\,\+\=\-\!%\^\|\/\&\*\!\;\?\>\<~\{\}\[\]\(\)'"`\s]/g;
    var cache = [], queue = [];
    var exp = [];
    var instr = false;
    var lastIndex = 0;
    var add_exp = function (s) {
        if (!exp.length) exp.push(s);
        else {
            var e = exp[exp.length - 1];
            if (!/[\.\?]\s*$/.test(e) && !/^\s*[\.'"`\[\(]/.test(s)) {
                queue.push(createSeek(exp));
                exp.splice(0, exp.length, '');
                e = '';
            }
            if (/\.$/.test(e) && /^[\[\("'`]/.test(s)) {
                e = e.replace(/\.$/, '');
            }
            e += s;
            exp[exp.length - 1] = e;
        }
    };
    var push_quote = function (m) {
        add_exp(m);
        cache.push(queue, exp);
        queue = [];
        exp = [];
    };
    var pop_quote = function (m) {
        add_punc('');
        exp = cache.pop();
        var e = queue.join("") + m;
        exp[exp.length - 1] += e;
        queue = cache.pop();
    };
    var add_punc = function (m) {
        if (exp.length) {
            var temp = createSeek(exp);
            queue.push(exp.length > 1 ? `(${temp})` : temp, m);
            exp = [];
        } else if (queue.length) {
            queue[queue.length - 1] += m;
        } else {
            queue.push(m);
        }
    };

    do {
        var match = reg.exec(express);
        if (!match) break;
        var index = match.index;
        var m = match[0];
        var isstr = false;
        if (/['"`\/]/.test(m)) {
            if (instr === m) instr = false;
            else if (!instr) instr = m;
        }
        if (instr) {
            continue;
        }
        if (/['"`\/]/.test(m)) {
            isstr = true;
            index++;
        }

        var str = express.slice(lastIndex, index);
        if (str) {
            add_exp(str);
        }
        lastIndex = match.index + m.length;
        if (match[1] || match[0] === '?' && (express.length <= lastIndex || /[\]\}\)\|\*\.\?&%\^\>\<\:\;\,]/.test(express.charAt(lastIndex)))) {
            exp.push(match[1]);
        }
        else if (/[\[\{\(]/.test(m)) {
            push_quote(m);
        }
        else if (/[\]\}\)]/.test(m)) {
            pop_quote(m);
        }
        else if (!isstr) {
            add_punc(m);
        }
    } while (true);
    var s = express.slice(lastIndex);
    if (s) add_exp(s);
    add_punc('');
    return queue.join("");
}