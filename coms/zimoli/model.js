"use ../basic/size.js";
/**
 * 支持任意类型的数据的编辑展示及过滤
 */

var unmark = function (select) {
    select.isediter = false;
    select.isreader = false;
};
unmark(select);
unmark(radio);
unmark(checkbox);
unmark(swap);
unmark(image);
unmark(success);
var renderOption = function (o, index) {
    if (typeof o === 'string') return o;
    if (isFunction(o)) {
        var name = typeof index === 'number' ? o.name : index;
        return `<a href="javascript:;" @click=field.options[${strings.encode(index)}](data)>${name}</a>`
    }
    if (isObject(o)) {
        if (o.href) {
            return `<a href=${strings.encode(o.href)}>${o.name}</a>`;
        }
        return `<a href='javascript:;' @click=field.options[${strings.encode(index)}](data)>${o.name}</a>`
    }
    return o;
}
var renderOptions = function (field, data) {
    var { options } = field;
    if (typeof options === 'string') return options;
    if (isFunction(options)) return renderOption(options);
    if (options instanceof Array) {
        return options.map(renderOption).join('');
    }
    else if (isObject(options)) {
        return Object.keys(options).map(k => renderOption(options[k], k)).join('');
    }
    return '';
}
var onoff = function () {
    var { data, field } = this;
    data[field.key] = checker.changeValue(data[field.key]);
};
var constructors = {
    input,
    swap(e) {
        var { field } = e;
        e = swap(e);
        if (field.options) {
            e.getValue = function () {
                return field.options[+this.checked].value;
            };
        }
        return e;
    },
    success(e) {
        success(e);
        e.innerHTML = `<span ng-html="field.comment"></span>`;
        render(e.children, e.$scope, e.$parentScopes);
        return e;
    },
    switch: swap,
    row: textarea,
    password,
    text: textarea,
    number(e) {
        var { data, field } = e;
        var content = `<input placeholder="${field.holder || i18n`输入${field.name}`}" type=${field.type} -model=data[field.key] />` + (field.unit ? `<span>${field.unit}</span>` : '');
        e.innerHTML = content;
        if (field.unit && field.unit.length <= 6) {
            e.setAttribute("u" + field.unit.replace(/[\u0080-\ud7ff\uf000-\uffff]/g, '11').length, '')
        }
        render(e, { data, field, input });
    },
    generator(elem) {
        var { data, field } = elem;
        elem.innerHTML = `<a @click="gen()" -if="!data[field.key]">${field.holder || '单击生成'}</a><span -else -bind="data[field.key]"></span>`;
        render(elem, {
            data, field, a: button, async gen() {
                await field.options(data);
            }
        });
    },
    date(m) {
        var { data, field } = m;
        m.innerHTML = `<input placeholder=${field.holder || i18n`选择日期`} readonly -model=data[field.key] />`;
        render(m, {
            data, field, input,
        });
        select(m.firstChild, datepicker("年月日", data[field.key]));
    },
    datetime(m) {
        var { data, field } = m;
        m.innerHTML = `<input placeholder=${field.holder || i18n`选择日期和时间`} readonly -model=data[field.key] />`;
        render(m, {
            data, field, input,
        });
        select(m.firstChild, datepicker("年月日时分", data[field.key]));
    },
    color() {
        return colorpicker();
    },

    image({ field }) {
        var img = image();
        var { options } = field;
        if (options) img.setAttribute("uploadto", options.uploadto);
        return img;
    },
    checker(elem) {
        var { data, field } = elem;
        elem.innerHTML = `<span @click="onoff()"><checker -model=data[field.key]></checker><span -bind='field.holder'></span></span>${renderOptions(field, data)}`;
        render(elem.children, { onoff, checker, data, a: button, field });
    },
    checkbox({ field }) {
        var elem = checkbox();
        cast(elem, field);
        return elem;
    },
    radio({ data, field }) {
        var elem = radio();
        elem.value = data[field.key];
        cast(elem, field);
        return elem;
    },
    select(_) {
        var { field, data } = _;
        var t = field.ref;
        var elem = document.createElement('select');
        elem.multiple = field.multi;
        elem.editable = field.editable || t === 'a';
        var o = field.options?.[0];
        if (field.holder) _.innerHTML = `<span -if="isEmpty(data[field.key])" class="placeholder">${field.holder}</span>`;
        if (!isEmpty(o?.key)) {
            if (!field.required) field.options.unshift({
                name: field.holder || i18n`选择${field.name}`,
                key: ''
            })
        }
        render(_.children, { field, data, isEmpty });
        elem.setAttribute('a-src', 'o in field.options')
        elem.innerHTML = `<option disabled:=o.disabled -text="o.name" :value="o.key"></option>`;
        render(elem, { select, data, field });
        return elem;
    },
    "repeat"(_) {
        var elem = input();
        elem.$renders = [function () {
            var { field, data } = this.$scope;
            var { status } = this;
            var field_type = field.ref;
            var valid = this.value === data[field_type];
            if (!this.dirty) {
                status = 'clean';
            } else if (isEmpty(this.value)) {
                if (field.required) {
                    status = 'required';
                } else {
                    status = 'empty';
                }
            } else {
                status = valid ? 'pass' : 'error';
            }
            this.status = status;
            this.valid = valid;
        }];
        return elem;
    },
    "none"() {

    }
};
constructors.int
    = constructors.num
    = constructors.integer
    = constructors.price
    = constructors.money
    = constructors.number;
