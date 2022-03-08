function createItemTarget(item, target) {
    var $scope = {};
    var { itemName, indexName, keyName } = this.$src;
    if (itemName) $scope[itemName] = item;
    else $scope.$item = item;
    if (target && target.$scope) {
        if (indexName) $scope[indexName] = target.$scope[indexName];
        if (keyName) $scope[keyName] = target.$scope[keyName];
        $scope.$index = target.$scope.$index;
        $scope.$key = target.$scope.$key;
    }
    return { $scope };
}