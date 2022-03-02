var change = function (data) {
    zimoli.go(data, this.params, this);
};
var gosrc = function () {
    if (this.hasAttribute('src')) {
        var src = this.getAttribute('src');
        if (src !== this.src) {
            this.src = src;
            if (src) cast(this, this.getAttribute('src'));
        }
    }
};
function container(element) {
    care(element, change);
    element.renders = [gosrc];
    return element;
}