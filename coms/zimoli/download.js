function download(dataurl, filename, mime = "text/plain") {
    var a = document.createElement("a");
    a.href = "data:" + mime + ";base64," + btoa(dataurl);
    a.target = '_blank';
    a.download = filename;
    appendChild(document.body, a);
    a.click();
    remove(a);
}