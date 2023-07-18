/**
 * ie5-7专享，不兼容多选项卡的浏览器
 */
var session_storage_prefix = "_zimoli_session_prefix";
var _sessionStorage = Object.create(null);
var clear = function () {
    for (var cx = 0, dx = localStorage.length; cx < dx; cx++) {
        var key = localStorage.key(cx);
        if (key.slice(0, session_storage_prefix.length) === session_storage_prefix)
            localStorage.removeItem(key);
    }
    document.cookie = Date.now();
};
var read = function () {
    for (var cx = 0, dx = localStorage.length; cx < dx; cx++) {
        var key = localStorage.key(cx);
        if (key.slice(0, session_storage_prefix.length) === session_storage_prefix)
            sessionStorage.setItem(key, localStorage.getItem(key));
    }
};
var save = function () {
    clear();
    for (var k in _sessionStorage) {
        var key = session_storage_prefix + k;
        localStorage.setItem(key, _sessionStorage[key]);
    }
};
try { var sessionStorage = window.sessionStorage } catch { }
var _sessionStorageKeys = [];
if (!sessionStorage) sessionStorage = new class Storage {
    get length() {
        return _sessionStorageKeys.length;
    };
    removeItem(key) {
        if (key in _sessionStorage) removeFromList(_sessionStorageKeys, key);
        delete this[key];
        delete _sessionStorage[key];
    }
    setItem(key, data) {
        key = String(key);
        data = String(data);
        if (!(key in _sessionStorage)) {
            _sessionStorageKeys.push(key);
            Object.defineProperty(this, key, {
                get() {
                    return _sessionStorage[key];
                }
            })
        }
        _sessionStorage[key] = data;
    }
    getItem(key) {
        return key in _sessionStorage ? _sessionStorage[key] : null;
    }
    key(i) {
        return _sessionStorageKeys[i];
    }
    clear() {
        _sessionStorage = {};
    }
};
if (!document.cookie) {
    clear();
} else {
    read();
}
on("beforeunload")(window, save);