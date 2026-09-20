try {
    var localStorage = (this || globalThis).localStorage;
} catch { }
return localStorage || {
    getItem() { },
    setItem() { },
    removeItem() { },
}