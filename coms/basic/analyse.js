// 1. 词的两端的字符左右频率有差别
// 2. 常用词汇在数据中会重复出现
// 3. 句子的词汇越长越优先
function getindexes(codes) {
    var indexMap = {};
    for (var cx = 0, dx = codes.length; cx < dx; cx++) {
        var c = codes[cx];
        if (!indexMap[c]) indexMap[c] = [];
        indexMap[c].push(cx);
    }
    var dist = Object.create(null);
    for (var k in indexMap) {
        var v = indexMap[k];
        if (v.length <= 1) continue;
        k = String.fromCodePoint(+k);
        dist[k] = v;
    }
    return dist;
}

function dropindex(spreedtree, tree) {
    for (var k in spreedtree) {
        var p = spreedtree[k];
        for (var cx = 0, dx = p.length; cx < dx; cx++) {
            var c = p[cx];
            var d = c + k.length;
            for (var s in tree) {
                var t = tree[s];
                var m = getIndexFromOrderedArray(t, c);
                var n = getIndexFromOrderedArray(t, d);
                if (t[m] !== c) {
                    m++;
                }
                n++;
                if (m >= n) continue;
                t.splice(m, n - m);
                if (t.length <= 1) delete tree[s];
            }
        }
    }
}

function matchspread(text, tree, singletree = tree) {
    var dist = null;
    for (var k in tree) {
        var v = tree[k];

        var temp = {};
        for (var cx = v.length - 1; cx >= 0; cx--) {
            var i = v[cx];
            i--;
            if (i < 0) break;
            var c = text[i]
            c = String.fromCodePoint(c);
            if (!(c in singletree)) continue;
            var s = c + k;
            if (!temp[s]) temp[s] = [];
            temp[s].unshift(i);
        }
        for (var s in temp) {
            if (temp[s].length > 1) {
                if (!dist) dist = Object.create(null);
                dist[s] = temp[s];
            }
        }
    }
    if (dist && tree != singletree) {
        dropindex(dist, tree);
        extend(dist, tree);
    }
    return dist;
}

var words = [];
var wordslike = [];
var powertime = 0;
var wordslimit = 2 * 3 * 5 * 7 * 11 * 13 * 17 * 19;
var comparepower = function (a, b) {
    return a.power() <= b.power();
};
var comparename = function (a, b) {
    return a.name <= b.name;
};

class Word {
    name = '';
    time = 0;
    rate = 0;
    mask = 0.99;
    constructor(word) {
        this.name = word;
        var mask = 2 * 3 * 5 * 7 * 11 * 13 * 17 * 19 * 23 * 29;
        this.mask = (mask - 1) / mask;
    }
    power() {
        return this.rate * Math.pow(this.mask, powertime - this.time);
    }
    update() {
        var p = this;
        if (this.rate) {
            var i = getIndexFromOrderedArray(wordslike, p, comparepower);
            var w = wordslike[i];
            if (w && w.power() === p) {
                if (p < 1e-306) {
                    p = 0
                } else {
                    p = p - p / 0x1fffffffffffff;
                }
                for (var dx = i + 1, cx = getIndexFromOrderedArray(wordslike, p, comparepower); cx < dx; cx++) {
                    if (wordslike[cx] == this) {
                        wordslike.splice(cx, 1);
                        break;
                    }
                }
            }
        }
        this.time = powertime = +new Date;
        var x = this.name.length;
        this.rate += 1 / (1 + Math.pow(x - 2.5, 2));
        if (wordslike.length >= wordslimit) {
            var w = wordslike.shift();
            var i = getIndexFromOrderedArray(words, w, comparename);
            words.splice(i, 1);
        }
        saveToOrderedArray(wordslike, this, comparepower);
        saveToOrderedArray(words, this, comparename);
    }
    toString() {
        return this.word;
    }
}
function getWord(word) {
    if (word instanceof Array) {
        word = String.fromCodePoint.apply(String, word);
    } else {
        word = String(word);
    }
    var i = getIndexFromOrderedArray(words, a => a.name <= word);
    var w = words[i];
    if (w && w.name === word) {
        return w;
    }
    return new Word(word);
}

function format() {
    var like = wordslike.slice(wordslike.length - Math.log2(wordslike.length));
    var rest = [];
    for (var cx = like.length - 1; cx >= 0; cx--) {
        var m = like[cx];
        var p = Math.sqrt(m.power() / 10) * 10;
        for (var cy = 0, dy = getIndexFromOrderedArray(wordslike, { power() { return p } }, comparepower); cy < dy; cy++) {
            var n = wordslike[cy];
            if (n.name.indexOf(m.name) >= 0) {
                wordslike.splice(cy, 1);
                var i = getIndexFromOrderedArray(words, n, comparename);
                var s = n.name.split(m.name);
                rest.push.apply(rest, s);
                words.splice(i, 1);
                m.update();
                dy--;
            }
        }
    }
    for (var cx = 0, dx = rest.length; cx < dx; cx++) {
        var r = rest[cx];
        if (r.length > 1) getWord(r).update();
    }
}

