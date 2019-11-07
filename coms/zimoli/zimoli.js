/* 
 * 不枝雀
 * 2017-3-18 16:16:20
 */
//main
var body = document.body;
var onbacks = [];
var window_history = window.history;
var window_history_length = window_history.length;
var sessionSavedHashKey = "__zimoli_session_init_hash" + location.pathname;
var sessionInitHash = sessionStorage.getItem(sessionSavedHashKey);
var hostoryStorage = sessionStorage;
var pagehash_reg = /#([\/\w\:@\.\_\(\)\+\-\*\$@!~_'\?,&~%]+)$/;
var locationInitHash = location.hash;
var hashchangecount = 0;
var isFirstTimeLoad = sessionInitHash === null;
var isSimpleRefresh = sessionInitHash === locationInitHash;
var isWithHashLoad = !!location.hash;
var preventNextHashChange = false;
window_history.scrollRestoration = 'manual'
if (isWithHashLoad && !isSimpleRefresh) {
    //带hash加载，吃掉hash
    location.replace("#");
}

if (/MSIE\s*[2-7]/.test(navigator.userAgent)) {
    window.onhistorychange = function (url) {
        hashchangecount++;
        // 如果是返回事件，一定不是第一次改变hash
        // 这里刚好可以屏蔽首次手动改变url可能产生的hashchange事件
        if (hashchangecount < 2) return;
        if (preventNextHashChange) return preventNextHashChange = false, window_history.go(-1);
        if (preventNextHashChange === void 0 ? onback && onback() === true : preventNextHashChange = void 0) { }
    };
    onselectstart(body, function (e) {
        return e.preventDefault();
    });
    var frame = createElement("iframe");
    css(frame, "display:none");
    appendChild.insert(body, frame);
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
        hashchangecount++;
        // 如果是返回事件，一定不是第一次改变hash
        // 这里刚好可以屏蔽首次手动改变url可能产生的hashchange事件
        var targetHash = location.hash;
        sessionStorage.setItem(sessionSavedHashKey, targetHash);
        if (pagehash_reg.test(targetHash)) {
            var currentHash = getCurrentHash();
            if (currentHash && currentHash === targetHash) return;
            var targetHashIndex = targetHash.indexOf("#" + current_history);
            if (targetHashIndex < 0) return;
            var targetpath = targetHash.slice(targetHashIndex + current_history.length + 1);
            go(targetpath);
            return;
        }
        if (preventNextHashChange) return preventNextHashChange = false;
        event.preventDefault();
        onback();
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

function go(pagepath, args, history_name, oldpagepath) {
    if (!history_name)
        history_name = current_history;
    if (isNumber(pagepath)) {
        if (isString(history_name)) {
            var _history = history[history_name] || [];
            pagepath = _history[pagepath < 1 ? _history.length + pagepath - 1 : pagepath];
            oldpagepath = _history[_history.length - 1];
        }
    }
    if (!pagepath) return true;
    var stringified_args = JSON.stringify({ data: args, from: oldpagepath });
    if (stringified_args.length === 2) hostoryStorage.removeItem(_zimoli_params_key + pagepath);
    else hostoryStorage.setItem(_zimoli_params_key + pagepath, stringified_args);
    if (!page_generators[pagepath]) {
        return zimoli(pagepath, args, history_name, oldpagepath);
    }
    var page_object = page_generators[pagepath];
    var fullfill = function () {
        var _page = create(pagepath, args, oldpagepath);
        var isDestroy = pushstate(pagepath, history_name, oldpagepath);
        if (isNode(history_name)) {
            if (history_name.activate === pagepath && history_name.activateNode === _page) return;
            else remove(history_name.activateNode);
            history_name.activate = pagepath;
            history_name.activateNode = _page;
        }
        addGlobal(_page, history_name, isDestroy);
        page_object.prepares.forEach(function (url) {
            if (isNumber(url)) {
                url = _history[url < 1 ? _history.length + url - 1 : url];
            }
            if (isString(url)) prepare(url);
        });
        if (_page) {
            _page.$reload = fullfill;
        }
        return _page;
    };
    return fullfill();
}
var page_generators = {};
/**
 * 加载一个页面到document.body
 * 如果args是一个字符串，那么当下次指定一个相同的字符串时，此对象被新对象代替
 * 如果args是bool值true，那么当执行history.back()时，此对象被清除
 */
var loading_tree = {};
function prepare(pagepath, ok) {
    if (page_generators[pagepath]) {
        if (isFunction(ok)) {
            var res = page_generators[pagepath];
            if (!res.roles) {
                ok(res);
            } else {
                prepare(user.loginPath, _ => {
                    ok(res);
                });
            }
        }
        return;
    }
    if (loading_tree[pagepath]) {
        if (isFunction(ok)) {
            loading_tree[pagepath].push(ok);
        }
        return;
    }
    loading_tree[pagepath] = [];
    if (isFunction(ok)) {
        loading_tree[pagepath].push(ok);
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
        // if (arguments.length === 1 && isFinite(url)) return window_history.go(url | 0);
        var to = function (_url, args, _history_name) {
            return go(state.path(_url), args, _history_name, pagepath);
        };
        to = page_generators[pagepath] ? page_generators[pagepath].go || to : to;
        isFunction(to) && to(url, args, _history_name);
    };
    var prepares = [];
    state.prepare = state.go.prepare = function (urls) {
        prepares.push.apply(prepares, [].concat(urls).map(state.path));
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
    var roles = res || null;
    state.login = function () {
        // rolesA[role1,role2,...],rolesB,rolesC,...
        // rolesA中的role1,role2,...等所有身份都必须具备才可以确定一种访问权限
        // 符合rolesA,rolesB,rolesC任意一种权限都可以访问
        if (!roles) roles = [];
        for (var cx = 0, dx = arguments.length; cx < dx; cx++) {
            roles.push(arguments[cx]);
        }
    };
    var emit = function (pg) {
        if (pg) {
            page_generators[pagepath] = {
                pg,
                roles,
                state,
                with: _with_elements,
                onback: _pageback_listener,
                prepares
            };
        }
        var res = page_generators[pagepath];
        var emiters = loading_tree[pagepath];
        if (emiters) {
            var noRoles = !res.roles;
            while (emiters.length) {
                var ok = emiters.shift();
                if (isFunction(ok)) {
                    ok(res)
                }
                if (noRoles && res.roles) {
                    prepare(user.loginPath, () => emit())
                    return;
                }
            }
        }
        delete loading_tree[pagepath];
    };
    return init(pagepath, function (pg) {
        if (!pg) return;
        if (roles) return prepare(user.loginPath, () => emit(pg));
        emit(pg);
    }, state);
}
function create(pagepath, args, from) {
    var page_object = pagepath instanceof Object ? pagepath : page_generators[pagepath];
    if (!page_object) {
        throw new Error(`调用create前请确保prepare执行完毕:${pagepath}`);
    }
    var { pg, with: _with_elements, state, onback: _pageback_listener, roles } = page_object;
    if (!checkroles(user.roles, roles)) {
        // 检查权限
        if (!user.isLogin && user.loginPath) {
            return create(user.loginPath);
        }
        return alert(i18n("没有权限！", "No Access!"));
    }
    _with_elements = [].concat(_with_elements);
    state.with = function (element) {
        element && _with_elements.push(element);
        return _with_elements;
    };
    state.onback = function (handler) {
        _pageback_listener = handler;
    };
    if (undefined === args || null === args) args = {};
    var _page = pg.call(state, args, from);
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
    return _page;

}
function zimoli(pagepath, args, history_name, oldpagepath) {
    if (arguments.length === 0) {
        history_name = current_history;
        var _history = history[history_name] || [];
        root_path = _history[0] || "/main";
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
    if (page_generators[pagepath]) return go(pagepath, args, history_name, oldpagepath);
    return prepare(pagepath, function () {
        return go(pagepath, args, history_name, oldpagepath);
    });
}
var global = {};
var history = {};
var current_history, default_history = current_history = "zimoli";
history[current_history] = [];
var history_session_object_key = `_zimoli_history_key:${location_pathname}`;
try {
    history = JSON.parse(hostoryStorage.getItem(history_session_object_key)) || history;
} catch (e) {
}
var root_path;
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
            _history.splice(root_path === _history[0], _history.length);
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
        if (_history.length) fixurl();
    }
    hostoryStorage.setItem(history_session_object_key, JSON.stringify(history) || null);
    return isDestroy;
};
var popstate = function (path_name, history_name) {
    if (!history_name) history_name = current_history;
    if (!isString(history_name)) return;
    if (!history[history_name]) return;
    var _history = history[history_name];
    for (var cx = 0, dx = _history.length; cx < dx; cx++) {
        if (_history[cx] === path_name) {
            _history.splice(cx, dx - cx);
            break;
        }
    }
};
var getCurrentHash = function () {
    var _historylist = history[current_history];
    if (rootElements.length) {
        return `#${current_history}/`;
    }
    if (_historylist.length < 2) return "";
    var targeturl = `#${current_history}${_historylist.length ? _historylist[_historylist.length - 1] : ""}`;
    return targeturl;
};

var fixurl = function () {
    if (fixurl.ing) return;
    fixurl.ing = setTimeout(function () {
        fixurl.ing = false;
        var targeturl = getCurrentHash();
        if (pagehash_reg.test(targeturl)) {
            if (!pagehash_reg.test(location.href)) location.href = targeturl;
            else if (location.hash !== targeturl) location.replace(targeturl);
        } else if (pagehash_reg.test(location.href)) {
            preventNextHashChange = true;
            window_history.go(-1);
        }
    }, 0);
};
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
};
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
    if (go(-1) === true) {
        try {
            navigator.app.exitApp();
        } catch (e) {
        };
    } else { };
};

