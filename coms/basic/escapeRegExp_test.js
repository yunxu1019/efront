var escape = RegExp.escape;
delete RegExp.escape;
var escapeRegExp = require("./escapeRegExp");
var test = function (a) {
    assert(escapeRegExp(a), escape(a))
};

test('0')
test('9')
test('a')
test('b')
test('c')
test('d')
test('e')
test('f')
test('foo')
test(' ');
test('\u00a0')
test('\u0085')
test('\ufeff')
test('\ufffe')
test('\u8fff')
test('\u8fff')
test('\u1680')
test('\u2000')
test('\u2009')
test('\u0009')
test('\u0008')
test('\u000d')
test('\u202f')
test('\u2028')
test('\u2029')
test('\u3000')
test('\u2000')
test('\u1680')