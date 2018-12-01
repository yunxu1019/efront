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
var hostoryStorage = sessionStorage;
if (loadTime) {
    location.replace("#:reload");
}
loadTime++;
sessionStorage.setItem(load_count, loadTime);
var pagehash_reg=/#([\/\w]*)$/;
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
        if (pagehash_reg.test(event.newURL || event.actionURL || location.href)) return;
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

function getReverseStyle(style) {
    if (!(style instanceof Object)) {
        style = parseKV(style, ";", ":");
    }
    var dest = {};
    var replacer = function (m, d, t) {
        if (t) return -d + t;
        return +d ? 1 / d : m;
    };
    //如要是对放大系数进行求倒，对位移进行反向
    for (var k in style) {
        if (/transform|left|top|right|bottom|margin/i.test(k)) {
            dest[k] = String(style[k]).replace(/(\-?\d*\.?\d+)(deg|p[xt]|r?em|[cm]m|%|)/ig, replacer);
        } else {
            dest[k] = style[k];
        }
    }
    return dest;
}

function go(url, args, history_name, oldpagepath) {
    if (!history_name)
        history_name = current_history;
    if (isNumber(url)) {
        if (isString(history_name)) {
            var _history = history[history_name] || [];
            url = _history[url < 1 ? _history.length + url - 1 : url];
            oldpagepath = _history[_history.length - 1];
        }
    }
    if (!url) return true;
    var stringified_args = JSON.stringify({ data: args, from: oldpagepath });
    if (stringified_args.length === 2) hostoryStorage.removeItem(_zimoli_params_key + url);
    else hostoryStorage.setItem(_zimoli_params_key + url, stringified_args);
    if (!page_generators[url]) {
        return zimoli(url, args, history_name, oldpagepath);
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
    var _page = pg.call(state, args, oldpagepath);
    if (_page) {
        if (pg.className) _page.className = pg.className;
        _page.with = _with_elements;
        if (args.initialStyle) _page.initialStyle = args.initialStyle;
        if (args.holdupStyle) _page.holdupStyle = args.holdupStyle;
        if (_page.initialStyle && !_page.holdupStyle) {
            _page.holdupStyle = getReverseStyle(_page.initialStyle);
            _page.backupStyle = _page.initialStyle;
        }
        _page.onback = _pageback_listener;
    }
    var isDestroy = pushstate(url, history_name, oldpagepath);
    if (isNode(history_name)) {
        if (history_name.activate === url && history_name.activateNode === _page) return;
        else remove(history_name.activateNode);
        history_name.activate = url;
        history_name.activateNode = _page;
    }
    addGlobal(_page, history_name, isDestroy);
    return _page;
}
var page_generators = {};
/**
 * 加载一个页面到document.body
 * 如果args是一个字符串，那么当下次指定一个相同的字符串时，此对象被新对象代替
 * 如果args是bool值true，那么当执行history.back()时，此对象被清除
 */
function zimoli(pagepath, args, history_name, oldpagepath) {
    if (arguments.length === 0) {
        exit_ing = false;
        history_name = current_history;
        var _history = history[history_name] || [];
        pagepath = _history[_history.length - 1] || "/main";
        try {
            var saveddata = JSON.parse(hostoryStorage.getItem(_zimoli_params_key + pagepath)) || {};
        } catch (e) {
            var saveddata = {};
        }
        var { data, from } = saveddata;
        args = data;
        oldpagepath = from;
    }
    var _zimoli_state_key = _zimoli_state_prefix + pagepath;
    var state = function state(condition, setAsAdditional = condition !== null) {
        var state_string = hostoryStorage.getItem(_zimoli_state_key);
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
            hostoryStorage.setItem(_zimoli_state_key, JSON.stringify(state_object) || null);
        }
        return state_object;
    };
    state.state = state;
    if (page_generators[pagepath]) return go(pagepath, args, history_name, oldpagepath);
    var _with_elements = [];
    state.with = function (element) {
        element && _with_elements.push(element);
        return _with_elements;
    };
    state.path = function (url) {
        if (isString(url) && /^[^\\\/]/.test(url)) {
            url = pagepath.replace(/[^\/]*$/, url);
        }
        return url;
    }
    state.go = function (url, args, _history_name) {
        return go(state.path(url), args, _history_name, isString(history_name) ? pagepath : oldpagepath);
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
    return init(pagepath, function (pg) {
        if (!pg) return;
        pg.with = _with_elements;
        pg.state = state;
        pg.onback = _pageback_listener;
        page_generators[pagepath] = pg;
        return go(pagepath, args, history_name, oldpagepath);
    }, state);
}
var global = {};
var history = {};
var current_history = "default";
history[current_history] = [];
var history_session_object_key = `_zimoli_history_key:${location_pathname}`;
try {
    history = JSON.parse(hostoryStorage.getItem(history_session_object_key)) || history;
} catch (e) {
}
var pushstate = function (path_name, history_name, oldpagepath) {
    var isDestroy = false;
    if (!history_name) {
        history_name = current_history;
    }
    if (!isString(history_name)) return;
    if (!history[history_name]) {
        history[history_name] = [path_name];
    } else {
        var _history = history[history_name];
        if (_history.indexOf(oldpagepath) < 0) {
            _history.splice(_history[0] === ":empty", _history.length);
            isDestroy = true;
        }
        for (var cx = 0, dx = _history.length; cx < dx; cx++) {
            if (_history[cx] === path_name) {
                _history.splice(cx, dx - cx);
                isDestroy = true;
                break;
            }
        }
        _history.push(path_name);
        if (_history.length > 1) fixurl();
    }
    hostoryStorage.setItem(history_session_object_key, JSON.stringify(history) || null);
    return isDestroy;
};
var fixurl = function () {
    setTimeout(function () {
        exit_ing = void 0;
        if (!pagehash_reg.test(location.href)) location.href = "#";
    }, 0);
}
var checkonback = function (elements) {
    for (var cx = 0, dx = elements.length; cx < dx; cx++) {
        var element = elements[cx];
        var onback = element && element.onback;
        if (isFunction(onback)) {
            onback = element.onback();
        }
        if (onback === false || isString(onback)) {
            break;
        }
    }
    return onback;
}
put(":empty", function () {
    return null;
});

var onback = function () {
    if (rootElements.length) {
        fixurl();
        remove(rootElements.pop());
        return;
    }
    var onback = checkonback([
        global[current_history],
    ]);
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

function addGlobal(element, name, isDestroy) {
    if (!name) {
        name = current_history;
    }
    if (isString(name)) {
        if (global[name] === element) return;
        var oldElement = global[name];
        if (oldElement) {
            oldElement.initialStyle = isDestroy ? oldElement.backupStyle : oldElement.holdupStyle;
        }
        if (isFunction(body.layer)) {
            body.layer(element, oldElement, history);
        } else {
            remove(oldElement);
            appendChild(body, element);
        }
        global[name] = element;
    } else if (isNode(name)) {
        appendChild(name, element);
    } else if (isFunction(name)) {
        name(element);
    } else if (element) {
        popup(element);
        fixurl();
    }
}
var _switch = zimoli.switch = function (history_name, target_body, emptyState) {
    if (history_name)
        current_history = history_name;
    if (target_body)
        body = target_body;
    if (emptyState !== false && !history[history_name]) history[history_name] = [emptyState || ":empty"];
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
zimoli.setStorage = function (storage) {
    hostoryStorage = storage;
    try {
        history = JSON.parse(hostoryStorage.getItem(history_session_object_key)) || history;
    } catch (e) {
    }
};