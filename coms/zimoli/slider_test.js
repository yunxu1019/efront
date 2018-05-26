function slider_test() {
    var images = [1, 2, 3, 4, 5, 6, 7].map(function (a, i) {
        var ele = createElement(div);
        text(ele, i);
        return ele;
    });
    var _slider = slider(images);
    _slider.go(0).play();
    window.Slider = _slider;
    return _slider;
}