function main(elem = document.createElement("check")) {
    var page = elem;
    page.innerHTML = checker;
    page.setValue = function (value) {
        value = !!value;
        if (value === this.value) return;
        this.value = value;
        if (value) {
            addClass(page, 'checked');
        } else {
            removeClass(page, 'checked');
        }
    };
    return page;
}