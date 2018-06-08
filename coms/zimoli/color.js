/**
 * Created by jams on 2016/5/13.
 */

var { min, max, sin, cos, round, sqrt, random, PI } = Math;
function rotate_rgb(RGBA, theta) {
	var [r, g, b, a] = RGBA;
	var u = sqrt(3) / 3;
	var pu = 1 / 3;
	cosa = cos(theta);
	sina = sin(theta);
	vera = 1 - cosa;
	red = round((cosa + pu * vera) * r + (pu * vera - u * sina) * g + (pu * vera + u * sina) * b);
	green = round((pu * vera + u * sina) * r + (cosa + pu * vera) * g + (pu * vera - u * sina) * b);
	blue = round((pu * vera - u * sina) * r + (pu * vera + u * sina) * g + (cosa + pu * vera) * b);
	return [red, green, blue, a];
}
var trim16 = a => max(min(a | 0, 15), 0);
var trim256 = a => max(min(a | 0, 255), 0);
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
		return color.replace(rgbHex, function (match, r, g, b) {
			var [R, G, B] = manager([r, g, b].map(a => parseInt(a, 16)), args).map(trim16);
			return "#" + R.toString(16) + G.toString(16) + B.toString(16);
		});
	} else if (rgbHex2.test(color)) {
		return color.replace(rgbHex2, function (match, r, g, b) {
			var [R, G, B] = manager([r, g, b].map(a => parseInt(a, 16)), args).map(trim256);
			return "#" + R.toString(16) + G.toString(16) + B.toString(16);
		});
	}
}
var rgbReg = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(.*?)\)/i;
var rgbHex = /^#([\da-f])([\da-f])([\da-f])$/i;
var rgbHex2 = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i;
var rotated_base_color = "#d16969";
extend(color, {
	rotate(color, theta) {
		return doWith(rotate_rgb, color, theta);
	},
	random(base = rotated_base_color) {
		return rotated_base_color = doWith(rotate_rgb, base, (random() * .4 + .4) * PI)
	}
});