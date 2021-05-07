// 二维坐标变换
var ratio = Math.PI / 180;
function rotate(dot, deg, center) {
    var [x, y] = dot;
    deg *= ratio;
    var cos = Math.cos(deg);
    var sin = Math.sin(deg);
    var m, n
    if (center) {
        var [m, n] = center;
    } else {
        var m = n = 0;
    }
    x -= m, y -= n;
    var x1 = x * cos + y * sin
    var y1 = -x * sin + y * cos
    return [x1 + m, y1 + n];
}