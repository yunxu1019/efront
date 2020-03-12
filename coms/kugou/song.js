function main(elem = div()) {
    care(elem, function (item) {
        elem.innerHTML = song;
        render(this, {
            song: item
        });
    });
    return block(elem);
}