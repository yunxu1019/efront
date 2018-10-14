var _chat = div();
_chat.innerHTML = `
<itemList></itemList>
`;
var _state = extend({ data: [] }, state());
render(_chat, {
    go,
    itemList() {
        var _list = list(function (index) {
            return _state;
        });
        touchList(_list);
        return _list;
    }
})
function main() {
    return _chat;
}