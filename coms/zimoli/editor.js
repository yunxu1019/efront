var _editor = createElement(div);
_editor.setAttribute("contenteditable", true);
/**
 * 加粗
 */
function bold(){
}
/**
 * 斜体
 */
function italic(){
}
/**
 * 居中
 */

function editor() {
    var edit = createElement(_editor);
    edit.bold=bold;
    edit.italic=italic;
    return edit;
}