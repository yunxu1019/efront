
function tree_test() {
    var banner = tree();
    api("/getAllComponents").success(function (result) {
        banner.src(result.result);
        banner.go(0);
        test_scroll(banner);
    }).error(function (err) {
        alert(err);
    });
    return banner;
}
