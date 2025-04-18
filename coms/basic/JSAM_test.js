var test = function (o) {
    var s = JSAM.stringify(o);
    var a = JSAM.parse(s);
    if (!assert(a, o)) console.log(o, s.replace(/[\]\}],/g, '$&\r\n').split("\r\n").map((a, i) => `<${i}> ${a}`), a);

};
var test_self = function () {
    var o = {};
    o.o = o;
    test(o); // {1:0},"o"
    test(null) // null;
    test(undefined); // 空字符串
    test(1); // 1
    test([0]); 
    test(["00"]);
    test({"0":"00"});
    test({"00":"00"});
    test(true); // true
    test(false); // false 
    test(NaN); // NaN 
    test(Infinity); // Infinity
    test({}) // {}
    test([]) // [] 
    test(""); // ""
    test("\"\\"); // "\"\\"
    test(/a/); // /a/
    test(/a/ig); // /a/gi
    test(/a[/]/ig); // /a[\/]/gi
    test(new Date); // 2020-08-16T07:07:43.652Z
    test(BigInt("9007199254740993")); // 9007199254740993
    test(Symbol("a(")); // 'a('
    test(Symbol("asd")); // 'asd'
    test(Symbol("as'd")); // 'as\'d'
    test([2]) // [1],2
    test([""]) // [1],""
    test([{}]) // [1],{}
    test([{ a: undefined }]) // [1],{2:3},"a",
    test({ a: undefined }) // {1:2},"a",
    test([undefined]) // [1],
    test([true]) // [1],true
    test({ a: false }) // {1:2},"a",false
    test({ a: null }) // {1:2},"a",null
    test({ a: 0 }) // {1:2},"a",0
    test({ a: [0] }) // {a:2},"a",0
    test({ 2: [0] }) // {a:2},"a",0
    test({ a: NaN }) // {1:2},"a",NaN
    test({ a: { b: { c: [3], d: [2] } } }) // {1:2},"a",{3:4},"b",{5:6,7:8},"c",[9],"d",[10],3,2
    test({ a: { b: { c: [3, o], d: [2] } } }) // {1:2},"a",{3:4},"b",{5:6,7:8},"c",[9,10],"d",[11],3,{12:10},2,"o"
    var a = {},
        b = { a },
        c = [b],
        d = { c };
    a.d = d;
    test(a); // {1:2},"d",{3:4},"c",[5],{6:0},"a"
    test([{ "name": "用户", "open": true }, { "name": "导航", "open": true }, { "name": "商品", "open": true },]);
    console.log(JSAM.parse(`[1:2,3:2,4:5,6:7,8:2,9:2,10:2,11:2,12:13,14:13,15:16],"is_errored",null,"error_message","is_loading",false,"is_loaded",true,"is_readonly","loading","loading_promise","data","appid",,"sign","smap",{17:7,18:7},"zh","en"`))
};


function test_deep() {
    var addScope = function (groups) {
        var parentScopes = [{ groups }];
        groups.forEach((group, i) => {
            var $scope = { $item: group, $index: i };
            var ps = parentScopes.push($scope);
            group.forEach((item, i) => {
                var s = { $item: item, $index: i };
                item.target = {
                    $scope: s,
                    parentScopes: ps,
                    $mounted: true,
                    $renderid: 1,
                    className: '',
                    $renders: [{ call() { } }],
                    a: function () {
                        var a = function () { };
                        a.className = 'a';
                        a.call = function () { };
                        return a;
                    },
                    $struct: {
                        emits: {},
                        waits: {},
                        binds: {},
                        attrs: [],
                        copys: [],
                    },
                };
            })

        })
    }
    var files = [
        [
            { name: "a", size: 1, lastModified: 1721945589673, lastModifiedDate: new Date, path: '' },
            { name: "b", size: 2, lastModified: 1721945589673, lastModifiedDate: new Date, path: '' },
        ],
        [
            { name: "c", size: 2, lastModified: 1721945589673, lastModifiedDate: new Date, path: '' },
        ],
        [
            { name: "d", size: 2, lastModified: 1721945589673, lastModifiedDate: new Date, path: '' },
        ],
        [
            { name: "g", size: 2, lastModified: 1721945589673, lastModifiedDate: new Date, path: '' },
        ],
        [
            { name: "e", size: 2, lastModified: 1721945589673, lastModifiedDate: new Date, path: '' },
            { name: "f", size: 2, lastModified: 1721945589673, lastModifiedDate: new Date, path: '' },
        ],
        [
            { name: "e", size: 2, lastModified: 1721945589673, lastModifiedDate: new Date, path: '' },
            { name: "f", size: 2, lastModified: 1721945589673, lastModifiedDate: new Date, path: '' },
        ],
        [
            { name: "a", size: 2, lastModified: 1721945589673, lastModifiedDate: new Date, path: '' },
            { name: "b", size: 2, lastModified: 1721945589673, lastModifiedDate: new Date, path: '' },
        ],
    ];
    addScope(files);
    test(files);
}




