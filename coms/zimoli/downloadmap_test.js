var downloadmap_test = function () {
    var map_locations = [
        [116.1435431136307, 35.98508591897931],
        [116.1435431136307, 35.98508591897931],
        [117.7042400986857, 36.47209542932315],
        [117.2058245789552, 36.97681787528374]
    ];
    var root_path = "D:\\downloadedmaps\\";
    var status = div();
    var info = function (text) {
        status.innerHTML = text;
    };
    // downloadmap(root_path + "google", map_location, [1, 3], maps$google, info);
    // downloadmap(root_path + "baidu", map_location, [1, 3], maps$baidu, info);
    downloadmap(root_path + "osm", map_locations, [1, 18], maps$osm, info);
    return status;
};