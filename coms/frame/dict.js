function main(types, elem) {
    var { field, data, readonly } = elem;
    elem.innerHTML = `<span -text="text()"></span>` + (readonly ? "" : '<a @click="edit()">修改</a>');
    renderWithDefaults(elem.children, {
        text() {
            if (data[field.key]) return data[field.key].map(k => `${k.name} ${isEmpty(k.key) ? "" : `(${k.key})`}`).join(", ");
            return '';
        },
        edit() {
            var editer = frame$design(data[field.key], types);
            css(editer, { position: 'absolute' });
            popup(editer);
            move.bindPosition(editer, [.5, .5]);
            on("changed")(editer, function () {
                console.log(this.value, field)
                data[field.key] = this.value;
            });
        }
    })
    return elem;
};
