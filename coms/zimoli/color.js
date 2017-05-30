/**
 * Created by jams on 2016/5/13.
 */
function Color() {
	var colorFunctions = this;
	var Color = function (rgb, a, originalForm) {
		//
		// The end goal here, is to parse the arguments
		// into an integer triplet, such as `128, 255, 0`
		//
		// This facilitates operations and conversions.
		//
		if (Array.isArray(rgb)) {
			this.rgb = rgb;
		} else if (angular.isString(rgb) && rgb.length == 6) {
			this.rgb = rgb.match(/.{2}/g).map(function (c) {
				return parseInt(c, 16);
			});
		} else if (angular.isString(rgb) && rgb.length == 3) {
			this.rgb = rgb.split('').map(function (c) {
				return parseInt(c + c, 16);
			});
		} else {
			wear(this)(rgb);
		}
		this.alpha = typeof a === 'number' ? a : 1;
		if (typeof originalForm !== 'undefined') {
			this.value = originalForm;
		}
	};
	//Color.constructor.name=	'Color';


	Color.prototype = new function () {
		//this.fround = function(context, value) {
		//	var precision = context && context.numPrecision;
		//	//add "epsilon" to ensure numbers like 1.000000005 (represented as 1.000000004999....) are properly rounded...
		//	return (precision == null) ? value : Number((value + 2e-16).toFixed(precision));
		//};
	}();

	Color.prototype.type = "Color";
	Color.name = "Color";
	Color.prototype.toString = function () {
		return this.toCSS();
	};

	function _clamp(val) {
		return Math.min(1, Math.max(0, val));
	}

	function clamp(v, max) {
		return Math.min(Math.max(v, 0), max);
	}

	function toHex(v) {
		return '#' + v.map(function (c) {
			c = clamp(Math.round(c), 255);
			return (c < 16 ? '0' : '') + c.toString(16);
		}).join('');
	}

	Color.prototype.luma = function () {
		var r = this.rgb[0] / 255,
			g = this.rgb[1] / 255,
			b = this.rgb[2] / 255;

		r = (r <= 0.03928) ? r / 12.92 : Math.pow(((r + 0.055) / 1.055), 2.4);
		g = (g <= 0.03928) ? g / 12.92 : Math.pow(((g + 0.055) / 1.055), 2.4);
		b = (b <= 0.03928) ? b / 12.92 : Math.pow(((b + 0.055) / 1.055), 2.4);

		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	};
	Color.prototype.genCSS = function (context, output) {
		output.add(this.toCSS(context));
	};
	Color.prototype.toCSS = function () {
		//var alpha;

		// `value` is set if this color was originally
		// converted from a named color string so we need
		// to respect this and try to output named color too.
		if (this.value) {
			return this.value;
		}

		if (this.alpha < 1) {
			return "rgba(" + this.rgb.map(function (c) {
					return clamp(Math.round(c), 255);
				}).concat(clamp(this.alpha, 1))
				.join(',') + ")";
		}
		return this.toRGB();
	};

	//
	// Operations have to be done per-channel, if not,
	// channels will spill onto each other. Once we have
	// our result, in the form of an integer triplet,
	// we create a new Color node to hold the result.
	//
	//	Color.prototype.operate = function (context, op, other) {
	//		var rgb = [];
	//		var alpha = this.alpha * (1 - other.alpha) + other.alpha;
	//		for (var c = 0; c < 3; c++) {
	//			rgb[c] = this._operate(context, op, this.rgb[c], other.rgb[c]);
	//		}
	//		return new Color(rgb, alpha);
	//	};
	Color.prototype.toRGB = function () {
		return toHex(this.rgb);
	};
	Color.prototype.toHSL = function () {
		var r = this.rgb[0] / 255,
			g = this.rgb[1] / 255,
			b = this.rgb[2] / 255,
			a = this.alpha;

		var max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2,
			d = max - min;

		if (max === min) {
			h = s = 0;
		} else {
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}
		return {
			h: h * 360,
			s: s,
			l: l,
			a: a
		};
	};
	//Adapted from http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
	Color.prototype.toHSV = function () {
		var r = this.rgb[0] / 255,
			g = this.rgb[1] / 255,
			b = this.rgb[2] / 255,
			a = this.alpha;

		var max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		var h, s, v = max;

		var d = max - min;
		if (max === 0) {
			s = 0;
		} else {
			s = d / max;
		}

		if (max === min) {
			h = 0;
		} else {
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}
		return {
			h: h * 360,
			s: s,
			v: v,
			a: a
		};
	};
	Color.prototype.toARGB = function () {
		return toHex([this.alpha * 255].concat(this.rgb));
	};
	Color.prototype.compare = function (x) {
		return (x.rgb &&
			x.rgb[0] === this.rgb[0] &&
			x.rgb[1] === this.rgb[1] &&
			x.rgb[2] === this.rgb[2] &&
			x.alpha === this.alpha) ? 0 : undefined;
	};


	var _COLORS = map('MAIN_COLOR', 'MAIN_REVERSE', 'MAIN_TEXT', "MAIN_GROUND", "MAIN_BORDER", "TITLE_TEXT", "CONTENT_TEXT", "COLOR_ANGLE")({
		szBank: ['88b91c', 'FFFFFF', '638f33', 'eeeeee', "e8e8e8", "333333", '969696', "c7c7c7"],
		fc: ['e03e3f', 'FFFFFF', 'df3031', 'eeeeee', "e8e8e8", "333333", '969696', "c7c7c7"], //美车师
		weChat: ['ffd600', '27262b', 'ff6101', 'eeeeee', "e8e8e8", "333333", '969696', "c7c7c7"],
		extra: ['ffd600', '27262b', 'ff6101', 'eeeeee', "e8e8e8", "333333", '969696', "c7c7c7"]
	}[config.target].map(function (c) {
		return new Color(c);
	}));
	wear(this)(_COLORS);
	wear(this)({
		rgb: function (r, g, b) {
			return colorFunctions.rgba(r, g, b, 1.0);
		},
		rgba: function (r, g, b, a) {
			var rgb = [r, g, b].map(Math.round);
			return new Color(rgb, a);
		},
		hsl: function (h, s, l) {
			return colorFunctions.hsla(h, s, l, 1.0);
		},
		hsla: function (h, s, l, a) {

			var m1, m2;

			function hue(h) {
				h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
				if (h * 6 < 1) {
					return m1 + (m2 - m1) * h * 6;
				} else if (h * 2 < 1) {
					return m2;
				} else if (h * 3 < 2) {
					return m1 + (m2 - m1) * (2 / 3 - h) * 6;
				} else {
					return m1;
				}
			}

			h = (h % 360) / 360;
			s = _clamp(s);
			l = _clamp(l);
			a = _clamp(a);

			m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
			m1 = l * 2 - m2;

			return colorFunctions.rgba(hue(h + 1 / 3) * 255,
				hue(h) * 255,
				hue(h - 1 / 3) * 255,
				a);
		},

		hsv: function (h, s, v) {
			return colorFunctions.hsva(h, s, v, 1.0);
		},

		hsva: function (h, s, v, a) {
			h = ((number(h) % 360) / 360) * 360;
			s = number(s);
			v = number(v);
			a = number(a);

			var i, f;
			i = Math.floor((h / 60) % 6);
			f = (h / 60) - i;

			var vs = [v,
				v * (1 - s),
				v * (1 - f * s),
				v * (1 - (1 - f) * s)
			];
			var perm = [
				[0, 3, 1],
				[2, 0, 1],
				[1, 0, 3],
				[1, 2, 0],
				[3, 1, 0],
				[0, 1, 2]
			];

			return colorFunctions.rgba(vs[perm[i][0]] * 255,
				vs[perm[i][1]] * 255,
				vs[perm[i][2]] * 255,
				a);
		},

		hue: function (color) {
			return color.toHSL().h;
		},
		saturation: function (color) {
			return new Dimension(color.toHSL().s * 100, '%');
		},
		lightness: function (color) {
			return new Dimension(color.toHSL().l * 100, '%');
		},
		hsvhue: function (color) {
			return new Dimension(color.toHSV().h);
		},
		hsvsaturation: function (color) {
			return new Dimension(color.toHSV().s * 100, '%');
		},
		hsvvalue: function (color) {
			return new Dimension(color.toHSV().v * 100, '%');
		},
		red: function (color) {
			return color.rgb[0];
		},
		green: function (color) {
			return color.rgb[1];
		},
		blue: function (color) {
			return color.rgb[2];
		},
		alpha: function (color) {
			return color.toHSL().a;
		},
		luma: function (color) {
			return new Dimension(color.luma() * color.alpha * 100, '%');
		},
		luminance: function (color) {
			var luminance =
				(0.2126 * color.rgb[0] / 255) +
				(0.7152 * color.rgb[1] / 255) +
				(0.0722 * color.rgb[2] / 255);

			return new Dimension(luminance * color.alpha * 100, '%');
		},
		saturate: function (color, amount, method) {
			// filter: saturate(3.2);
			// should be kept as is, so check for color
			if (!color.rgb) {
				return null;
			}
			var hsl = color.toHSL();

			if (typeof method !== "undefined" && method.value === "relative") {
				hsl.s += hsl.s * amount.value / 100;
			} else {
				hsl.s += amount.value / 100;
			}
			hsl.s = clamp(hsl.s);
			return hsla(hsl);
		},
		desaturate: function (color, amount, method) {
			var hsl = color.toHSL();

			if (typeof method !== "undefined" && method.value === "relative") {
				hsl.s -= hsl.s * amount.value / 100;
			} else {
				hsl.s -= amount.value / 100;
			}
			hsl.s = clamp(hsl.s);
			return hsla(hsl);
		},
		lighten: function (color, amount, method) {
			var hsl = color.toHSL();

			if (typeof method !== "undefined" && method.value === "relative") {
				hsl.l += hsl.l * amount.value / 100;
			} else {
				hsl.l += amount.value / 100;
			}
			hsl.l = clamp(hsl.l);
			return hsla(hsl);
		},
		darken: function (color, amount, method) {
			var hsl = color.toHSL();

			if (typeof method !== "undefined" && method.value === "relative") {
				hsl.l -= hsl.l * amount / 100;
			} else {
				hsl.l -= amount / 100;
			}
			hsl.l = _clamp(hsl.l);
			return hsla(hsl);
		},
		fadein: function (color, amount, method) {
			var hsl = color.toHSL();

			if (typeof method !== "undefined" && method.value === "relative") {
				hsl.a += hsl.a * amount.value / 100;
			} else {
				hsl.a += amount.value / 100;
			}
			hsl.a = clamp(hsl.a);
			return hsla(hsl);
		},
		fadeout: function (color, amount, method) {
			var hsl = color.toHSL();

			if (typeof method !== "undefined" && method.value === "relative") {
				hsl.a -= hsl.a * amount.value / 100;
			} else {
				hsl.a -= amount.value / 100;
			}
			hsl.a = clamp(hsl.a);
			return hsla(hsl);
		},
		fade: function (color, amount) {
			var hsl = color.toHSL();

			hsl.a = amount.value / 100;
			hsl.a = clamp(hsl.a);
			return hsla(hsl);
		},
		spin: function (color, amount) {
			var hsl = color.toHSL();
			var hue = (hsl.h + amount.value) % 360;

			hsl.h = hue < 0 ? 360 + hue : hue;

			return hsla(hsl);
		},

		//Copyright (c) 2006-2009 Hampton Catlin, Natalie Weizenbaum, and Chris Eppstein
		//http://sass-lang.com

		mix: function (color1, color2, weight) {
			if (!color1.toHSL || !color2.toHSL) {
				console.log(color2.type);
				console.dir(color2);
			}
			if (!weight) {
				weight = new Dimension(50);
			}
			var p = weight.value / 100.0;
			var w = p * 2 - 1;
			var a = color1.toHSL().a - color2.toHSL().a;

			var w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
			var w2 = 1 - w1;

			var rgb = [color1.rgb[0] * w1 + color2.rgb[0] * w2,
				color1.rgb[1] * w1 + color2.rgb[1] * w2,
				color1.rgb[2] * w1 + color2.rgb[2] * w2
			];

			var alpha = color1.alpha * p + color2.alpha * (1 - p);

			return new Color(rgb, alpha);
		},
		greyscale: function (color) {
			return colorFunctions.desaturate(color, new Dimension(100));
		},
		contrast: function (color, color1, color2, threshold) {
			// Return which of `color1` and `color2` has the greatest contrast with `color`
			// according to the standard WCAG contrast ratio calculation.
			// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
			// The threshold param is no longer used, in line with SASS.
			// filter: contrast(3.2);
			// should be kept as is, so check for color
			if (!color.rgb) {
				return null;
			}
			if (typeof color1 === 'undefined') {
				color1 = colorFunctions.rgba(0, 0, 0, 1.0);
			}
			if (typeof color2 === 'undefined') {
				color2 = colorFunctions.rgba(255, 255, 255, 1.0);
			}
			var contrast1, contrast2;
			var luma = color.luma();
			var luma1 = color1.luma();
			var luma2 = color2.luma();
			// Calculate contrast ratios for each color
			if (luma > luma1) {
				contrast1 = (luma + 0.05) / (luma1 + 0.05);
			} else {
				contrast1 = (luma1 + 0.05) / (luma + 0.05);
			}
			if (luma > luma2) {
				contrast2 = (luma + 0.05) / (luma2 + 0.05);
			} else {
				contrast2 = (luma2 + 0.05) / (luma + 0.05);
			}
			if (contrast1 > contrast2) {
				return color1;
			} else {
				return color2;
			}
		},
		argb: function (color) {
			return new Anonymous(color.toARGB());
		},
		tint: function (color, amount) {
			return colorFunctions.mix(colorFunctions.rgb(255, 255, 255), color, amount);
		},
		shade: function (color, amount) {
			return colorFunctions.mix(colorFunctions.rgb(0, 0, 0), color, amount);
		},
		gray: function (color) {
			var rgb = color.rgb;
			var s = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
			return new Color([s, s, s]);
		},
		parse: function (c) {
			if (/^([ABCDEFabcdef0-9]{6})|([ABCDEFabcdef0-9]{3})$/.test(c)) {
				return new Color(c);
			} else if (angular.isString(c) && colorFunctions[c.toUpperCase()]) {
				return colorFunctions[c.toUpperCase()];
			} else if (angular.isArray(c) && c.length == 3) {
				return new Color(c);
			}
		}
	});
	var hsla = function (color) {
		return colorFunctions.hsla(color.h, color.s, color.l, color.a);
	};

	//Rabbit.wear(this)(map(["nav", "navD", "men", "back", "fade", "msg", "font", "fontB", "fontF", "light", "icon"])({//主题颜色
	//	szBank: ["#9C3", "#8B2", "#FFFFFF", "#f1f1f1", "#666", "#999", "#FFF", "#888", "#9C3", "#AD6", "#FD0"],	//绿白灰白
	//	weChat: ["#E44", "#D33", "#FFFFFF", "#f1f1f1", "#666", "#999", "#FFF", "#888", "#E44", "#E66", "#FD0"],	//红白灰白
	//	extra: ["#FD0", "#DC0", "#27262b", "#f1f1f1", "#666", "#999", "#000", "#888", "#B80", "#FFD", "#FD0"]	//黄黑灰白
	//}[config.target]));
}
var color=new Color;