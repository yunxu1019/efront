function submit(fields, data) {
    var params = {};
    var inputs = [];
    var select = [];
    var checks = [];
    var id = 0;
    for (var f of fields) {
        var error = valid(f, data);
        if (error === "empty") {
            if (f.options instanceof Array || /date|time|range|switch|swap|radio/i.test(f.type)) {
                if (!select.id) select.id = ++id;
                select.push(f);
            }
            else {
                if (!inputs.id) inputs.id = ++id;
                inputs.push(f);
            }
        }
        else if (error) {
            checks.push(f);
        }
        else {
            params[f.key] = data[f.key];
            var tmp = /\:(\d+)?(?:\.(\d+))?$/.exec(f.type);
            if (tmp) var [, , fixed] = tmp;
            else if (/^(money|price)$/i.test(f.type)) fixed = 2;
            fixed = +fixed;
            if (fixed) {
                var v = params[f.key];
                if (v) {
                    var d = v.replace(/^[^\.]*\.?/, '').length;
                    if (d === v.length - 1) v = "0" + v;
                    if (d > 0 && d < fixed) {
                        v = v + new Array(fixed + 1 - d).join("0");
                    }
                    else if (d === 0) {
                        v = v.replace(/\.$/, '') + '.' + new Array(fixed + 1).join("0");
                    }
                    params[f.key] = v;
                }
            }

        }
    }
    if (checks.length + select.length + inputs.length) {
        var errors = [];
        if (inputs.length) errors.push("请输入" + inputs.map(f => f.name).join("、"));
        if (select.length) errors.push("请选择" + select.map(f => f.name).join("、"));
        if (select.id < inputs.id) {
            errors = errors.reverse();
        }
        if (checks.length) {
            errors.push(checks.map(f => f.name).join("、") + "格式错误");
        }
        errors = errors.join("，") + "！";
        throw errors;
    }
    return params;
}