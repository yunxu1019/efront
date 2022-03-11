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