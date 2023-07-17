/**
 * ie5-7专享，不兼容多选项卡的浏览器
 */
var session_storage_prefix = "_zimoli_session_prefix";
var _sessionStorage = {};
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
        if (_sessionStorage.hasOwnProperty(k)) {
            var key = session_storage_prefix + k;
            localStorage.setItem(key, _sessionStorage[key]);
        }
    }
};
try { var sessionStorage = window.sessionStorage } catch { }
if (!sessionStorage) sessionStorage = {
    length: 0,
    removeItem: function (key) {
        if (_sessionStorage.hasOwnProperty(key))
            sessionStorage.length--;
        delete _sessionStorage[key];
    },
    setItem: function (key, data) {
        if (!_sessionStorage.hasOwnProperty(key))
            sessionStorage.length++;
        _sessionStorage[key] = Object.prototype.toString.call(data);
    },
    getItem: function (key) {
        return _sessionStorage[key];
    },
    clear: function () {
        _sessionStorage = {};
    }
};
if (!document.cookie) {
    clear();
} else {
    read();
}

window.onbeforeunload = save;