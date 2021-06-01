function view_test() {
    return [
        view().show().setTitle("你好"),
        view().show().setTitle("你好2").moveTo(400, 40),
        view().show().setTitle("你好3").moveTo(400, 60).moveBy(20, 20)
    ];
}