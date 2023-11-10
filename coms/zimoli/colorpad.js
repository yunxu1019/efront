var vsp = .587 * 255;
var ssp = 30;
var xy2c = function (a, x, y) {
    return a * x * (1 - y) + (.5 + x / 2) * y * 255;
};
var z2rgb = function (z) {
    return color.rgb4h(255, 0, 0, z * 360);
};
var z2c = function (z) {
    return color.stringify(z2rgb(z));
};
var rgb2l = function (r, g, b) {
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    return (max + min) / 2;
};
var rgb2v = color.rgb2v;
var rgb2s = function (r, g, b) {
    var u = Math.sqrt((r * r + g * g + b * b) / 3);
    var s = Math.pow(r - u, 2) + Math.pow(g - u, 2) + Math.pow(b - u, 2);
    return Math.sqrt(s) * Math.log(1 + Math.sin(rgb2v(r, g, b) / 255 * Math.PI)) / Math.LN2;
};
var c4rgb = function (r, g, b, dark, light) {
    return rgb2v(r, g, b) > vsp ? dark || '#000' : light || "#fff";
};
var c4c = function (c, dark, light) {
    var [r, g, b] = color.parse(c);
    return c4rgb(r, g, b, dark, light);
};

var c2xy = function (c1, c2) {
    var [r1, g1, b1] = color.parse(c1);
    var [r2, g2, b2] = color.parse(c2);
    var s = function (x, y) {
        return Math.pow(xy2c(r1, x, y) - r2, 2) + Math.pow(xy2c(g1, x, y) - g2, 2) + Math.pow(xy2c(b1, x, y) - b2, 2);
    };
    var t = 255 * 255, mx, my;
    for (var cx = 0, dx = 256; cx <= dx; cx++) {
        for (var cy = 0, dy = 256; cy <= dy; cy++) {
            var r = s(cx / dx, cy / dy);
            if (r < t) {
                t = r;
                mx = cx / dx;
                my = cy / dy;
            }
        }
    }
    return [mx, my];
};
var getCanvas = function (e) {
    return e.getElementsByTagName('canvas')[0];
};
var sample = "#ff0000";
var buildpad = lazy(function (pad, c = sample) {
    var canvas = getCanvas(pad);
    canvas.width = 256;
    canvas.height = 256;
    var context = canvas.getContext("2d");
    var imagedata = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imagedata.data, inc = 0;
    var [r, g, b] = color.parse(c);

    for (var cy = 0, dy = canvas.height; cy < dy; cy++) {
        for (var cx = 0, dx = canvas.width; cx < dx; cx++) {
            var x = cx / dx, y = cy / dy;
            var red = xy2c(r, x, y);
            var green = xy2c(g, x, y);
            var blue = xy2c(b, x, y);
            var v = rgb2v(red, green, blue);
            var s = rgb2s(red, green, blue);
            var d = Math.abs(149.685 - v);
            var f = Math.abs(20 - s);
            if (f < .4) {
                f /= .4;
                v = (255 - v) / 255;
                data[inc++] = red * f + (1 - f) * xy2c(r, v, x);
                data[inc++] = green * f + (1 - f) * xy2c(g, v, x);
                data[inc++] = blue * f + (1 - f) * xy2c(b, v, x);
                if (cy === 0) pad.dark = color.stringify([red, green, blue]);
                if (cx === dx) pad.light = color.stringify([red, green, blue]);
            } else {
                data[inc++] = red;
                data[inc++] = green;
                data[inc++] = blue;
            }
            if (d < .6) {
                data[inc++] = Math.round(102 + 255 * d);
            } else {
                data[inc++] = 255;
            }
        }
    }
    context.putImageData(imagedata, 0, 0);
}, {});
var buildopa = lazy(function (pad, c = sample) {
    var canvas = getCanvas(pad);
    canvas.width = 1;
    canvas.height = 256;
    var [r, g, b] = color.parse(c);
    var context = canvas.getContext("2d");
    var imagedata = context.getImageData(0, 0, 1, 256);
    var data = imagedata.data;
    for (var cx = 0, dx = data.length; cx < dx;) {
        data[cx++] = r;
        data[cx++] = g;
        data[cx++] = b;
        data[cx++] = 255 - (cx >> 2);
    }
    context.putImageData(imagedata, 0, 0);

}, {});
var buildhue = function (hue) {
    var canvas = getCanvas(hue);
    canvas.width = 10;
    canvas.height = 256;
    var context = canvas.getContext("2d");
    var imagedata = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imagedata.data, inc = 0;
    for (var cy = 0, dy = canvas.height; cy < dy; cy++) {
        var [r, g, b] = z2rgb(cy / dy);
        for (var cx = 0, dx = canvas.width; cx < dx; cx++) {
            data[inc++] = r;
            data[inc++] = g;
            data[inc++] = b;
            data[inc++] = 255;
        }
    }
    context.putImageData(imagedata, 0, 0);
};
var getpointer = function (e) {
    return e.getElementsByTagName('pointer')[0];
};
var bindinput = function (input, callback) {
    on("keydown.enter")(input, callback);
};
var color2xyz = function (c) {
    var [r, g, b, a] = color.parse(c);
    var z = color.rgb2h(r, g, b) / 360;
    var c1 = z2c(z);
    var [x, y] = c2xy(c1, c);
    return [x, y, z, a];
};
function main(e) {
    var elem = e || div();
    elem.innerHTML = colorpad;
    var [bg, pad, hue, opa, val] = elem.children;
    buildpad(pad);
    buildhue(hue);
    buildopa(opa);
    var [hex, rgb, hsl] = val.getElementsByTagName("input");
    var Hex = a => a > 15 ? a.toString(16) : "0" + a.toString(16);
    hex.setValue = function (v) {
        var [r, g, b, a] = color.parse(v);
        var value = [r, g, b];
        if (isFinite(a) && a !== 1) {
            a = a * 255;
            value[3] = a;
        }
        this.value = "#" + value.map(a => +a.toFixed()).map(Hex).join("");
    };
    rgb.setValue = function (v) {
        var [r, g, b, a] = color.parse(v);
        r = r.toFixed();
        g = g.toFixed();
        b = b.toFixed();
        a = +a.toFixed(3);
        var o = +a;
        this.value = `rgb${o !== 1 ? 'a' : ''}(${r}, ${g}, ${b}${o !== 1 ? ', ' + a : ''})`;
    };
    hsl.setValue = function (v) {
        var [r, g, b, a] = color.parse(v);
        var [h, s, l] = color.rgb2hsl([r, g, b]);
        s *= 100;
        l *= 100;
        a *= 100;
        s = +s.toFixed();
        l = +l.toFixed();
        a = +a.toFixed();
        h = h.toFixed();
        var o = a !== 100;
        this.value = `hsl${o ? 'a' : ''}(${h}deg ${s}% ${l}%${o ? " / " + a + "%" : ""})`;
    };
    elem.setValue = function (v) {
        var [_x, _y, z, a] = color2xyz(v);
        hue.value = z;
        sethue(z);
        opa.value = 1 - a;
        css(huepointer, { top: +(z * 100).toFixed(6) + '%' })
        css(opapointer, { top: +(100 - a * 100).toFixed(6) + '%' })
        x = _x;
        y = _y;
        render();
    };
    var inputv = function () {
        elem.setValue(this.value);
    };
    bindinput(hex, inputv);
    bindinput(hsl, inputv);
    bindinput(rgb, inputv);
    var x = 1, y = 0, z = 0;
    var padpointer = getpointer(pad);
    var huepointer = getpointer(hue);
    var opapointer = getpointer(opa);
    var render = function () {
        z = trim(hue.value || 0);
        x = trim(x);
        y = trim(y);
        var a = trim(1 - (opa.value || 0));
        var c = z2c(z);
        var c0 = color.parse(c).slice(0, 3).map(a => xy2c(a, x, y));
        c0[3] = a;
        var p = color.stringify(c0);
        var value = p;
        css(padpointer, {
            left: +(x * 100).toFixed(6) + "%",
            top: +(y * 100).toFixed(6) + "%",
            background: p,
            outlineColor: color.pair(p),
        });
        css(huepointer, {
            outlineColor: color.pair(c),
            background: c
        });
        css(opapointer, {
            outlineColor: color.pair(p),
            background: p
        });
        buildopa(opa, p);

        hex.setValue(value);
        rgb.setValue(value);
        hsl.setValue(value);
        bg.style.borderColor = value;
        val.style.color = color.pair(value);
        elem.value = value;
        dispatch(elem, 'change');
        // console.log(value, hex.value, valuergb, valuehsl);
    };
    var trim = function (a) {
        if (a < 0) a = 0;
        if (a > 1) a = 1;
        return a || 0;
    };
    var sethue = function (z) {
        var c = z2c(z);
        buildpad(pad, c);
    };
    var setpointer = function (event) {
        var { clientY } = event;
        var { top, height } = getScreenPosition(this);
        var z = (clientY - top) / height;
        if (z > 1) z = 1;
        if (z < 0) z = 0;
        this.value = z;
        if (this === hue) {
            sethue(z);
        }
        var pointer = getpointer(this);
        css(pointer, {
            top: +(z * 100).toFixed(6) + "%",
        });
        render();
    };
    var setpad = function (event) {
        var { clientY, clientX } = event;
        var { top, left, height, width } = getScreenPosition(pad);
        x = (clientX - left) / width;
        y = (clientY - top) / height;
        render();
    };
    moveupon(hue, {
        start: setpointer,
        move: setpointer
    });
    moveupon(pad, {
        start: setpad,
        move: setpad
    });
    moveupon(opa, {
        start: setpointer,
        move: setpointer
    });
    render();
    onmousedown(elem, e => /^input$/i.test(e.target.tagName) || e.preventDefault());
    return elem;
}