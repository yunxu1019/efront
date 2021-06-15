function parseDate(text) {
    if (isEmpty(text)) return;
    if (parseInt(text) > 0x43530 && isFinite(text)) text = +text;
    var value = new Date(text);
    var toFixed = function (a) {
        return a > 9 ? a : "0" + a;
    };
    return +value ? [value.getFullYear(), value.getMonth() + 1, value.getDate()].map(toFixed).join('-') : text;
}