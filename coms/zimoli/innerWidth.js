var document = this.document;
function innerWidth() {
    return document.documentElement.clientWidth || document.body && document.body.clientWidth;
}
innerWidth.toString = function () {
    return this().toString();
};
innerWidth.valueOf = function () {
    return this();
};