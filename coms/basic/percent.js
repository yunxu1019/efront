function percent(value, compare_value) {
    if (!isFinite(value)) return value;
    value *= 100;
    var fix = 1000000;
    var flag = value;
    if (flag < 0) flag = -flag;
    if (flag > 100);
    else if (flag > 50) flag = 100 - flag;
    if (isFinite(compare_value) && 100 * compare_value !== value) Math.min(Math.abs(value - compare_value), flag);
    switch (Math.log(flag) | 0) {
        case -Infinity:
        case 2:
        case 3:
        case 4:
            fix = 1; break;
        case 1:
            fix = 10; break;
        case 0:
            fix = 100; break;
        case -1:
            fix = 1000; break;
        case -2:
            fix = 10000; break;
        case -3:
            fix = 100000; break;
    }
    return (value * fix | 0) / fix + "%";
}