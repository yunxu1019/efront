assert(renderExpress("[].a"), "[].a")
assert(renderExpress("a?b:c"), "a?b:c")
assert(renderExpress("a?"), "(typeof a==='undefined'||a===null?void 0:a)")
assert(renderExpress("[].a?.()"), "(function(a,_){return a==_?_:a()}([].a))")// 暂不支持在?.()的函数中访问this，此为临时方案
assert(renderExpress("[].a?.b?.c?.()"), "(function(a,_){if(a==_)return;a=a.b;if(a==_)return;a=a.c;if(a==_)return;a=a();return a}([].a))")
assert(renderExpress("a??b"), "(typeof a!=='undefined'&&a!==null?a:b)")
assert(renderExpress("a?.b??b?.c", false), "(function(b0){b0=a==null?void 0:a.b;if(b0!=null)return b0;return b==null?void 0:b.c}())")

assert(renderExpress("[]?.a"), "(function(a,_){return a==_?_:a.a}([]))")
assert(renderExpress("[]?.()"), "(function(a,_){return a==_?_:a()}([]))")
assert(renderExpress("[]?.[]"), "(function(a,_){return a==_?_:a[]}([]))")
assert(renderExpress("a['a?.a']"), "a['a?.a']")
assert(renderExpress("a?.['a?.a']?.b"), "(typeof a==='undefined'&&a===null?void 0:function(a,_){if(a==_)return;a=a['a?.a'];if(a==_)return;a=a.b;return a}(a))")
