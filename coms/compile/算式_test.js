var JSON = require('../basic_/JSON')
var t = function (text, want) {
    算式.debug = t.debug;
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
t(`[b,c]'`)
t(`H[+]`)
t(`H[2-]`)
t(`H'*1`)
t(`cos(theta,2)*E +(1 - cos(theta))*K'*K+sin(theta)*[0,-K_2,K_1;K_2,0,-K_0;-K_1,K_0,0]`)
t(`group(
    x+y=10 tab(circle,1),
    x*y=25 tab(circle,2)
)`)
t(`a + -2`);
t(`2+3i`);
t.debug = true;
t(`@1`);
t(`#1`);
t(`_1`);
t("1*|11|")