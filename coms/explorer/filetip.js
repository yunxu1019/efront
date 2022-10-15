var prevents = "\\/:*?\"<>|";
var preventreg = new RegExp(`[${prevents.replace(/./g, '\\$&')}]`);
var perventtxt = prevents.split("").map(a => `<b>${a}</b>`).join("");
function filetip(text) {
    if (preventreg.test(text)) {
        var pre = document.createElement('pre');
        pre.innerHTML = `不能包含下列字符：\r\n${perventtxt}`;
        return pre;
    }
}