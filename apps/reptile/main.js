// 本程程序在efront环境下使用
-function (window) {
    var base = `http://localhost/`;
    window.efrontURI = base + "reptile/";
    window.startPath = "/ixigua";
    var load = function (uri, cb) {
        var xhr = new (window.XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (cb instanceof Function) cb(xhr.responseText);
            }
        };
        xhr.open('POST', base + uri);
        xhr.send("step into my sight..");

    };
    load('comm/main', function (responseText) {
        new Function(responseText).call(window);
    });
    load('reload', function () {
        var script = document.createElement("script"); script.src = "http://localhost/reptile/"; document.head.appendChild(script)
    });
}(this);
