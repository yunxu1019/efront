var {
    PI,
    atan,
    pow,
    exp,
    floor,
    log,
    tan,
    cos
} = Math;
var R = 6378137;

function x2lng(x, zoom) {
    return (pow(2, 26 - zoom) * x) * 180 / PI / R;
}
function y2lat(y, zoom) {
    var t = pow(2, 26 - zoom) * y / R;
    return 360 * atan(exp(t)) / PI - 90;
}
function lng2x(lng, zoom) {
    return pow(2, zoom - 26) * PI * lng * R / 180;
}
function lat2y(lat, zoom) {
    return pow(2, zoom - 26) * R * log(tan(lat * PI / 180) + 1 / cos(PI * lat / 180));
}
var baidu = {
    getURL: function (x, y, z) {
        if (x < 0) x = "M" + -x;
        if (y < 0) y = "M" + -y;
        return `https://maponline2.bdimg.com/tile/?qt=tile&x=${x}&y=${y}&z=${z}&styles=pl&scaler=1&udt=20180721`;
    },
    lat2y,
    lng2x,
    x2lng,
    y2lat,
    minLng: -180,
    maxLng: 180,
    direction: -1,
    lat2tile(lat, zoom) {
        return Math.ceil(this.lat2y(lat, zoom));
    },
    lng2tile(lng, zoom) {
        return Math.floor(this.lng2x(lng, zoom));
    }
}