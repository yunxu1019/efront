var change = lazy(async function (src) {
    if (src !== this.$src) return;
    if (!src) remove(this.with);
    else if (isNode(src)) {
        if (isElement(src) && this.$struct.copys) {
            for (var c of this.$struct.copys) {
                if (c.name === 'class') {
                    addClass(src, c.value);
                }
                else if (c.name === 'style') {
                    css(src, c.value);
                }
                else src.setAttribute(c.name, c.value);
            }
        }
        zimoli.global(src, this);
    }
    else if (isString(src) || +src < 0) zimoli.go(src, this.params, this);
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