return globalThis.localStorage || {
    getItem() { },
    setItem() { },
    removeItem() { },
}