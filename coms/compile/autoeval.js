var { skipAssignment, createString, createScoped, relink, QUOTED, STRAP, STAMP, SCOPED, EXPRESS, VALUE, SPACE, COMMENT, number_reg } = require("./common");
var scanner2 = require("./scanner2");
var backEach = require("../basic/backEach");
var removeNew = function (a, ai) {
    var p = a.prev;
    if (p && p.type === STRAP && p.text === 'new') {
        ai = a.queue.lastIndexOf(p, ai);
        a.queue.splice(ai, 1);
    }
    return ai;
};
var assignIota = function (v) {
    var p = v.prev;
    if (!p || p.type !== STAMP || p.text !== '=') return;
    var pp = p.prev;
    if (!pp || pp.type !== SCOPED || pp.entry !== '[') return;
    var ppp = pp.prev;
    if (ppp) if (ppp.type !== STRAP || !/^(var|let|const)$/.test(ppp.text)) return;
    var o = skipAssignment(v);
    if (v.next !== o) return;
    var vmap = [];
    var i = 0;
    for (var va of v) {
        if (va.type === STAMP && va.text === ',') {
            i++;
            continue;
        }
        if (!vmap[i]) vmap[i] = [];
        vmap[i].push(va);
    }
    var ppmap = [];
    var ppval = [];
    var pptmp = null;
    var i = 0;
    for (var ppa of pp) {
        if (ppa.type === SPACE || ppa.type === COMMENT) continue;
        if (ppa.type === STAMP) {
            if (ppa.text === ',') {
                if (pptmp && pptmp.length) {
                    ppval[i] = pptmp;
                }
                i++;
                pptmp = null;
                continue;
            }
            if (!pptmp && ppa.text === '=') {
                pptmp = [];
                continue;
            }
        }
        if (pptmp) pptmp.push(pp);
        else {
            if (!ppmap[i]) ppmap[i] = [];
            ppmap[i].push(ppa);
        }
    }
    if (pptmp && pptmp.length) ppval[i] = pptmp;
    var res = [];
    ppmap.forEach((ppm, i) => {
        if (!ppm) return;
        var eq = { type: STAMP, text: '=' };
        if (vmap[i]) res.push(...ppm, eq, ...vmap[i]);
        else if (ppval[i]) res.push(...ppm, eq, ...ppval[i]);
        else res.push(...ppm);
        res.push({ type: STAMP, text: "," });
    });
    res.pop();
    var ppi = p.queue.indexOf(pp);
    var vi = p.queue.indexOf(v, ppi);
    p.queue.splice(ppi, vi - ppi + 1, ...res);
    relink(p.queue);
}
var arrayFillMap = function (a, i, as) {
    if (a.text !== 'Array' || !a.next) return;
    var n = a.next;
    if (!n || n.type !== SCOPED || n.entry !== '(') return;
    var nn = n.next;
    if (!nn || nn.type !== EXPRESS || nn.text !== ".fill") return;
    var nnn = nn.next;
    if (!nnn || nnn.type !== SCOPED || nnn.entry !== '(') return;
    var mn = nnn.next;
    var f = n.first;
    var mnn = mn.next;
    if (!f || f.type !== VALUE || !number_reg.test(f.text) ||
        !mn || mn.type !== EXPRESS || mn.text !== '.map' ||
        !mnn || mnn.type !== SCOPED || mnn.entry !== "(" ||
        Object.keys(createScoped(mnn).used).length > 0) {
        var ni = a.queue.indexOf(n);
        var nnni = a.queue.indexOf(nnn, ni);
        if (!f) {
            a.queue.splice(n + 1, nnni - ni);
            relink(a.queue);
            return;
        }
        a.queue.splice(ni, nnni - ni);
        nnn.unshift({ type: STAMP, text: ',' });
        nnn.unshift.apply(nnn, n);
        a.text = "ArrayFill";
        as.splice(i, 1);
        if (!this.envs.ArrayFill) this.envs.ArrayFill = true;
        if (!this.used.ArrayFill) this.used.ArrayFill = [];
        this.used.ArrayFill.push(a);
        relink(nnn);
        relink(a.queue);
        return;
    }
    var ai = a.queue.indexOf(a);
    ai = removeNew(a, ai);
    var mnni = a.queue.indexOf(mnn, ai);
    var value = createString(a.queue.splice(ai, mnni + 1 - ai));
    as.splice(i, 1);
    a.queue.splice(ai, 0, scanner2(JSON.stringify(eval(value)))[0]);
    relink(a.queue);
    assignIota(a.queue[ai]);
};
var calculate = function (body) {
    for (var cx = 0; cx < body.length; cx) {
        var o = body[cx];
        while (o && (o.type === SPACE || o.type === COMMENT || o.type === STAMP && /^[,;:]$/.test(o.text))) o = body[++cx];
        if (!o) break;
        var ox = cx;
        var ex = skipAssignment(body, cx++);
        cx = ex;
        var ignore = false;
        for (var cy = ox; cy < ex; cy++) {
            var o = body[cy];
            if (o.type === SCOPED || o.type === QUOTED && o.length) {
                calculate(o);
            }
            if (o.type !== STAMP && o.type !== VALUE && o.type !== SPACE && o.type !== COMMENT) ignore = true;
            else if (o.type === VALUE && !number_reg.test(o.text)) ignore = true;
        }
        if (ignore || ex - ox < 3) continue;
        var o = body[ox];
        o.text = eval(createString(body.slice(ox, ex)));
        cx = ox + 1;
        body.splice(cx, ex - cx);
    }
    return body;
};

var polyfills = Object.assign(Object.create(null), {
    "Object.assign": 'extend'
});
var polyfill = function (o, i, used) {
    var v = o.text;
    if (v in polyfills) {
        var p = polyfills[v];
        var n = o.next;
        if (n && n.type === SCOPED && n.entry === '(') {
            if (!this.used[p]) {
                this.used[p] = [];
                this.envs[p] = true;
            }
            o.text = p;
            this.used[p].push(o);
            used.splice(i, 1);
        }
    }
};
module.exports = function autoeval(body) {
    calculate(body);
    var envs = body.envs;
    if (envs.Array) backEach(body.used.Array, arrayFillMap, body);
    if (envs.Object) backEach(body.used.Object, polyfill, body);
    return body;
}