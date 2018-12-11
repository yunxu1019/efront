var qc_loader = script("http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js");
appendChild(document.body, qc_loader);
qc_loader.async = true;
qc_loader.setAttribute("data-appid", "1107914671");
qc_loader.setAttribute("data-redirecturi", location.href.replace(/[^\/]+$/, "zimoli/login/qq_callback.html"));
qc_loader.onload = function () {
    remove(qc_loader);
};

function main() {
    window.QC && window.QC.Login.showPopup();
    var interval = setInterval(function () {
        if (/#.*?qq$/.test(location.href)) {
            history.back();
        } else {
            clearInterval(interval);
        }
    }, 20);
    return div();
}