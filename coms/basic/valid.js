function valid(field, data) {
    var error;
    if (isEmpty(data[field.key])) {
        if (field.required) {
            return "empty";
        }
        return;
    }
    var tmp;
    if (tmp = /\:(\d+)(?:\.(\d+))?$/.exec(field.type)) {
        var [, a, b] = tmp;
        var value = data[field.key];
        a = +a;
        b = +b;
        if (a) {
            if (!b) {
                if (value.length > a) return `不能超过${a}个字符`;
            }
            else {
                if (value.replace(/\.[\s\S]*$/, '').length > a) return `整数部分不能超过${a}位`;
            }
        }
        if (b) {
            var digits = value.replace(/^[^\.]+\./, '');
            if (digits.length > b) {
                return `小数部分不能超过${b}位`;
            }
        }
    }
    if (field.valid instanceof Function) {
        var e = field.valid(data[field.key]);
        if (e) return e;
    }
    if (field.options instanceof Function) {
        var e = field.options(data[field.key]);
        if (e) return e;
    }
    return error;
}