var { URL } = window;
function setValue(src) {
    if (this.value === src) return;
    this.value = src;
    cast(this, src);
    return src;
}
function getValue() {
    return this.value;
}

var choose = function () {
    var elem = this;
    chooseFile('image/*').then(function ([file]) {
        var { uploadto } = elem;
        if (!uploadto) uploadto = elem.getAttribute("uploadto");
        if (URL) {
            var url = URL.createObjectURL(file);
            elem.setValue(url);
            dispatch(elem, 'change');
            if (uploadto) {
                uploadto = uploadto.replace(/\/+$/, '') + "/";
                var serverUrl = uploadto + url.replace(/^[\s\S]*?([\w\-]+)$/, "$1");
                cross("put", serverUrl).send(file).done(function (resposne) {
                    elem.setValue(serverUrl);
                    dispatch(elem, 'change');
                    URL.revokeObjectURL(url);
                });
            }
        }
    });
};

var build = function () {
    var elem = this;
    elem.choose = choose;
    elem.setValue = setValue;
    elem.getValue = getValue;
    render(elem, { btn: button });
};

var ondata = function (src) {
    css(this, {
        backgroundImage: `url('${src}')`
    });
    this.hasInstance = !!src;
}
function main(elem = div()) {
    var { uploadto } = elem;
    elem.choose = choose;
    elem.innerHTML = image;
    if (!uploadto) {
        uploadto = elem.getAttribute("uploadto");
    }
    care(elem, ondata, false);
    build.call(elem);
    return elem;
}