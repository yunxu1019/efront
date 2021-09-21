/**
 * 计算两个矩形元素的重叠面积
 */

function overlap(rect1, rect2) {
    // 如果两个矩形区域有交集，那么矩形区域的中心点的距离分量小于边长和的一半
    // abs(center1x-center2x)<(rect1w+rect2w)/2
    // abs(center1y-center2y)<(rect1h+rect2h)/2
    // abs(rect1l)
    if (!rect1 || !rect2) return;
    if (isElement(rect1)) rect1 = getScreenPosition(rect1);
    if (isElement(rect2)) rect2 = getScreenPosition(rect2);
    var xlap = linelap(rect1.left, rect1.width, rect2.left, rect2.width);
    var ylap = linelap(rect1.top, rect1.height, rect2.top, rect2.height);
    return xlap > 0 && ylap > 0 ? xlap * ylap : 0;
}
var { min, abs } = Math;
function linelap(start1, length1, start2, length2) {
    // 线段重合的长度
    var center1 = start1 + length1 / 2, center2 = start2 + length2 / 2;
    return min(length1, length2, (length1 + length2) / 2 - abs(center1 - center2));
}
