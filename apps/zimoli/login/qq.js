var qc_loader = script("http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js");
qc_loader.async = true;
qc_loader.setAttribute("data-appid", "1107914671");
qc_loader.setAttribute("data-redirecturi", location.href.replace(/[^\/]+$/,"zimoli/login/qq_callback.html"));
qc_loader.onload = function () {
    console.log("loaded", window.QC)
}
onappend(qc_loader, function () {
    console.log("append", qc_loader)
});

function main() {
    var interval=setInterval(function(){
        if(!window.QC)return;
        clearInterval(interval);
        window.QC.Login.showPopup();
        history.back();
    },20);
    return qc_loader;
}