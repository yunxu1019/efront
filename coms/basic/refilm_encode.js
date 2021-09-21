function addQuote(field) {
    field = field.trim();
    if (/\s/.test(field)) {
        field = "\"" + field + "\"";
    }
    return field;
}
function getNeeds(needs) {
    var dist = [];
    for (var k in needs) {
        dist.push([k, needs[k]].join("="))
    }
    return dist.join(",");
}

function exist(a) { return !isEmpty(a) }

function namePart(name = '', key = '', needs = '', repeat = '', endwith = '') {
    var res = [name, key ? '/' + key : ''].join('');
    if (repeat) {
        endwith = getNeeds(endwith);
        if (endwith) {
            endwith = ',' + endwith;
        }
        res = `[${res}${endwith}]`;
    }
    needs = getNeeds(needs);
    if (needs) {
        res = `(${res},${needs})`
    }
    return res;
}

function sizePart(type = '', size = '', unit = '', value = '') {
    if (!isEmpty(value)) {
        value = "=" + value;
    }
    if (type === size + unit) {
        type = '';
    }
    return [`${size}${unit}${value}`, type].filter(exist).join('/');
}

function optionPart(options, comment) {
    comment = comment ? '//' + comment : '';
    if (options) {
        var count = 0;
        options = options.map(function (opt) {
            opt = String(opt);
            if (opt.length === 1) count++;
            return opt;
        });
        if (count === options.length) options = options.join('');
        else if (count + (count >> 1) > options.length) options = options.map(o => {
            if (o.length === 1) return o;
            return o[0] + o.slice(1).replace(/[\s\S]/g, '\\$&');
        }).join('');
        else options = options.join(',');
    }
    return (options || '') + comment;
}

function string(field) {
    // name/key,needs.key=needs.value 
    var { name, needs, type, key, size, unit, endwith, value, repeat, comment, options } = field;
    var prefix;
    if (/^(headline|title|label)$/i.test(type)) prefix = refilm_common[type] + " ", type = '';
    var name_ = namePart(name, key, needs, repeat, endwith);
    var size_ = sizePart(type, size, unit, value);
    var option_ = optionPart(options, comment);
    if (!size_ && !option_) return [prefix + addQuote(name_)];

    return [
        name_,
        size_,
        option_
    ].map(addQuote);
}

var zeros = function (size) {
    var arr = [];
    while (arr.length < size) arr.push(" ");
    return arr.join('');
};
function toString(fields) {
    var parted = fields.map(string);
    var size = [0, 0, 0, 0];
    var sized = parted.map(function (p) {
        if (p.length === 1) return [0]
        while (p.length > size.length) {
            size.push(0)
        }
        return p.map((s, i) => {
            var length = s.length + s.replace(/[\u0000-\u00ff]/g, '').length;
            if (length > size[i]) size[i] = length;
            return length
        });
    });

    var prev = [];
    return parted.map((a, cx) => {
        for (var ct = 1, dt = a.length; ct < dt; ct++) {
            if (prev[ct] !== a[ct]) {
                break;
            }
        }
        if (ct === dt) {
            a = a.slice(0, 1);
        } else {
            prev = a;
        }
        return a.map((s, cy) => {
            return s + zeros(size[cy] - sized[cx][cy]);
        }).join(' ').trim();
    }).join('\r\n');
}

function main(fields) {
    var data = toString(fields);
    return data;
}