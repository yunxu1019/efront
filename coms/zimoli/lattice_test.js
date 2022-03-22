function main() {
    var items = new Array(100).fill(0).map((_, i) => {
        var c = color.random("#b28")
        return { color: c, textColor: color.pair(c), name: "item " + (i + 1) }
    });
    var layer = div();
    layer.innerHTML = template;
    renderWithDefaults(layer, {
        data: items
    });
    layer.querySelector("lattice");
    return layer;
}