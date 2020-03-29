var { URL } = window;
var defaultScope = {
    hasInstance: false,
    btn: button,
    setValue(src) {
        if (this.value === src) return;
        this.value = src;
        cast(this, src);
    },
};
var choose = function () {
    var elem = this;
    var { uploadto } = this;
    chooseFile('image/*').then(function ([file]) {

        if (URL) {
            var url = URL.createObjectURL(file);
            elem.value = url;
            cast(elem, url);
            dispatch(elem, 'change');
            if (uploadto) {
                uploadto = uploadto.replace(/\/+$/, '') + "/";
                var serverUrl = uploadto + url.replace(/^[\s\S]*?([\w\-]+)$/, "$1");
                cross("put", serverUrl).send(file).done(function (resposne) {
                    elem.value = serverUrl;
                    cast(elem, serverUrl);
                    dispatch(elem, 'change');
                });
            }
        }
        elem.hasInstance = true;
    });
};

var build = function () {
    var elem = this;
    var { $scope = {} } = elem;
    elem.choose = choose;
    extendIfNeeded($scope, defaultScope);
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
        this.$scope.hasInstance = !!src;
        render.refresh();
    }, false);
    build.call(elem);
    return elem;
}