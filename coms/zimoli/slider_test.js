var page = div();
page.innerHTML = slider_test;

render(page, {
    btn: button,
    slider(element) {
        var images = [1, 2, 3].map(function (i) {
            var ele = createElement(div);
            text(ele, i);
            return ele;
        });
        var _slider = slider(images, 0 !== +element.getAttribute("circle"));
        _slider.play();
        window.Slider = _slider;
        return _slider;
    }
});
function main() {
    return page;
}