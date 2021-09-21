// 空间变换算法
// function [dots]=xrs(dots,wyh)
// % 转动，缩放，平移，依次进行
// % wyh.mid为变换中心
// % wyh.ppt为转动轴的方向
// % wyh.alph为转动角度
// % wyh.scrl为缩放系数，反射可设轴向系数为-1
// % wyh.drag为平移向量
// wyh.alph=pi*wyh.alph/180;
// if size(dots,2)==3
//     if numel(wyh.ppt) == 2 
//         theta = pi*wyh.ppt(1)/180;
//         phi = pi*wyh.ppt(2)/180;
//         rot_u = [cos(phi)*cos(theta); cos(phi)*sin(theta); sin(phi)];
//     elseif numel(wyh.ppt) == 3 
//         rot_u = wyh.ppt(:)/norm(wyh.ppt);
//     end
//     x_u = rot_u(1);
//     y_u = rot_u(2);
//     z_u = rot_u(3);
//     cosa = cos(wyh.alph);
//     sina = sin(wyh.alph);
//     vera = 1 - cosa;
//     rot = [cosa+x_u^2*vera x_u*y_u*vera-z_u*sina x_u*z_u*vera+y_u*sina; ...
//         x_u*y_u*vera+z_u*sina cosa+y_u^2*vera y_u*z_u*vera-x_u*sina; ...
//         x_u*z_u*vera-y_u*sina y_u*z_u*vera+x_u*sina cosa+z_u^2*vera]';
// else
//     rot=[cos(wyh.alph),-sin(wyh.alph);sin(wyh.alph),cos(wyh.alph)];
// end
// for cx=1:size(dots,1)
//     dots(cx,:)=(dots(cx,:)-wyh.mid).*wyh.scrl*rot+wyh.mid+wyh.drag;
// end
// end
var pi = Math.PI;
var { cos, sin, sqrt } = Math;
var norm = function (vector) {
    var [x, y, z] = vector;
    return sqrt(x * x + y * y + z * z);
};
var vectorDivide = function (vector, num) {
    var [x, y, z] = vector;
    return [x / num, y / num, z / num];
};
var vectorMinus = function (vector1, vector2) {
    var [x1, y1, z1] = vector1;
    var [x2, y2, z2] = vector2;
    return [x1 - x2, y1 - y2, z1 - z2];
};
var vectorPlus = function (vector1, vector2) {
    var [x1, y1, z1] = vector1;
    var [x2, y2, z2] = vector2;
    return [x1 + x2, y1 + y2, z1 + z2];

}
var crossMultiply = function (A, B) {
    var [xa, ya, za] = A;
    var [xb, yb, zb] = B;
    return [ya * zb - yb * za, za * xb - zb * xa, xa * yb - ya * xb];
};
var innerMultiply = function (A, B) {
    var [xa, ya, za] = A;
    var [xb, yb, zb] = B;
    return xa * xb + ya * yb + za * zb;
};
var vectorMultify = function (vector1, vector2) {
    var [x1, y1, z1] = vector1;
    var [x2, y2, z2] = vector2;
    return [x1 * x2, y1 * y2, z1 * z2];
};
var matrixMultify = function (A, B) {
    var [
        a11, a12, a13
    ] = A;
    var [
        [b11, b12, b13],
        [b21, b22, b23],
        [b31, b32, b33]
    ] = B;
    return [
        a11 * b11 + a12 * b21 + a13 * b31,
        a11 * b12 + a12 * b22 + a13 * b32,
        a11 * b13 + a12 * b23 + a13 * b33
    ];
};
var getMetrix4d = function (wyh) {
    var vector = wyh.vector;
    switch (vector.length) {
        case 2:
            var theta = pi * vector[0] / 180;
            var phi = pi * vector[1] / 180;
            var rot_u = [cos(phi) * cos(theta), cos(phi) * sin(theta), sin(phi)];
            break;
        case 3:
            var mode = norm(vector);
            rot_u = vectorDivide(vector, mode);
            break;
        default:
            throw new Error("向的维度不支持");
    }
    var [x_u, y_u, z_u] = rot_u;
    var cosa = cos(wyh.theta);
    var sina = sin(wyh.theta);
    var vera = 1 - cosa;
    return [
        [cosa + x_u ^ 2 * vera, x_u * y_u * vera - z_u * sina, x_u * z_u * vera + y_u * sina],
        [x_u * y_u * vera + z_u * sina, cosa + y_u ^ 2 * vera, y_u * z_u * vera - x_u * sina],
        [x_u * z_u * vera - y_u * sina, y_u * z_u * vera + x_u * sina, cosa + z_u ^ 2 * vera]
    ];
};
var getMetrix2d = function (wyh) {
    return [
        [cos(wyh.theta), -sin(wyh.theta)],
        [sin(wyh.theta), cos(wyh.theta)]
    ];
};
var xrs = function (dots, wyh) {
    // % 转动，缩放，平移，依次进行
    // % wyh.center为变换中心
    // % wyh.vector为转动轴的方向
    // % wyh.theta为转动角度
    // % wyh.scale为缩放系数，反射可设轴向系数为-1
    // % wyh.move为平移向量
    var { center = [0, 0, 0], scale = [1, 1, 1], move = [0, 0, 0] } = wyh;
    var rot = getMetrix4d(wyh);
    return dots.map(function (dot) {
        dot = vectorMinus(dot, center);
        dot = vectorMultify(dot, scale);
        dot = matrixMultify(dot, rot);
        dot = vectorPlus(dot, center);
        dot = vectorPlus(dot, move);
        return dot;
    });
};

var matrix = {
    xrs,
    getMetrix2d,
    getMetrix3d: getMetrix4d,
    crossMultiply,
    innerMultiply,
    vectorMultify,
    vectorDivide,
    vectorMinus,
    vectorPlus,
    norm
};