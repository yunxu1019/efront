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
        var [centerlng, centerlat] = map.Center();
        var zoom = map.Zoom();
        var centerx = map.lng2x(centerlng, zoom);
        var centery = map.lat2y(centerlat, zoom);
        var { offsetWidth, offsetHeight } = this;
        var x = centerx + (layerx - offsetWidth / 2) / 256;
        var y = centery + (layery - offsetHeight / 2) / 256;
        var lng = +map.x2lng(x, zoom).toFixed(6), lat = +map.y2lat(y, zoom).toFixed(6);
        alert(`${lng},${lat}`);
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