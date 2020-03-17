var vsp = .587 * 255;
var ssp = 30;
var xy2c = function (a, x, y) {
    return a * x * (1 - y) + (.5 + x / 2) * y * 255;
};
var z2rgb = function (z) {
    var c = color.rotate(sample, z * (Math.PI + Math.PI));
    var [r, g, b] = color.parse(c);
    var t = 255 / Math.max(r, g, b);
    r = r * t;
    g = g * t;
    b = b * t;
    return [r, g, b];
};
var z2c = function (z) {
    return color.stringify(z2rgb(z));
};
var rgb2l = function (r, g, b) {
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    return (max + min) / 2;
};
// var rgb2s = function (r, g, b) {
//     var l = rgb2l(r, g, b);
//     var max = Math.max(r, g, b), min = Math.min(r, g, b);
//     var m = Math.sqrt((r * r + g * g + b * b));
//     return Math.sqrt((Math.pow(r - m, 2) + Math.pow(g - m, 2) + Math.pow(b - m, 2)) / 3);
// };
var rgb2v = function (r, g, b) {
    r *= .299;
    g *= .587;
    b *= .114;
    return r + g + b;
};
var rgb2s = function (r, g, b) {
    var u = Math.sqrt((r * r + g * g + b * b) / 3);
    var s = Math.pow(r - u, 2) + Math.pow(g - u, 2) + Math.pow(b - u, 2);
    return Math.sqrt(s) * Math.log2(1 + Math.sin(rgb2v(r, g, b) / 255 * Math.PI));
};
var c4rgb = function (r, g, b, dark, light) {
    return rgb2v(r, g, b) > vsp ? dark || '#000' : light || "#fff";
};
var c4c = function (c, dark, light) {
    var [r, g, b] = color.parse(c);
    return c4rgb(r, g, b, dark, light);
};

var c2xy = function (c1, c2) {
    var left = 0, right = 1, top = 0, bottom = 1;
    var delta = 1 / 0xfffffff;
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
    // while (right - left > delta || bottom - top > delta) {
    //     var dx = (right - left) / 3;
    //     var dy = (bottom - top) / 3;
    //     var lx = left + dx;
    //     var rx = right - dx;
    //     var ty = top + dy;
    //     var by = bottom - dy;
    //     var res = [
    //         [lx, ty],
    //         [rx, ty],
    //         [lx, by],
    //         [rx, by]
    //     ];
    //     do {
    //         var [x, y] = res.pop();
    //         var r = s(x, y);
    //         if (r < t) {
    //             t = r;
    //             mx = x;
    //             my = y;
    //         }
    //     }
    //     while (res.length);
    //     left = mx - dx;
    //     right = mx + dx;
    //     top = my - dy;
    //     bottom = my + dy;
    // }
    return [mx, my];
};
var getCanvas = function (e) {
    return e.getElementsByTagName('canvas')[0];
};
var sample = "#ff0000";
var buildpad = function (pad, c = sample) {
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
};
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
    var key = 'oninput' in input ? 'oninput' : 'onkeyup';
    input[key] = input.onchange = input.onpaste = input.oncut = callback;
};

function main(e) {
    var elem = e || div();
    elem.innerHTML = colorpad;
    var [bg, pad, hue, val] = elem.children;
    buildpad(pad);
    buildhue(hue);
    var [hex, rgb, hsl] = val.getElementsByTagName("input");

    bindinput(hex, function (e) {
        var { value } = this;
        if (!/^#[\da-f]{6}$/i.test(value)) {
            var match = /[\da-f]+/i.exec(value);
            value = "#" + (match ? match[0] : '');
            if (value.length > 7) value = value.slice(0, 7);
            if (value !== this.value) this.value = value;
        } else {
            var angle = color.angle(sample, value) / (Math.PI + Math.PI)
            if (angle >= 0) {
                z = angle;
            }
            [x, y] = c2xy(z2c(z), value);
            render();
        }
    });
    bindinput(rgb, function (e) {
        var { value } = this;
        if (!/^rgb\(\d+,\s*\d+,\s*\d+\)$/i.test(value)) {
            var match = /rgb\((.*)\)?/i.exec(value);
            if (match) {
                value = match[0];
            }
            if (value !== this.value) this.value = value;
        } else {
            z = color.angle(sample, value) / (Math.PI + Math.PI);
            [x, y] = c2xy(z2c(z), value);
            render();
        }

    });
    bindinput(hsl, function (e) {
    });
    var x = 1, y = 0, z = 0, requester = 0;
    var padpointer = getpointer(pad);
    var huepointer = getpointer(hue);
    var render = function () {
        z = trim(z);
        x = trim(x);
        y = trim(y);
        var c = z2c(z);
        var [r, g, b] = color.parse(c).map(a => xy2c(a, x, y));
        var p = color.stringify([r, g, b]);
        [r, g, b] = color.parse(p);
        var [h = 0, s = 0, l] = color.rgb2hsl([r, g, b]);
        cancelAnimationFrame(requester);
        requester = requestAnimationFrame(function () {
            buildpad(pad, c);
        });
        var value = p;
        var valuergb = `rgb(${r}, ${g}, ${b})`;
        var valuehsl = `hsl(${h.toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`;
        css(padpointer, {
            left: +(x * 100).toFixed(6) + "%",
            top: +(y * 100).toFixed(6) + "%",
            background: value,
            borderColor: c4rgb(r, g, b, pad.dark, pad.light),
        });
        css(huepointer, {
            top: +(z * 100).toFixed(6) + "%",
            borderColor: c4c(c),
            background: c
        });
        if (!color.equal(value, hex.value)) hex.value = value;
        if (!color.equal(valuergb, rgb.value)) rgb.value = valuergb;
        if (!color.equal(valuehsl, hsl.value)) hsl.value = valuehsl;
        bg.style.borderColor = value;
        val.style.color = c4rgb(r, g, b);
        elem.value = value;
        dispatch(elem, 'change');
        // console.log(value, hex.value, valuergb, valuehsl);
    };
    var trim = function (a) {
        if (a < 0) a = 0;
        if (a > 1) a = 1;
        return a || 0;
    }
    var sethue = function (event) {
        var { clientY } = event;
        var { top, height } = getScreenPosition(hue);
        z = (clientY - top) / height;
        if (document.activeElement !== huepointer) huepointer.focus();
        render();
    };
    var setpad = function (event) {
        var { clientY, clientX } = event;
        var { top, left, height, width } = getScreenPosition(pad);
        x = (clientX - left) / width;
        y = (clientY - top) / height;
        if (document.activeElement !== padpointer) padpointer.focus();
        render();
    };
    moveupon(hue, {
        start: sethue,
        move: sethue
    });
    moveupon(pad, {
        start: setpad,
        move: setpad
    });
    render();
    onmousedown(elem, e => /^input$/i.test(e.target.tagName) || e.preventDefault());
    return elem;
}