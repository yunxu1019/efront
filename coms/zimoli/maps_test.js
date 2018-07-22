function maps_test() {
    var map = new maps({
        center: [114.834364, 34.82138],
        zoom: 10
    });
    var active;
    var buttons = ["百度", "谷歌", "OSM", "Default"].map((a, cx) => {
        var btn = button(a);
        onclick(btn, function () {
            if (active) for (var k in active) {
                delete map.map[k];
            }
            extend(map.map, active = [
                maps$baidu,
                maps$google,
                maps$osm
            ][cx]);
            map.map.refresh();
        });
        return btn;
    });
    buttons[0].click();
    return option(group(buttons), map, 8);
}