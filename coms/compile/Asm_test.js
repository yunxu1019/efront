var asm = new Asm;
var test = function (str, exp = str) {
    var code = scanner2(str, asm);
    assert(String(code), exp);
}
test('a abc<1, 0, 0>');
test('eax < 1');
test('.if eax < 1 .break');
test('.if eax < 1 .break');
test('.while ecx<edx mov al,BYTE ptr[ecx]', '.while ecx < edx mov al, BYTE ptr[ecx]');
test(`
.386
.data
a dd ?
.code
a PROC
local p[SIZE], q
xor eax, eax
ret
a endp
start:
    end start`);