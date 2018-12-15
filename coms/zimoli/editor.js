var _editor = div();
var template = `
<div class=input></div>
<textarea class=insert></textarea>
<div class=flager tabindex=0></div>
<style>
body{
    background-color:black!important;
    padding-bottom:0!important;
    border-bottom:0!important;
    margin-bottom:0!important;
}
</style>
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
alert(navigator.userAgent);
var browserClass = /(QQ|Safari|CriOS)/i.exec(navigator.userAgent);
if (browserClass) {
    browserClass = browserClass[1].toLowerCase();
} else {
    browserClass = "";
}
var isSafari = /safari/i.test(browserClass);
function editor() {
    var edit = createElement(_editor);
    browserClass && addClass(edit, browserClass);
    var focusClass = "focus";
    edit.innerHTML = template;
    var [input, insert, flager] = edit.children;
    onfocus(flager, function () {
        insert.focus();
    });
    var timer = 0;
    onfocus(insert, function () {
        clearTimeout(timer);
        isSafari && flager.scrollIntoView();
        timer = setTimeout(function () {
            !isSafari && flager.scrollIntoView();
            timer = setTimeout(function () {
                addClass(edit, focusClass);
            }, 10);
        }, 0);
    });
    onblur(insert, function () {
        clearTimeout(timer);
        removeClass(edit, focusClass);
        flager.scrollIntoView();
    });
    edit.bold = bold;
    edit.italic = italic;
    return edit;
}