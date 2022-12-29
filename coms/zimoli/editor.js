var _editor = document.createElement("div");
var template = `
<div class=input></div>
<textarea class=insert></textarea>
<div class=flager tabindex=0><div></div></div>
`;
/**
 * 加粗
 */
function bold() {
}
/**
 * 斜体
 */
function italic() {
}
/**
 * 居中
 */
var browserClass = /(QQ|Safari|CriOS|Chrome)/i.exec(navigator.userAgent);
if (browserClass) {
    browserClass = browserClass[1].toLowerCase() + " " + String(navigator.platform).replace(/[^\w]/g, a => "-" + a.charCodeAt(0).toString(36));
} else {
    browserClass = "";
}
var isIOS = /iPhone|iPad|iOS|iPod/.test(browserClass);
var isSafari = isIOS && /safari/i.test(browserClass);
var getScrollTops = function (element) {
    var result = [];
    while (element) {
        result.push(element.scrollTop);
        element = element.offsetParent;
    }
    return result;
}

function editor() {
    var edit = _editor.cloneNode();
    browserClass && addClass(edit, browserClass);
    var focusClass = "focus";
    edit.innerHTML = template;
    var [input, insert, flager] = edit.children;
    var inner_flager = flager.children[0];
    onfocus(flager, function () {
        insert.focus();
    });
    var timer = 0;
    var reshaper = function () {
        if (!isSafari || document.activeElement !== insert) return;
        timer = setTimeout(reshaper, 500);

        once("scroll")(window, function () {
            alert('reshape' + [flager.scrollTop, window.innerHeight]);
            flager.scrollTop = 0;
        });
        flager.scrollTop = 0;
        // inner_flager.scrollIntoView();
        ;
    };

    onfocus(insert, function () {
        clearTimeout(timer);
        isSafari && inner_flager.scrollIntoView();
        timer = setTimeout(function () {
            !isSafari && inner_flager.scrollIntoView();
            timer = setTimeout(function () {
                addClass(edit, focusClass);
                reshaper();
            }, 10);
        }, 0);
    });
    var build = lazy(function () {
        input.innerText = insert.value;
    });
    on("input")(insert, build);
    on("keypress")(insert, build);
    onblur(insert, function () {
        clearTimeout(timer);
        removeClass(edit, focusClass);
        flager.scrollIntoView(false);
    });
    edit.bold = bold;
    edit.italic = italic;
    return edit;
}