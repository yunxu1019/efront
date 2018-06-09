function slider_test() {
    var images = [1].map(function (i) {
        var ele = createElement(div);
        text(ele, i);
        return ele;
    });
    var _slider = slider(images);
    _slider.go(0).play();
    window.Slider = _slider;
    return _slider;
}