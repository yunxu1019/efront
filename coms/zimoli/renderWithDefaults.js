var getNeededElementReplacers = function (page) {
    var dest = Object.create(null);
    var get = function (elem) {
        var { tagName } = elem;
        tagName = tagName.toLowerCase().replace(/\-(\w)/g, (_, a) => a.toUpperCase());
        if (tagName in dest) {
            return;
        }
        dest[tagName] = false;
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