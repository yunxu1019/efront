var powermap = {};
[
    '=,+=,-=,*=,/=,%=,|=,&=,^=,||=,&&=,??=,<<=,>>=,>>>=,**=,~=,?,:,=>'/* 1 */,
    '&&,||,^^,??'/* 4 */, '&,|,^'/* 5 */,
    'instanceof,in,==,>=,<=,>,<,!=,!==,===,!in,!instanceof'/* 6 */,
    '>>,>>>,<<'/* 7 */, '+,-'/* 8 */, '*,/,%'/* 9 */, '**'/* 10 */,
    'typeof,await,yield,new,delete,void,!,~'/* 11 */, '++,--'/* 12 */,
].forEach((pp, i) => {
    pp.split(",").forEach(p => {
        powermap[p] = i + 1;
    })
});
