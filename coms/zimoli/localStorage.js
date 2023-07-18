var isIEValid = /MSIE\s+[2-9]/.test(navigator.userAgent),
    localStorage;//IE8以上支持localStorage,IE11以上不支持documentElement.save;
var globalStorage = this.globalStorage;
if (globalStorage) {
    localStorage = globalStorage[location.hostname];
} else if (isIEValid) {
    var documentElement = document.documentElement;
    localStorage = {
        setItem: function (key, value) {
            documentElement.setAttribute('value', value);
            documentElement.save(key);
        },
        getItem: function (key) {
            documentElement.load(key);
            return documentElement.getAttribute('value');
        },
        removeItem: function (key) {
            documentElement.removeAttribute('value');
            documentElement.save(key);
        }
    };
    documentElement.addBehavior('#default#userdata');
} else {
    try {

        localStorage = window.localStorage
    }
    catch { }
    var _localStorageKeys = [];
    var _values = Object.create(null);

    if (!localStorage) localStorage = new class Storage {
        setItem(key, value) {
            value = String(value);
            key = String(key);
            if (!(key in _values)) {
                if (!(key in this)) Object.defineProperty(this, key, {
                    get() {
                        return _values[key];
                    }, configurable: true
                });
                _localStorageKeys.push(key);
            }
            _values[key] = value;
        }
        getItem(key) {
            return key in _values ? _values[key] : null;
        }
        clear() {
            _localStorageKeys.forEach(k => {
                delete this[k];
                delete _values[k];
            });
            _localStorageKeys.splice(0, _localStorageKeys.length);
        }
        key(i) {
            return _localStorageKeys[i] || null;
        }
        get length() {
            return _localStorageKeys.length;
        }
        removeItem(key) {
            if (delete _values[key]) {
                delete this[key];
                removeFromList(_localStorageKeys, key);
            }
        }
    };
}
