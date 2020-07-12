var getNeededElementReplacers = function (page) {
    var dest = Object.create(null);
    var foreach = [].forEach;
    var get = function (elem) {
        var { tagName } = elem;
        tagName = tagName.toLowerCase().replace(/\-(\w)/g, (_, a) => a.toUpperCase());
        dest[tagName] = false;
        foreach.call(elem.children, get);
    };
    get(page);
    var res = Object.create(null);
    Object.keys(dest).filter(k => k in renderDefaults).forEach(function (key) {
        res[key] = renderDefaults[key];
    });
    return res;
};
function main(page, $scope = {}) {
    var replacers = getNeededElementReplacers(page);
    extendIfNeeded($scope, replacers);
    render(page, $scope);
    return page;
}