function test_parse() {
    var data = JSAM.parse(`[1,40,57,74,91,122,153],
[2,26],
{target:3,src:"blob:http://localhost/07d435d9-0a5e-4e30-9b73-b8c58cb4b4c7",name:"花粥.jpeg",lastModified:+1721945589673,"lastModifiedDate":2024-07-25T22:13:09.673Z,"webkitRelativePath":""},
{origin:2,$h_mounted00:null,$scope:4,$parentScopes:5,$struct:15,$renders:25,$mounted:true,$renderid:+2,complete:true,width:+120,height:+120},
{$key:+0,$item:2,$index:+0,m:2},
[6,14],
{groups:0,ylist:7,actived:+0,padding:8,close:9,xlist:10,url:11,xbox:12,loading:false,tags:13},
{className:"lattice- lattice lattice"},
{className:"padding- padding padding"},
{className:"chooseclose- chooseclose chooseclose"},
{className:"list- list list"},
[],
{className:"vbox- vbox vbox"},
[],
{$key:+0,$item:1,$index:+0,i:+0,g:1,$origin:1},
{emits:16,waits:17,if:,repeat:,copys:18,binds:21,attrs:22,props:23,ids:24,once:},
{},
{},
[19,20],
{namespaceURI:null,prefix:null,localName:"height",name:"height",value:"120",ownerElement:3,specified:true},
{namespaceURI:null,prefix:null,localName:"width",name:"width",value:"120",ownerElement:3,specified:true},
{},
{},
{height:+120,width:+120},
[],
[],
{target:27,src:"blob:http://localhost/b64ea880-2af7-4781-9318-ab967df43932",name:"陈一发儿.jpg",lastModified:+1721945107240,"lastModifiedDate":2024-07-25T22:05:07.240Z,"webkitRelativePath":""},
{origin:26,$h_mounted00:null,$scope:28,$parentScopes:5,$struct:29,$renders:39,$mounted:true,$renderid:+2,complete:true,width:+120,height:+120},
{$key:+1,$item:26,$index:+1,m:26},
{emits:30,waits:31,if:,repeat:,copys:32,binds:35,attrs:36,props:37,ids:38,once:},
{},
{},
[33,34],
{namespaceURI:null,prefix:null,localName:"height",name:"height",value:"120",ownerElement:27,specified:true},
{namespaceURI:null,prefix:null,localName:"width",name:"width",value:"120",ownerElement:27,specified:true},
{},
{},
{height:+120,width:+120},
[],
[],
[41],
{target:42,src:null,name:"ucbr.png",lastModified:+1670542984813,"lastModifiedDate":2022-12-08T23:43:04.813Z,"webkitRelativePath":""},
{origin:41,$h_mounted00:null,$scope:43,$parentScopes:44,$struct:46,$renders:56,$mounted:true,$renderid:+2,complete:true,width:+120,height:+120},
{$key:+0,$item:41,$index:+0,m:41},
[6,45],
{$key:+1,$item:40,$index:+1,i:+1,g:40,$origin:40},
{emits:47,waits:48,if:,repeat:,copys:49,binds:52,attrs:53,props:54,ids:55,once:},
{},
{},
[50,51],
{namespaceURI:null,prefix:null,localName:"height",name:"height",value:"120",ownerElement:42,specified:true},
{namespaceURI:null,prefix:null,localName:"width",name:"width",value:"120",ownerElement:42,specified:true},
{},
{},
{height:+120,width:+120},
[],
[],
[58],
{target:59,src:null,name:"kuwo.png",lastModified:+1672029521697,"lastModifiedDate":2022-12-26T04:38:41.697Z,"webkitRelativePath":""},
{origin:58,$h_mounted00:null,$scope:60,$parentScopes:61,$struct:63,$renders:73,$mounted:true,$renderid:+2,complete:true,width:+120,height:+120},
{$key:+0,$item:58,$index:+0,m:58},
[6,62],
{$key:+2,$item:57,$index:+2,i:+2,g:57,$origin:57},
{emits:64,waits:65,if:,repeat:,copys:66,binds:69,attrs:70,props:71,ids:72,once:},
{},
{},
[67,68],
{namespaceURI:null,prefix:null,localName:"height",name:"height",value:"120",ownerElement:59,specified:true},
{namespaceURI:null,prefix:null,localName:"width",name:"width",value:"120",ownerElement:59,specified:true},
{},
{},
{height:+120,width:+120},
[],
[],
[75],
{target:76,name:"icon.png",lastModified:+1586739267873,"lastModifiedDate":2020-04-13T00:54:27.873Z,"webkitRelativePath":""},
{origin:75,$h_mounted00:null,$scope:77,$parentScopes:78,$struct:80,$renders:90,$mounted:true,$renderid:+2,complete:true,width:+120,height:+120},
{$key:+0,$item:75,$index:+0,m:75},
[6,79],
{$key:+3,$item:74,$index:+3,i:+3,g:74,$origin:74},
{emits:81,waits:82,if:,repeat:,copys:83,binds:86,attrs:87,props:88,ids:89,once:},
{},
{},
[84,85],
{namespaceURI:null,prefix:null,localName:"height",name:"height",value:"120",ownerElement:76,specified:true},
{namespaceURI:null,prefix:null,localName:"width",name:"width",value:"120",ownerElement:76,specified:true},
{},
{},
{height:+120,width:+120},
[],
[],
[92,108],
{target:93,name:"mirror.png",lastModified:+1674329306397,"lastModifiedDate":2023-01-21T19:28:26.397Z,"webkitRelativePath":""},
{origin:92,$h_mounted00:null,$scope:94,$parentScopes:95,$struct:97,$renders:107,$mounted:true,$renderid:+2,complete:true,width:+120,height:+120},
{$key:+0,$item:92,$index:+0,m:92},
[6,96],
{$key:+4,$item:91,$index:+4,i:+4,g:91,$origin:91},
{emits:98,waits:99,if:,repeat:,copys:100,binds:103,attrs:104,props:105,ids:106,once:},
{},
{},
[101,102],
{namespaceURI:null,prefix:null,localName:"height",name:"height",value:"120",ownerElement:93,specified:true},
{namespaceURI:null,prefix:null,localName:"width",name:"width",value:"120",ownerElement:93,specified:true},
{},
{},
{height:+120,width:+120},
[],
[],
{target:109,name:"cat.jpg",lastModified:+1674329302876,"lastModifiedDate":2023-01-21T19:28:22.876Z,"webkitRelativePath":""},
{origin:108,$h_mounted00:null,$scope:110,$parentScopes:95,$struct:111,$renders:121,$mounted:true,$renderid:+2,complete:true,width:+120,height:+120},
{$key:+1,$item:108,$index:+1,m:108},
{emits:112,waits:113,if:,repeat:,copys:114,binds:117,attrs:118,props:119,ids:120,once:},
{},
{},
[115,116],
{namespaceURI:null,prefix:null,localName:"height",name:"height",value:"120",ownerElement:109,specified:true},
{namespaceURI:null,prefix:null,localName:"width",name:"width",value:"120",ownerElement:109,specified:true},
{},
{},
{height:+120,width:+120},
[],
[],
[123,139],
{target:124,name:"mirror.png",lastModified:+1742618719560,"lastModifiedDate":2025-03-22T04:45:19.560Z,"webkitRelativePath":""},
{origin:123,$h_mounted00:null,$scope:125,$parentScopes:126,$struct:128,$renders:138,$mounted:true,$renderid:+2,complete:true,width:+120,height:+120},
{$key:+0,$item:123,$index:+0,m:123},
[6,127],
{$key:+5,$item:122,$index:+5,i:+5,g:122,$origin:122},
{emits:129,waits:130,if:,repeat:,copys:131,binds:134,attrs:135,props:136,ids:137,once:},
{},
{},
[132,133],
{namespaceURI:null,prefix:null,localName:"height",name:"height",value:"120",ownerElement:124,specified:true},
{namespaceURI:null,prefix:null,localName:"width",name:"width",value:"120",ownerElement:124,specified:true},
{},
{},
{height:+120,width:+120},
[],
[],
{target:140,name:"cat.jpg",lastModified:+1742618719558,"lastModifiedDate":2025-03-22T04:45:19.558Z,"webkitRelativePath":""},
{origin:139,$h_mounted00:null,$scope:141,$parentScopes:126,$struct:142,$renders:152,$mounted:true,$renderid:+2,complete:true,width:+120,height:+120},
{$key:+1,$item:139,$index:+1,m:139},
{emits:143,waits:144,if:,repeat:,copys:145,binds:148,attrs:149,props:150,ids:151,once:},
{},
{},
[146,147],
{namespaceURI:null,prefix:null,localName:"height",name:"height",value:"120",ownerElement:140,specified:true},
{namespaceURI:null,prefix:null,localName:"width",name:"width",value:"120",ownerElement:140,specified:true},
{},
{},
{height:+120,width:+120},
[],
[],
[154,155],
{name:"陈一发儿.jpg",lastModified:+1742785178480,"lastModifiedDate":2025-03-24T02:59:38.480Z,"webkitRelativePath":""},
{name:"花粥.jpeg",lastModified:+1742785178478,"lastModifiedDate":2025-03-24T02:59:38.478Z,"webkitRelativePath":""}`);
    assert(seek(data, '0.length'), 2);
    assert(seek(data, '0.0.name'), '花粥.jpeg');
    assert(seek(data, '0.0.target.$scope.$item.name'), '花粥.jpeg');
    assert(seek(data, '0.1.name'), '陈一发儿.jpg');
    assert(seek(data, '0.1.target.$scope.$item.name'), '陈一发儿.jpg');
    assert(seek(data, '1.length'), 1);
    assert(seek(data, '1.0.name'), 'ucbr.png');
    assert(seek(data, '2.length'), 1);
    assert(seek(data, '2.0.name'), 'kuwo.png');
    assert(seek(data, '3.length'), 1);
    assert(seek(data, '3.0.name'), 'icon.png');
    assert(seek(data, '4.length'), 2);
    assert(seek(data, '4.0.name'), 'mirror.png');
    assert(seek(data, '4.1.name'), 'cat.jpg');
    assert(seek(data, '5.length'), 2);
    assert(seek(data, '5.0.name'), 'mirror.png');
    assert(seek(data, '5.1.name'), 'cat.jpg');
    assert(seek(data, '6.length'), 2);
    assert(seek(data, '6.0.name'), '陈一发儿.jpg');
    assert(seek(data, '6.1.name'), '花粥.jpeg');

}
function test2(obj) {
    var data = JSAM.parse(JSON.stringify(obj));
    if (!assert(data, obj)) console.log(data);
}
function test_json() {
    test2({ 1: 2 });
    test2({ "adfasdf": 22 });
    test2([12, 23]);
    test2({ "uptime": 15.602063, "memery": [22244769792, 38478614528], "arch": "x64", "platform": "win32", "nodeVersion": "v22.14.0", "version": "4.22.13", "machine": "x86_64" });
    test2([{ "name": "用户", "open": true }, { "name": "导航", "open": true }, { "name": "商品", "open": true },]);
}
function gettime(f) {
    var timestart = Date.now();
    f();
    return Date.now() - timestart;
}
function test_time() {
    var data = Array(10000).fill(0).map((a, i) => (
        { obj: { obj: { [i >>> 6]: i }, obj2: ["您好，这是速度测试"], obj3: { key2: {} } }, key: 'asad' }
    ));
    var t1 = gettime(() => basic_$JSON.stringify(data));
    console.log(t1);
    var t2 = gettime(() => JSON.stringify(data));
    console.log(t2);
    var t3 = gettime(() => JSAM.stringify(data));
    console.log(t1, t2, t3);
    var t4 = gettime(() => JSAM.stringify(data, false));
    console.log(t1, t2, t3, t4);
}
function test_encode() {
    for (var cx = 0, dx = 0xffff; cx < dx; cx++) {
        var str = String.fromCodePoint(cx);
        var enc = JSAM.stringify(str);
        var dec = JSAM.parse(enc);
        assert(str, dec);
        var obj = { [str]: str };
        enc = JSAM.stringify(obj);
        dec = JSAM.parse(enc);
        if (!assert(dec, obj) || cx === 0x41) {
            console.log(cx, str, cx.toString(16), enc);
        };
        obj = { [str]: obj, [enc]: obj };
        enc = JSAM.stringify(obj);
        dec = JSAM.parse(enc);
        assert(dec, obj);
    }
}
function JSAM_test() {
    test_self();
    test_json();
    JSAM.debug = true;
    test_deep();
    test_parse();
    JSAM.debug = false;
    test_time();
    test_encode();
}