commbuilder.debug = true;
memery.KEEPSPACE = true;
assert(await commbuilder.parse(`async function a(){}`, 'a.js', 'a.js', []), {
    data: 'async function a() {}\r\nreturn a'
});
assert(await commbuilder.parse(`return async function a(){}`, 'a.js', 'a.js', []), {
    data: 'return async function a() {}'
});
assert(await commbuilder.parse(`typeof Array`, 'a.js', 'a.js', []), {
    data: 'return typeof Array'
});
assert(await commbuilder.parse(`typeof Array!==undefined?`, 'a.js', 'a.js', []), {
    data: 'return typeof Array'
});
