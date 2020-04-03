function elementByCss() {
    var css_selectors = arguments;
    for (var cx = 0, dx = css_selectors.length; cx < dx; cx++) {
        var css_selector = css_selectors[cx];
        var target = document.querySelector(css_selector);
        if (target)
            break;
    }
    return this
}