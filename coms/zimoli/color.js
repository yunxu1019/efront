/**
 * Created by jams on 2016/5/13.
 */

var { min, max, sin, cos, round, sqrt, random, PI, abs = a => a < 0 ? -a : a } = Math;
// 色相
function rotate_rgb(RGBA, theta) {
	var [r, g, b, a] = RGBA;
	if (isNaN(theta)) return [r, g, b, a];
	var u = sqrt(3) / 3;
	var pu = 1 / 3;
	var cosa = cos(theta);
	var sina = sin(theta);
	var vera = 1 - cosa;
	var red = (cosa + pu * vera) * r + (pu * vera - u * sina) * g + (pu * vera + u * sina) * b;
	var green = (pu * vera + u * sina) * r + (cosa + pu * vera) * g + (pu * vera - u * sina) * b;
	var blue = (pu * vera - u * sina) * r + (pu * vera + u * sina) * g + (cosa + pu * vera) * b;
	var m = mode([red, green, blue]);
	var _min = min(red, green, blue);
	var d = [m - red, m - green, m - blue]
	if (_min < 0) {
		var index = red < 0 ? 0 : green < 0 ? 1 : 2;
		var [dr, dg, db] = single(d, -_min / d[index]);
	} else {
		var _max = max(red, green, blue);
		if (_max > 255) {
			var index = red > 255 ? 0 : green > 255 ? 1 : 2;
			var [dr, dg, db] = single(d, (255 - _max) / d[index]);
		} else {
			var dr, dg, db = dr = dg = 0;
		}
	}
	red += dr;
	green += dg;
	blue += db;
	return [red, green, blue, a];
}
// 对比度
function contrast_rgb(RGBA, ratio) {
	var [r, g, b, a] = RGBA;
	var middle = 127.5 * 3;
	var total = r + g + b;
	var ratio = ((total - middle) * ratio + middle) / total;
	var red = ratio * r;
	var green = ratio * g;
	var blue = ratio * b;
	return [red, green, blue, a];
}

var trim16 = a => max(min(round(a), 15), 0);
var trim256 = a => max(min(round(a), 255), 0);
var hex256 = function (num) {
	num = trim256(num);
	if (num < 16) return "0" + num.toString(16);
	return num.toString(16);
}
var hex16 = function (num) {
	num = trim16(num);
	return num.toString(16);
}
function color(rgba) {
	return parse(rgba);
}
function rgb2hsl([r, g, b]) {
	r /= 255;
	g /= 255;
	b /= 255;
	var _max = max(r, g, b), _min = min(r, g, b);
	var h, s, l;
	if (_max === _min) {
		h = NaN;
	} else if (_max === r) {
		if (g >= b) {
			h = 60 * (g - b) / (_max - _min);
		} else {
			h = 360 + 60 * (g - b) / (_max - _min);
		}
	} else if (_max === g) {
		h = 120 + 60 * (b - r) / (_max - _min);
	} else if (_max === b) {
		h = 240 + 60 * (r - g) / (_max - _min);
	}
	l = (_max + _min) / 2;
	if (_max === _min) {
		s = NaN;
	} else {
		if (l < .5) {
			s = (_max - _min) / (_max + _min);
		} else {
			s = (_max - _min) / (2 - (_max + _min))
		}
	}
	return [h, s, l];
}
function t2rgb(t, p, q) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < .5) return q;
	if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
	return p;
}
function hsl2rgb([h, s, l]) {
	var q = l < .5 ? l * (1 + s) : l + s - l * s;
	var p = 2 * l - q;
	h /= 360;
	var r = h + 1 / 3;
	var g = h;
	var b = h - 1 / 3;
	return [r, g, b].map(t => t2rgb(t, p, q));
}
function parse(color) {
	if (hslReg.test(color)) {
		var [_, H, S, L, a] = hslReg.exec(color);
		[R, G, B] = hsl2rgb([H, S, L]);
		return [R, G, B, a || 1];
	} else if (rgbReg.test(color)) {
		var [_, R, G, B, a] = rgbReg.exec(color);
		return [R > 255 ? 255 : R, G > 255 ? 255 : G, B > 255 ? 255 : B, a || 1];
	} else if (rgbHex.test(color)) {
		var [_, R, G, B, A] = rgbHex.exec(color).map(a => parseInt(a + a, 16));
		return [R, G, B, A >= 0 ? A / 0xff : 1];
	} else if (rgbHex2.test(color)) {
		var [_, R, G, B, A] = rgbHex2.exec(color).map(a => parseInt(a, 16));
		return [R, G, B, A >= 0 ? A / 0xff : 1];
	}
}
function stringify(color) {
	var [R, G, B, a] = color;
	if (a >= 0 && a < 1) {
		return `rgba(${R},${G},${B},${a})`;
	} else {
		return "#" + [R, G, B].map(hex256).join("");
	}
}
function doWith(manager, color, args) {
	var c = parse(color);
	if (!c) {
		console.warn(`颜色数据不正确:${color}`);
		return color;
	}
	c = manager(c, args);
	return stringify(c);
}

