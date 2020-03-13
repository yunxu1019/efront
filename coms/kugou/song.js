function main(elem = div()) {
    care(elem, function (item) {
        elem.innerHTML = song;
        render(this, {
            filterTime,
            song: item
        });
    });
    return block(elem);
}