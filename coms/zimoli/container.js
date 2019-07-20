var change = function ({ changes }) {
    if (changes.src && this.src) {
        zimoli.go(this.src, this.params, this);
    }
};
function container(element) {
    on("changes")(element, change);
    return comment;
}