function normal([r, g, b]) {
	return [g - b, b - r, r - g];
}
function mode([r, g, b]) {
	return sqrt(r * r + g * g + b * b);
}
function single(c, u) {
	if (!u) var u = 1 / mode(c);
	if (!u) {
		u = Math.sqrt(3) / 3;
		return [u, u, u];
	}
	var [r, g, b] = c;
	return [r * u, g * u, b * u];
}
function angle(c1, c2) {
	c1 = parse(c1);
	c2 = parse(c2);
	c1 = normal(c1);
	c2 = normal(c2);
	var [r1, g1, b1] = single(c1);
	var [r2, g2, b2] = single(c2);
	var c = [g1 * b2 - g2 * b1, b1 * r2 - b2 * r1, r1 * g2 - r2 * g1];
	var d = r1 * r2 + g1 * g2 + b1 * b2;
	var e = c[0] > 0 ? mode(c) : -mode(c);
	var theta = Math.asin(e > 1 ? 1 : e < -1 ? -1 : e);
	var phi = Math.acos(d > 1 ? 1 : d < -1 ? -1 : d);
	if (theta < 0) {
		theta = Math.PI * 2 - phi;
	} else {
		theta = phi;
	}
	return theta;
}
function equal(c1, c2) {
	if (!isColor(c1) || !isColor(c2)) return false;
	var [r1, g1, b1, a1] = parse(c1);
	var [r2, g2, b2, a2] = parse(c2);
	return abs(r1 - r2) < 1 && abs(g1 - g2) < 1 && abs(b1 - b2) < 1 && abs(a1 - a2) < .01;
}
var hslReg = /^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:,\s*([\d\.]+))?\)$/i;
var rgbReg = /^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:,\s*([\d\.]+))?\)$/i;
var rgbHex = /^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i;
var rgbHex2 = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i;
var rotated_base_color = "#d16969";
var colorReg = /rgba?\s*\([\,\.\d]+\)|#[\da-f]{3,8}/ig;
function isColor(text) {
	return rgbReg.test(text) || rgbHex.test(text) || rgbHex2.test(text) || hslReg.test(text);
}
var replacer = function (match) {
	if (!isColor(match)) return match;
	if (colorDesigner.rotate !== 0) {
		match = color.rotate(match, colorDesigner.rotate);
	}
	if (colorDesigner.contrast !== 1) {
		match = color.contrast(match, colorDesigner.contrast);
	}
	return match;
};
var colorDesigner = {
	rotate: 0,
	contrast: 1
};
var rgb2v = function (r, g, b) {
	r *= .299;
	g *= .587;
	b *= .114;
	return r + g + b;
};
var v2rgb = function (v, r, g, b) {
	var t = r + g + b || 1;
	v = v / t;
	r *= v;
	g *= v;
	b *= v;
	return [r, g, b];
};

var vsp = .587 * 255;
var gray4 = function (RGBA, S) {
	var [r, g, b, a] = RGBA;
	var v = rgb2v(r, g, b);
	if (v >= vsp) {
		v = 255
	} else {
		v = 255 * 3
	}
	var [r, g, b] = v2rgb(v, r, g, b);
	return [r, g, b, RGBA[3]];
};

extend(color, {
	setTransformer(transformer) {
		extend(colorDesigner, transformer);
	},
	rotate(color, theta) {
		return doWith(rotate_rgb, color, theta);
	},
	contrast(color, ratio) {
		return doWith(contrast_rgb, color, ratio);
	},
	rgb2hsl,
	hsl2rgb,
	angle,
	parse,
	equal,
	stringify,
	pair(c, s) {
		return doWith(gray4, c, s);
	},
	isColor,
	transform(text) {
		return text.replace(colorReg, replacer);
	},
	random(base = rotated_base_color) {
		return rotated_base_color = doWith(rotate_rgb, base, (random() * .4 + .4) * PI)
	}
});