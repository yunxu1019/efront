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
"use strict";

var notMatchLength = new Error("矩阵长度不一致");
function transform(A, B) {
    var dimention = Math.sqrt(B.length - 1) | 0;
    if (A.length % dimention !== 0) throw notMatchLength;
    if (A === B) B = B.slice(0);
    var dim2 = B.length % dimention !== 0 ? dimention + 1 : dimention;
    for (var cx = 0, dx = A.length; cx < dx;) {
        for (var cy = 0, dy = dimention; cy < dy; cy++) {
            var sum = 0;
            for (var ct = 0, dt = dimention; ct < dt; ct++) {
                sum += A[ct] * B[ct * dim2 + cy];
            }
            A[cx++] = sum;
        }
    }
    if (dim2 === dimention) {
        var dim2start = dimention * dim2;
        for (var cx = 0, dx = A.length; cx < dx;) {
            for (var cy = dim2start, dy = dim2start + dimention; cy < dy; cy++) {
                A[cx++] += B[cy];
            }
        }
    }
    return A;
};

function translate(A, delta) {
    var dim = delta.length;
    var dim2 = dim;
    if (A.length % dim !== 0) dim2++;
    var inc = 0;
    for (var cx = dim * dim2, dx = cx + dim; cx < dx; cx++) {
        A[cx] = (A[cx] || 0) + delta[inc++];
    }
    return A;
}


function 负(a) {
    return -a;
}


function inner(vec1, vec2) {
    if (vec1.length !== vec2.length) throw notMatchLength;
    var sum = 0;
    for (var cx = 0, dx = vec1.length; cx < dx; cx++) {
        sum += vec1[cx] * vec2[cx];
    }
    return sum;
}
function cross(vec1, vec2) {
    if (vec1.length !== vec2.length) throw notMatchLength;
    var c = new Array(vec1.length);
    for (var cx = 0, dx = vec1.length; cx < dx; cx++) {
        var s = 0, f = 1;
        for (var cy = 1, dy = dx; cy < dy; cy++) {
            var c1 = cx + cy;
            var c2 = c1 + f;
            if (c1 >= dx) c1 -= dx;
            if (c2 >= dx) c2 -= dx;
            f = 0 - f;
            s += vec1[c1] * vec2[c2];
        }
        c[cx] = s;
    }
    return c;
}
function scale(vector, factor) {
    for (var cx = 0, dx = vector.length; cx < dx; cx++) {
        vector[cx] *= factor;
    }
    return vector;
}

function olinde(v, vector) {
    // 罗德里格旋转公式
    // https://baike.baidu.com/item/%E7%BD%97%E5%BE%B7%E9%87%8C%E6%A0%BC%E6%97%8B%E8%BD%AC%E5%85%AC%E5%BC%8F/18878562
    // https://www.cnblogs.com/flyinggod/p/8144100.html 旋转矩阵、欧拉角、四元数理论及其转换关系
    var theta = norm(vector);
    var k = scale(vector.slice(0), 1 / theta);
    var cosa = Math.cos(theta);
    var sina = Math.sin(theta);
    var inna = inner(k, v);
    var aa = inna * (1 - cosa);
    var kv = cross(k, v);
    for (var cx = 0, dx = k.length; cx < dx; cx++) {
        v[cx] = v[cx] * cosa + aa * k[cx] + sina * kv[cx];
    }
    return v;
}
function matrix2d(theta) {
    var cosa = Math.cos(theta);
    var sina = Math.sin(theta);
    return new Matrix(
        cosa, sina, 0,
        -sina, cosa, 0,
        0, 0, 1
    );
};
function matrix3d(factor) {
    var theta = norm(factor);
    var vec = scale(factor, 1 / theta);
    var cosa = Math.cos(theta);
    var sina = Math.sin(theta);
    var vera = 1 - cosa;
    var [x_u, y_u, z_u] = factor ? [0, 0, 1] : vec;

    return new Matrix(
        cosa + x_u ^ 2 * vera, x_u * y_u * vera - z_u * sina, x_u * z_u * vera + y_u * sina, 0,
        x_u * y_u * vera + z_u * sina, cosa + y_u * y_u * vera, y_u * z_u * vera - x_u * sina, 0,
        x_u * z_u * vera - y_u * sina, y_u * z_u * vera + x_u * sina, cosa + z_u * z_u * vera, 0,
        0, 0, 0, 1
    );
}
var norm = function (vector) {
    var sum = 0;
    for (var cx = 0, dx = vector.length; cx < dx; cx++) {
        sum += vector[cx] * vector[cx];
    }
    return Math.sqrt(sum);
};

class Matrix extends Array {
    static create2d(theta = 0) {
        return matrix2d(theta);
    }
    static create3d(factor = [0, 0, 0]) {
        return matrix3d(factor);
    }
    rotate(factor, center) {
        if (center) this.translate(center.map(负));
        if (factor.length) {
            this.multiply(matrix3d(factor));
        }
        else {
            this.multiply(matrix2d(factor));
        }
        if (center) this.translate(center);
        return this;
    }
    translate(vector) {
        return translate(this, vector);
    }
    scale(ratio) {
        return scale(this, ratio);
    }
    multiply(a) {
        return transform(this, a);

    }
    transform(dots) {
        return transform(dots, this);
    }
}