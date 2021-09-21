function repeat(string, time) {
    string = String(string);
    if (!string.length) return string;
    time = +time | 0;
    if (time <= 0) return "";
    if (+time * string.length > 0x1ffffff) {
        throw new Error("占用内存过大！");
    }
    var result = [];
    while (--time >= 0) {
        result.push(string);
    }
    return result.join("");
}