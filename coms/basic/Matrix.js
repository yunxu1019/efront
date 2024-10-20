var notMatchLength = new Error("矩阵长度不一致");

function matrix2d(theta) {
    var cosa = Math.cos(theta);
    var sina = Math.sin(theta);
    return new Matrix(
        cosa, sina, 0,
        -sina, cosa, 0,
        0, 0, 1
    );
}

function matrix3d(factor) {
    var n = norm(factor.slice(0, 3));
    var theta = factor.length === 4 ? factor[3] : n;
    var vec = times(factor, 1 / n);
    var cosa = Math.cos(theta);
    var sina = Math.sin(theta);
    var vera = 1 - cosa;
    var [x_u, y_u, z_u] = !n ? [0, 0, 1] : vec;
    return new Matrix(
        cosa + x_u * x_u * vera, x_u * y_u * vera - z_u * sina, x_u * z_u * vera + y_u * sina, 0,
        x_u * y_u * vera + z_u * sina, cosa + y_u * y_u * vera, y_u * z_u * vera - x_u * sina, 0,
        x_u * z_u * vera - y_u * sina, y_u * z_u * vera + x_u * sina, cosa + z_u * z_u * vera, 0,
        0, 0, 0, 1
    );
}

function transform(B, dots) {
    var dimention = Math.sqrt(B.length - 1) | 0;
    if (dots.length % dimention !== 0) throw notMatchLength;
    if (dots === B) B = B.slice(0);
    var ds = dots.slice(0);
    var dim2 = B.length % dimention !== 0 ? dimention + 1 : dimention;
    for (var cx = 0, dx = dots.length; cx < dx; cx += dimention) {
        for (var cy = 0, dy = dimention; cy < dy; cy++) {
            var sum = 0;
            for (var ct = 0, dt = dimention; ct < dt; ct++) {
                sum += ds[cx + ct] * B[ct * dim2 + cy];
            }
            sum += B[dimention * dim2 + cy];
            dots[cx + cy] = sum;
        }
    }
    return dots;
}

function translate(A, delta) {
    var [dim2, dim] = size(A);
    var inc = 0;
    for (var cx = dim * dim2, dx = cx + dim; cx < dx; cx++) {
        A[cx] = (A[cx] || 0) + delta[inc++];
    }
    return A;
}

function 逆(A) {
    var dim = Math.sqrt(A.length) | 0;
    if (dim * dim !== A.length) throw notMatchLength;
    var E = new Array(A.length).fill(0);
    for (var cx = 0, dx = dim; cx < dx; cx++)E[cx * dim + cx] = 1;
    var X = A.splice(0, A.length);
    A.push.apply(A, E);
    for (var cx = 0, dx = dim; cx < dx; cx++) {
        var start = cx * dim + cx;
        var max_ct, v = 0;
        for (var ct = start, dt = X.length; ct < dt; ct += dim) {
            var v0 = Math.abs(X[ct]);
            if (v0 > v) {
                max_ct = ct;
                v = v0;
            }
        }
        ct = max_ct;
        if (ct !== start) {
            var delta = ct - start;
            var ratio = (1 - X[start]) / X[ct];
            for (var cy = cx * dim, dy = cy + dim; cy < dy; cy++) {
                X[cy] += X[cy + delta] * ratio;
                A[cy] += A[cy + delta] * ratio;
            }
        }
        if (X[start] !== 1) {
            var ratio = 1 / X[start];
            for (var cy = cx * dim, dy = cy + dim; cy < dy; cy++) {
                X[cy] *= ratio;
                A[cy] *= ratio;
            }
        }
        for (var ct = start + dim, dt = X.length; ct < dt; ct += dim) {
            if (X[ct] === 0) continue;
            var ratio = -X[ct];
            var delta = start - ct;
            for (var cy = ct - cx, dy = cy + dim; cy < dy; cy++) {
                X[cy] += X[cy + delta] * ratio;
                A[cy] += A[cy + delta] * ratio;
            }
        }
    }
    for (var cx = dim - 1; cx > 0; cx--) {
        var start = cx * dim + cx;
        for (var ct = start - dim; ct >= 0; ct -= dim) {
            if (X[ct] === 0) continue;
            var ratio = -X[ct];
            var delta = start - ct;
            for (var cy = ct - cx, dy = cy + dim; cy < dy; cy++) {
                X[cy] += X[cy + delta] * ratio;
                A[cy] += A[cy + delta] * ratio;
            }
        }
    }
    return A;
};

function multiply(A, B) {
    if (A.length !== B.length) throw notMatchLength;
    var dim = Math.sqrt(A.length) | 0;
    if (dim * dim !== A.length) throw notMatchLength;
    var X = A.slice(0);
    for (var cx = 0, dx = A.length; cx < dx; cx += dim) {
        for (var cy = 0, dy = dim; cy < dy; cy++) {
            var sum = 0;
            for (var ct = 0, dt = dim; ct < dt; ct++) {
                sum += X[cx + ct] * B[ct * dim + cy];
            }
            A[cx + cy] = sum;
        }
    }
    return A;
}

