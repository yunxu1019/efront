function createSeek(express) {
    var dist;
    express.forEach(function (search) {
        if (dist) {
            if (/[\=]/.test(dist)) dist = `(${dist})`;
            dist = `typeof ${dist}!=='undefined'&&${dist}!==null?${dist}${search}:''`
        } else {
            dist = search;
        }
    });
    return dist;
}
function main(express) {
    if (!/\?\s*\.(?=[^\d])|\?\s*[\?\]\}\)\:\,=|%&;\>\<]|\?\s*$/.test(express)) return express;
    var reg = /\\[\s\S]|\?\s*(\.(?!\d)|$|(?=[\?\]\}\)\:\,=|%&;\>\<\*\/]))|[\:\,\+\=\-\!%\^\|\/\&\*\!\;\?\>\<~\{\}\[\]\(\)'"`\s]/g;
    var cache = [], queue = [];
    var exp = [];
    var instr = false;
    var lastIndex = 0;
    var add_exp = function (s) {
        if (!exp.length) exp.push(s);
        else {
            var e = exp[exp.length - 1];
            if (!/[\.]\s*$/.test(e) && !/^\s*[\.'"`\[\(]/.test(s)) {
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
        if (match[1] !== undefined) {
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