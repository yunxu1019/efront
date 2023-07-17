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
    if (!localStorage) localStorage = {
        setItem() {
        },
        getItem() {
            return null;
        },
        removeItem() {
        }
    };
}
