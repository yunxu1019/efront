var nav = createElement(div);
css(nav, "color:#ffffff;z-index:2;text-align:center;line-height:50px;font-size:24px;background-color:#333336;height:50px;position:absolute;top:0px;left:0px;right:0px;width:100%;");

function btn(element) {
    var opt = button(element);
    css(opt, "position:absolute;background-color:#333336;top:0;bottom:0;height:100%;width:60px;");
    return opt;
}
function back(){
    var _icon=icon("back",0xf0f0f0);
    css(_icon,"width:30px;height:30px;top:50%;margin-top:-15px;left:10px;position:absolute;");
    var _btn=btn(_icon);
    css(_btn,"left:0;")
    onclick(_btn,function(){
        history.back();
    })
    return _btn;
}


function titlebar(page_title, option_buttons, use_back) {
    use_back=use_back!==false;
    var bar = createElement(nav);
    var title = createElement(label);
    var _back=createElement(back);
    text(title, page_title || document.title);
    appendChild(bar, title);
    use_back&&appendChild(bar,_back);
    option_buttons&&appendChild(bar,option_buttons);
    return bar;
}
titlebar.button = btn;