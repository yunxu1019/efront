var { URL } = window;
function main(elem = div()) {
    elem.innerHTML = image;
    render(elem, {
        hasInstance: false,
        btn: button,
        choose() {
            chooseFile('image/*').then(([file]) => {
                if (URL) {
                    var url = URL.createObjectURL(file);
                    css(elem, {
                        backgroundImage: `url('${url}')`
                    });
                    var { uploadto } = elem;
                    if (!uploadto) {
                        uploadto = elem.getAttribute(uploadto);
                    }
                    if (uploadto) {
                        uploadto = uploadto.replace(/\/+$/, '') + "/";
                        var serverUrl = uploadto + url.replace(/^[\s\S]*?([\w\-]+)$/, "$1");
                        cross("put", serverUrl).send(file).done(function (resposne) {
                            css(elem, {
                                backgroundImage: `url('${serverUrl}')`
                            });
                        });
                    }
                }
                this.hasInstance = true;
            });
        }
    });
    return elem;
}