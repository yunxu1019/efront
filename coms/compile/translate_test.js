var test = function (src, text, expact) {
    var code = scanner2(text);
    translate([src, Object.keys(src)], code);
    assert(code.toString(), expact);
};
test({ "a$1b": ["a$1b", "c$1d"] }, 'i18n`a${a}b`', 'i18n(`a${a}b`, `c${a}d`)')
test({ "a$1b": ["a$1b", "c$1d"] }, 'i18n`a${a++}b`', 'i18n(() => `a${a++}b`, () => `c${a++}d`)()')
test({ "a$1b": ["c$1d"] }, 'i18n`a${a++}b`', 'i18n(`c${a++}d`)')
