var refilm = function (a) {
    return refilm_decode.apply(null, [a.raw].concat([].slice.call(arguments, 1)));
};
var test = function (fields, key, expect) {
    var valid = assert(seek(fields[0], key), expect);
    if (!valid) console.log(fields)
};
test(refilm`启动时间/time $1`, 'key', 'time');
test(refilm`启动时间/time int64/=1`, 'type', 'int64');
test(refilm`启动时间/time $1`, 'type', '$1');
test(refilm`启动时间/time ${test}`, 'key', "time");
test(refilm`启动时间/time ${test}`, 'type', test);
test(refilm`天下第一 四人组 ${["天地玄黄", "湘西四鬼"]}`, 'key', "天下第一");
test(refilm`天下第一 四人组 ${["天地玄黄", "湘西四鬼"]}`, 'type', "四人组");
test(refilm`天下第一 四人组 ${["天地玄黄", "湘西四鬼"]}`, ['options', 1], "湘西四鬼");
test(refilm`连城剑法 别名 唐诗剑法,躺尸剑法`, ['options', 1], "躺尸剑法");
test(refilm`连城剑法 别名 [唐诗剑法,躺尸剑法]`, ['options', 1, 'name'], "躺尸剑法");
test(refilm`连城剑法 别名 [唐诗剑法,躺尸剑法]`, ['options', 1, 'key'], "躺尸剑法");
test(refilm`连城剑法 别名 [唐诗剑法,躺尸剑法]`, ['options', 1, 'value'], 1);
test(refilm`连城剑法 别名 [唐诗剑法/0,躺尸剑法/1]`, ['options', 1, 'key'], 1);
test(refilm`连城剑法 别名 ^[唐诗剑法/0,躺尸剑法/1]`, ['avoid', 1, 'key'], 1);
test(refilm`连城剑法 别名 [唐诗剑法/0,躺尸剑法/1] ^[a,b]`, ['options', 1, 'key'], 1);
test(refilm`连城剑法 别名 [唐诗剑法/0,躺尸剑法/1] ^[a,b]`, ['avoid', 1, 'key'], 'b');
test(refilm`连城剑法 别名 [唐诗剑法/0,躺尸剑法/1] ^${[{ key: 'a' }, { key: 'c' }]}`, ['avoid', 1, 'key'], 'c');
test(refilm`连城剑法 别名 [唐诗剑法/0/#c29,躺尸剑法/1]`, ['options', 0, 'color'], '#c29');