constructors.gen = constructors.generator;
var readonly_types = {
    "date"() {
        var { field, data } = this;
        var string = data[field.key];
        return filterTime(string, "y年M月d日");
    },
    "url"() {
        var { field, data } = this;
        var href = data[field.key];
        if (href) {
            var e = anchor2(field.holder || href, href);
            e.target = "_blank";
            return e;
        }
    },
    "datetime"() {
        var { field, data } = this;
        return filterTime(data[field.key], "y年M月d日 h:mm");
    },
    "timestamp"() {
        var { field, data } = this;
        return filterTime(data[field.key]);
    },
    "size"() {
        var { field, data } = this;
        var f = data[field.key];
        return size(f);
    },
    html() {
        var { field, data } = this;
        return seek(data, field.key);
    },
    text() {
        var { field, data } = this;
        return data[field.key] ?? '';
    },
    swap() {
        var { field, data } = this;
        var v = data[field.key];
        if (field.options) {
            if (!field.optionsMap) field.optionsMap = createOptionsMap(field.options);
            var o = field.optionsMap[v];
            try { this.setAttribute(field.key, v); } catch { }
            if (isObject(o)) {
                if (o.color) {
                    css(this, { color: o.color });
                    var b = document.createElement('label');
                    b.innerText = o.name;
                    return b;
                }
                return o.name;
            }
            if (isHandled(o)) return o;
        }
        if (isEmpty(v)) v = '';
        return v;
    },
};
var setContent = function (value) {
    if (this === value) return;
    if (isNode(value) && this !== value || isArray(value)) {
        remove(this.childNodes);
        appendChild(this, value);
    }
    else if (isHandled(value)) {
        if (this.field.type === 'html') this.innerHTML = value;
        else this.innerText = value;
    }
};
var Binder = render.Binder, Model = render.Model;
Object.keys(readonly_types).forEach(k => {
    var getter = readonly_types[k];
    readonly_types[k] = new Binder(getter, setContent);
});
var get = new Binder(function () {
    var { field, data } = this;
    if (isEmpty(field.key)) return;
    var value = seek(data, field.key);
    if (field.options) {
        if (!field.optionsMap) {
            var map = Object.create(null);
            for (var o of field.options) {
                var v = getValue(o);
                map[v] = o;
            }
            field.optionsMap = map;
        }
        var map = field.optionsMap;
        if (value in map) {
            value = getName(map[value]);
        }
    }
    return value;
}, setContent);

var ipt = function (element) {
    var { field } = element;
    var ipt = document.createElement('input');
    ipt.setAttribute('type', field.type);
    input(ipt);
    return ipt;
};

