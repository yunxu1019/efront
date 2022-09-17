var document = this.document;

function innerHeight() {
    if (isFinite(window.innerHeight)) return window.innerHeight;
    return document.documentElement.offsetHeight || document.body && document.body.offsetHeight;
}
innerHeight.toString = function () {
    return this().toString();
};
innerHeight.valueOf = function () {
    return this();
};