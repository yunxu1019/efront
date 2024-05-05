var powermap = {
};

[
    '=,+=,-=,*=,/=,%=,|=,&=,^=,||=,&&=,??=,<<=,>>=,>>>=,**=,~=,:=,?,:,=>'/* 1 */,
    '&&,||,^^,??'/* 4 */, '&,|,^'/* 5 */,
    'instanceof,in,==,>=,<=,>,<,!=,!==,===,!in,!instanceof'/* 6 */,
    '>>,>>>,<<'/* 7 */, '+,-'/* 8 */, '*,/,%'/* 9 */, '**'/* 10 */,
    '++,--'/* 11 */,
    "typeof,await,yield,new,delete,void,..."/*12*/,
    '!,~'/* 13 */,
    "::,?.,->,."/*14*/,
].forEach((pp, i) => {
    pp.split(",").forEach(p => {
        powermap[p] = i + 1;
    })
});
module.exports = powermap;