var tbar = titlebar("").children[0];
var page = createVboxWithState(state);
function main({ _text, href }) {
    var _state = state() || {};
    if (!_text) {
        _text = _state._text;
    }
    if (!href) {
        href = _state.href;
    }
    _state._text = _text;
    _state.href = href;
    state(_state);
    document.title = _text;
    text(tbar, _text);
    remove([].slice.call(page.children, 0));
    cross("get", href).done(function (xhr) {
        var bodyHTML = String(xhr.responseText || xhr.responseText || "").replace(RegBodyExp, "$1").replace(RegScriptExp, "").replace(/\son/ig, " no").replace(/\s(src|href)/g, " s$1");
        var sandbox = createElement(div);
        sandbox.innerHTML = bodyHTML;
        var singersList = [].map.call(sandbox.getElementsByClassName("panel-img-list")[0].children, function (child) {
            child = child.children[0];
            var href = child.getAttribute("shref");
            var _src = child.children[0].children[0].getAttribute("_src");
            var name = child.children[1].innerText.replace(/^\s*|\s*$/g, "");
            var item = createWithClass(div, "singer");
            text(item, name);
            css(item, {
                backgroundImage: `url('${_src}')`
            });
            onclick(item, function () {
                go("detail", {
                    href,
                    _text: name
                });
            });
            return item;
        });
        appendChild(page, singersList);
    });
    return page;
}