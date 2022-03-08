function maps_test() {
    var map = new maps({
        center: [/*兰考*/114.834364, 34.82138],
        center: [/*蒙古*/104.751074, 44.163022],
        center: [/*西亚*/48.068813, 29.321316],
        zoom: 12
    });
    onclick(map, function (event) {
        var map = this.map;
        var layerx = event.offsetX || event.layerX || 0;
        var layery = event.offsetY || event.layerY || 0;
        var [lng, lat] = map.location(layerx, layery);
        alert(`${lng},${lat}`);
    });
    var active;
    var buttons = ["高德", "百度", "谷歌", "OSM", "Default"].map((a, cx) => {
        var btn = button(a);
        onclick(btn, function () {
            if (active) for (var k in active) {
                delete map.map[k];
            }
            extend(map.map, active = [
                maps$gaode,
                maps$baidu,
                maps$google,
                maps$osm,
            ][cx], { cache: [] });
            map.map.refresh();
        });
        return btn;
    });
    buttons[3].click();
    return option(group(buttons), map, 8);
}