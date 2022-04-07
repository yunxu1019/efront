/**
 * Created by jams on 2016/5/13.
 */

var { min, max, sin, cos, round, sqrt, random, PI, abs = a => a < 0 ? -a : a } = Math;
var [v_r, v_g, v_b] = [.299, .587, .114];

var rgb4v = function (r, g, b, v) {
	var d = v - rgb2v(r, g, b);
	return [r + d, g + d, b + d];
};


var number_sort = (a, b) => a - b;

var rgb4h = function (r, g, b, h) {
	var [p, q, s] = [r, g, b].sort(number_sort);
	var m = s - p;
	h = (h % 360 + 360) % 360;
	if (h < 60) {
		r = s;
		g = p + m * h / 60;
		b = p;
	}
	else if (h < 120) {
		r = p + m * (120 - h) / 60;
		g = s;
		b = p;
	}
	else if (h < 180) {
		r = p;
		g = s;
		b = p + m * (h - 120) / 60
	}
	else if (h < 240) {
		r = p;
		g = p + m * (240 - h) / 60;
		b = s;
	}
	else if (h < 300) {
		r = p + m * (h - 240) / 60;
		g = p;
		b = s;
	}
	else {
		r = s;
		g = p;
		b = p + m * (360 - h) / 60;
	}
	return [r, g, b];
};


var rgb2h = function (r, g, b) {
	var m = max(r, g, b);
	var n = min(r, g, b);
	var h;
	if (m === n) h = 0;
	else if (m === r) {
		if (g >= b) {
			h = 60 * (g - b) / (m - n);
		} else {
			h = 360 + 60 * (g - b) / (m - n);
		}
	}
	else if (m === g) {
		h = 120 + 60 * (b - r) / (m - n);
	}
	else if (m === b) {
		h = 240 + 60 * (r - g) / (m - n);

	}
	return h;
};

var rgb2s = function (r, g, b) {
	var m = min(r, g, b);
	if (m) {
		r -= m;
		g -= m;
		b -= m;
	}
	return max(r, g, b) / 255;
};
var rgb4s = function (r, g, b, s) {
	var m = min(r, g, b);
	if (m) {
		r -= m;
		g -= m;
		b -= m;
	}
	s = s * 255 / (max(r, g, b) || 1);
	if (s) {
		r *= s;
		g *= s;
		b *= s;
	}
	return [r, g, b];
};

