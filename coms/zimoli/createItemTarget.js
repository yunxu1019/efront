function createItemTarget(item) {
    var $scope = {};
    var { itemName } = this.$src;
    if (itemName) $scope[itemName] = item;
    else $scope.$item = item;
    return { $scope };
}