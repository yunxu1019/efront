function main(page, $scope = {}) {
    extendIfNeeded($scope, renderDefaults);
    render(page, $scope);
    return page;
}