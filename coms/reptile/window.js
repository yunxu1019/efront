var global1 = typeof globalThis !== 'undefined' ? globalThis : typeof global !== "undefined" ? global : {};
var extendIfNeeded = require("../basic/extendIfNeeded");
if (global1.window) {
    module.exports = global1.window;
}
else {
    var Window = function () {
    };
    var window = new Window;
    Object.assign(window, {
        Date,
        Promise,
        Function,
        RegExp,
        Object,
        String,
        Array,
        Number,
        Boolean,
        Error,
        TypeError,
        Uint8Array,
        Uint16Array,
        Uint32Array,
        Uint8ClampedArray,
        ArrayBuffer,
        Int8Array,
        Int16Array,
        Int32Array,
        Float32Array,
        Float64Array,
        Map,
        Set,
        Proxy,
        WeakMap,
        Reflect,
        console,
        Math,
        JSON,
        NaN,
        Infinity,
        isNaN,
        isFinite,
        parseInt,
        parseFloat,
        decodeURI,
        encodeURI,
        decodeURIComponent,
        encodeURIComponent,
        document: global1.document,
        navigator: global1.navigator,
        process: global1.process,
        BigInt64Array: global1.BigInt64Array,
        Buffer: global1.Buffer,
        Intl: global1.Intl,
        BigInt: global1.BigInt,
        Symbol: global1.Symbol,
        SharedArrayBuffer: global1.SharedArrayBuffer,
        escape: global1.escape,
        unescape: global1.unescape,
    });
    window.globalThis = window.global = window.top = window.window = window;
    extendIfNeeded(window, global1);
    module.exports = window;
}
