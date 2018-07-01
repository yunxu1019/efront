var $scope = function () {

};
$scope.prototype = {
    $new() {
        var $scope = function () {
        };
        $scope.prototype = this;
        return new $scope;
    }
}
var $rootScope = new $scope;