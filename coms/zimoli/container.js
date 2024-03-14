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
    else if (isString(data) || +data < 0) zimoli.go(data, this.params, this);
};
var gosrc = function () {
    var { src } = this;
    if (this.hasAttribute && this.hasAttribute('src')) {
        src = this.getAttribute('src');
    }
    if (src !== this.$src) {
        change.call(this, src);
        this.$src = src;
    }
};
function container(element) {
    var comment = document.createComment('container');
    comment.$struct = element.$struct;
    care(comment, gosrc);
    return comment;
}