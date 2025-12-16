var URL = this.URL;
var WebAssembly = this.WebAssembly;
var Module = typeof Module != "undefined" ? Module : {};
var quit_ = (status, toThrow) => { throw toThrow };
var scriptDirectory = "";
function locateFile(path) {
    if (Module["locateFile"]) { return Module["locateFile"](path, scriptDirectory) }
    return scriptDirectory + path
}
var readAsync, readBinary;
var fs = require("fs");
scriptDirectory = __dirname + "/";
readBinary = filename => {
    filename = isFileURI(filename) ? new URL(filename) : filename;
    var ret = fs.readFileSync(filename);
    return ret
};
readAsync = async (filename, binary = true) => {
    filename = isFileURI(filename) ? new URL(filename) : filename;
    var ret = fs.readFileSync(filename, binary ? undefined : "utf8");
    return ret
};
if (typeof module != "undefined") { module["exports"] = Module }
quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow
}
var err = console.error.bind(console);
var wasmBinary;
var ABORT = false;
var isFileURI = filename => filename.startsWith("file://");
var wasmMemory;
var HEAP8, HEAPU8;
function updateMemoryViews() {
    var b = wasmMemory.buffer;
    HEAP8 = new Int8Array(b);
    HEAPU8 = new Uint8Array(b);
}
function preRun() {
    if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) { addOnPreRun(Module["preRun"].shift()) }
    }
    callRuntimeCallbacks(onPreRuns)
}
function initRuntime() {
    wasmExports["c"]()
}
function postRun() {
    if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) { addOnPostRun(Module["postRun"].shift()) }
    }
    callRuntimeCallbacks(onPostRuns)
}
var runDependencies = 0;
var dependenciesFulfilled = null;
function addRunDependency(id) {
    runDependencies++;
    Module["monitorRunDependencies"]?.(runDependencies)
}
function removeRunDependency(id) {
    runDependencies--;
    Module["monitorRunDependencies"]?.(runDependencies);
    if (runDependencies == 0) {
        if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback()
        }
    }
}
function abort(what) {
    Module["onAbort"]?.(what);
    what = "Aborted(" + what + ")";
    err(what);
    ABORT = true;
    what += ". Build with -sASSERTIONS for more info.";
    var e = new WebAssembly.RuntimeError(what);
    throw e
}
var wasmBinaryFile;
function findWasmBinary() { return locateFile("lzma.wasm") }
function getBinarySync(file) {
    if (file == wasmBinaryFile && wasmBinary) { return new Uint8Array(wasmBinary) }
    if (readBinary) { return readBinary(file) }
    throw "both async and sync fetching of the wasm failed"
}
async function getWasmBinary(binaryFile) {
    if (!wasmBinary) {
        try {
            var response = await readAsync(binaryFile);
            return new Uint8Array(response)
        } catch { }
    }
    return getBinarySync(binaryFile)
}
async function instantiateArrayBuffer(binaryFile, imports) {
    try {
        var binary = await getWasmBinary(binaryFile);
        var instance = await WebAssembly.instantiate(binary, imports);
        return instance
    } catch (reason) {
        err(`failed to asynchronously prepare wasm: ${reason}`);
        abort(reason)
    }
}
async function instantiateAsync(binary, binaryFile, imports) {
    return instantiateArrayBuffer(binaryFile, imports)
}
function getWasmImports() {
    return {
        a: wasmImports
    }
}
async function createWasm() {
    function receiveInstance(instance, module) {
        wasmExports = instance.exports;
        wasmMemory = wasmExports["b"];
        updateMemoryViews();
        assignWasmExports(wasmExports);
        removeRunDependency("wasm-instantiate");
        return wasmExports
    }
    addRunDependency("wasm-instantiate");
    function receiveInstantiationResult(result) { return receiveInstance(result["instance"]) }
    var info = getWasmImports();
    if (Module["instantiateWasm"]) { return new Promise((resolve, reject) => { Module["instantiateWasm"](info, (mod, inst) => { resolve(receiveInstance(mod, inst)) }) }) }
    wasmBinaryFile ??= findWasmBinary();
    var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
    var exports = receiveInstantiationResult(result);
    return exports
}
var callRuntimeCallbacks = callbacks => { while (callbacks.length > 0) { callbacks.shift()(Module) } };
var onPostRuns = [];
var addOnPostRun = cb => onPostRuns.push(cb);
var onPreRuns = [];
var addOnPreRun = cb => onPreRuns.push(cb);
var stackRestore = val => __emscripten_stack_restore(val);
var stackSave = () => _emscripten_stack_get_current();
var getHeapMax = () => 2147483648;
var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
var growMemory = size => {
    var oldHeapSize = wasmMemory.buffer.byteLength;
    var pages = (size - oldHeapSize + 65535) / 65536 | 0;
    try {
        wasmMemory.grow(pages);
        updateMemoryViews();
        return 1
    }
    catch (e) { }
};
var _emscripten_resize_heap = requestedSize => {
    var oldSize = HEAPU8.length;
    requestedSize >>>= 0;
    var maxHeapSize = getHeapMax();
    if (requestedSize > maxHeapSize) { return false }
    for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
        var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
        var replacement = growMemory(newSize);
        if (replacement) { return true }
    }
    return false
};

