titlebar("请求计时工具", [], false);
var _input = input();
css(_input, "width:100%;height:50px;margin:10px 0;");
var request_time_count = _input.cloneNode();
request_time_count.setAttribute("placeholder", "输入请求次数");
var request_time_url = _input.cloneNode();
request_time_url.setAttribute("placeholder", "输入url");
var request_time_label = div();
var request_time_button = button("请求");
var request_stop_button = button("停止");
css(request_time_button, "background-color:#f34;width:100%;height:50px;margin:10px 0;color:#fff;")
css(request_stop_button, "background-color:#999;color:#fff;height:50px;width:100%;");
var saveState = function () {
    state({ count: request_time_count.value, url: request_time_url.value });
};
var lastState = state();
if (lastState) {
    if (lastState.count) request_time_count.value = lastState.count;
    if (lastState.url) request_time_url.value = lastState.url;
}
oninput(request_time_count, saveState);
oninput(request_time_url, saveState);
var stoped = false;
var request = function () {
    var url = request_time_url.value.trim();
    var count = +request_time_count.value;
    var _count = 0, startTime = new Date;
    stoped = false;
    var request = function () {
        if (count <= _count || stoped) return;
        new Promise(function (ok, oh) {
            var xhr = new XMLHttpRequest;
            xhr.open("get", url);
            xhr.onload = e => ok();
            xhr.onerror = e => oh();
            xhr.onabort = e => oh();
            xhr.send();
            _count++;
            request_time_label.innerText = `count:${_count},time:${new Date - startTime}`;
        }).then(request).catch(request);
    };
    return request();
}
onclick(request_time_button, request)
onclick(request_stop_button, function () {
    stoped = true;
});
var page = div();
css(page, "padding-top:50px;");
appendChild(page, request_time_count, request_time_label, request_time_url, request_time_button, request_stop_button);
function main() {
    return page;
}