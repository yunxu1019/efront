// 事件抓取工具
var knownTree = {
    // ontransitionend: 0,
    // ondevicemotion: 1,
    // onpointerout: 2,
    // onpointerover: 3,
    // ondeviceorientationabsolute: 4,
    // ondeviceorientation: 5,
    // onmousemove: 6,
    // onpointermove: 7,
    // onmouseout: 7,
    // onmouseover: 7,
    // onpointerdown: 3,
    // onmouseleave: 7,
    // onpointerleave: 7,
    // onmousedown: 3,
    // onmouseup: 3,
    // onpointerup: 3,
    // onclick: 3,
    // ondblclick: 3,
    // onscroll: 3,
}
var texter = div();
confirm(texter);
var hook = function (window, name) {
    var keys = [];
    for (var k in window) {
        if (/^on/.test(k)) keys.push(k)
    };

    keys.map(function (k) {
        var key = name + k;
        if (/move|mouse|click|transition/.test(k)) return;
        try {
            on(k.replace(/^on/, ""))(window, function () {
                var count = knownTree[key];
                if (!count) {
                    count = 0
                };
                count++;
                delete knownTree[key];
                knownTree[key] = count;
                var keys = Object.keys(knownTree)
                texter.innerHTML = keys.slice(keys.length - 10).sort(function (a, b) {
                    return knownTree[a] - knownTree[b];
                }).map(k => k + "-" + knownTree[k]).join(",<br/>");
            });
        } catch (e) {
            alert.error(key);
        }
    });
}
function hookevent(element, name) {
    hook(element, name);
    for (var k in window) {
        if (window[k] instanceof Object) {
            hook(document, name + "_" + k + ': ');
        }

    }
}
function hookevent_test(element) {
    hook(element, "element: ");
    hook(window, "window: ");
}