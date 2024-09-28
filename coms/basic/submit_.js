var trimname = function (a) {
    return a.name.replace(/^请?(输入|选择|填写)/, '')
};
function submit_() {
    var params = {};
    var inputs = [];
    var select = [];
    var checks = [];
    var id = 0;
    var data = Object.create(null);
    var fieldsList = [];
    for (var arg of arguments) {
        if (Array.isArray(arg)) fieldsList.push(arg);
        else Object.assign(data, arg);
    }
    for (var fields of fieldsList) for (var f of fields) {
        if (!check(data, f.needs)) continue;
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
            else fixed = undefined;
            fixed = +fixed;
            if (fixed) {
                var v = params[f.key];
                if (!isEmpty(v)) {
                    v = String(v);
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
        if (inputs.length) errors.push(i18n`请输入` + inputs.map(trimname).join(i18n`、`));
        if (select.length) errors.push(i18n`请选择` + select.map(trimname).join(i18n`、`));
        if (select.id < inputs.id) {
            errors = errors.reverse();
        }
        if (checks.length) {
            errors.push(i18n`您输入的${checks.map(trimname).join(i18n`、`)}有误`);
        }
        errors = errors.join(i18n`，`) + i18n`！`;
        throw errors;
    }
    return params;
}