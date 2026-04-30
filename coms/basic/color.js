/**
 * Created by jams on 2016/5/13.
 */

var { min, max, sin, cos, tan, atan, round, sqrt, acos, atan2, asin, random, PI, abs = a => a < 0 ? -a : a } = Math;
var [r_v, g_v, b_v] = [.299, .587, .114];
var r_u = r_v / sqrt(r_v * r_v + g_v * g_v + b_v * b_v);
var g_u = g_v / sqrt(r_v * r_v + g_v * g_v + b_v * b_v);
var b_u = b_v / sqrt(r_v * r_v + g_v * g_v + b_v * b_v);
var rgb4v = function (r, g, b, v) {
	var d = v - rgb2v(r, g, b);
	return [r + d, g + d, b + d];
};


var number_sort = (a, b) => a - b;

var rgb4h = function (r, g, b, h) {
	var [p, _, s] = [r, g, b].sort(number_sort);
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
	return [r, g, b, a];
}

// function rotate_phi(x, y, z, alpha) {
// 	// 转轴为过原点的向量(-1,0,1)
// 	// 顺时针转动后中性值偏向紫色方向，与纯红纯蓝的夹角均为45度
// 	// 用于适配初始饱和度
// 	// 此向量是过三点的平面的法向量，三点为(0,0,0)，(1,1,1)，(1,0,1)
// 	var u = sqrt(1 / 2);
// 	var cosi = cos(alpha);
// 	var sini = sin(alpha);
// 	var veri = 1 - cosi;
// 	return [
// 		x * (cosi + veri / 2) + sini * u * y - veri * z / 2,
// 		-u * sini * x + y * cosi + -u * sini * z,
// 		-veri * x / 2 + sini * u * y + (cosi + veri / 2) * z
// 	];
// }

// function rotate_3d(x, y, z, theta) {
// 	// 转轴为过原点的(1,1,1)向量
// 	// 用于调整色相
// 	// theta取正值时为逆时针转动
// 	// 在右手坐标系中，红绿蓝分别对应母指、食指、中指的指向
// 	var u = sqrt(3) / 3;
// 	var pu = 1 / 3;
// 	var cosa = cos(theta);
// 	var sina = sin(theta);
// 	var vera = 1 - cosa;
// 	var a = (cosa + pu * vera) * x + (pu * vera - u * sina) * y + (pu * vera + u * sina) * z;
// 	var b = (pu * vera + u * sina) * x + (cosa + pu * vera) * y + (pu * vera - u * sina) * z;
// 	var c = (pu * vera - u * sina) * x + (pu * vera + u * sina) * y + (cosa + pu * vera) * z;
// 	return [a, b, c];
// }

function rotate_(a, b, c, x, y, z, theta) {
	var cosa = cos(theta);
	var sina = sin(theta);
	var vera = 1 - cosa;
	return [
		(vera * a * a + cosa) * x + (vera * a * b - sina * c) * y + (sina * b + vera * a * c) * z,
		(sina * c + vera * a * b) * x + (vera * b * b + cosa) * y + (vera * b * c - sina * a) * z,
		(vera * a * c - sina * b) * x + (sina * a + vera * b * c) * y + (vera * c * c + cosa) * z
	];
}

function rotate_3d(r_l, g_l, b_l, theta) {
	// (.299,.587,.114)
	return rotate_(r_u, g_u, b_u, r_l, g_l, b_l, theta);
}

