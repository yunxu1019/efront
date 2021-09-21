var change = function (data) {
    zimoli.go(data, this.params, this);
};
function container(element) {
    care(element, change);
    return element;
}