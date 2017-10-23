document.title = "编辑器和键盘"
var page = createElement(div);
function insertNode(node, input) {
    if (!isNode(node)) return;
    var selection = document.getSelection();
    var parent = selection.baseNode || input;
    var position = selection.baseOffset + 1 | 0;
    var referenceChild = parent.childNodes[position];
    parent.insertBefore(node, referenceChild);
    node.scrollIntoViewIfNeeded(false);
    selection.setBaseAndExtent(parent, position, parent, position);
}
function editor() {
    var _input = createElement(div);
    var showemoji = false;
    _input.className = "needsclick"
    _input.innerHTML = "";
    _input.placeholder = "你好"
    _input.contentEditable = true;
    var _editor = createElement(div);
    var _emojiBtn = icon("edit");
    css(_editor, "position:fixed;width:100%;height:auto;bottom:0;left:0;right:0;transition:height .1s;overflow:hidden;");
    css(_emojiBtn, "position:absolute;width:50px;height:50px;right:0;top:0px;");
    css(_input, `ime-mode:disable;user-select:text;overflow:auto;background-color:#f8f8f8;padding:4px 60px 4px 16px;font-size:24px;line-height:42px;width:100%;height:50px;`);
    var emojis = [
        "01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20",
        "21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40",
        "41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60",
        "61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80",
        "81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,a0",
        "a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0"
    ].map(function (emjs) {
        var emj_pad = createElement(div);
        css(emj_pad, `position:absolute;padding:4% 3.5%;width:100%;height:100%;`);
        appendChild(emj_pad, emjs.split(",").map(emj => {
            var _emj = createElement(div);
            var _emjsrc = `qq_emoji/${+emj.charAt(1) + parseInt(emj.charAt(0), 16) * 10}.gif`;
            css(_emj, `width:14.2857%;height:33.3333%;display:block;margin:0;background-image:url('${_emjsrc}');background-repeat:no-repeat;background-position:center;float:left;`);
            _emj.onclick = function () {
                var _emj = new Image;
                _emj.src = _emjsrc;
                insertNode(_emj, _input);
            }
            return _emj;
        }).concat(function () {
            var _del = createElement(div);
            _del.onmousedown = function (e) {
                e.preventDefault();
                _input.childNodes.length && document.execCommand("delete");
            };
            css(_del, `width:14.2857%;height:33.3333%;display:block;margin:0;background-image:url('qq_emoji/delete.png');background-repeat:no-repeat;background-position:center;background-size:auto 14px;float:right;`);
            return _del;
        }()));
        return emj_pad;
    });
    var _emojiPad = slider(function (index, ratio) {
        return emojis[index];
    });
    css(_emojiPad, "position:relative;overflow:hidden;background-color:#faf2e8;width:100%;height:180px;");
    _emojiPad.go(0);
    _emojiBtn.className = "needsclick";
    _emojiBtn.onclick = e => switchemoji();
    _emojiPad.onmousedown = e => e.preventDefault();
    _emojiBtn.onmousedown = e => e.preventDefault();
    _input.onclick = e => switchemoji(false);

    function switchemoji(_showemoji = !showemoji) {
        showemoji = _showemoji;
        css(_editor, `height:${showemoji ? `${_emojiPad.offsetHeight + _input.offsetHeight}px` : _input.offsetHeight + "px"}`);
        _input.contenteditable = !showemoji;
    }
    appendChild(_editor, _input, _emojiBtn, _emojiPad);
    return _editor;
}
appendChild(page, editor);

function main() {
    // alert(document.body.style.cssText);
    return editor;
}