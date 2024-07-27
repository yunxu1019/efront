var global1 = typeof globalThis !== 'undefined' ? globalThis : typeof global !== "undefined" ? global : {};
var extendIfNeeded = require("../basic/extendIfNeeded");
if (global1.window) {
    module.exports = global1.window;
}
else {
    var Window = function () {
    };
    var window = new Window;
    [
        'Date', 'Promise', 'Function',
        'RegExp', 'Object', 'String',
        'Array', 'Number', 'Boolean',
        'Error', 'TypeError', 'Uint8Array',
        'Uint16Array', 'Uint32Array', 'Uint8ClampedArray',
        'ArrayBuffer', 'Int8Array', 'Int16Array',
        'Int32Array', 'Float32Array', 'Float64Array',
        'Map', 'Set', 'Proxy',
        'WeakMap', 'Reflect', 'console',
        'Math', 'JSON', 'NaN',
        'Infinity', 'isNaN', 'isFinite',
        'parseInt', 'parseFloat', 'decodeURI',
        'encodeURI', 'decodeURIComponent', 'encodeURIComponent',
        'document', 'navigator', 'process',
        'BigInt64Array', 'Buffer', 'Intl',
        'BigInt', 'Symbol', 'SharedArrayBuffer',
        'escape', 'unescape', 'clearImmediate',
        'setImmediate', 'clearInterval', 'clearTimeout',
        'setInterval', 'setTimeout', 'queueMicrotask',
        'structuredClone', 'atob', 'btoa',
        'performance', 'fetch', 'crypto'
    ].forEach(k => {
        if (k in global1) window[k] = global1[k];
    });
    window.globalThis = window.global = window.top = window.window = window;
    module.exports = window;
}
