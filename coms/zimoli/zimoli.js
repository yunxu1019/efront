/* 
 * 不枝雀
 * 2017-3-18 16:16:20
 */
var body = document.body;
var onbacks = [];
var backman, target_hash;
location.href.slice(location.href.length-location.pathname.length)!==location.pathname && location.replace(location.pathname);

if (/MSIE\s*[2-7]/.test(navigator.userAgent)) {
    window.onhistorychange = function (url) {
        return onback&&onback() === true;
    }
    var frame = createElement("iframe");
    css(frame, "display:none");
    appendChild(body, frame);
    var doc = frame.contentWindow.document;
    var backman = function (isloaded) {
        doc.open();
        doc.write(isloaded !== false ? "" : "<script>result=parent.onhistorychange();onload=function(){history.forward()}</script>");
        doc.close();
    }
    backman(false);
    backman();
} else {
    backman = function () {
        location.href = "#";
    };
    backman();
    this.onhashchange = function () {
        backman();
        if (onback() === true) {}
    }
}
css(body, {
    width: "100%",
    height: "100%",
    border: "none",
    position: "absolute",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    backgroundColor: "black"
});
/**
 * 加载一个页面到document.body
 * 如果args是一个字符串，那么当下次指定一个相同的字符串时，此对象被新对象代替
 * 如果args是bool值true，那么当执行history.back()时，此对象被清除
 */
function zimoli(page, args, history_name) {
    if (isNumber(page)) {
        if (!history_name)
            history_name = current_history;
        if (isString(history_name)) {
            var _history = history[history_name] || [];
            page = _history[page < 1 ? _history.length + page - 1 : page];
        }
    }
    if (!page) return true;
    //只有把runtime绑定到对像才可以使用
    //    css(document.body,{
    //        backgroundColor:"rgba(0,0,0,1)"
    //    });
    //    var button=createElement(anniu);
    //    console.log(button)
    init(page, function (pg) {
        if (!args) args = {};
        var _page = pg(args);
        addGlobal(_page, history_name);
        pushstate(page, history_name);
    });
}
var alertslist = zimoli.alertslist = [];
var global = {};
var history = {};
var current_history = "default";
var pushstate = function (path_name, history_name) {
    if (!history_name) {
        history_name = current_history;
    }
    if (!isString(history_name)) return;
    if (!history[history_name]) {
        history[history_name] = [path_name];
    } else {
        var _history = history[history_name];
        for (var cx = 0, dx = _history.length; cx < dx; cx++) {
            if (_history[cx] === path_name) {
                _history.splice(cx, dx - cx);
                break;
            }
        }
        _history.push(path_name);
    }
}
var onback = function () {
    if (alertslist.length) {
        remove(alertslist.pop());
        return;
    }
    return zimoli(-1);
};

function addGlobal(element, name) {
    if (!name) {
        name = current_history;
    }
    if (isString(name)) {
        if (global[name])
            body.replaceChild(element, global[name] || null);
        else
            body.insertBefore(element, body.childNodes[0] || null);
        global[name] = element;
    } else if (isNode(name)) {
        if (name.childNodes.length)
            name.replaceChild(element, name.childNodes[0] || null);
        else
            name.appendChild(element);
    } else {
        body.appendChild(element);
        alertslist.push(element);
    }
}

var _switch = zimoli.switch = function (history_name) {
    if (history_name)
        current_history = history_name;
};
zimoli.global = addGlobal;