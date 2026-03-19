var ClipboardItem = window.ClipboardItem;

async function copyToClipboard(text, mime = 'text/plain') {
    mime = mime.toLowerCase();
    if (ClipboardItem && ClipboardItem.supports(mime)) {
        const clipboardItem = new ClipboardItem({ [mime]: text });
        try {
            await navigator.clipboard.write([clipboardItem]);
            alert("已复制");
            return;
        } catch (e) { console.log(e) };
    }
    var span = document.createElement('span');
    span.setAttribute('user-select', 'all');
    setOpacity(span, 0);
    css(span, "position:absolute;top:-1000000px;left:-1000000px;")
    switch (mime) {
        case "text/plain": span.innerText = text; break;
        case "text/html": span.innerHTML = text; removeUnsafeTags(span); break;
        default:
            if (/^image\//i.test(mime)) {
                span.innerHTML = `<img src=${strings.encode(text)}/>`;
            }
            else {
                return alert(i18n`复制失败!`, 'error');
            }

    }
    document.body.appendChild(span);
    var selection = document.getSelection();
    var ranges = [];
    for (var cx = 0, dx = selection.rangeCount; cx < dx; cx++) {
        var range = selection.getRangeAt(cx);
        ranges.push(range);
    }
    selection.removeAllRanges();
    document.getSelection().setBaseAndExtent(span, 0, span, 1);
    var res = document.execCommand('copy');
    selection.removeAllRanges();
    for (var range of ranges) {
        selection.addRange(range);
    }
    remove(span);
    if (res) alert("已复制");

}
