var field_Id = 0;
function main(fields, types) {
    var page = fields;
    if (isElement(fields)) {
        fields = [];
        types = [
            { name: '字符串', key: 'string' },
            { name: '布尔值', key: 'boolean' },
            { name: '列表', key: 'array' },
            { name: '攻举', key: 'enum' },
            { name: '对象', key: 'object' },
            { name: '双精度数值', key: 'number' },
            { name: "时间戳", key: "timestamp" }
        ];
    }
    else {
        page = form();
    }
    var avoid = [].concat(fields);
    var defines = refilm`
    /name/显示名 input ^${avoid}
    */key/键名 input ^${avoid}
    /type/选择类型 select ${types}
    `;
    var scope = {
        select,
        fields,
        field,
        defines,
        dlist: list,
        btn: button,
        drop,
        padding,
        focus(a) {
            addClass(a, 'focus');
        },
        blur(a) {
            removeClass(a, 'focus');
        },
        add() {
            var field = {
                id: ++field_Id
            }
            this.fields.push(field);
            avoid.push(field);
            setTimeout(() => {
                fieldsContainer.go(this.fields.length);
            })
        },
        remove(field) {
            removeFromList(this.fields, field);
            removeFromList(avoid, field);
        },
        types
    };
    care(page, function (fields1) {
        if (isArray(fields1[0])) {
            [fields1, types] = fields1;
        }
        else {
            fields1 = fields1;
        }
        field_Id = fields1.length;
        fields = scope.fields = fields1;
        avoid.splice(0, avoid.length, ...fields1);
        defines[2].options = types;
        console.log(page.avoid, 'avoid')
    });
    page.innerHTML = design;
    render(page, scope);

    var [options, fieldsContainer] = page.children;
    // vbox(fieldsContainer);
    autodragchildren(fieldsContainer, fieldsContainer, function (src, dst, dst1) {
        src = src.target.index;
        dst = dst.target.index + dst - dst1;
        var fields = scope.fields;
        var field = fields.splice(src, 1)[0];
        fields.splice(dst, 0, field);
        render.refresh();
    });
    return page;
}