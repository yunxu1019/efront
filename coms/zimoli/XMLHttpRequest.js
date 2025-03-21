if (this.XMLHttpRequest && this.XMLHttpRequest.prototype && "onreadystatechange" in this.XMLHttpRequest.prototype) return this.XMLHttpRequest;
if (this.ActiveXObject) return this.ActiveXObject.bind(null, 'Microsoft.XMLHTTP');
if (!this.fetch) return;
var window = this;
function XMLHttpRequest() {
    this.onload = null;
    this.onerror = null;
    this.onreadystatechange = null;
    this.readyState = 0;
    this.fetch = window.fetch;
}
XMLHttpRequest.prototype.open = function (method, url) {
    this.readyState = 1;
    if (/^(options|get|post|put|delete)$/i.test(method)) method = method.toUpperCase();
    this.method = method;
    this.url = url;
};
XMLHttpRequest.prototype.send = function (data) {
    var params = { method: this.method, headers: { referer: document.location.href.replace(/^#[\s\S]*$/g, '') } };
    if (data != null) params.body = data;
    var fetched = this.fetch(this.url, params);
    var xhr = this;
    fetched.then(function (d) {
        xhr.fetched = d;
        xhr.readyState = 4;
        xhr.status = d.status;
        return d.text();
    }).then(function (d) {
        xhr.responseText = d;
        if (xhr.onreadystatechange) xhr.onreadystatechange({ target: xhr });
        if (xhr.onload) xhr.onload({ target: xhr });
    })["catch"](function (e) {
        xhr.readyState = 4;
        if (xhr.onreadystatechange) xhr.onreadystatechange({ target: xhr });
        if (xhr.onerror) xhr.onerror({ target: xhr });
    });
}
return XMLHttpRequest;