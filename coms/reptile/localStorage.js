try {
    var localStorage = this && this.localStorage;
} catch { }
return localStorage || {
    getItem() { },
    setItem() { },
    removeItem() { },
}