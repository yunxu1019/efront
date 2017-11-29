function FormData(form) {
    if (!form) form = createElement("form");
    this.form = form;
}

FormData["prototype"] = {
    append(key, value) {
        createElement("input");
        attr(input, "name", key);
        attr(input, "value", value);
        appendChild(this.form, input);
    }
};