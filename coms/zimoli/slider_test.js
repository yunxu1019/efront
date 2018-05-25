function slider_test() {
    var images = new Array(7).fill(0).map(function (a, i) {
        var ele = createElement(div);
        text(ele, i);
        return ele;
    });
    var _slider = slider(images);
    _slider.go(0).play();
    window.Slider = _slider;
    return _slider;
}