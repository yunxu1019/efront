var isIE = !!document.all,
    localStorage;
var globalStorage=this.globalStorage;

if (isIE) {
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
} else if (globalStorage) {
    localStorage = globalStorage[location.hostname];
}
