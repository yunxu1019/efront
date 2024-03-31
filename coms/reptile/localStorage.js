return globalThis.localStorage || {
    getItem() { },
    setItem() { }
}