var downloadmap_test = function () {
    var map_location = [117,38,117.5,38.5];
    var root_path = "D:\\downloadedmaps\\";
    var status = div();
    var info = function (text) {
        status.innerHTML = text;
    };
    downloadmap(root_path + "google", map_location, [1, 3], maps$google, info);
    downloadmap(root_path + "baidu", map_location, [1, 3], maps$baidu, info);
    downloadmap(root_path + "osm", map_location, [1, 3], maps$osm, info);
    return status;
};