if (this.XMLHttpRequest) return this.XMLHttpRequest;
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
    this.method = method;
    this.url = url;
};
XMLHttpRequest.prototype.send = function (data) {
    var params = { method: this.method, headers: { referer: document.location.href.replace(/^#[\s\S]*$/g, '') } };
    if (data != null) params.body = data;
    this.fetch(this.url, params).then(function (d) {
        this.fetched = d;
        this.readyState = 4;
        this.status = d.status;
        return d.text();
    }).then(function (d) {
        this.responseText = d;
        if (this.onreadystatechange) this.onreadystatechange({ target: this });
        if (this.onload) this.onload({ target: this });
    }, function (e) {
        this.readyState = 4;
        if (this.onreadystatechange) this.onreadystatechange({ target: this });
        if (this.onerror) this.onerror({ target: this });
    });
}