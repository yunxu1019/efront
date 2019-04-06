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
        return this.decode62(string.slice(0, string.length - time_delta.toString(36).length), time_stamp.toString(36));
    },
    timeencode(string) {
        var { time_delta } = this;
        var time_stamp = +new Date();
        var time_rest = time_stamp % time_delta;
        return this.encode62(string, time_stamp.toString(36)) + time_rest.toString(36).padStart(time_delta.toString(36).length, '0');
    },
    encode62(data, sign) {
        if (!sign) return data;
        var result = String(data);
        sign = String(sign);
        var src = this.src;
        var result = result.replace(/\w/g, function (w, cx) {
            var code = map[w];
            if (!code) return w;
            var s = code ^ (sign.charCodeAt(cx % sign.length) % src.length);
            return src[s];
        });
        return result;
    },
    decode62(data, sign) {
        if (!sign) return data;
        var result = String(data);
        sign = String(sign);
        var src = this.src;
        var result = result.replace(/\w/g, function (w, cx) {
            var code = map[w];
            if (!code) return w;
            var s = code ^ (sign.charCodeAt(cx % sign.length) % src.length);
            return src[s];
        });
        return result;
    }
};