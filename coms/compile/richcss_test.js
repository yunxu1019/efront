var test = function (data, expect) {
    assert(richcss(data), expect);
};
test(`&{--a:1;a{opacity:--a}}`, `a{opacity:1;}`);
test(`:root{--a:1}a{opacity:--a}`, `a{opacity:1;}`);
test(`:scope{--a:1}a{opacity:--a}`, `a{opacity:1;}`);
test(`:scope{--b:--a;--a:1;}a{opacity:--b}`, `a{opacity:1;}`);
test(`@a(@p,@b){@p{opacity:@b}}@a(a,1);`, `a{opacity:1;}`);
test(`@a(a,1);@a(@p,@b){@p{opacity:@b}}`, `a{opacity:1;}`);
test(`a{ b{a:1}}`, `a b{a:1;}`);
test(`a{ >b{a:1}}`, `a>b{a:1;}`);
test(`a{ &>b{a:1}}`, `a>b{a:1;}`);
test(`a{ &b{a:1}}`, `ab{a:1;}`);
test(`a{ &.b{a:1}}`, `a.b{a:1;}`);
test(`a{ &[b]{a:1}}`, `a[b]{a:1;}`);
test(`a{ &[b]:nth-child(1){a:1}}`, `a[b]:nth-child(1){a:1;}`);
test(`a,b{c{a:1}}`, `a c,b c{a:1;}`);
test(`@media(){div{a:1}}`, `@media(){div{a:1;}}`);
test(`@keyframes a{%1{a:1}}`, `@keyframes a{%1{a:1;}}`);
test(`@media screen and (max-width: 200px){@keyframes a{%1{a:1}}}`, `@media screen and (max-width: 200px){@keyframes a{%1{a:1;}}}`);
test(`@a:1`, ``);
test(`@a:1;a{a:@a}`, `a{a:1;}`);
test(`@a:1;a{@{a}:@a}`, `a{1:1;}`);
test(`@a:1;a{@a:2;@{a}:@a}`, `a{2:2;}`);
test(`@a:1;@a{@a:2;@{a}:@a}`, `1{2:2;}`);
test(`@b(@a:1){@a{a:b}}@b(2)`, `2{a:b;}`);
test(`@a:1; a{a:@a/2}`, `a{a:0.5;}`);
test(`@a:1; a{a:(@a/2)}`, `a{a:0.5;}`);
test(`@a:1; a{a:(@a/2)+1}`, `a{a:1.5;}`);
test(`@a:1; a{a:(@a/2) + 1}`, `a{a:1.5;}`);
test(`@a:1px; a{a:(@a/2) +1px}`, `a{a:0.5px +1px;}`);
test(`@a:1px; a{a:(@a/2) -1px}`, `a{a:0.5px -1px;}`);
test(`@a:1px; a{a:(@a/2)-1px}`, `a{a:-0.5px;}`);
test(`@a:1px; a{a:1px+ (@a/2)}`, `a{a:1.5px;}`);
test(`&{a:calc(100% - 1px)}`, `&{a:calc(100% - 1px);}`);
test(`&{a:calc(~"100% - 1px")}`, `&{a:calc(100% - 1px);}`);
test(`&{a:calc(~"100vw - 1px")}`, `&{a:calc(100vw - 1px);}`);
test(`&{a:calc(~"100px - 1px")}`, `&{a:99px;}`);
test(`&{a:calc(100px - 1px)}`, `&{a:99px;}`);
test(`.a(){b{a:2}} .a();`, `b{a:2;}`);
test(`#a(){b{a:2}} #a();`, `b{a:2;}`);
test(`#a{a:1}`, `#a{a:1;}`);
test(`#a{}`, ``);
test(`@a{}`, ``);
test(`.a{}`, ``);
test(`a{}`, ``);
test(`@a: 1,2;each(@a,(){b{a:@value}})`, `b{a:1;}\r\nb{a:2;}`);
test(`@a(){a:A;b:B} each(@a(),(@v,@k,@i){@{key}@{i}{@{v}:@i}})`, `a1{A:1;}\r\nb2{B:2;}`);
test(`b{a:darken(#fff,10%)}`, `b{a:#f5f5f5;}`);
test(`b{a:darken(hsl(90, 80%, 50%), 20%)}`, `b{a:#6cd205;}`);
test(`b{a:darken(#6cd205, 20%)}`, `b{a:#58be00;}`);
test(`b{a:darken(#7ff,10%)}`, `b{a:#6df5f5;}`);

test(`:not(a):not(b){c:d}`, `:not(a):not(b){c:d;}`);
assert(richcss(`:not(a):not(b){c:d}`, 'abc'), `abc :not(a):not(b){c:d;}`);
assert(richcss(`&:not(a):not(b){c:d}`, 'abc'), `abc:not(a):not(b){c:d;}`);
assert(richcss(`:scope{&:not(a):not(b){c:d}}`, 'abc'), `abc:not(a):not(b){c:d;}`);
assert(richcss(`:root{&:not(a):not(b){c:d}}`, 'abc'), `abc:not(a):not(b){c:d;}`);
assert(richcss(`&{&:not(a):not(b){c:d}}`, 'abc'), `abc:not(a):not(b){c:d;}`);