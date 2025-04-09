
function createItemTarget(item, target) {
    var $scope = {};
    var { itemName, indexName, keyName } = this.$src;
    if (itemName) $scope[itemName] = item;
    else $scope.$item = item;
    var element = document.createComment('active');
    var tscope = target && $scoped.get(target);
    if (tscope) {
        if (indexName) $scope[indexName] = tscope[indexName];
        if (keyName) $scope[keyName] = tscope[keyName];
        $scope.$index = tscope.$index;
        $scope.$key = tscope.$key;
    }
    $scoped.set(element, $scope);
    return element;
}