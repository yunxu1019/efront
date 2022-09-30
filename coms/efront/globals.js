var colors = require("./colors");
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
    BigInt,
    Math,
    performance,
    console,
    Intl,
    JSON,
    Symbol,
    globalThis,
    URL,
    TypeError,
    RangeError,
    ArrayBuffer,
    Uint8Array, Uint16Array, Uint32Array,
    Int8Array, Int16Array, Int32Array,
    Map,
    Set,
    Proxy,
    Reflect,
    WeakMap,
};
setGlobal(objects, colors.FgGray);
var functions = [
    eval,
    isFinite, isNaN,
    parseInt, parseFloat,
    setTimeout, setInterval, clearTimeout, clearInterval,
    encodeURI, encodeURIComponent, decodeURI, decodeURIComponent,
    escape, unescape,
    queueMicrotask,
    atob, btoa,
];
setGlobal(functions, colors.FgGray);
var nodeOnlys = {
    __dirname,
    __filename,
    require,
    module,
    exports,
};
setGlobal(nodeOnlys, colors.FgGreen);
var nodeRequires = `os,fs,vm,url,readline,net,http,https,http2,zlib,util,buffer,path,cluster,crypto,process,Buffer,setImmediate,clearImmediate`;
setGlobal(nodeRequires, colors.FgGreen);
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
navigation,speechSynthesis,openDatabase`;
setGlobal(chromeOnlys, colors.FgYellow);
var efrontBuiltins = `modules,isProduction,start_time,MOVELOCK_DELTA,SAFE_CIRCLE_DEPTH,init,versionTree,responseTree,loadingTree,loadedModules,load,devicePixelRatio,renderPixelRatio,efrontsign,put`;
setGlobal(efrontBuiltins, colors.FgCyan2);