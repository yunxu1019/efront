function getSplitedDate(date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()];
}
function fixedLength(minute) {
    return minute < 10 ? '0' + minute : minute;
}
function filterTime(value) {
    if (!(value instanceof Date)) {
        return value;
    }
    var splited = getSplitedDate(value);
    var [year, month, date, hour, minute, second, milli] = splited;
    var [year1, month1, date1, hour1, minute1] = getSplitedDate(new Date);
    if (year1 !== year) {
        return `${year}年${month}月${date}日 ${hour}:${fixedLength(minute)}`;
    }
    if (month !== month1 || date !== date1) {
        return `${month}月${date}日 ${hour}:${fixedLength(minute)}`;
    }
    if (hour !== hour1 || minute !== minute1) {
        return `${hour}:${fixedLength(minute)}`;
    }
    return `刚刚`;
}