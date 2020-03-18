var { URL } = window;
function main(elem = div()) {
    elem.innerHTML = image;
    render(elem, {
        hasInstance: false,
        btn: button,
        choose() {
            chooseFile('image/*').then((file) => {
                var f = file[0];
                if (URL) {
                    var url = URL.createObjectURL(f);
                    css(elem, {
                        backgroundImage: `url('${url}')`
                    });
                }
                this.hasInstance = true;
            });
        }
    });
    return elem;
}