function resolve(A, s) {
    var dim = s.length;
    if (dim * dim !== A.length) throw notMatchLength;
    var r = [];
    for (var cx = 0, cy = 0, dx = dim; cx < dx; cx++) {
        var sum = 0;
        for (var dy = cy + dim; cy < dy; cy++) {
            sum += A[dy] * s[cx];
        }
        r[cx] = sum;
    }
    return r;
}

function transpose(A) {
    var [size] = size(A);
    for (var cx = 0, dx = size; cx < dx; cx++) {
        for (var cy = cx + 1, dy = dx; cy < dy; cy++) {
            var i = cx * size + cy;
            var j = cy * size + cx;
            var tmp = A[i];
            A[i] = A[j];
            A[j] = tmp;
        }
    }
    return A;
}

class Matrix extends Array {
    static multiply = multiply;
    static transform = transform;
    static translate = translate;
    static matrix2d = matrix2d;
    static matrix3d = matrix3d;
    static resolve = resolve;
    static 逆 = 逆;
    static create2d(theta = 0) {
        return matrix2d(theta);
    }
    static create3d(factor = [0, 0, 0]) {
        return matrix3d(factor);
    }
    size() {
        return size(this);
    }
    dirty() {
        this._invert = null;
    }
    _invert = null;
    get invert() {
        if (this._invert) return this._invert;
        return this._invert = this.slice().inverse();
    }
    transpose() {
        this.dirty();
        return transpose(this);
    }
    inverse() {
        this.dirty();
        return 逆(this);
    }
    rotate(factor, center) {
        this.dirty();
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
        var v = vector;
        if (!isFinite(v.length)) v = arguments;
        this.dirty();
        return translate(this, v);
    }
    scale(ratio, center) {
        this.dirty();
        if (center) this.translate(center.map(负));
        times(this, ratio);
        if (center) this.translate(center);
        this[this.length - 1] = 1;
        return this;
    }
    multiply(a) {
        this.dirty();
        return multiply(this, a);
    }
    transform(dots) {
        if (dots instanceof Array) return transform(this, dots);
        if (arguments.length > 1) {
            var a = Array.prototype.slice.apply(arguments, 0);
            return transform(this, a);
        }
        return dots;
    }
    resolve(s) {
        var A = this.slice().inverse();
        return resolve(A, s);
    }
    getTransform() {
        return [this[0], this[1], this[3], this[4], this[6], this[7]];
    }
    toDOMString() {
        if (this.size()[1] === 2) return `matrix(${this.getTransform()})`;
        return `matrix(${this})`;
    }
}

Matrix.MathMatrix = Matrix;


function inner(vec1, vec2) {
    if (vec1.length !== vec2.length) throw notMatchLength;
    var sum = 0;
    for (var cx = 0, dx = vec1.length; cx < dx; cx++) {
        sum += vec1[cx] * vec2[cx];
    }
    return sum;
}

function cross2(vec1, vec2) {
    var [x1, y1] = vec1;
    var [x2, y2] = vec2;
    return x1 * y2 - x2 * y1;
}
function cross3(vec1, vec2) {
    var [x1, y1, z1] = vec1;
    var [x2, y2, z2] = vec2;
    return [y1 * z2 - y2 * z1, z1 * x2 - z2 * x1, x1 * y2 - x2 * y1];
}
function cross(vec1, vec2) {
    if (vec1.length !== vec2.length) throw notMatchLength;
    if (vec1.length === 2) return cross2(vec1, vec2);
    if (vec1.length === 3) return cross3(vec1, vec2);
    throw new Error(i18n`向量维度不支持！`);
}
function 负(a) {
    return -a;
}
function times(vector, factor) {
    for (var cx = 0, dx = vector.length; cx < dx; cx++) {
        vector[cx] *= factor;
    }
    return vector;
}

var norm = function (vector) {
    var sum = 0;
    for (var cx = 0, dx = vector.length; cx < dx; cx++) {
        sum += vector[cx] * vector[cx];
    }
    return Math.sqrt(sum);
};


function size(A) {
    var dim = Math.sqrt(A.length - 1) | 0;
    var dim2 = dim;
    if (A.length % dim !== 0) {
        dim2++;
    }
    if ((dim + 1) * dim2 !== A.length) throw notMatchLength;
    return [dim2, dim];
}


function olinde(v, vector) {
    // 罗德里格旋转公式
    // https://baike.baidu.com/item/%E7%BD%97%E5%BE%B7%E9%87%8C%E6%A0%BC%E6%97%8B%E8%BD%AC%E5%85%AC%E5%BC%8F/18878562
    // https://www.cnblogs.com/flyinggod/p/8144100.html 旋转矩阵、欧拉角、四元数理论及其转换关系
    var theta = norm(vector);
    var k = times(vector.slice(0), 1 / theta);
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
Matrix.norm = norm;