function addGlobal(element, name = null, isDestroy) {
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
            if (isDestroy) appendChild.insert(body, element);
            else appendChild(body, element);
        }
        global[name] = element;
    } else if (isNode(name)) {
        if (isDestroy) appendChild.insert(name, element);
        else appendChild(name, element);
    } else if (isFunction(name)) {
        name(element);
    } else if (element) {
        if (isFunction(body.layer)) {
            body.layer(element);
        } else {
            if (isDestroy) appendChild.insert(body, element);
            else appendChild(body, element);
        }
        rootElements.push(element);
    }
}
var _switch = zimoli.switch = function (history_name = default_history, target_body = document.body, emptyState) {
    if (isString(history_name))
        current_history = history_name;
    if (target_body)
        body = target_body;
    if (emptyState !== false && !history[history_name]) root_path = (history[history_name] = [].concat(emptyState || ":empty"))[0];
};
popup.global = zimoli.global = addGlobal;
popup.go = zimoli.go = go;
popup.prepare = prepare;
go.create = popup.create = zimoli.create = create;
user.clean = zimoli.clean = function () {
    var pathnames = [].concat.apply([], arguments);
    pathnames.forEach(pathname => popstate(pathname));
};
rootElements.push = function () {
    [].push.apply(this, arguments);
    fixurl();
};
appendChild.transition = transition;
remove.transition = transition;
window.modules = modules;
zimoli.prepare = prepare;
zimoli.setStorage = function (storage) {
    hostoryStorage = storage;
    try {
        history = JSON.parse(hostoryStorage.getItem(history_session_object_key)) || history;
    } catch (e) {
    }
};
zimoli.getCurrentHistory = function () {
    return history[current_history];
};
zimoli.inithash = locationInitHash;