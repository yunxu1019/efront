var document = this.document;

function innerHeight() {
    return document.documentElement.clientHeight || document.body && document.body.clientHeight;
}
innerHeight.toString = function () {
    return this().toString();
};
innerHeight.valueOf = function () {
    return this();
};