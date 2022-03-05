
function msg(elem, { m: data }, parentScopes) {
    if (!data) return;
    data = encode62.timedecode(data);
    var m = JSAM.parse(data);
    if (m.sender === parentScopes[parentScopes.length - 1].localid) {
        elem.setAttribute("self", "");
    }
    if (m) switch (m.type) {
        case "html":
            elem.innerHTML = m.content;
            break;
        default:
            elem.innerText = data;
    }
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
        remove() {
            remove(page);
        },
        resize(body) {
            var textarea = body.querySelector("[textarea]");
            var lastElementChild = textarea.lastElementChild;
            var targetHeight = Math.min(textarea.scrollHeight, body.clientHeight * .6, lastElementChild.offsetTop + lastElementChild.offsetHeight);
            if (Math.abs(targetHeight - textarea.clientHeight) < 2) return;

            body.resizeCell(textarea, 'top', textarea.clientHeight - targetHeight - 2);
        },
        send() {
            if (!this.text) return;
            var data = JSAM.stringify({
                type: 'html',
                sender: this.localid,
                content: this.text,
            });

            data = encode62.timeencode(data);
            if (this.text.length > 2000) {
                alert("信息太长，无法发送！");
                return;
            }
            cast(page, "send", data);
            this.body.lastElementChild.focus();
            this.text = '';
        }
    });
    return page;
}