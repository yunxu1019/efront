document.title="编辑器和键盘"
var page=createElement(div);
function editor(){
    var _input=createElement(div);
    var showemoji=false;
    _input.className="needsclick"
    _input.innerHTML="";
    _input.placeholder="你好"
    _input.contentEditable=true;
    var _editor=createElement(div);
    var _emojiBtn=icon("edit");
    var _emojiPad=createElement(div);
    css(_editor,"position:absolute;width:100%;height:auto;bottom:0;left:0;right:0;");
    css(_emojiBtn,"position:absolute;width:50px;height:50px;right:0;top:0px;");
    css(_emojiPad,"background-color:#faf2e8;width:100%;height:0;transition:height .1s;");
    css(_input,`user-select:text;background-color:#f8f8f8;padding:4px 16px;font-size:24px;line-height:42px;width:100%;height:50px;`);
    _emojiBtn.className="needsclick";
    _emojiBtn.onclick=e=>switchemoji();
    _input.onclick=e=>switchemoji(false);
    function switchemoji(_showemoji=!showemoji){
        showemoji=_showemoji;
        css(_emojiPad,`height:${showemoji?"120px":0}`);
    }
    appendChild(_editor,_input,_emojiBtn,_emojiPad);
    return _editor;
}
appendChild(page,editor);
function main(){
    // alert(document.body.style.cssText);
    return page;
}