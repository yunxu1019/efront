function jsonp_test() {
    jsonp("https://api.map.baidu.com/reverse_geocoding/v3/?ak=cfID7iaXz1xF6W5b6NMG2wNE4dHFhL6b&output=json&coordtype=wgs84ll", { callback: console.log })
}