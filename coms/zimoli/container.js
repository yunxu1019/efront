var change = lazy(async function (data) {
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
});
var gosrc = function (src) {
    if (src !== this.$src) {
        this.$src = src;
        change.call(this, src);
    }
};
function container(element) {
    var comment = document.createComment('container');
    comment.$struct = element.$struct;
    care(comment, gosrc);
    if (element.hasAttribute && element.hasAttribute('src')) {
        var src = element.getAttribute('src');
        if (src) oncemount(comment, function () {
            if ("$src" in this) return;
            gosrc.call(this, src);
        });
    }
    return comment;
}