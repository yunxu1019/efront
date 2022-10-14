var change = async function (data) {
    if (!data) remove(this.with);
    else if (isNode(data)) {
        if (isElement(data) && this.$struct.copys) {
            for (var c of this.$struct.copys) {
                if (c.name === 'class') {
                    addClass(data, c.value);
                }
                else if (c.name === 'style') {
                    css(data, c.value);
                }
                else data.setAttribute(c.name, c.value);
            }
        }
        zimoli.global(data, this);
    }
    else zimoli.go(data, this.params, this);
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
    var comment = document.createComment('container');
    comment.src = src;
    comment.$struct = element.$struct;
    comment.renders = [gosrc];
    return comment;
}