function Switch_test() {
    var _switch1 = Switch();
    on("change")(_switch1, function () {
        console.log(_switch1.checked, _switch1.value)
    });
    return _switch1;
}