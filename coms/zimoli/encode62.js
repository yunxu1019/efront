var src = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var map = {};
src.split("").forEach((s, i) => map[s] = i);
var encode62 = {
    src,
    map,
    time_delta: parseInt("zzzzz", 36),
    timedecode(string) {
        var { time_delta } = this;
        var time_rest = string.slice(string.length - time_delta.toString(36).length, string.length);
        var time_start = parseInt((new Date() - parseInt(time_rest, 36)) / time_delta) * time_delta;
        var time_stamp = time_start + parseInt(time_rest, 36);
        return this.encode(string.slice(0, string.length - time_delta.toString(36).length), time_stamp.toString(36));
    },
    timeencode(string) {
        var { time_delta } = this;
        var time_free = time_delta / 6 | 0;
        var time_stamp = +new Date() - time_free;
        var time_rest = time_stamp % time_delta;
        var time_rest_str = time_rest.toString(36);
        var time_delta_str = time_delta.toString(36);
        return this.encode(string, time_stamp.toString(36)) + repeat("0", time_delta_str.length - time_rest_str.length) + time_rest_str;
    },
    timeupdate(string) {
        var { time_delta } = this;
        var time_rest = string.slice(string.length - time_delta.toString(36).length, string.length);
        var time_start = parseInt((new Date() - parseInt(time_rest, 36)) / time_delta) * time_delta;
        var time_stamp = time_start + parseInt(time_rest, 36);
        if (time_stamp + (time_delta >> 1) > +new Date()) {
            return string;
        } else {
            return this.timeencode(this.timedecode(string));
        }
    },
    encode(data, sign) {
        if (!sign) return data;
        var result = String(data);
        sign = String(sign);
        var src = this.src;
        var result = result.replace(/\w/g, function (w, cx) {
            var code = map[w];
            if (!isNumber(code)) return w;
            var s = code ^ (sign.charCodeAt(cx % sign.length) % src.length);
            return src[s];
        });
        return result;
    }
};
encode62.decode62 = encode62.encode62 = encode62.encode;