var src = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var map = {};
src.split("").forEach((s, i) => map[s] = i);
var encode62 = {
    src,
    map,
    time_delta: parseInt("zzzzz", 36),
    geta(string) {
        string = String(string)
        string = string.length + string + "2017-08-19";
        var buff = src.split('');
        for (var cx = 0, dx = buff.length + src.length, sl = string.length, cl = buff.length; cx < dx; cx++) {
            var s1 = string.charCodeAt(cx % sl) % cl;
            var s2 = cx % cl;
            var btemp = buff[s1];
            buff[s1] = buff[s2];
            buff[s2] = btemp;
        }
        return buff.join('');
    },
    timedecode(string) {
        var { time_delta } = this;
        var time_rest = string.slice(string.length - time_delta.toString(36).length, string.length);
        var time_start = parseInt((new Date() - parseInt(time_rest, 36)) / time_delta) * time_delta;
        var time_stamp = time_start + parseInt(time_rest, 36);
        string = this.encode(string.slice(0, string.length - time_delta.toString(36).length), time_stamp.toString(36)).replace(/\.\.?/g, a => a === '.' ? "%" : ".");
        return decodeURIComponent(string);
    },
    timeencode(string) {
        var { time_delta } = this;
        var time_free = time_delta / 6 | 0;
        var time = +new Date;
        time = time - time % (time_delta >> 2);
        var time_stamp = time - time_free;
        var time_rest = time_stamp % time_delta;
        var time_rest_str = time_rest.toString(36);
        var time_delta_str = time_delta.toString(36);
        string = encodeURIComponent(string).replace(/\./g, '..').replace(/[\!'\(\)~]/g, a => escape(a)).replace(/%/g, '.');
        return this.encode(string, time_stamp.toString(36)) + repeat("0", time_delta_str.length - time_rest_str.length) + time_rest_str;
    },
    timeupdate(string) {
        var { time_delta } = this;
        var time_rest = string.slice(string.length - time_delta.toString(36).length, string.length);
        var time = +new Date;
        var time_start = parseInt((time - parseInt(time_rest, 36)) / time_delta) * time_delta;
        var time_stamp = time_start + parseInt(time_rest, 36);
        if (time_stamp + (time_delta >> 1) > time) {
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
            if (s >= src.length) return w;
            return src[s];
        });
        return result;
    }
};
encode62.decode62 = encode62.encode62 = encode62.encode;