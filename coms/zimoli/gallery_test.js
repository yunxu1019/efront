function main() {
    var items = new Array(100).fill(0).map((_, i) => ({ color: color.random(), name: "item " + (i + 1), height: Math.random() * 100 + 60 }));
    var layer = div();
    layer.innerHTML = template;
    var scope = {
        gallery,
        data: []
    };
    renderWithDefaults(layer, scope);
    layer.querySelector("gallery").go(0);
    onappend(layer, function () {
        scope.data = items;
    });
    return layer;
}