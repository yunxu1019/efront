function splitSeek(express) {
    var dist = [];
    var x = 0;
    var called = false;
    express.forEach((e, i) => {
        if (isArray(e)) called = true;
        if (i > x && /^\?/.test(e)) {
            var exp = express.slice(x, x = i);
            exp.called = called;
            dist.push(exp);
            called = false;
        }
    });
    if (x < express.length) dist.push(express.slice(x, express.length));
    dist[dist.length - 1].called = called;
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
function joinsharp(sharped, ctx) {
    var willcall = [], call = false;
    for (var cx = 1, dx = sharped.length; cx < dx; cx++) {
        if (/^\(/.test(sharped[cx])) {
            var p = sharped[cx - 1];
            if (/\)$/.test(p)) continue;
            if (cx > 1 || /\./.test(p)) willcall[cx] = true;
        }
    }
    var result = [];
    var will = false, call = false;
    if (sharped[sharped.length - 1] === '.') sharped[sharped.length - 1] = "";
    for (var cx = 0, dx = sharped.length; cx < dx; cx++) {
        var s = sharped[cx];
        var plus = /^\//.test(s);
        if (plus) s = s.slice(1);
        call = will;
        will = willcall[cx + 1];
        if (will) {
            if (/\]/.test(s)) {
                s = [s];
                s.unshift('');
            }
            else {
                s = s.split('.');
                if (s.length > 1) {
                    s.unshift(s.splice(0, s.length - 1).join('.'));
                    s[1] = '.' + s[1];
                }
                else {
                    s.unshift("");
                }
            }
            if (plus) {
                s[0] = result[result.length - 1] + s[0];
                result[result.length - 1] = s;
            }
            else result.push(s);
        }
        else if (call) {
            var params = s.replace(/^\(\s*([\s\S]*)\s*\)$/, '$1');
            result.push(`["call"](${ctx}${params ? ',' + params : ''})`);
        }
        else {
            if (plus) {
                result[result.length - 1] += s;
            }
            else result.push(s);
        }
    }
    return result;
}
var wrapquote = false;
function createSeek(sharped, splited = true) {
    if (splited) wrapquote = false;
    if (sharped.length <= 1) return sharped[0];
    var tmpvar = 'a', undef = '_', tmpctx = 'c';
    var express = splited ? joinsharp(sharped, tmpctx) : sharped;
    if (express.length <= 1) return express[0];
    if (splited) wrapquote = true;
    var [exp0, exp1] = express;
    var notmp = typeof exp0 === 'string' && !/[\.\[\(\{]/.test(exp0);
    if (express.length === 2) {
        if (splited && /^\?/.test(exp1)) {
            if (notmp) return `typeof ${exp0}!=='undefined'&&${exp0}!==null?${exp0}:${exp1.slice(1)}`;
            return `function(${tmpvar},${undef}){return ${tmpvar}==${undef}?${exp1.slice(1)}:${tmpvar}}(${exp0})`;
        }
        if (notmp) {
            if (autoDefine) {
                return `typeof ${exp0}==='undefined'||${exp0}===null?void 0:${exp0}${exp1}`;
            }
            return `${exp0}==null?void 0:${exp0}${exp1}`;
        };
        if (isArray(exp0)) {
            return `function(${tmpctx},${tmpvar},${undef}){${tmpvar}=${tmpctx}${exp0[exp0.length - 1]};return ${tmpvar}==${undef}?${undef}:${tmpvar}${exp1}}(${exp0.slice(0, exp0.length - 1)})`;
        }
        return `function(${tmpvar},${undef}){return ${tmpvar}==${undef}?${undef}:${tmpvar}${exp1}}(${exp0})`;
    }
    if (!splited) {
        var called = express.called;
        var prop = isArray(exp0) ? exp0[exp0.length - 1] : '';
        var prop0 = prop;
        var dist = express.slice(1).map(search => {
            var res = prop ? `${tmpvar}=${tmpctx}${prop}` : '';
            res += `if(${tmpvar}==${undef})return;`;
            if (isArray(search)) {
                prop = search[search.length - 1];
                res += `${tmpctx}=${tmpvar}${search.slice(0, search.length - 1)},${tmpvar}=${tmpctx}${prop};`;
                prop = '';
            }
            else {
                res += `${tmpvar}=${tmpvar}${search};`;
            }
            return res;
        }).join('');
        if (called) {
            if (prop0) {
                dist = `function(${tmpctx},${tmpvar},${undef}){${dist}return ${tmpvar}}(${exp0.slice(0, exp0.length - 1)})`;
            }
            else {
                dist = `function(${tmpvar},${tmpctx},${undef}){${dist}return ${tmpvar}}(${exp0})`;
            }
        }
        else {
            dist = `function(${tmpvar},${undef}){${dist}return ${tmpvar}}(${exp0})`;
        }
        if (notmp && autoDefine) {
            dist = `typeof ${exp0}==='undefined'||${exp0}===null?void 0:${dist}`;
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
        return `${tmpvar}=${dist};if(${tmpvar}!=null)return ${tmpvar};`;
    }).join("") + `return ${createSeek(explist[explist.length - 1], false)}`;
    return `function(${tmpvar}){${dist}}()`;
}
function main(express, autodef = true) {
    autoDefine = autodef;
    if (!/\?\s*\.(?=[^\d])|\?\s*[\?\]\}\)\:\,=|%&;\>\<]|\?\.?\s*$/.test(express)) return express;
    var reg = /\\[\s\S]|\?\s*([\.](?!\d)|\?|$|(?=[\?\]\}\)\:\,\=\|%&;\>\<\*\/]))|[\:\,\+\=\-\!%\^\|\/\&\*\!\;\?\>\<\~\{\}\[\]\(\)'"`\s]/g;
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
            if (/\.$/.test(e)) {
                if (/^[\[\("'`]/.test(s)) e = e.replace(/\.$/, '');
            }
            else if (!cache.length) {
                return exp.push('/' + s);
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
            queue.push(wrapquote ? `(${temp})` : temp, m);
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