function rotate_phi(r_l, g_l, b_l, phi) {
	// (-.114,0,.299);
	var b_u = b_v / sqrt(b_v * b_v + r_v * r_v);
	var r_u = r_v / sqrt(b_v * b_v + r_v * r_v);
	return rotate_(-b_u, 0, r_u, r_l, g_l, b_l, phi);
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
	num = trim16(num / 17);
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
function rgb4hsl(h, s, l, a) {
	var q = l < .5 ? l * (1 + s) : l + s - l * s;
	var p = 2 * l - q;
	h /= 360;
	var r = t2rgb(h + 1 / 3, p, q) * 255;
	var g = t2rgb(h, p, q) * 255;
	var b = t2rgb(h - 1 / 3, p, q) * 255;
	return [r, g, b, a];
}
function hsl2rgb([h, s, l]) {
	return rgb4hsl(h, s, l, 1);
}
function percent(a, total = 1) {
	if (/%$/.test(a)) {
		a = a.replace(/%$/, '') / 100 * total;
	}
	return +a;
}
function prgb(a) {
	return percent(a, 255);
}
function pab(a) {
	return percent(a, 125);
}
function pc(a) {
	return percent(a, 150);
}
function pl(a) {
	return percent(a, 100);
}
function pkl(a) {
	return percent(a) * 100;
}
function pkc(a) {
	return percent(a) * 150 / 0.4;
}
function pkab(a) {
	return percent(a) * 125 / 0.4;
}
function ph(hue) {
	if (/deg$/i.test(hue)) {
		return +hue.replace(/deg$/i, '');
	}
	if (/turn$/i.test(hue)) {
		return hue.replace(/turn$/i, '') * 360;
	}
	if (/grad$/i.test(hue)) {
		return hue.replace(/grad$/i, '') * 360 / 400;
	}
	if (/rad$/i.test(hue)) {
		return hue.replace(/rad$/i, '') * 180 / PI;
	}
	return percent(hue, 360);
}

const hdelta = -60;// lch的零点色相与纯红色相的差值
const cangle = acos(g_u);// 灰度轴与纯绿轴的夹角
// const cangle = acos(sqrt(2 / 3));// 灰度轴与纯黄向量的夹角
// const cratio = acos(sqrt(2 / 3));// lch的纯红色与rgb纯红色的饱合度比值 
function rgb4lch(L, c, h, a) {
	h = (h - hdelta) / 180 * PI;
	L = L / 100 * 255;
	var phi = c / 150 * cangle;
	var s = L * tan(phi);
	var A = cos(h) * s;
	var B = sin(h) * s;
	var [r, g, b] = rotate_phi(B, L, A, -cangle);
	r /= r_u;
	g /= g_u;
	b /= b_u;
	return [r + .5 | 0, g + .5 | 0, b + .5 | 0, a];
}
function lch4rgb(r, g, b, a) {
	r *= r_u;
	g *= g_u;
	b *= b_u;
	var [B, L, A] = rotate_phi(r, g, b, cangle);
	var theta = atan2(B, A) / PI * 180 + hdelta;
	if (theta < 0) theta += 360;
	var c = sqrt(B * B + A * A) / (L || 1);
	c = atan(c) / cangle * 150;
	return [
		L / 255 * 100,
		c,
		theta,
		a
	];
}
function rgb2lch([r, g, b, a]) {
	return lch4rgb(r, g, b, a);
}
function rgb4lab(L, A, B, a) {
	var [L, c, h] = lch4lab(L, A, B, a);
	return rgb4lch(L, c, h);
}
function lch4lab(L, A, B, a) {
	var c = sqrt(A * A + B * B) / 125 * 150;
	var h = atan2(B, A) * 180 / PI;
	return [L, c, h, a];
}
function lab4lch(L, c, h, a) {
	c = c / 150 * 125;
	h = h * PI / 180;
	var A = c * cos(h);
	var B = c * sin(h);
	return [L, A, B, a];
}
function lab4rgb(r, g, b, a) {
	var [l, c, h] = lch4rgb(r, g, b);
	return lab4lch(l, c, h, a);
}

function hwb4hsv(h, s, v, a) {
	var w = (1 - s) * v;
	var b = 1 - v;
	return [h, w, b, a];
}
function hsv4hwb(h, w, b, a) {
	if (w + b > 1) {
		var s = w + b;
		w /= s;
		b /= s;
	}
	var s = 1 - w / (1 - b);
	var v = 1 - b;
	return [h, s, v, a];
}

function hwb4rgb(r, g, b, a) {
	var h = rgb2h(r, g, b);
	var w = min(r, g, b);
	var b = 255 - max(r, g, b);
	return [h, w / 255, b / 255, a];
}
function rgb4hwb(h, w, b, a) {
	if (w + b > 1) {
		var s = w + b;
		w /= s;
		b /= s;
	}
	w *= 255;
	b *= 255;
	var [r, g, b] = rgb4h(w, 255 - b, w, h);
	return [r, g, b, a];
}
function parse4(namespace, b, c, d, a) {
	a = a ? percent(a) : 1;
	switch (namespace.toLowerCase()) {
		case "rgb": return [prgb(b), prgb(c), prgb(d), a];
		case "hsl": return rgb4hsl(ph(b), percent(c), percent(d), a);
		case "hwb": return rgb4hwb(ph(b), percent(c), percent(d), a);
		case "lab": return rgb4lab(pl(b), pab(c), pab(d), a);
		case "lch": return rgb4lch(pl(b), pc(c), ph(d), a);
		case "oklch": return rgb4lch(pkl(b), pkc(c), ph(d), a);
		case "oklab": return rgb4lab(pkl(b), pkab(c), pkab(d), a);
	}
}
function parse(color) {
	var m = null;
	if (m = rgbHex.exec(color)) {
		var [_, R, G, B, A] = m.map(a => parseInt(a + a, 16));
		return [R, G, B, A >= 0 ? A / 0xff : 1];
	}
	else if (m = rgbHex2.exec(color)) {
		var [_, R, G, B, A] = m.map(a => parseInt(a, 16));
		return [R, G, B, A >= 0 ? A / 0xff : 1];
	}
	else if (m = rgbReg.exec(color)) {
		var [_, R, G, B, a] = m;
		return [R > 255 ? 255 : +R, G > 255 ? 255 : +G, B > 255 ? 255 : +B, a ? percent(a) : 1];
	}
	else if (m = hslReg.exec(color)) {
		var [_, H, S, L, a] = m;
		S = percent(S);
		L = percent(L);
		a = a ? percent(a) : 1;
		[R, G, B] = rgb4hsl(ph(H), S, L, a);
		return [R, G, B, a];
	}
	else if (m = lablch.exec(color)) {
		var [_, f, b, c, d, a] = m;
		return parse4(f, b, c, d, a);
	}
}
var maybe16 = function (n) {
	return (n >> 4) === (n & 0xf);
}
function stringify(color) {
	var [R, G, B, a] = color;
	if (a >= 0 && a < 1) {
		R = R.toFixed();
		G = G.toFixed();
		B = B.toFixed();
		a = +a.toFixed(3);
		return `rgba(${R},${G},${B},${a})`;
	}
	if (maybe16(R) && maybe16(G) && maybe16(B)) {
		return "#" + [R, G, B].map(hex16).join("");
	}
	return "#" + [R, G, B].map(hex256).join("");
}
function doWith(manager, color, ...args) {
	var isparsed = color instanceof Array,
		c = isparsed ? color : parse(color);
	if (!c) {
		console.warn(i18n`颜色数据不正确:${color}`);
		return color;
	}
	c = manager(c, ...args);
	if (!isparsed) c = stringify(c);
	return c;
}

function normal([r, g, b]) {
	return [g - b, b - r, r - g];
}
function norm([r, g, b]) {
	return sqrt(r * r + g * g + b * b);
}
function unit(c, u) {
	if (!u) var u = 1 / norm(c);
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
	return theta;
}
function equal(c1, c2) {
	if (!isColor(c1) || !isColor(c2)) return false;
	var [r1, g1, b1, a1] = parse(c1);
	var [r2, g2, b2, a2] = parse(c2);
	return abs(r1 - r2) < 1 && abs(g1 - g2) < 1 && abs(b1 - b2) < 1 && abs(a1 - a2) < .01;
}
var hslReg = /^hsla?\s*\(\s*([\d\.]+(?:deg|turn|g?rad)?)\s*[,\s]\s*([\d\.]+%?)\s*[,\s]\s*([\d\.]+%?)(?:[,\/\s]\s*([\d\.]+%?))?\)$/i;
var rgbReg = /^rgba?\s*\(\s*([\d\.]+)\s*[,\s]\s*([\d\.]+)\s*[,\s]\s*([\d\.]+)(?:[,\s]\s*([\d\.]+))?\)$/i;
var rgbHex = /^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i;
var rgbHex2 = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i;
var rotated_base_color = "#d16969";
var colorReg = /(?:(?:rgb|hsl)a?|hwb|(?:ok)?(?:lab|lch))\s*\([\-\,\.\w\s%]+\)|#[\da-f]{3,8}/ig;
var num = /(\-?(?:\d+(?:\.\d*)?|\.\d+)(?:%|deg|turn|g?rad)?)/;
var lablch = new RegExp(`${/^((?:ok)?(?:lab|lch)|hwb|rgb|hsl)\s*\(/.source}${num.source}\\s+${num.source}\\s+${num.source}\\s*(?:/\\s*${num.source})?\\)`, 'i');
function isColor(text) {
	return rgbReg.test(text)
		|| rgbHex.test(text)
		|| rgbHex2.test(text)
		|| hslReg.test(text)
		|| lablch.test(text);
}
function format(color) {
	var c = parse(color);
	if (!c) return color;
	return stringify(c);
}
var replacer = function (match) {
	if (!isColor(match)) return match;
	if (colorDesigner.rotate !== 0) {
		match = color.rotate(match, colorDesigner.rotate);
	}
	if (colorDesigner.contrast !== 1) {
		match = color.contrast(match, colorDesigner.contrast);
	}
	return format(match);
};
var colorDesigner = {
	rotate: 0,
	contrast: 1
};
var rgb2v = function (r, g, b) {
	r *= r_v;
	g *= g_v;
	b *= b_v;
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

var gray4 = function (RGBA, A) {
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
		if (v < 0) v = - v;
	}
	else {
		v = 255;
	}
	if (s > .8) {
		r = 255 + r >> 1, g = 255 + g >> 1, b = 255 + b >> 1;
		s = .3;
	}
	[r, g, b] = rgb4s(r, g, b, s);
	[r, g, b] = rgb4v(r, g, b, v);
	return [r, g, b, A || a];
};

var saturate_rgb = function (RGBA, delta) {
	var [r, g, b, a] = RGBA;
	var h = rgb2h(r, g, b);
	delta = percent(delta);
	h += delta * 100;
	[r, g, b] = rgb4h(r, g, b, h);
	return [r, g, b, a];
};

var desaturate_rgb = function (RGBA, delta) {
	delta = percent(delta);
	return saturate_rgb(RGBA, -delta);
};

var lighten_rgb = function (RGBA, delta) {
	var [r, g, b, a] = RGBA;
	delta = percent(delta)
	var l = rgb2v(r, g, b);
	l += delta * 100;
	[r, g, b] = rgb4v(r, g, b, l);
	return [r, g, b, a];
};

var darken_rgb = function (RGBA, delta) {
	delta = percent(delta);
	return lighten_rgb(RGBA, -delta);
};

var fadein_rgb = function (RGBA, delta) {
	delta = percent(delta);
	var [r, g, b, a] = RGBA;
	a += delta;
	return [r, g, b, a];
};

var fadeout_rgb = function (RGBA, delta) {
	delta = percent(delta);
	return fadein_rgb(RGBA, -delta);
};

var fade_rgb = function (RGBA, alpha) {
	var [r, g, b] = RGBA;
	return [r, g, b, alpha];
};

var spin_rgb = function (RGBA, delta) {
	var [r, g, b, a] = RGBA;
	var s = rgb2s(r, g, b);
	s += delta;
	var [r, g, b] = rgb4s(r, g, b, s);
	return [r, g, b, s];
};

var grayscale_rgb = function (RGBA) {
	var [r, g, b, a] = RGBA;
	[r, g, b] = rgb4s(r, g, b, 0);
	return [r, g, b, a];
};
var grayluma_rgb = function (RGBA) {
	var [r, g, b, a] = RGBA;
	var v = rgb2v(r, g, b);
	return [v, v, v, a];
};
var mix_rgb = function (RGBA, c2, power) {
	var c1 = rgb2hsl(RGBA);
	c1.push(RGBA[3]);
	var rgba2 = parse(c2);
	var c2 = rgb2hsl(rgba2);
	c2.push(rgba2[3]);
	return [0, 1, 2, 3].map(a => c1[a] * (1 - power) + c2[a] * power);
};
var tint_rgb = function (RGBA, power) {
	return mix_rgb([255, 255, 255, RGBA[3]], RGBA, power);
};
var shade_rgb = function (RGBA, power) {
	return mix_rgb([0, 0, 0, RGBA[3]], RGBA, power);
};

var wrap = function (f) {
	return function () {
		return doWith(f, ...arguments);
	}
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
	saturate: wrap(saturate_rgb),
	desaturate: wrap(desaturate_rgb),
	lighten: wrap(lighten_rgb),
	darken: wrap(darken_rgb),
	fadein: wrap(mix_rgb),
	fadeout: wrap(fadeout_rgb),
	fade: wrap(fade_rgb),
	spin: wrap(spin_rgb),
	mix: wrap(mix_rgb),
	tint: wrap(tint_rgb),
	shade: wrap(shade_rgb),
	grayscale: wrap(grayscale_rgb),
	grayluma: wrap(grayluma_rgb),
	rgb2h,
	rgb4h,
	rgb2v,
	rgb4v,
	rgb2s,
	rgb4s,
	rgb2hsl,
	rgb4lch,
	lch4rgb,
	rgb4lab,
	lab4rgb,
	lab4lch,
	lch4lab,
	hsl2rgb,
	rgb4hwb,
	hwb4rgb,
	angle,
	parse,
	parse4,
	equal,
	format,
	stringify,
	pair(c, alpha) {
		return doWith(gray4, c, alpha);
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