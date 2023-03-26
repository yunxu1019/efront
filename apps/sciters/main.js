var init_console = function () {
    init_console = function () { };
    var pad = document.createElement("console");
    css(pad, 'position:fixed;bottom:0;top:0;right:0;width:300px;overflow:auto;padding:6px 10px;background:#eee;border-top:1px solid #ccc');
    pad.style.zIndex = 999;
    var log = function (type, style) {
        return function () {
            var log = document.createElement(type);
            css(log, style);
            css(log, 'display:block');
            log.innerHTML = Array.apply(null, arguments).join(" ").replace(/</g, '&lt;').replace(/>/g, "&gt;");
            pad.appendChild(log);
        }
    };
    console.log = log("log", 'color:#333');
    console.error = log("error", 'color:#f00');
    console.info = log("info", 'color:#02f');
    console.clear = function () {
        remove(pad.children);
    };
    onclick(pad, function () {
        pad.style.transition="background-color 300ms linear"
        // pad.style.backgroundColor = "#000";
        pad.innerHTML= pad.style.getPropertyValue("transition").length;
    })
    document.body.appendChild(pad)
};
function main() {
    init_console();
    return alert_test();
}