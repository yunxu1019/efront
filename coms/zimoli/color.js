/**
 * Created by jams on 2016/5/13.
 */

var { min, max, sin, cos, round, sqrt, random, PI } = Math;
// 色相
function rotate_rgb(RGBA, theta) {
	var [r, g, b, a] = RGBA;
	var u = sqrt(3) / 3;
	var pu = 1 / 3;
	var cosa = cos(theta);
	var sina = sin(theta);
	var vera = 1 - cosa;
	var red = round((cosa + pu * vera) * r + (pu * vera - u * sina) * g + (pu * vera + u * sina) * b);
	var green = round((pu * vera + u * sina) * r + (cosa + pu * vera) * g + (pu * vera - u * sina) * b);
	var blue = round((pu * vera - u * sina) * r + (pu * vera + u * sina) * g + (cosa + pu * vera) * b);
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
	return [round(red), round(green), round(blue), a];
}

var trim16 = a => max(min(a | 0, 15), 0);
var trim256 = a => max(min(a | 0, 255), 0);
var hex256 = function (num) {
	num = trim256(num);
	if (num < 16) return "0" + num.toString(16);
	return num.toString(16);
}
var hex16 = function (num) {
	num = trim16(num);
	return num.toString(16);
}
function color() {
}
function doWith(manager, color, args) {
	if (rgbReg.test(color)) {
		return color.replace(rgbReg, function (match, r, g, b, a) {
			var [R, G, B, a] = manager([r, g, b, a], args);
			if (a) {
				return `rgba(${R},${G},${B},${a})`;
			} else {
				return `rgb(${R},${G},${B})`;
			}
		});
	} else if (rgbHex.test(color)) {
		return color.replace(rgbHex, function (match, r, g, b, a) {
			var [R, G, B, A] = manager([r, g, b, a || "f"].map(a => parseInt(a + a, 16)), args);
			return a ? `rgba(${[R, G, B, A / 0xff]})` : "#" + [R, G, B].map(hex256).join("");
		});
	} else if (rgbHex2.test(color)) {
		return color.replace(rgbHex2, function (match, r, g, b, a) {
			var [R, G, B, A] = manager([r, g, b, a || "ff"].map(a => parseInt(a, 16)), args);
			return a ? `rgba(${[R, G, B, A / 0xff]})` : "#" + [R, G, B].map(hex256).join("");
		});
	}
	console.warn(`颜色数据不正确:${color}`);
	return color;
}
var rgbReg = /^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:,\s*([\d\.]+))?\)$/i;
var rgbHex = /^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i;
var rgbHex2 = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i;
var rotated_base_color = "#d16969";
var colorReg = /rgba?\s*\([\,\.\d]+\)|#[\da-f]{3,8}/ig;
function isColor(text) {
	return rgbReg.test(text) || rgbHex.test(text) || rgbHex2.test(text);

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
	isColor,
	transform(text) {
		return text.replace(colorReg, replacer);
	},
	random(base = rotated_base_color) {
		return rotated_base_color = doWith(rotate_rgb, base, (random() * .4 + .4) * PI)
	}
});