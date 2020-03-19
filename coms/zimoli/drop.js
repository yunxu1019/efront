function main(elem = div()) {
    if (!elem.innerHTML) {
        elem.innerHTML = drop;
    }
    return elem;
}