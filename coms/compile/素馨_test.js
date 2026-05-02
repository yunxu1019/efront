var test = function (data, expect) {
    assert(素馨(data), expect);
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
test(`
@keyframes ltr{ 0%{-x:0}}
b{
    @keyframes ltr{
        100% {
            -x: -15px;
        }
    }
    animation:ltr 2s linear 0s;
}
a{
    @keyframes ltr {
        100% {
            -x: 15px;
        }
    }
    animation:ltr 2s linear 0s;
}
`, `@keyframes ltr{0%{-x:0;}}\r\n@keyframes ltr0{0%{-x:0;}100%{-x:-15px;}}b{animation:ltr0 2s linear 0s;}\r\n@keyframes ltr1{0%{-x:0;}100%{-x:15px;}}a{animation:ltr1 2s linear 0s;}`);
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
test(`&{a:url(~"100px - 1px")}`, `&{a:url(100px - 1px);}`);
test(`&{a:url("100px - 1px")}`, `&{a:url("100px - 1px");}`);
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
test(`a>{b{a:b}}`, `a>b{a:b;}`);
test(`a    >{b{a:b}}`, `a>b{a:b;}`);
test(`a{>b{a:b}}`, `a>b{a:b;}`);
test(`.type(@type,@media) {.@{type} {&:before{content:"@{media}";}}}.type(videoinput, "相机");`, `.videoinput:before{content:"相机";}`);
test(`.type(@type,@media) {.@{type} {&:before{content:"@{media}";}}}.type(videoinput, 相机);`, `.videoinput:before{content:"相机";}`);
assert(素馨(`:not(a):not(b){c:d}`, 'abc'), `abc :not(a):not(b){c:d;}`);
assert(素馨(`&:not(a):not(b){c:d}`, 'abc'), `abc:not(a):not(b){c:d;}`);
assert(素馨(`:scope{&:not(a):not(b){c:d}}`, 'abc'), `abc:not(a):not(b){c:d;}`);
assert(素馨(`:root{&:not(a):not(b){c:d}}`, 'abc1'), `abc1:not(a):not(b){c:d;}`);
assert(素馨(`&{&:not(a):not(b){c:d}}`, 'abc'), `abc:not(a):not(b){c:d;}`);
assert(素馨(`:root>a{&:not(a):not(b){c:d}}`, '.abc-'), `.abc->a:not(a):not(b){c:d;}`);
assert(素馨(`a>:root{&:not(a):not(b){c:d}}`, '.abc-'), `.abc-:not(a):not(b){c:d;}`);
assert(素馨(`.a (){ &:after{abc:1}} .b{.a();}`, '.abc-'), `.abc- .b:after{abc:1;}`);
assert(素馨(`@a:1px;@margin-x:@a+10px; a{m:-@margin-x}`), `a{m:-11px;}`);
assert(素馨(`a{@a:1px;@margin-x:@a+10px;m:-@margin-x}`), `a{m:-11px;}`);
assert(素馨(`@media screen{&.a{b:1}}`, 'a'), `@media screen{a.a{b:1;}}`);
assert(素馨(`@media screen and(max-width:100px){&.a{b:1}}`, 'a'), `@media screen and (max-width:100px){a.a{b:1;}}`);
assert(素馨(`b{:not([resizing], [dragging]) {transition: padding .2s, margin .2s;}}`), `b :not([resizing], [dragging]){transition:padding .2s, margin .2s;}`);
assert(素馨(`@a(@b){a@b{@w:@b/2;c:@w;}} @a(1); @a(2); @a(3)`), `a1{c:0.5;}\r\na2{c:1;}\r\na3{c:1.5;}`);
assert(素馨(`a{filter:grayscale(.9)}`), `a{filter:grayscale(.9);}`);
assert(素馨(`a{each(1,2,3,4,5,(@a){a:@a})}`), `a{a:1;a:2;a:3;a:4;a:5;}`);
assert(素馨(`each(1,(@a){a{a:@a}})a>b{b:2}`), `a{a:1;}\r\na>b{b:2;}`);
assert(素馨(`each(2,(@a){@b:1/@a;a{a:@b}})`), `a{a:0.5;}`);
assert(素馨(`each(2,.(@a){@b:1/@a;a{a:@b}})`), `a{a:0.5;}`);
assert(素馨(`a{a:length(2)}`), `a{a:1;}`);
assert(素馨(`a{b:length(2,3)}`), `a{b:2;}`);
assert(素馨(`a{a:extract(2,1)}`), `a{a:2;}`);
assert(素馨(`a{a:extract(2,3,2)}`), `a{a:3;}`);
assert(素馨(`a{a:extract(2 3,2)}`), `a{a:3;}`);
assert(素馨(`value: range(10px, 30px, 10);`, '', true), `value:10px 20px 30px;`);
assert(素馨(`value: range(4);`, '', true), `value:1 2 3 4;`);
assert(素馨(`@a:-1;b{a:-@a}`, '', true), `b{a:1;}`);
assert(素馨(`@b(@c,...@d,@e){each(@d,(@a){a:@a})};@b(1,2,3,4,5,3,4)`, '', true), `a:2;a:3;a:4;a:5;a:3;`);
assert(素馨(`--mwidth:0px;--bwidth:2px;--qwidth: var(--mwidth)+var(--bwidth);width:--qwidth`, '', true), `width:2px;`);
assert(素馨(`a{--a:1px;padding:var(--a) -var(--a);}`, '', true), `a{padding:1px -1px;}`);
assert(素馨(`a{@a:1px;padding:@a -@a;}`, '', true), `a{padding:1px -1px;}`);
assert(scanner2(`-0.2em .3em -0.2em 0`, new 素馨.素心)[0].text, '-0.2em');
assert(scanner2(`-0.2em .3em -0.2em 0`, new 素馨.素心)[0].isdigit, true);
assert(scanner2(`-0.2em .3em -0.2em 0`, new 素馨.素心)[2].text, ".3em");
assert(scanner2(`-0.2em .3em -0.2em 0`, new 素馨.素心)[2].isdigit, true);
assert(素馨(`a{ .b{b&{a:1}}}`, '', true), `a b.b{a:1;}`);
assert(素馨(`h1{a:c; span{a:b} i{a:b} }`, '.home-', true), `.home- h1 span{a:b;}.home- h1 i{a:b;}.home- h1{a:c;}`);
assert(素馨(`h1{ button{&:not(hover){.track{a:b}}} }`, '.home-', true), `.home- h1 button:not(hover) .track{a:b;}`);
assert(素馨(`@type(@a){&[type=@a]{a:1}} @type(white)`, '.btn-', true), `.btn-[type=white]{a:1;}`);
assert(素馨(`a,b{c,d{ g&{e:f}}}`, '', true), `a gc,b gc,a gd,b gd{e:f;}`);
assert(素馨(`a{a:lch(from rgb(20 20 20) l c h)}`, '', true), `a{a:lch(from rgb(20 20 20) l c h);}`);