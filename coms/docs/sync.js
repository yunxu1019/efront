var sync = function (method, url) {
    var xhr = new XMLHttpRequest;
    xhr.open(method, url, false);
    xhr.send("efront");
    return xhr.responseText;
};