"include ./encodeRange.h";
var R = R_max,
	L = 0,
	d = 0;
var __buff;
var __input = 0;

function init() {
	L = 0;
	R = R_max;
	d = 0;
	var i = code_bits + 1;
	do {
		i -= 8;
		d = shl(d, 8) | input();
	} while (i > 0);
}

function input() {
	if (__input >= __buff.length) return 0;
	return __buff[__input++];
}

function guess(T) {// DecodeTarget
	var code = T;
	code = shr(d, 1);
	R = R / T | 0;
	var result;
	if (code < L) {
		result = (code + R_max - L) / R | 0;
	}
	else {
		result = (code - L) / R | 0;
	}
	return result;
}

function decode(cf, f) {
	L += cf * R;
	R = f * R;
	while (R <= R_min) {
		L = shl(L, 8) & R_max - 1;
		R = shl(R, 8);
		d = shl(d, 8) | input();
	}
}

function main(buff) {
	__input = 0;
	__buff = buff;
	init();
	var tree = new BitTree(symbol_no);
	var f, cf;
	var result = [];
	while (__input < buff.length) {
		var g = guess(tree.total);
		var i = tree.find(g);
		var cf = tree.sumTo(i);
		var f = tree.counts[i];
		decode(cf, f);
		tree.count(i);
		result.push(i);
	}
	__buff = null;
	return result;
}
module.exports = main;