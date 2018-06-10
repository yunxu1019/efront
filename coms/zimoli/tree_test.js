function tree_test() {
    var banner = tree();
    api("/getAllComponents").success(function (result) {
        banner.src (result.result);
        banner.go(0);
    }).error(function (err) {
        alert(err);
    });
    return banner;
}
