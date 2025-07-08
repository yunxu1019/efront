// 部分算法参考 https://www.cnblogs.com/jackyzzy/archive/2012/04/26/2471165.html
"include ./encodeRange.h";
var __dist, // buff
	L = R_max, // low Cardinal
	R = R_max, // range Cardinal
	d = 0, // digits Cardinal
	n = 0; // follow

function OutputCode(t) {
	t = t & 0xff;
	__dist.push(t);
}
function init() {
	L = R_max;
	R = R_max;
	n = 0;
	d = 0;
}
function encode(cf, f, T) {
	var i, H;
	// 区间计算
	R = R / T | 0;
	L += cf * R;
	R = f * R;
	// 调整区间
	while (R <= R_min) {
		H = L + R - 1;
		// 判断是否有延迟数字
		if (n !== 0) {
			if (H <= R_max) {
				// 区间下沿
				OutputCode(d);
				for (i = 1; i < n; i++)OutputCode(0xff);
				n = 0;
				L += R_max;
			}
			else if (L >= R_max) {
				// 区间上沿
				OutputCode(d + 1);
				for (i = 1; i < n; i++)OutputCode(0x00);
				n = 0;
			}
			else {
				// 趋向未定
				n++;
				// 扩展区间
				L = shl(L, 8) & R_max - 1;
				R = shl(R, 8);
				continue;
			}
		}
		// 判断最高位数字
		if (((L ^ H) & shl(0xff, shift_bits)) === 0) {
			// 出现不变数字
			OutputCode(shr(L, shift_bits));
		}
		else {
			// 出现延迟数字
			L -= R_max;
			d = shr(L, shift_bits);
			n = 1;
		}
		// 扩展区间
		L = shl(L, 8) & R_max - 1 | L & R_max;
		L = shl(L, 0);
		R = shl(R, 8);
	}
}
function finish() {
	var i;
	if (n !== 0) {
		if (L < R_max) {
			// 趋向下沿
			OutputCode(d);
			for (i = 1; i < n; i++)OutputCode(0xff);
		}
		else {
			// 走向上沿
			OutputCode(d + 1);
			for (i = 1; i < n; i++)OutputCode(0x00);
		}
	}
	// 输出剩余编码
	L = shl(L, 1);
	i = code_bits + 1;
	do {
		i -= 8;
		OutputCode(shr(L, i) & 0xff);
	} while (i > 0);
}
function main(buff) {
	init();
	var tree = new BitTree(symbol_no);
	var dist = __dist = [];
	writeLEB128(dist, 0, buff.length);
	for (var cx = 0, dx = buff.length; cx < dx; cx++) {
		var b = buff[cx];
		var f = tree.counts[b];
		var cf = tree.sumTo(b);
		encode(cf, f, tree.total);
		tree.count(b);
	}
	finish();
	__dist = null;
	return dist;
}
module.exports = main;