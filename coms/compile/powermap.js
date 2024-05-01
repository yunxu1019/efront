var { STAMP, snapExpressHead, snapExpressFoot } = require("./common");
var powermap = new class {
    puncLeft(o) {
        var s = snapExpressHead(o.prev);
        var p = Infinity;
        while (o && o.prev) {
            if (o.type !== STAMP || !(o.text in this) || this[o.text] < p) return s;
            s = snapExpressHead(o.prev);
            o = s.prev;
        }
        return s;
    }
    puncRight(o) {
        var s = snapExpressFoot(o.next);
        var p = 0;
        while (o && o.next) {
            if (o.type !== STAMP || !(o.text in this) || this[o.text] <= p) return s;
            s = snapExpressFoot(o.next);
            o = s.next;
        }
        return s;
    }
};

[
    '=,+=,-=,*=,/=,%=,|=,&=,^=,||=,&&=,??=,<<=,>>=,>>>=,**=,~=,:=,?,:,=>'/* 1 */,
    '&&,||,^^,??'/* 4 */, '&,|,^'/* 5 */,
    'instanceof,in,==,>=,<=,>,<,!=,!==,===,!in,!instanceof'/* 6 */,
    '>>,>>>,<<'/* 7 */, '+,-'/* 8 */, '*,/,%'/* 9 */, '**'/* 10 */,
    'typeof,await,yield,new,delete,void,!,~'/* 11 */, '++,--'/* 12 */,
].forEach((pp, i) => {
    pp.split(",").forEach(p => {
        powermap[p] = i + 1;
    })
});
