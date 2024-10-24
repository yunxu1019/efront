if (this.XMLHttpRequest) return this.XMLHttpRequest;
if (this.ActiveXObject) return this.ActiveXObject.bind(null, 'Microsoft.XMLHTTP');
if (!this.fetch) return;
var window = this;
return class XMLHttpRequest {
    onload = null;
    onerror = null;
    onreadystatechange = null;
    readyState = 0;
    fetch = window.fetch;
    open(method, url) {
        this.readyState = 1;
        this.method = method;
        this.url = url;
    }
    send(data) {
        this.fetch(this.url, { method: this.method, headers: { referer: document.location.href.replace(/^#[\s\S]*$/g, '') } }).then(async d => {
            this.fetched = d;
            this.readyState = 4;
            this.status = d.status;
            this.responseText = await d.text();
            if (this.onreadystatechange) this.onreadystatechange({ target: this });
            if (this.onload) this.onload({ target: this });
        }, e => {
            this.readyState = 4;
            if (this.onreadystatechange) this.onreadystatechange({ target: this });
            if (this.onerror) this.onerror({ target: this });
        });
    }
}