function getScopeValue() {
    return this.data[this.field.key];
}
function setScopeValue(v) {
    this.data[this.field.key] = v;
}
var copyOptionData = function () {
    var { data, field } = this;
    if (!data || !field) return;
    var { option_to, options } = field;
    if (!options) return;
    var value = data[field.key];
    var option = isObject(value) ? value : value in options ? options[value] : value;
    extend(data, seek(option, option_to));
};
var getOptionsFrom = function () {
    var { data, field } = this;
    return data[field.options_from];
};
function setModel(ipt) {
    var elem = this;
    if (isHandled(ipt) && ipt !== elem) {
        if (isNode(ipt)) {
            var model = new Model(getScopeValue, setScopeValue, ipt);
            model.hook(elem, elem.field.option_to ? copyOptionData : true);
            appendChild(elem, ipt);
        }
        else {
            elem.innerText = ipt;
        }
    }
}
function setBinder(elem, binder) {
    if (binder === elem.$binder) return;
    removeFromList(elem.$renders, elem.$binder);
    remove(elem.childNodes);
    if (binder instanceof Binder) {
        binder.call(elem);
        elem.$renders.push(binder);
    }
    else {
        var ipt = binder(elem);
        if (ipt && isFunction(ipt.then)) {
            ipt.then(setModel.bind(elem));
        }
        else setModel.call(elem, ipt);
        binder = null;
    }
    elem.$binder = binder;
}
readonly_types.anchor = readonly_types.url;
readonly_types.do = readonly_types.act = readonly_types.action = constructors.generator;
constructors.title = constructors.name = readonly_types.text;
readonly_types.gen = readonly_types.generator = readonly_types.text;
var createOptionsMap = function (options) {
    if (!isObject(options[0])) return options;
    var map = Object.create(null);
    for (var o of options) {
        if (isHandled(o.key)) map[o.key] = o;
        else if (isHandled(o.value)) map[o.value] = o;
    }
    return map;
}
readonly_types.radio = readonly_types.select = readonly_types.swap;
var findReaderForElement = function (type, e) {
    var editor = render.getFromScopes(type, e.$scope, e.$parentScopes);
    if (isFunction(editor) && (editor.isreader || !editor.isediter) && editor.isreader !== false) return editor;
};
var findEditerForElement = function (type, e) {
    var editor = render.getFromScopes(type, e.$scope, e.$parentScopes);
    if (isFunction(editor) && (editor.isediter || !editor.isreader) && editor.isediter !== false) return editor;
};
var markReader = function (readers) {
    for (var k in readers) {
        readers[k].isreader = true;
    }
};
var markEditer = function (editers) {
    for (var k in editers) {
        editers[k].isediter = true;
    }
};

var run = function ({ changes }) {
    var function_type = "function";
    var elem = this;
    var { data, field } = elem;
    if (!data || !field) return;
    var field_type = field.type || field.editor, field_editor = field.editor || field.type;
    if (field_editor instanceof Function && field_type === field_editor) {
        field_type = function_type;
    }
    if (!(field_editor instanceof Function)) {
        field_editor = null;
    }
    if (/\?/.test(field_type)) {
        var [field_type, field_ref] = field_type.split("?");
        field.ref = field_ref;
    }
    if (field.options_from) {
        Object.defineProperty(field, 'options', {
            get: getOptionsFrom.bind(elem)
        });
    }
    var type = elem.getAttribute('type');
    if (type !== field_type) {
        elem.setAttribute("type", field_type);
    }
    if (isString(field_type)) field_type = field_type.replace(/\:[\d+\.]+$/, '');
    var create = null;
    if (elem.readonly || field.readonly) {
        if (field_type === "function") {
            create = field_editor;
        } else {
            create = findReaderForElement(field_type, elem) || readonly_types[field_type];
            if (!create) create = get;
        }
    } else {
        create = field_type === "function" ? field_editor : findEditerForElement(field_type, elem) || constructors[field_type];
        if (!create && field.key) create = ipt;
    }
    setBinder(elem, create);
};

function main(elem) {
    on('changes')(elem, run);
    return elem;
}
markEditer(constructors);
markReader(readonly_types);
var pick = function (constructors, f) {
    var path = [];
    while (typeof f === 'string' && path.indexOf(f) < 0) {
        path.push(f);
        f = constructors[f];
    }
    return f;
};
extend(main, {
    setEditors(map) {
        extend(constructors, map);
        markEditer(map);
    },
    setReadors(map) {
        extend(readonly_types, map);
        markReader(map);
    },
    setModels(map) {
        this.setEditors(map);
        this.setReadors(map);
    },
    setEditor(key, func) {
        if (typeof func === 'function') func.isediter = true;
        else func = pick(constructors, func);
        constructors[key] = func;
    },
    setReador(key, func) {
        if (typeof func === 'function') func.isreader = true;
        else func = pick(readonly_types, func);
        readonly_types[key] = func;
    },
    setModel(key, func) {
        this.setEditor(key, func);
        this.setReador(key, func);
    },
});

main.setEditers = main.setEditors;
main.setReaders = main.setReadors;
main.setReader = main.setReador;
main.setEditer = main.setEditor;