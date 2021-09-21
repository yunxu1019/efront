function main(elem = document.createElement("explorer")) {
    elem.innerHTML = explorer;
    render(elem, {
        tree,
        lattice
    });
    return elem;
}