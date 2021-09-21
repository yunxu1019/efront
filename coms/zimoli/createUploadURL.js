var URL = window.URL, Blob = window.Blob;
function main(basepath) {
    if (!URL || !Blob) {
        alert("无法在当前浏览器操作!");
        return;
    }
    var url = URL.createObjectURL(new Blob);
    URL.revokeObjectURL(url);
    basepath = String(basepath || '').replace(/\/+$/, '') + "/";
    return basepath + url.replace(/^[\s\S]*?([\w\-]+)$/, "$1");
}