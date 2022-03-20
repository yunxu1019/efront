function autofocus(e) {
    if (!e.renders) e.renders = [];
    var savedElement;
    e.renders.push(function () {
        var parent = rootElements[rootElements.length - 1] || document.body;
        if (savedElement === parent) {
            if (this !== parent || getTargetIn(parent, document.activeElement)) return;
        }
        savedElement = parent;
        if (/^(input|textarea)$/i.test(this.tagName) || /^true$/.test(this.contentEditable)) {
            if (getTargetIn(parent, this)) {
                this.focus();
            }
        }
        else if (parent === this) {
            var e = this.querySelector("input,textarea,[contenteditable]");
            if (e) e.focus();
        }
    });
}