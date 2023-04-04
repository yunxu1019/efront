var test = function (data, expect) {
    assert(richcss(data), expect);
};
test(`:scope{--a:1}a{opacity:--a}`, `a{opacity:1;}`);
test(`:scope{--b:--a;--a:1;}a{opacity:--b}`, `a{opacity:1;}`);
test(`@a(@p,@b){@p{opacity:@b}}@a(a,1);`, `a{opacity:1;}`);
test(`@a(a,1);@a(@p,@b){@p{opacity:@b}}`, `a{opacity:1;}`);
test(`a{ b{a:1}}`,`a b{a:1;}`);
test(`a{ >b{a:1}}`,`a>b{a:1;}`);
test(`a{ &>b{a:1}}`,`a>b{a:1;}`);
test(`a{ &b{a:1}}`,`ab{a:1;}`);
test(`a{ &.b{a:1}}`,`a.b{a:1;}`);
test(`a{ &[b]{a:1}}`,`a[b]{a:1;}`);