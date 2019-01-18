function view_test() {
    view().show().setTitle("你好");
    view().show().setTitle("你好2").moveTo(40, 40);
    view().show().setTitle("你好3").moveTo(40, 60).moveBy(20, 20);
}