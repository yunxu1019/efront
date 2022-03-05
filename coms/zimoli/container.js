var change = function (data) {
    zimoli.go(data, this.params, this);
};
var gosrc = function () {
    var { src } = this;
    if (this.hasAttribute && this.hasAttribute('src')) {
        src = this.getAttribute('src');
    }
    if (src !== this._src) {
        change.call(this, src);
        this._src = src;
    }
};
function container(element) {
    var src;
    if (element && element.hasAttribute('src')) {
        src = element.getAttribute('src');
    }
    element = document.createComment('container');
    element.src = src;
    element.renders = [gosrc];
    return element;
}