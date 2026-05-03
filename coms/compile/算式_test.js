var JSON = require('../basic_/JSON')
var t = function (text, want) {
    var obj = 算式(text);
    if (t.debug) console.log(JSON.toJS(obj, null, 4))
};
t(`a**2+b**2=c**2`);
t(`(a/b)*(b/d)=a/d`);
t(`S=sqrt(p*(p-a)*(p-b)*(p-c))`);
t(`root(x,3)`);
t(`+2`);
t(`+Infinity`);
t(`-Infinity`);
t(`a[n]`);
t(`2a`);
t(`[1 2;3 4]`);
t(`[1 2,3 4]`);
t(`[1,2;3,4]`);
t(`a!!`);
t(`!a`);
t(`a(b,c)`)
t.debug = true;
t(`[b,c]'`)
t(`H[+]`)
t(`H[2-]`)