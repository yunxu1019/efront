var sync = function (method, url) {
    var xhr = new XHR;
    xhr.open(method, url, false);
    xhr.send("efront");
    return xhr.responseText;
};