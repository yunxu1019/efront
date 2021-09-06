const symbol_no = 512;
const eom = symbol_no;
const code_bits = 31;
const shift_bits = code_bits - 8; //shift_bits
const R_max = shl(1, code_bits);
const R_min = shl(1, shift_bits);
const max_freq = 0xffff;
function shl(a, n) {
	a = a << n;
	if (a < 0) {
		a += 0x100000000;
	}
	return a;
}
function shr(a, n) {
	return a >>> n;
}