var writeArrayToMemory = (array, buffer) => { HEAP8.set(array, buffer) };
var stackAlloc = sz => __emscripten_stack_alloc(sz);
var toC = {
    array: arr => {
        if (!arr) return arr;
        if (arr.buffer === HEAP8.buffer) return arr.byteOffset;
        var ret = stackAlloc(arr.length);
        writeArrayToMemory(arr, ret);
        return ret
    }
};
var setUint32LE = function (a, v) {
    a[0] = v & 0xff;
    a[1] = v >>> 8 & 0xff
    a[2] = v >>> 16 & 0xff
    a[3] = v >>> 24 & 0xff
};
var getUint32LE = function (a) {
    return (a[0] | a[1] << 8 | a[2] << 16 | a[3] << 24) >>> 0;
};

var fcall = function (func, input, outLength) {
    var cArgs = [];
    var stack = stackSave();
    var argTypes = ["array", "number", "array", "number"];
    var output = outLength > 0 ? alloc(outLength) : null;
    var outOffset = output?.byteOffset;
    var args = [output, outLength, input, input.length];
    if (args) {
        for (var i = 0; i < args.length; i++) {
            var converter = toC[argTypes[i]];
            if (converter) {
                cArgs[i] = converter(args[i])
            }
            else { cArgs[i] = args[i] }
        }
    }
    function onDone(ret) {
        if (ret > 0) {
            var result = new Uint8Array(ret + 4);
            setUint32LE(result, input.length);
            result.set(HEAP8.subarray(outOffset, outOffset + ret), 4);
        }
        if (ret < 0) throw console.log(ret), new Error("编码错误！");
        return result;
    }
    var ret = func(...cArgs);
    if (outLength > 0) ret = onDone(ret);
    stackRestore(stack);
    return ret;
}

Module.decompress = function (input) {
    var size = getUint32LE(input);
    var output = fcall(decompress, input.subarray(4, input.length), size);
    return output.subarray(4, output.length);
};
Module.compress = function (input) {
    return fcall(compress, input, input.length + (input.length >> 1) + 200);
};

var alloc = function (size) {
    var offset = stackAlloc(size);
    if (offset < 0) throw new Error('申请内存失败');
    var res = new Uint8Array(HEAP8.buffer, offset, size);
    return res;
}
var __emscripten_stack_restore, __emscripten_stack_alloc, _emscripten_stack_get_current;
var compress, decompress;
function assignWasmExports(wasmExports) {
    compress = wasmExports["d"];
    decompress = wasmExports["e"];
    __emscripten_stack_restore = wasmExports["f"];
    __emscripten_stack_alloc = wasmExports["g"];
    _emscripten_stack_get_current = wasmExports["h"]
}
var wasmImports = {
    a: _emscripten_resize_heap
};
var wasmExports;
createWasm();
function run() {
    if (runDependencies > 0) {
        dependenciesFulfilled = run;
        return
    }
    preRun();
    if (runDependencies > 0) {
        dependenciesFulfilled = run;
        return
    }
    function doRun() {
        Module["calledRun"] = true;
        if (ABORT) return;
        initRuntime();
        Module["onRuntimeInitialized"]?.();
        postRun()
    }
    if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(() => {
            setTimeout(() => Module["setStatus"](""), 1);
            doRun()
        }, 1)
    }
    else { doRun() }
}
function preInit() {
    if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) { Module["preInit"].shift()() }
    }
}
preInit();
run();


