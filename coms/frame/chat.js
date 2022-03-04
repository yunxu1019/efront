
function msg(elem) {
    care(elem, function (data) {
        if (!data) return;
        var m = JSAM.parse(data);
        if (m) switch (m.type) {
            case "html":
                elem.innerHTML = m.content;
                break;
            default:
                elem.innerText = data;
        }
    })
}
function chat(title = '会话窗口') {
    var page = view();
    page.innerHTML = template;
    drag.on(page.firstChild, page);
    resize.on(page);
    renderWithDefaults(page, {
        chat: list,
        title,
        grid,
        msglist: [],
        text: '',
        localid: Math.random(),
        msg,
        send() {
            if (!this.text) return;
            cast(page, "send", JSAM.stringify({
                type: 'html',
                sender: this.localid,
                content: this.text,
            }));
            this.text = '';
        }
    });
    return page;
}