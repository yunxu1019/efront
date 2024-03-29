var validators = {
    email(text) {
        var i = text.indexOf('@');
        if (i < 0) return i18n`电子邮箱地址应包含符号“@”`;
        if (i === 0) return i18n`@符号前应有内容`;
        if (i === text.length - 1) return i18n`@符号后应有内容`;
    }
}
function valid(field, data) {
    var error;
    if (isEmpty(data[field.key])) {
        if (field.required) {
            return "empty";
        }
        return;
    }
    var tmp = validators[field.type];
    if (tmp) {
        var value = data[field.key];
        var error = tmp(String(value ?? ''));
        if (error) return error;
    }
    else if (tmp = /\:(\d+)(?:\.(\d+))?$/.exec(field.type)) {
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
        if (/^(input|text|html|password|raw)/.test(field.type)) {
            var e = field.options(data[field.key]);
            if (e) return e;
        }
    }
    return error;
}