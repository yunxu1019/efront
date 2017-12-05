/* 
 * 不枝雀
 * 2017-3-18 16:16:20
 */
var sessionStorage = localStorage;
//main
var body = document.body;
var onbacks = [];
var target_hash, exit_ing;
var window_history = window.history;
var window_history_length = window_history.length;
if (location.href.slice(location.href.length - location.pathname.length) !== location.pathname) {
    location.replace("#reload");
    // throw "start from child hash";
}

if (/MSIE\s*[2-7]/.test(navigator.userAgent)) {
    window.onhistorychange = function (url) {
        if (exit_ing) return exit_ing = false, window_history.go(-1);
        if (exit_ing === void 0 ? onback && onback() === true : exit_ing = void 0) { }
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
    onhashchange(window, function (event) {
        if (/#$/.test(event.newURL || event.actionURL || location.href)) return;
        if (exit_ing) return exit_ing = false, window_history.go(-1);
        event.preventDefault();
        if (exit_ing === void 0 ? onback() === true : exit_ing = void 0) { }
    });
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
var location_pathname = location.pathname;
var _zimoli_params_key = `_zimoli_parameters:${location_pathname}#`;
var _zimoli_state_prefix = `_zimoli_page_state:${location_pathname}#`;

function go(url, args, history_name) {
    if (isNumber(url)) {
        if (!history_name)
            history_name = current_history;
        if (isString(history_name)) {
            var _history = history[history_name] || [];
            url = _history[url < 1 ? _history.length + url - 1 : url];
        }
    }
    if (!url) return true;
    sessionStorage.setItem(_zimoli_params_key + url, JSON.stringify(args));
    if (!page_generators[url]) {
        return zimoli(url, args, history_name);
    }
    if (isNode(history_name)) {
        if (history_name.activate === url) return;
        history_name.activate = url;
    }
    var pg = page_generators[url];
    var _with_elements = [].concat(pg.with);
    var _remove_listeners = [].concat(pg.onappend);
    var _append_listeners = [].concat(pg.onremove);
    var state = pg.state;
    state.onappend = function (handler) {
        isFunction(handler) && _append_listeners.push(handler);
    };
    state.onremove = function (handler) {
        isFunction(handler) && _remove_listeners.push(handler);
    };
    state.with = function (element) {
        element && _with_elements.push(element);
        return _with_elements;
    };
    if (!args) args = {};
    var _page = pg.call(state, args);
    if (pg.className) _page.className = pg.className;
    _page.with = _with_elements;
    onappend(_page, _append_listeners);
    onremove(_page, _remove_listeners);
    addGlobal(_page, history_name);
    pushstate(url, history_name);
    return _page;
}
var page_generators = {};
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
        try {
            args = JSON.parse(sessionStorage.getItem(_zimoli_params_key + page)) || {};
        } catch (e) {
            args = {};
        }
    }
    //只有把runtime绑定到对像才可以使用
    //    css(document.body,{
    //        backgroundColor:"rgba(0,0,0,1)"
    //    });
    //    var button=createElement(anniu);
    //    console.log(button)
    var _zimoli_state_key = _zimoli_state_prefix + page;
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
    state.go = function (url, args, history_name) {
        if (isString(url) && /^[^\\\/]/.test(url)) {
            url = page.replace(/[^\/]*$/, url);
            return go(url, args, history_name);
        }
        return go(url, args, history_name);
    };
    var _remove_listeners = [];
    state.onremove = function (handler, _handler) {
        console.log("onremove");
        if (isFunction(handler)) _remove_listeners.push(handler);
        else onremove(handler, _handler);
    };
    var _append_listeners = [];
    state.onappend = function (handler, _handler) {
        console.log("onappend");
        if (isFunction(handler)) _remove_listeners.push(handler);
        else onappend(handler, _handler);
    };
    return init(page, function (pg) {
        pg.with = _with_elements;
        pg.onremove = _remove_listeners;
        pg.onappend = _append_listeners;
        pg.state = state;
        page_generators[page] = pg;
        return go(page, args, history_name);
    }, {
            state: state,
            titlebar: function () {
                return getTitleBar(state, arguments);
            },
            zimoli: state.go,
            go: state.go,
            onremove: function () {
                return getRemoveFn(state, arguments);
            },
            onappend: function () {
                return getAppendFn(state, arguments);
            }
        });
}
var getRemoveFn = function (state, args) {
    return state.onremove.apply(null, args);
};
var getAppendFn = function (state, args) {
    return state.onappend.apply(null, args);
};
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
var history_session_object_key = `_zimoli_history_key:${location_pathname}`;
try {
    history = JSON.parse(sessionStorage.getItem(history_session_object_key)) || history;
} catch (e) {
    console.log(e);
}
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
        if (_history.length > 1) fixurl();
    }
    sessionStorage.setItem(history_session_object_key, JSON.stringify(history));
};
var fixurl = function () {
    setTimeout(function () {
        if (!/#$/.test(location.href)) location.href = "#";
        exit_ing = void 0;
    }, 0);
}
var onback = function () {
    if (alertslist.length) {
        remove(alertslist.pop());
        return;
    }
    if (go(-1) === true) {
        try {
            navigator.app.exitApp()
        } catch (e) {
            if (window_history.length > 2) exit_ing = true, window_history.go(-1);
        };
    } else { };
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
    } else if (isFunction(name)) {
        name(element);
    } else {
        appendChild(body, element);
        alertslist.push(element);
        fixurl();
    }
}

var _switch = zimoli.switch = function (history_name) {
    if (history_name)
        current_history = history_name;
};
zimoli.global = addGlobal;