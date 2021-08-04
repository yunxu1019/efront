const R_max = 0x80000000;
const R_min = 1 << 23;
var d = 0,
	n = 0,
	L = 0,
	H = 0,
	R = 0;
var __dist;
function OutputCode(t) {
	dist.push(t);
}
function encode(cf, f, T) {
	var i = 0;
	R = R / T;
	L += cf * R;
	R = f * R;
	while (R < R_min) {
		H = L + R - 1;
		if (n !== 0) {
			OutputCode(d);
			for (var i = 1; i < n; i++)OutputCode(0xff);
			n = 0;
			L += R_max;
		}
		else if (L >= R_max) {
			OutputCode(d + 1);
			for (var i = 1; i < n; i++)OutputCode(0x00);
			n = 0;
		}
		else {
			n++;
			L = L << 8 & R_max - 1;
			R = R << 8;
		}
	}
	if (((L ^ H) & (0xff << 23)) === 0) {
		OutputCode(L << 23);
	}
	else {
		L -= R_max;
		d = L << 23;
		n = 1;
	}
	L = L << 8 & R_max - 1 | L & R_max;
	R = R << 8;
}
function finish() {
	var i;
	if (n !== 0) {
		if (L < R_max) {
			OutputCode(d);
			for (var i = 1; i < n; i++)OutputCode(0xff);
		}
		else {
			OutputCode(d + 1);
			for (var i = 1; i < n; i++)OutputCode(0x00);
		}
	}
	L = L << 1;
	i = 32;
	do {
		i -= 8;
		OutputCode(L >> i);
	} while (i > 0);
}
function main(buff) {
	var tree = new BitTree;
	var dist = __dist = [];
	for (var cx = 0, dx = buff.length; cx < dx; cx++) {
		var b = buff[cx];
		var f = tree.counts[b];
		var cf = tree.sumTo(b);
		encode(cf, f, b);
		tree.count(b);
	}
	__dist = null;
	return dist;
}