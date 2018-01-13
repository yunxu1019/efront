document.title = "编辑器和键盘"

var innerHeight = window.innerHeight;
var inputBoxHeight = 50 * renderPixelRatio / .75;
var emojiPadHeight = 180 * renderPixelRatio / .75;
var editorTotalHeight = emojiPadHeight + inputBoxHeight;
var editorMiniHeight = inputBoxHeight;
var editorInitTop = innerHeight - editorMiniHeight;
var focusHeightfromInputBoxOnly =/**
* settings from iPhone SE
*/"310px";
var focusHeightfromEmojiPadAddon =/**
* settings from iPhone SE
*/"415px";
var page = createElement(div);
function insertNode(node, input) {
    if (!isNode(node)) return;
    var selection = document.getSelection();
    var parent = selection.baseNode || input;
    var position = selection.baseOffset + 1 | 0;

    var referenceChild = parent.childNodes[position] || null;
    parent.insertBefore(node, referenceChild);
    "scrollIntoViewIfNeeded" in node && node.scrollIntoViewIfNeeded(false);
    selection.setBaseAndExtent(parent, position, parent, position);
    selection.setPosition(parent, position);
}
function insertImage(image_src) {
    document.execCommand("InsertImage", false, image_src);
}
function editor() {
    var _input = createElement(div);
    var showemoji = false;
    _input.className = "needsclick"
    _input.innerHTML = "";
    _input.placeholder = "你好"
    _input.contentEditable = true;
    var alailableHeight = screen.availHeight;
    var _editor = createElement(div);
    var _emojiBtn = icon("edit");
    css(_editor, "position:absolute;left:0;right:0;height:50px;transition:top .15s ease-in;overflow:hidden;");
    css(_emojiBtn, "position:absolute;width:50px;height:50px;right:0;top:0px;");
    css(_input, `-webkit-touch-callout:none;ime-mode:disabled;user-select:text;overflow:auto;background-color:#f8f8f8;padding:4px 60px 4px 16px;font-size:24px;line-height:42px;width:100%;height:50px;`);
    var emojis = [
        "01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20",
        "21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40",
        "41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60",
        "61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80",
        "81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,a0",
        "a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0"
    ].map(function (emjs) {
        var emj_pad = createElement(div);
        css(emj_pad, `position:absolute;padding:6px 3.5%;width:100%;height:100%;`);
        appendChild(emj_pad, emjs.split(",").map(emj => {
            var _emj = createElement(div);
            var _emjsrc = `qq_emoji/${+emj.charAt(1) + parseInt(emj.charAt(0), 16) * 10}.gif`;
            css(_emj, `width:14.2857%;height:50px;display:block;margin:0;background-image:url('${_emjsrc}');background-repeat:no-repeat;background-position:center;float:left;`);
            _emj.onclick = function () {
                insertImage(_emjsrc);
            }
            return _emj;
        }).concat(function () {
            var _del = createElement(div);
            _del.onclick = function (e) {
                _input.childNodes.length && document.execCommand("delete");
            };
            css(_del, `width:14.2857%;height:50px;display:block;margin:0;background-image:url('qq_emoji/delete.png');background-repeat:no-repeat;background-position:center;background-size:auto 14px;float:right;`);
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
    _emojiBtn.onclick = e => (switchemoji(), _input.blur());
    _emojiPad.onmousedown = e => e.preventDefault();
    _emojiBtn.onmousedown = e => e.preventDefault();
    _input.onfocus = function (e) {
        var _showemoji = showemoji;
        switchemoji(false);
        css(_editor, { top: _showemoji ? focusHeightfromInputBoxOnly : focusHeightfromEmojiPadAddon });
    };
    _input.onblur = function () {
        css(_editor, { top: (showemoji ? innerHeight - editorTotalHeight : innerHeight - inputBoxHeight) + "px" });
    };
    function switchemoji(_showemoji = !showemoji) {
        showemoji = _showemoji;
        css(_editor, {
            "height": showemoji ? `${editorTotalHeight}px` : editorMiniHeight + "px",
            "top": showemoji ? `${(innerHeight - editorTotalHeight)}px` : (innerHeight - editorMiniHeight) + "px"
        });
    }
    appendChild(_editor, _input, _emojiBtn, _emojiPad);
    _editor.inputbox = _input;
    return _editor;
}
var _editor = editor();
appendChild(page, _editor);
onappend(page, function () {
    css(_editor, { top: editorInitTop + "px" });
});
function main() {
    return page;
}