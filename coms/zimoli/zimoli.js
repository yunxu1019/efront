/* 
 * 不枝雀
 * 2017-3-18 16:16:20
 */

//main
var body = document.body;
var onbacks = [];
var backman, target_hash;
location.href.slice(location.href.length - location.pathname.length) !== location.pathname && location.replace(location.pathname);

if (/MSIE\s*[2-7]/.test(navigator.userAgent)) {
    window.onhistorychange = function (url) {
        return onback && onback() === true;
    };
    onselectstart(body, function (e) {
        return e.preventDefault();
    });
    var frame = createElement("iframe");
    css(frame, "display:none");
    appendChild(body, frame);
    var doc = frame.contentWindow.document;
    var backman = function (isloaded) {
        doc.open();
        doc.write(isloaded !== false ? "" : "<script>result=parent.onhistorychange();onload=function(){history.forward()}</script>");
        doc.close();
    };
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
// body
css(body, {
    width: "100%",
    height: "100%",
    border: "none",
    position: "absolute",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    backgroundColor: "#f2f4f9"
});
/**
 * 加载一个页面到document.body
 * 如果args是一个字符串，那么当下次指定一个相同的字符串时，此对象被新对象代替
 * 如果args是bool值true，那么当执行history.back()时，此对象被清除
 */
function zimoli(page, args, history_name) {
    if (arguments.length === 0) {
        history_name = current_history;
        var _history = history[history_name] || [];
        page = _history[_history.length - 1] || "/main";
    }
    if (isNumber(page)) {
        if (!history_name)
            history_name = current_history;
        if (isString(history_name)) {
            var _history = history[history_name] || [];
            page = _history[page < 1 ? _history.length + page - 1 : page];
        }
    }
    if (!page) return true;
    if (isNode(history_name)) {
        if (history_name.activate === page) return;
        history_name.activate = page;
    }
    //只有把runtime绑定到对像才可以使用
    //    css(document.body,{
    //        backgroundColor:"rgba(0,0,0,1)"
    //    });
    //    var button=createElement(anniu);
    //    console.log(button)
    var _zimoli_state_key = "_zimoli_page_state:" + page;
    var state = function state(state) {
        if (arguments.length >= 1) {
            sessionStorage.setItem(_zimoli_state_key, JSON.stringify(state));
        }
        try {
            state = JSON.parse(sessionStorage.getItem(_zimoli_state_key)) || {};
        } catch (e) {
            state = {};
        }
        return state;
    };
    var _with_elements = [];
    state.with = function (element) {
        element && _with_elements.push(element);
        return _with_elements;
    };
    init(page, function (pg) {
        if (!args) args = {};
        var _page = pg.call(state, args);
        _page.with = _with_elements;
        addGlobal(_page, history_name);
        pushstate(page, history_name);
    }, {
        state: state,
        titlebar: function () {
            return getTitleBar(state, arguments);
        }
    });
}
var getTitleBar = function (state, args) {
    var realTitleBar = titlebar.apply(null, args);
    state.with(realTitleBar);
    return realTitleBar;
};
var alertslist = zimoli.alertslist = [];
var global = {};
var history = {};
var current_history = "default";
history[current_history] = [];
try {
    history = JSON.parse(sessionStorage.getItem(history_session_object_key)) || history;
} catch (e) {
    console.log(e);
}
var history_session_object_key = "_zimoli_history_key";
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
    sessionStorage.setItem(history_session_object_key, JSON.stringify(history));
};
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
        if (global[name]) {
            remove(global[name]);
        }
        appendChild(body, element);
        global[name] = element;
    } else if (isNode(name)) {
        appendChild(name, element);
    } else {
        appendChild(body, element);
        alertslist.push(element);
    }
}

var _switch = zimoli.switch = function (history_name) {
    if (history_name)
        current_history = history_name;
};
zimoli.global = addGlobal;