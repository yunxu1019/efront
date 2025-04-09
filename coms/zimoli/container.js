var change = async function (src) {
    if (src !== this.$src) return;
    if (!src) remove(this.with);
    else if (isNode(src)) {
        var struct = $structed.get(this);
        if (isElement(src) && struct.copys) {
            for (var c of struct.copys) {
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
    else if (isString(src) || +src < 0) {
        onparams.call(this, this.params);
    }
};
var gosrc = function (src) {
    if (!isHandled(this.$src) && !isHandled(src)) return;
    if (src !== this.$src) {
        this.$src = src;
        change.call(this, src);
    }
};
var goone = function () {
    if ("$src" in this) return;
    gosrc.call(this, this.src);
};
var onparams = function (params) {
    zimoli.go(this.$src, params, this);
};
function container(element) {
    var comment = document.createComment('container');
    $structed.set(comment, $structed.get(element));
    care(comment, gosrc);
    if (element.hasAttribute && element.hasAttribute('src')) {
        var src = element.getAttribute('src');
        if (src) comment.src = src, oncemount(comment, goone);
    }
    return comment;
}