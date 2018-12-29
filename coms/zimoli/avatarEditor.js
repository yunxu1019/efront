function main(scope) {
    var editor = div();
    var localScope = extendIfNeeded({
        btn: button
    }, scope);
    onclick(editor, function (event) {
        (event.target === editor || event.target === editor.children[0]) && remove(editor);
    });

    editor.innerHTML = avatarEditor;
    render(editor, localScope);
    return editor;
}