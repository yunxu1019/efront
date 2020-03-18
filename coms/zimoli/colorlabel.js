function main(elem = div()) {
    care(elem, function (color) {
        css(this, 'background', color);
    });
    return elem;
}