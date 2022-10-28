var colors = require("../reptile/colors");
var globals = module.exports = Object.create(null);
var setGlobal = function (e, v) {
    if (typeof e === 'string') e = e.split(/[\s,]+/);
    else if (!Array.isArray(e)) e = Object.keys(e);
    else if (e[0] instanceof Function) e = e.map(e => e.name);
    for (var e of e) globals[e] = v;
}
var values = [
    undefined, null, false, true,
    Infinity,
    NaN
];
setGlobal(values, colors.FgGray);
var constructors = [
    Boolean,
    Number,
    String,
    Function,
    Object,
    Array,
    Date,
    RegExp,
    Error,
    Promise,
];
setGlobal(constructors, colors.FgGray);
var objects = {
    Math,
    JSON,
    console,
    BigInt: null,
    performance: null,
    Intl: null,
    Symbol: null,
    globalThis: null,
    URL: null,
    TypeError: null,
    RangeError: null,
    ArrayBuffer: null,
    DataView: null,
    Uint8Array: null, Uint16Array: null, Uint32Array: null, BigUint64Array: null,
    Int8Array: null, Int16Array: null, Int32Array: null, BigInt64Array: null,
    Float8Array: null, Float16Array: null, Float32Array: null, Float64Array: null,
    Map: null,
    Set: null,
    Proxy: null,
    Reflect: null,
    WeakMap: null,
    queueMicrotask: null,
    atob: null, btoa: null,
};
setGlobal(objects, colors.FgGray);
var functions = [
    eval,
    isFinite, isNaN,
    parseInt, parseFloat,
    setTimeout, setInterval, clearTimeout, clearInterval,
    encodeURI, encodeURIComponent, decodeURI, decodeURIComponent,
    escape, unescape,
];
setGlobal(functions, colors.FgGray);
var nodeOnlys = {
    __dirname: null,
    __filename: null,
    require: null,
    module: null,
    exports: null,
    global: null,
    Buffer: null,
    setImmediate: null,
    clearImmediate: null
};
setGlobal(nodeOnlys, colors.FgGreen);
var nodeRequires = `os,fs,vm,url,readline,net,http,https,http2,zlib,util,buffer,path,cluster,crypto,process`;
setGlobal(nodeRequires, colors.FgGreen);
setGlobal("electron", colors.FgGreen);
var chromeOnlys = `WakeLock,XMLHttpRequest,Image,PerformanceObserver,
window,self,
document,name,location,customElements,history,
locationbar,menubar,personalbar,scrollbars,statusbar,toolbar,
status,closed,frames,length,top,opener,parent,frameElement,
navigator,origin,external,screen,
innerWidth,innerHeight,
scrollX,pageXOffset,scrollY,pageYOffset,visualViewport,
screenX,screenY,
outerWidth,outerHeight,
devicePixelRatio,clientInformation,
screenLeft,screenTop,defaultStatus,defaultstatus,styleMedia,
isSecureContext,trustedTypes,
indexedDB,sessionStorage,localStorage,
crossOriginIsolated,scheduler,alert,blur,
cancelAnimationFrame,cancelIdleCallback,
captureEvents,close,confirm,createImageBitmap,
fetch,find,focus,
getComputedStyle,getSelection,matchMedia,
moveBy,moveTo,open,
postMessage,print,prompt,
releaseEvents,reportError,
requestAnimationFrame,requestIdleCallback,
resizeBy,resizeTo,scroll,scrollBy,scrollTo,
stop,structuredClone,
crypto,
chrome,launchQueue,originAgentCluster,
navigation,speechSynthesis,openDatabase,
DOMParser,
showOpenFilePicker,showSaveFilePicker,
ClipboardItem,
showDirectoryPicker`;
setGlobal(chromeOnlys, colors.FgYellow);
var efrontBuiltins = `modules,isProduction,start_time,
MOVELOCK_DELTA,SAFE_CIRCLE_DEPTH,
init,versionTree,responseTree,loadingTree,
loadedModules,load,devicePixelRatio,
renderPixelRatio,efrontsign,put
efrontPath,
px2offset,offset2px,pt2offset,offset2pt`;
setGlobal(efrontBuiltins, colors.FgCyan2);