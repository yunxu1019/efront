function maps_test() {
    var config = {
        center: [/*兰考*/114.834364, 34.82138],
        // center: [/*蒙古*/104.751074, 44.163022],
        // center: [/*西亚*/48.068813, 29.321316],
        zoom: 3
    };
    var page = document.createElement('map-test');
    page.innerHTML = template;
    renderWithDefaults(page, {
        menus: ["高德", "百度", "谷歌", "OSM", { name: "Default", actived: true }].map(a => isObject(a) ? a : { name: a }),
        menu,
        maps: [
            maps$gaode,
            maps$baidu,
            maps$google,
            maps$osm,
        ],
        actived: null,
        locat(event) {
            var map = this.map;
            var layerx = event.offsetX || event.layerX || 0;
            var layery = event.offsetY || event.layerY || 0;
            var [lng, lat] = map.location(layerx, layery);
            alert(`${lng},${lat}`);
        },
        open(m) {
            console.log(m, this.actived)
            for (var k in this.actived) {
                delete this.mp.map[k];
            }
            extend(this.mp.map, m, { cache: [] });
            this.mp.map.refresh();
            console.log(this.mp.map)
            this.actived = m;
        },
        map() {
            return new maps(config);
        },
    });
    return page;
}