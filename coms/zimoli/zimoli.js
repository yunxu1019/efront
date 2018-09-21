/* 
 * 不枝雀
 * 2017-3-18 16:16:20
 */
//main
var body = document.body;
var onbacks = [];
var target_hash, exit_ing;
var window_history = window.history;
var window_history_length = window_history.length;
var load_count = "__zimoli_load_times";
var loadTime = +sessionStorage.getItem(load_count) || 0;
if (!loadTime) {
    location.replace("#reload");
}
loadTime++;
sessionStorage.setItem(load_count, loadTime);

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
css("html", {
    height: "100%",
    fontFamily: `"SF Pro SC","SF Pro Text","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif`,
    backgroundColor: "#f2f4f9"
});
css("body", {
    border: "none",
    margin: "0",
    padding: "0",
    height: "100%",
    overflow: "hidden",
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
    localStorage.setItem(_zimoli_params_key + url, JSON.stringify(args) || null);
    if (!page_generators[url]) {
        return zimoli(url, args, history_name);
    }
    if (isNode(history_name)) {
        if (history_name.activate === url) return;
        history_name.activate = url;
    }
    var pg = page_generators[url];
    var _with_elements = [].concat(pg.with);
    var _pageback_listener = pg.onback;
    var state = pg.state;
    state.with = function (element) {
        element && _with_elements.push(element);
        return _with_elements;
    };
    state.onback = function (handler) {
        _pageback_listener = handler;
    };
    if (undefined === args || null === args) args = {};
    var _page = pg.call(state, args);
    if (pg.className) _page.className = pg.className;
    _page.with = _with_elements;
    if (args.initialStyle) _page.initialStyle = args.initialStyle;
    addGlobal(_page, history_name);
    _page.onback = _pageback_listener;
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
        exit_ing = false;
        history_name = current_history;
        var _history = history[history_name] || [];
        page = _history[_history.length - 1] || "/main";
        try {
            args = JSON.parse(localStorage.getItem(_zimoli_params_key + page)) || {};
        } catch (e) {
            args = {};
        }
    }
    var _zimoli_state_key = _zimoli_state_prefix + page;
    var state = function state(condition, setAsAdditional = condition !== null) {
        var state_string = localStorage.getItem(_zimoli_state_key);
        var state_object;
        if (state_string) {
            try {
                state_object = JSON.parse(state_string);
            } catch (e) {
                state_object = {};
            }
        } else {
            state_object = {}
        }
        if (condition instanceof Object && setAsAdditional) {
            if (!(state_object instanceof Object)) {
                state_object = {
                    toString() {
                        return String(this.valueOf());
                    },
                    valueOf: new Function(`return ${state_object}`),
                };
            }
            state_object = extend(state_object, condition);
        } else if (arguments.length) {
            state_object = condition;
        }
        if (arguments.length) {
            localStorage.setItem(_zimoli_state_key, JSON.stringify(state_object) || null);
        }
        return state_object;
    };
    state.state = state;
    if (page_generators[page]) return go(page, args, history_name);
    var _with_elements = [];
    state.with = function (element) {
        element && _with_elements.push(element);
        return _with_elements;
    };
    state.path = function (url) {
        if (isString(url) && /^[^\\\/]/.test(url)) {
            url = page.replace(/[^\/]*$/, url);
        }
        return url;
    }
    state.go = function (url, args, history_name) {
        return go(state.path(url), args, history_name);
    };

    var _pageback_listener = [];
    state.onback = state.onrelease = state.ondestroy = function (handler) {
        //只能在page上使用
        _pageback_listener = handler;
    };
    state.titlebar = function () {
        var realTitleBar = titlebar.apply(null, arguments);
        state.with(realTitleBar);
        return realTitleBar;
    };
    return init(page, function (pg) {
        if (!pg) return;
        pg.with = _with_elements;
        pg.state = state;
        pg.onback = _pageback_listener;
        page_generators[page] = pg;
        return go(page, args, history_name);
    }, state);
}
var global = {};
var history = {};
var current_history = "default";
history[current_history] = [];
var history_session_object_key = `_zimoli_history_key:${location_pathname}`;
try {
    history = JSON.parse(localStorage.getItem(history_session_object_key)) || history;
} catch (e) {
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
    localStorage.setItem(history_session_object_key, JSON.stringify(history) || null);
};
var fixurl = function () {
    setTimeout(function () {
        exit_ing = void 0;
        if (!/#$/.test(location.href)) location.href = "#";
    }, 0);
}
var onback = function () {
    if (rootElements.length) {
        fixurl();
        remove(rootElements.pop());
        return;
    }
    var current_page = global[current_history];
    var onback = current_page && current_page.onback;
    if (isFunction(onback)) {
        onback = current_page.onback();
    }
    if (onback === false) {
        fixurl();
        return;
    }
    if (isString(onback)) {
        return go(onback);
    }
    if (go(-1, onback) === true) {
        try {
            navigator.app.exitApp();
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
        popup(element);
        fixurl();
    }
}
var _switch = zimoli.switch = function (history_name) {
    if (history_name)
        current_history = history_name;
};
zimoli.global = addGlobal;
popup.go = zimoli.go = go;
rootElements.push = function () {
    [].push.apply(this, arguments);
    fixurl();
};
appendChild.transition = transition;
remove.transition = transition;
window.modules = modules;