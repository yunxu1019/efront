/**
 * 请求api的逻辑
 */
function api(url,params) {
    var xhr = new(XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
    xhr.open("POST", url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var status = xhr.status;
            if (status === 0 || status === 200 || status === 304) {
                responseTree[url] = xhr.responseText;
                flush(url);
            } else if (count > 150) {
                throw new Error("加载" + url + "出错！");
            } else {
                count = retry(url, count || 0);
            }
        }
    };
    xhr.send("look inside the light" + Math.random());
    return xhr;

}