const R_max = 0x80000000;
const R_min = 1 << 23;
var V = 0;
var R = 0;
var __buff;
var __input = 0;
function guess(T) {
	var code = T;
	code = V >> 1;
	R = R / T;
	var result;
	if (code < L) {
		result = (code + R_max - L) / R;
	}
	else {
		result = (code - L) / R;
	}
	return result;
}
function decode(cf, f) {
	L += cf * R;
	R = f * R;
	while (R <= R_min) {
		L = L >> 8 & R_max - 1;
		R = R << 8;
		V = V << 8 | __buff[__input++];
	}
	return V;
}
function main(buff) {
	__input = 0;
	R = 0;
	V = 0;
	__buff = buff;
	__buff = null;
	var tree = new BitTree;
	var f, cf;
	var result = [];
	while (__input < buff.length) {
		var g = guess(tree.total);
		var i = tree.find(g);
		var cf = tree.sumTo(i);
		var f = tree.counts[i];
		var c = decode(cf, f);
		result.push(c);
	}
	return result;
}