// 色相
function rotate_rgb(RGBA, theta) {
	var [r, g, b, a] = RGBA;
	if (isNaN(theta)) return [r, g, b, a];
	var h = rgb2h(r, g, b);
	var s = rgb2s(r, g, b);
	var v = rgb2v(r, g, b);
	h += theta * 180 / Math.PI;
	[r, g, b] = rgb4h(r, g, b, h);
	[r, g, b] = rgb4s(r, g, b, s);
	[r, g, b] = rgb4v(r, g, b, v);
	return [r, g, b];
	// var s = rgb2s(r, g, b);
	// var v = rgb2v(r, g, b);
	// var u = sqrt(3) / 3;
	// var pu = 1 / 3;
	// var cosa = cos(theta);
	// var sina = sin(theta);
	// var vera = 1 - cosa;
	// var red = (cosa + pu * vera) * r + (pu * vera - u * sina) * g + (pu * vera + u * sina) * b;
	// var green = (pu * vera + u * sina) * r + (cosa + pu * vera) * g + (pu * vera - u * sina) * b;
	// var blue = (pu * vera - u * sina) * r + (pu * vera + u * sina) * g + (cosa + pu * vera) * b;
	// var m = mode([red, green, blue]);
	// var _min = min(red, green, blue);
	// var d = [m - red, m - green, m - blue]
	// if (_min < 0) {
	// 	var index = red < 0 ? 0 : green < 0 ? 1 : 2;
	// 	var [dr, dg, db] = single(d, -_min / d[index]);
	// } else {
	// 	var _max = max(red, green, blue);
	// 	if (_max > 255) {
	// 		var index = red > 255 ? 0 : green > 255 ? 1 : 2;
	// 		var [dr, dg, db] = single(d, (255 - _max) / d[index]);
	// 	} else {
	// 		var dr, dg, db = dr = dg = 0;
	// 	}
	// }
	// red += dr;
	// green += dg;
	// blue += db;
	// [red, green, blue] = rgb4s(red, green, blue, s);
	// [red, green, blue] = rgb4v(red, green, blue, v);
	// return [red, green, blue, a];
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
	return [h || 0, s || 0, l];
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
function percent(a) {
	if (/%$/.test(a)) {
		a = a.replace(/%$/, '') / 100;
	}
	return +a;
}
function parse(color) {
	if (hslReg.test(color)) {
		var [_, H, S, L, a] = hslReg.exec(color);
		H = parseFloat(H);
		S = percent(S);
		L = percent(L);
		a = percent(a);
		[R, G, B] = hsl2rgb([H, S, L]);
		return [R, G, B, a || 1];
	} else if (rgbReg.test(color)) {
		var [_, R, G, B, a] = rgbReg.exec(color);
		return [R > 255 ? 255 : +R, G > 255 ? 255 : +G, B > 255 ? 255 : +B, a ? +a : 1];
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
		R = R.toFixed();
		G = G.toFixed();
		B = B.toFixed();
		a = +a.toFixed(3);
		return `rgba(${R},${G},${B},${a})`;
	} else {
		return "#" + [R, G, B].map(hex256).join("");
	}
}
function doWith(manager, color, args) {
	var isparsed = color instanceof Array,
		c = isparsed ? color : parse(color);
	if (!c) {
		console.warn(`颜色数据不正确:${color}`);
		return color;
	}
	c = manager(c, args);
	if (!isparsed) c = stringify(c);
	return c;
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
	var theta = rgb2h(c2[0], c2[1], c2[2]) - rgb2h(c1[0], c1[1], c1[2]);
	if (theta < 0) theta += 360;
	// var [r1, g1, b1] = single(c1);
	// var [r2, g2, b2] = single(c2);
	// var c = [g1 * b2 - g2 * b1, b1 * r2 - b2 * r1, r1 * g2 - r2 * g1];
	// var d = r1 * r2 + g1 * g2 + b1 * b2;
	// var e = c[0] > 0 ? mode(c) : -mode(c);
	// var theta = Math.asin(e > 1 ? 1 : e < -1 ? -1 : e);
	// var phi = Math.acos(d > 1 ? 1 : d < -1 ? -1 : d);
	// if (theta < 0) {
	// 	theta = Math.PI * 2 - phi;
	// } else {
	// 	theta = phi;
	// }
	return theta;
}
function equal(c1, c2) {
	if (!isColor(c1) || !isColor(c2)) return false;
	var [r1, g1, b1, a1] = parse(c1);
	var [r2, g2, b2, a2] = parse(c2);
	return abs(r1 - r2) < 1 && abs(g1 - g2) < 1 && abs(b1 - b2) < 1 && abs(a1 - a2) < .01;
}
var hslReg = /^hsla?\s*\(\s*([\d\.]+(?:deg)?)\s*[,\s]\s*([\d\.]+%?)\s*[,\s]\s*([\d\.]+%?)(?:[,\/\s]\s*([\d\.]+%?))?\)$/i;
var rgbReg = /^rgba?\s*\(\s*([\d\.]+)\s*[,\s]\s*([\d\.]+)\s*[,\s]\s*([\d\.]+)(?:[,\s]\s*([\d\.]+))?\)$/i;
var rgbHex = /^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i;
var rgbHex2 = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i;
var rotated_base_color = "#d16969";
var colorReg = /(?:rgb|hsl)a?\s*\([\,\.\d\s%]+\)|#[\da-f]{3,8}/ig;
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
	r *= v_r;
	g *= v_g;
	b *= v_b;
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

var gray4 = function (RGBA, S) {
	var [r, g, b, a] = RGBA;
	var v = rgb2v(r, g, b);
	var s = rgb2s(r, g, b);
	var p = .587 * 255;
	if (v < .114 * 255) {
		v = v - .3 * p + 255;
		s = .2;
	}
	else if (v > .6 * 255) {
		v = v - p * s - p;
		s = 1;
	}
	else {
		v = 255;
	}
	[r, g, b] = rgb4s(r, g, b, s);
	[r, g, b] = rgb4v(r, g, b, v);
	return [r, g, b, a];
};


var random_base = Math.PI * Math.random() * 2;
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
	rgb2h,
	rgb4h,
	rgb4s,
	rgb2v,
	rgb4v,
	rgb2s,
	rgb4s,
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
		random_base += (random() * .4 + .4) * PI;
		if (random_base > 2 * PI) random_base -= 2 * PI;
		return doWith(rotate_rgb, base, random_base);
	}
});