assert(filterTime(''), ``);
assert(filterTime(null), '');
assert(filterTime(undefined), '');
assert(filterTime("我出生的第二年"), `我出生的第二年`);
assert(filterTime(new Date(new Date - 100)), `刚刚`);
assert(filterTime(new Date(new Date - 60000), `h:mm`), "");
assert(filterTime(new Date(new Date - 86400000), `M月d日 h:mm`), "");
assert(filterTime(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), `y年M月d日 h:mm`), '');
