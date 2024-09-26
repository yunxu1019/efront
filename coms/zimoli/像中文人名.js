var reg = new RegExp(`^(${random$姓.join('|')})(${/\S{1,3}/.source})$`);
return function (text) {
    if (isEmpty(text)) return false;
    text = String(text).split(/[\,、，]/);
    for (var t of text) {
        if (t && reg.test(t)) {
            console.log(t, text)
            return true;
        }
    }
    return false;
}