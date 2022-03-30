var testAdd = function (a, b, s) {
    assert(BigNumber.add(a, b), s, `${a} + ${b}`);
};
var testPrd = function (a, b, s) {
    assert(BigNumber.prd(a, b), s, `${a} * ${b}`);
};
testAdd(0x1fffffffffffff, 1, '9007199254740992');
testAdd(0x1fffffffffffff, 2, '9007199254740993');
testAdd(0x1fffffffffffff, 3, '9007199254740994');
testAdd(0x1fffffffffffff, 3, '9007199254740994');
testAdd("900719925474099.2", 0.1, '900719925474099.3');
testAdd("900719925474099.2", 0.1, '900719925474099.3');
testAdd("900719925474099.3", -0.2, '900719925474099.1');
testAdd("900719925474099.39007199254740992", "-900719925474099.39007199254740992", '0');
testAdd("900719925474099.39007199254740992", 0.2, '900719925474099.59007199254740992');
testAdd("900719925474099.39007199254740992", "-900719925474099.39007", '0.00000199254740992');
testAdd("90071992547409939007.199254740992", 0.2, '90071992547409939007.399254740992');
testAdd("-90071992547409939007.199254740992", 0.2, '-90071992547409939006.999254740992');
var getrandomint = function () {
    var n = BigInt(Math.random() * new Date | 0) * BigInt(Math.random() * new Date | 0) * BigInt(Math.random() * new Date | 0);
    return n;
}
for (var cx = 0, dx = 1000; cx < dx; cx++) {
    var n1 = getrandomint();
    var n2 = getrandomint();
    var s = String(n1 + n2);
    testAdd(n1, n2, s);
    testPrd(n1, n2, String(n1 * n2));
}
assert(BigNumber.fix(2, 2), '2.00');
assert(BigNumber.fix(2.234, 6), '2.234000');
assert(BigNumber.fix(2.235, 6), '2.235000');
assert(BigNumber.fix(2.235, 2), '2.24');
assert(BigNumber.fix(2.234, 2), '2.23');
assert(BigNumber.fix(2.2351, 2), '2.24');
assert(BigNumber.fix(2.2349, 2), '2.23');
assert(BigNumber.round(2.2349), '2');
assert(BigNumber.round(2.4999), '2');
assert(BigNumber.round(2.5000), '3');
assert(BigNumber.round(2.5100), '3');
assert(BigNumber.ceil(2.5100), '3');
assert(BigNumber.ceil(2.000), '2');
assert(BigNumber.floor(2.000), '2');
assert(BigNumber.floor(2.999), '2');
assert(BigNumber.ceil(2.001), '3');
assert(BigNumber.ceil(2.999), '3');
assert(BigNumber.fix("9007199254740992.234", 6), '9007199254740992.234000');