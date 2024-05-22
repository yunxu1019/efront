// 导入
var js = new Javascript;
var testFix = function (a, e) {
    var c = scanner2(a, js);
    c.fix();
    assert(c.toString(), e);
}
js.debug = true;
assert(scanner2("/a/g", js)[0].type, common.QUOTED);
testFix(`import a from "a";console.log(a)`, 'var a = require("a"); console.log(a.default)');
testFix(`import {a} from "a";console.log(a)`, 'var a1 = require("a"); console.log(a1.a)');
testFix(`import a,{a as b} from "a";console.log(a,b)`, 'var a = require("a"); console.log(a.default, a.a)');
testFix(`import * as a,{a as b},c from "a";console.log(a,b,c)`, 'var a = require("a"); console.log(a, a.a, a.default)');
testFix(`import * as a,{a as b},c from "a";console.log(a,...b,...c)`, 'var a = require("a"); console.log(a, ...a.a, ...a.default)');
testFix(`console.log(import("a"))`, 'console.log(require("a"))');
testFix(`import("a")`, 'require("a")');
testFix(`import "windows.inc"`, 'require("windows.inc")');
testFix(`import "windows.inc";import "abc.inc";`, 'require("windows.inc"); require("abc.inc");');
testFix(`import "windows.inc";\r\nimport "abc.inc";`, 'require("windows.inc");\r\nrequire("abc.inc");');
testFix(`console.log(import.meta)`, `console.log(import_meta)`);
var testDetour = function (a, e) {
    var c = scanner2(a);
    c.break();
    assert(c.toString(), e);
}
testDetour('1.1', '1.1')
testDetour('1.1.a', '1.1["a"]')
testDetour('-1e10.a', '-1e10["a"]')
testDetour('1e10.a', '1e10["a"]')
testDetour('1e1_0.a', '1e10["a"]')
testDetour('1_20e1_0.a', '120e10["a"]')
testDetour('1_2.0_3e1_0.a', '12.03e10["a"]')
testDetour('1.e10.a', '1e10["a"]')
testDetour('1.e-10.a', '1e-10["a"]')
testDetour('1.e+10.a', '1e+10["a"]')
testDetour('0x1.a', '0x1["a"]')
testDetour('0b1.a', '0b1["a"]')
testDetour('01.a', '0o1["a"]')
testDetour('08.a', '08["a"]')
testDetour('0o1.a', '0o1["a"]')
testDetour('0o1n.a', '0o1n["a"]')
testDetour('0o1m.a', '0o1m["a"]')
testDetour('0o1i.a', '0o1i["a"]')
testDetour('0o1j.a', '0o1j["a"]')
testDetour('0o1k.a', '0o1k["a"]')
testDetour('0o1l.a', '0o1l["a"]')
testDetour('0o1ll.a', '0o1ll["a"]')
var ts = new Javascript;
ts.straps.push('interface', 'implements', "declare", "module", "readonly", "enum", 'type');
ts.tags[0].push("{")
var testTypescript = function (text) {
    var s = scanner2(text, ts);
    return assert(s.toString(), text);
}
testTypescript(`const strict: Omit<typeof assert, 'equal' | 'notEqual' | 'deepEqual' | 'notDeepEqual' | 'ok' | 'strictEqual' | 'deepStrictEqual' | 'ifError' | 'strict'> & {
    (value: unknown, message?: string | Error): asserts value;
    equal: typeof strictEqual;
    notEqual: typeof notStrictEqual;
    deepEqual: typeof deepStrictEqual;
    notDeepEqual: typeof notDeepStrictEqual;
    // Mapped types and assertion functions are incompatible?
    // TS2775: Assertions require every name in the call target
    // to be declared with an explicit type annotation.
    ok: typeof ok;
    strictEqual: typeof strictEqual;
    deepStrictEqual: typeof deepStrictEqual;
    ifError: typeof ifError;
    strict: typeof strict;
};`);
testTypescript(`
type ExecFileException =
& Omit<ExecException, 'code'>
& Omit<NodeJS.ErrnoException, 'code'>
& { code?: string | number | undefined | null };
function rejects(block: (() => Promise<unknown>) | Promise<unknown>, message?: string | Error): Promise<void>;
const exit<R, TArgs extends any[]>(callback: (...args: TArgs) => R, ...args: TArgs): R;
`)
testTypescript(`class AsyncLocalStorage<T> {
    static snapshot(): (<R, TArgs extends any[]>(fn: (...args: TArgs) => R, ...args: TArgs) => R) & {
        asyncResource: AsyncResource;
    };
}`);

testTypescript(`interface AsyncResourceOptions {
    triggerAsyncId?: number | undefined;
    requireManualDestroy?: boolean | undefined;
    arrayBuffer(): Promise<ArrayBuffer>;
    from(data: WithImplicitCoercion<Uint8Array | ReadonlyArray<number> | string>): Buffer;
    getRandomValues<T extends Exclude<NodeJS.TypedArray, Float32Array | Float64Array>>(typedArray: T): T;
    preopens?: NodeJS.Dict<string> | undefined;
    function rejects(block: (() => Promise<unknown>) | Promise<unknown>, message?: string | Error): Promise<void>;
}`);

testTypescript(`
interface WritableOptions extends StreamOptions<Writable> {
    decodeStrings?: boolean | undefined;
    defaultEncoding?: BufferEncoding | undefined;
    write?(this: Writable, chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void;
    writev?(
        this: Writable,
        chunks: Array<{
            chunk: any;
            encoding: BufferEncoding;
        }>,
        callback: (error?: Error | null) => void
    ): void;
    final?(this: Writable, callback: (error?: Error | null) => void): void;
}`);
common.debug = true;
testTypescript(`
while (++i < 2) {}
a ? function () {} : function () {}
declare module 'buffer' {}
a <= 1;
`)

var testPress = function (text, expect) {
    var code = scanner2(text);
    code.press(false);
    assert(code.toString(), expect);
};
testPress(`if(){}\r\nelse {}`, `if(){}else{}`)
testPress(`if(a)a={}\r\nelse{}`, `if(a)a={};else{}`)
testPress(`if()a=function(){}\r\nelse {}`, `if()a=function(){};else{}`)
testPress(`if()function a(){}\r\nelse {}`, `if()function a(){}else{}`)

var testStar = function (text, envs) {
    var code = scanner2(text);
    return assert(code.envs, envs);
};
testStar(`var a=class {a=1\r\nasync * a(){
    var names=[];
    for(var n of names) {
        yield n;
    }
}}`, {});