function analyse(text) {
    var singletree = getindexes(text);
    var tree = JSON.stringify(singletree);
    tree = JSON.parse(tree);
    var temp = matchspread(text, tree, singletree);
    while (temp) {
        tree = temp;
        temp = matchspread(text, tree, singletree);
    }
    var reslen = {};
    for (var k in singletree) {
        var a = singletree[k];
        for (var cx = 0, dx = a.length; cx < dx; cx++) {
            var b = a[cx];
            reslen[b] = b + 1;
        }
    }
    for (var k in tree) {
        var a = tree[k];
        for (var cx = 0, dx = a.length; cx < dx; cx++) {
            var b = a[cx];
            if (b + k.length > reslen[b]) {
                for (var cy = b + 1, dy = b + k.length; cy < dy; cy++) {
                    delete reslen[cy];
                }
                reslen[b] = dy;
            }
        }
    }
    var result = [];
    for (var cx = 0, dx = text.length; cx < dx;) {
        if (cx in reslen) {
            var word = text.slice(cx, reslen[cx]);
            cx = reslen[cx];
        } else {
            var a = cx;
            while (++cx < dx && !reslen[cx]);
            var word = text.slice(a, cx);
        }
        word = String.fromCodePoint.apply(String, word);
        result.push(word);
        getWord(word).update();
    }
    return result;
    // words = words.map(a => String.fromCodePoint(+a));
    // window.console.log(words, remap);
}
function parse(codes) {
    var result = [];
    var ci = 0;
    var save = function () {
        var c = codes.slice(ci, cx);
        var t = '';
        while (c.length) t += String.fromCodePoint.apply(String, c.splice(0, 1024));
        result.push(t);
    };
    for (var cx = 0, dx = codes.length; cx < dx; cx++) {
        var max = 0, m, mi;
        var t = '';
        var power = wordslike[wordslike.length - Math.sqrt(wordslike.length) | 0].power();
        for (var cy = cx, dy = dx; cy < dy; cy++) {
            t += String.fromCodePoint(codes[cy]);
            var w = getWord(t);
            var p = w.power();
            p = p * (cy - cx + +(p > power));
            if (p > max) {
                max = p;
                m = w;
                mi = cy;
            }
        }
        if (mi == cx) {
            cx = mi + 1;
            save();
            ci = cx;
        } else if (mi > cx) {
            if (ci < cx) {
                save();
            }
            result.push(m.name);
            cx = mi;
            ci = cx + 1;
        }
    }
    if (ci < cx) save();
    return result;
}
function split(codes) {
    var ci = 0;
    var result = [];
    var save = function () {
        if (ci === cx) return;
        var c = codes.slice(ci, cx);
        result.push(c);
        ci = cx;
    };
    for (var cx = 0, dx = codes.length; cx < dx; cx++) {
        var c = String.fromCodePoint.apply(String, codes.slice(cx, 32));

        for (var cy = wordslike.length - 1, dy = wordslike.length - Math.log2(wordslike.length) | 0; cy > dy; cy--) {
            var s = wordslike[cy];

            if (c.slice(0, s.name.length) === s.name) {
                var w = c.slice(0, s.name.length + 1 + +(c.codePointAt(s.name.length) > 0xffff));
                if (s.power() / getWord(w).power() < 10) continue;
                cx += s.name.length;
                save();
                break;
            }
        }
    }
    if (ci < dx) save();
    return result;
}

function main(text) {
    if (!text.length) return [];
    var spliters = [29, 97, 197];
    var codes = [];
    for (var cx = 0, dx = text.length; cx < dx; cx++) {
        var c = text.codePointAt(cx);
        if (c > 0xffff) cx++;
        codes.push(c);
    }
    analyse(codes);
    var splited = split(codes);
    for (var cx = 0, dx = splited.length; cx < dx; cx++) {
        analyse(splited[cx]);
    }
    format();
    var result = [];
    for (var cx = 0, dx = splited.length; cx < dx; cx++) {
        var parsed = parse(splited[cx]);
        while (parsed.length) result.push.apply(result, parsed.splice(0, 1024));
    }
    for (var cx = 0, dx = result.length; cx < dx; cx++) {
        getWord(result[cx]).update();
    }
    format();
    return result;
}
