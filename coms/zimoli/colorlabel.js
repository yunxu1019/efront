function main(elem = div()) {
    care(elem, function (c) {
        css(this, 'background-color', c);
        css(this, 'color', color.pair(c));
    });
    return elem;
}