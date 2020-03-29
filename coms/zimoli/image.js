var { URL } = window;
var defaultScope = {
    hasInstance: false,
    btn: button
};
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
    var { uploadto } = this;
    chooseFile('image/*').then(function ([file]) {

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
    var { $scope = {} } = elem;
    elem.choose = choose;
    extendIfNeeded($scope, defaultScope);
    elem.setValue = setValue;
    elem.getValue = getValue;
    render(elem, $scope);
};

function main(elem = div()) {
    var { uploadto } = elem;
    elem.innerHTML = image;
    if (!uploadto) {
        uploadto = elem.getAttribute("uploadto");
    }
    care(elem, function (src) {
        css(elem, {
            backgroundImage: `url('${src}')`
        });
        this.hasInstance = this.$scope.hasInstance = !!src;
        render.refresh();
    }, false);
    build.call(elem);
    return elem;
}