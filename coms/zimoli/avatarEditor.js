

function main(scope) {
    var editor = div();
    var localScope = extendIfNeeded({
        btn: button,
        edit() {
            var filepicker = document.createElement("input");
            filepicker.type = "file";
            filepicker.accept = "image/*";
            var scope = this;
            filepicker.onchange = function () {
                if (scope.upload) scope.upload(this.files[0]);
                else console.warn(i18n`没有发现上传函数`);
            };
            filepicker.click();
        }
    }, scope);
    onclick(editor, function (event) {
        (event.target === editor || event.target === editor.children[0]) && remove(editor);
    });

    editor.innerHTML = avatarEditor;
    render(editor, localScope);
    return editor;
}