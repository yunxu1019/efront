/* 
 * 不枝雀
 * 2017-3-18 16:16:20
 */
//main
var body = document.body;
var onbacks = [];
var window_history = window.history || { length: 0, go() { }, back() { } };
var window_history_length = window_history.length;
var sessionSavedHashKey = "__zimoli_session_init_hash" + location.pathname;
var sessionInitHash = sessionStorage.getItem(sessionSavedHashKey);
var hostoryStorage = sessionStorage;
var pagehash_reg = /#([\/\w\:@\.\_\(\)\+\-\*\$@!~_'\?,&~%]+)$/;
var locationInitHash = location.hash;
var isFirstTimeLoad = sessionInitHash === null;
var isSimpleRefresh = sessionInitHash === locationInitHash;
var preventNextHashChange = false;
window_history.scrollRestoration = 'manual';
var popupHashlessPath = '/';
var pathFromHash = function (targetHash) {
    var targetHashIndex = targetHash.indexOf("#" + current_history);
    if (targetHashIndex < 0) return;
    var targetpath = targetHash.slice(targetHashIndex + current_history.replace(/\/$/, '').length + 1);
    targetpath = decodeURI(targetpath);
    return targetpath;
}
onhashchange(window, function (event) {
    if (preventNextHashChange) return preventNextHashChange = false;
    // 如果是返回事件，一定不是第一次改变hash
    // 这里刚好可以屏蔽首次手动改变url可能产生的hashchange事件
    var targetHash = location.hash;
    sessionStorage.setItem(sessionSavedHashKey, targetHash);
    if (pagehash_reg.test(targetHash)) {
        var currentHash = getCurrentHash();
        if (currentHash && currentHash === targetHash) return;
        var targetpath = pathFromHash(targetHash);
        if (pathFromHash(currentHash) === popupHashlessPath) {
            backward();
            return;
        }
        forward(targetpath);
        return;
    }
    event.preventDefault();
    backward();
});
// body
var location_pathname = location.pathname;
var _zimoli_params_key = `_zimoli_parameters:${location_pathname}#`;
var _zimoli_state_prefix = `_zimoli_page_state:${location_pathname}#`;

function getReverseStyle(style) {
    if (!isObject(style)) {
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
var getZimoliParams = function (pagepath) {
    try {
        return JSAM.parse(hostoryStorage.getItem(_zimoli_params_key + pagepath)) || {};
    } catch (e) {
        console.warn(i18n`存储空间被破坏`);
    }
    return {};
};
var setZimoliParams = function (pagepath, args) {
    try {
        var stringified_args = JSAM.stringify(args);
        if (stringified_args.length === 2) hostoryStorage.removeItem(_zimoli_params_key + pagepath);
        else hostoryStorage.setItem(_zimoli_params_key + pagepath, stringified_args);
    } catch (e) {
        console.warn(i18n`写入存储空间失败！`, e);
    }
};
var fullfill_is_dispatched = 0;
function go(pagepath, args, history_name, oldpagepath) {
    if (history_name === undefined)
        history_name = current_history;
    if (isNumber(pagepath)) {
        if (isString(history_name)) {
            var _history = history[history_name] || [];
            pagepath = _history[pagepath < 2 ? _history.index + pagepath : pagepath];
            oldpagepath = _history[_history.index];
            if (arguments.length === 1) {
                args = getZimoliParams(pagepath).data;
            }
        }
    }
    if (isObject(pagepath)) {
        var { path: pagepath, need, roles = need, data: args, id, options } = pagepath;
    } else {
        var { roles, options, id } = getZimoliParams(pagepath);
    }
    if (!pagepath) {
        if (isNode(history_name)) {
            remove(history_name.activateNode);
            history_name.activate = pagepath;
        }
        return true;
    }
    var realpath = getpgpath(pagepath);
    if (realpath.length > 1) var [pgpath, args0] = realpath;
    else pgpath = pagepath;
    setZimoliParams(pagepath, { data: args, from: oldpagepath, options, roles, id });
    if (!page_generators[pgpath]) {
        return zimoli(pagepath, args, history_name, oldpagepath);
    }
    var page_object = page_generators[pgpath];
    if (!isEmpty(args0)) page_object.state.data = args, args = args0;
    var fullfill = function () {
        zimoliad = zimoliid;
        var _page = create(pgpath, args, oldpagepath);
        var isRecover = pushstate(pagepath, history_name, oldpagepath);
        if (isNode(history_name)) {
            if (history_name.activate === pagepath && history_name.activateNode === _page) return fullfill_is_dispatched--;
            else remove(history_name.activateNode);
            history_name.activate = pagepath;
            history_name.activateNode = _page;
        }
        else if (isString(pagepath)) {
            if (fullfill_is_dispatched > 0) return;
            fullfill_is_dispatched = 1;
            var event = createEvent("zimoli");
            event.$reload = fullfill;
            event.zimoli = {
                path: pagepath,
                roles,
                data: args,
                target: _page,
                id,
                options
            };
            dispatch(document, event);
            fullfill_is_dispatched = 0;
        }
        if (isRecover) setWithStyle(_page, false);
        addGlobal(_page, history_name, isRecover);
        page_object.prepares.splice(0, page_object.prepares.length).forEach(function (url) {
            if (isNumber(url)) {
                url = _history[url < 2 ? _history.index + url : url];
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
var pathmaped = Object.create(null);
var getpgpath = function (pagepath) {
    pagepath = /^[@#!]/.test(pagepath) ? pagepath.slice(1) : pagepath;
    if (pagepath === 'main') pagepath = modules.efrontPath || "/main";
    var pathlist = pagepath.split("/");
    var params = [];
    while (pathlist.length && !pathmaped[pathlist.join("/")]) params.push(pathlist.pop());
    if (pathlist.length) {
        pagepath = pathlist.join("/");
        var mparams = pathmaped[pagepath];
        var argobj = {};
        if (!mparams.length) argobj = params.reverse().join("/");
        else {
            for (var m of mparams) argobj[m] = params.pop();
            if (params.length) argobj[m] += "/" + params.reverse().join("/");
        }
        return [pagepath, argobj];
    }
    return [pagepath];
};
function createState(pgpath) {
    var [pgpath] = getpgpath(pgpath);
    var _zimoli_state_key = _zimoli_state_prefix + pgpath;
    var state = function state(condition, setAsAdditional = condition !== null) {
        var state_string = hostoryStorage.getItem(_zimoli_state_key);
        var state_object;
        if (state_string) {
            try {
                state_object = JSAM.parse(state_string);
            } catch (e) {
                state_object = {};
            }
        } else {
            state_object = {};
        }
        if (isObject(condition) && setAsAdditional) {
            if (!isObject(state_object)) {
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
            hostoryStorage.setItem(_zimoli_state_key, JSAM.stringify(state_object) || null);
        }
        return state_object;
    };
    return state;
}
function prepare(pgpath, ok) {
    if (pgpath instanceof Array) {
        for (var p of pgpath) prepare(p);
        return;
    }
    var [pgpath] = getpgpath(pgpath);
    if (page_generators[pgpath]) {
        if (isFunction(ok)) {
            var res = page_generators[pgpath];
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
    if (loading_tree[pgpath]) {
        if (isFunction(ok)) {
            loading_tree[pgpath].push(ok);
        }
        return;
    }
    loading_tree[pgpath] = [];
    if (isFunction(ok)) {
        loading_tree[pgpath].push(ok);
    }
    var state = createState(pgpath);
    state.state = state;
    var _with_elements = [];
    state.path = function (url) {
        if (/^\.+\//.test(url)) {
            url = pgpath.replace(/[^\/]*$/, url);
        }
        if (isString(url) && /[\\\/\.]/.test(url)) {
            url = url.replace(/^\.[\\\/]/, '');
            var ps = url.split(/[\\\/]/);
            var ds = [];
            for (var p of ps) {
                if (p === "..") {
                    ds.pop();
                }
                else if (p !== ".") {
                    ds.push(p);
                }
            }
            url = "/" + ds.join('/').replace(/^\//, '');
        }
        return url;
    };

    state.go = function (url, args, _history_name) {
        // if (arguments.length === 1 && isFinite(url)) return window_history.go(url | 0);
        var to = function (_url, args, _history_name) {
            return go(state.path(_url), args, _history_name, pgpath);
        };
        to = page_generators[pgpath] ? page_generators[pgpath].go || to : to;
        if (isFunction(to)) to(url, args, _history_name);
    };

    init('action', function (action) {
        state.action = function (menu, item, params) {
            var res;
            if (isString(menu)) {
                res = state.go(menu, item);
            } else if (menu && menu.path) {
                menu = extend({}, menu, { path: state.path(menu.path) });
                res = go(menu, undefined, undefined, pgpath);
            } else {
                res = action(menu, item, params);
            }
            return Promise.resolve(res);
        };
    });

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
        if (!realTitleBar.parentNode) _with_elements.push(realTitleBar);
        return realTitleBar;
    };
    var roles = res || null;
    state.login = function () {
        // rolesA[role1,role2,...],rolesB,rolesC,...
        // rolesA中的role1,role2,...等所有身份都必须具备才可以确定一种访问权限
        // 符合rolesA,rolesB,rolesC任意一种权限都可以访问
        if (!roles) roles = [];
        if (arguments.length) for (var cx = 0, dx = arguments.length; cx < dx; cx++) {
            roles.push(arguments[cx]);
        }
    };
    var emit = function (pg) {
        page_generators[pgpath] = {
            pg,
            roles,
            state,
            with: _with_elements,
            onback: _pageback_listener,
            prepares
        };
        var res = page_generators[pgpath];
        var emiters = loading_tree[pgpath];
        delete loading_tree[pgpath];
        if (emiters) while (emiters.length) {
            var ok = emiters.shift();
            if (isFunction(ok)) {
                ok(res);
            }
        }

    };
    return init(pgpath, function (pg) {
        if (pg) extendIfNeeded(pg, state);
        if (roles) return prepare(user.loginPath, () => emit(pg));
        emit(pg);
    }, state, true);
}
function create(pagepath, args, from, needroles) {
    if (typeof pagepath === 'string') {
        var page_object = page_generators[pagepath];
        if (!page_object) {
            throw new Error(i18n`调用create前请确保prepare执行完毕:${pagepath}`);
        }
        var { pg, "with": _with_elements, state, onback: _pageback_listener, roles } = page_object;
    }
    else if (isFunction(pagepath)) {
        var pg = pagepath;
        var { with: _with_elements = [], state = {}, onback: _pageback_listener, roles } = pg;
    }
    if (!checkroles(user.roles, roles) || !checkroles(user.roles, needroles)) {
        // 检查权限
        if (!user.isLogin && user.loginPath) {
            return create(user.loginPath);
        }
        return alert(i18n`没有权限！`, 0);
    }
    if (!pg) return;
    var _with_length = _with_elements.length;
    state.onback = function (handler) {
        _pageback_listener = handler;
    };
    var _page = pg.call(state, args, from);
    if (undefined === args || null === args) args = {};
    if (_page) {
        if (_with_length) _page.with = _with_elements.concat(_page.with || []);
        _with_elements.splice(_with_length, _with_elements.length - _with_length);
        if (args.initialStyle) _page.initialStyle = args.initialStyle;
        if (args.holdupStyle) _page.holdupStyle = args.holdupStyle;
        if (_page.initialStyle && !_page.holdupStyle) {
            _page.holdupStyle = getReverseStyle(_page.initialStyle);
            _page.backupStyle = _page.initialStyle;
            if (_page.with) {
                var run = function (a) {
                    if (!a.initialStyle) {
                        a.holdupStyle = _page.holdupStyle;
                        a.backupStyle = _page.backupStyle;
                        a.initialStyle = _page.initialStyle;
                    }
                };
                if (_page.with instanceof Array) {
                    _page.with.forEach(run);
                } else if (_page.with) {
                    run(_page.with);
                }
            }
        }
        if (isEmpty(_page.onback)) {
            _page.onback = _pageback_listener;
        }
    }
    return _page;

}
var createEmptyHistory = function (emptyState) {
    var h = [emptyState];
    h.index = 0;
    return h;
}
var zimoliid = 0, zimoliad = 0;
function zimoli(pagepath, args, history_name, oldpagepath) {
    if (arguments.length === 0) {
        if (zimoliid !== zimoliad) return;
        history_name = current_history;
        var _history = history[history_name] || createEmptyHistory('/main');
        root_path = _history[0];
        pagepath = location.hash;
        if (pagepath) {
            pagepath = pathFromHash(pagepath);
            if (pagepath === popupHashlessPath) {
                preventNextHashChange = true;
                window_history.go(-1);
                preventNextHashChange = true;
                pagepath = pathFromHash(location.hash);
            }
            if (_history.index === 0) pagepath = '';
        }
        if (!pagepath) pagepath = _history[_history.index];
        try {
            var saveddata = JSAM.parse(hostoryStorage.getItem(_zimoli_params_key + pagepath)) || {};
        } catch (e) {
            var saveddata = {};
        }
        var { data, from } = saveddata;
        args = data;
        oldpagepath = from;
    }
    if (isNode(history_name))
        var zid = history_name.zimoliid = (history_name.zimoliid | 0) + 1;
    else var zid = arguments.length ? ++zimoliid : zimoliid;
    return prepare(pagepath, function () {
        if (isNode(history_name)) {
            if (history_name.zimoliid !== zid) return;
        } else if (zid !== zimoliid) return;
        return go(pagepath, args, history_name, oldpagepath);
    });
}
var global = {};
var history = {};
var current_history, default_history = current_history = "";
history[current_history] = createEmptyHistory('/main');
var history_session_object_key = `_zimoli_history_key:${location_pathname}`;
try {
    history = JSAM.parse(hostoryStorage.getItem(history_session_object_key)) || history;
} catch (e) {
}
var root_path;
var pushstate = function (path_name, history_name) {
    var isBack = false;
    if (history_name === undefined) {
        history_name = current_history;
    }
    if (!isString(history_name)) return;
    if (!history[history_name]) {
        history[history_name] = createEmptyHistory(path_name);
    } else {
        var _history = history[history_name];
        var prevIndex = _history.index;
        for (var cx = 0, dx = _history.index + 1; cx < dx; cx++) {
            if (_history[cx] === path_name) {
                _history.index = cx;
                isBack = cx < dx - 1;
                break;
            }
        }
        if (_history.index !== cx) {
            _history.index++;
        }
        if (_history[_history.index] !== path_name) {
            _history.splice(_history.index, _history.length - _history.index);
            _history[_history.index] = path_name;
        }
        if (_history.index >= 0) fixurl(_history.index - prevIndex);
    }
    hostoryStorage.setItem(history_session_object_key, JSAM.stringify(history) || null);
    return isBack;
};
var popstate = function (path_name, history_name) {
    if (history_name === undefined) history_name = current_history;
    if (!isString(history_name)) return;
    if (!history[history_name]) return;
    var _history = history[history_name];
    for (var cx = 0, dx = _history.index; cx < dx; cx++) {
        if (_history[cx] === path_name) {
            _history.index = cx;
            break;
        }
    }
};
var getCurrentHash = function () {
    var history_name = current_history.replace(/\/$/, '');
    if (rootElements.length) {
        return `#${history_name}${popupHashlessPath}`;
    }
    var _historylist = history[current_history];
    if (!_historylist || _historylist.index < 1) return "";
    var targeturl = `#${history_name}${_historylist.length ? _historylist[_historylist.index] : ""}`;
    return encodeURI(targeturl);
};

var fixurl = function (historyDelta) {
    preventNextHashChange = false;
    var hash = getCurrentHash();
    if (pagehash_reg.test(hash)) {
        hash = location.href.replace(/\#[\s\S]*$/, '') + hash;
        if (!pagehash_reg.test(location.href)) location.href = hash;
        else if (location.href !== hash) {
            if (historyDelta) {
                preventNextHashChange = true;
                window_history.go(historyDelta);
                preventNextHashChange = false;
                if (location.href !== hash) {
                    location.href = hash;
                }
            }
            else if (location.href !== hash) location.href = hash;
        }
    }
    else if (pagehash_reg.test(location.hash)) {
        preventNextHashChange = true;
        window_history.go(-1);
        preventNextHashChange = false;
    }
};
var checkonback = function (elements) {
    for (var cx = 0, dx = elements.length; cx < dx; cx++) {
        var element = elements[cx];
        var onback = element && element.onback;
        if (isFunction(onback)) {
            onback = element.onback();
            if (onback === false) console.info(i18n`onback中阻止跳转的功能在新老版本的chrome上及其他不同浏览器上的表现均不一致，建议更换实现方式！`);
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
var forward = function (pgpath) {
    var hty = history[current_history];
    if (hty[hty.index + 1] === pgpath) {
        go(1);
    }
    else if (hty[hty.index - 1] === pgpath) {
        backward();
    }
    else {
        go(pgpath);
    }
};
var backward = function () {
    if (rootElements.length) {
        var onback = checkonback(rootElements.slice(rootElements.length - 1));
        fixurl();
        if (onback === false) {
            return;
        }
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
        }
    } else { }
};
function setWithStyle(target, isDestroy) {
    target.initialStyle = (isDestroy ? target.backupStyle : target.holdupStyle) || target.initialStyle;
    if (target.with instanceof Array) {
        target.with.forEach(a => setWithStyle(a, isDestroy));
    } else if (target.with) {
        setWithStyle(target.with, isDestroy);
    }

}
function addGlobal(element, name = null, isBack) {
    if (isString(name)) {
        if (global[name] === element) return;
        var oldElement = global[name];
        if (oldElement) {
            setWithStyle(oldElement, isBack);
        }
        if (isFunction(body.layer)) {
            body.layer(element, oldElement, history);
        } else if (body !== element) {
            if (oldElement) {
                var oldPrev = oldElement.previousSibling, oldPare = oldElement.parentNode;
                remove(oldElement);
                oldElement = oldPrev || oldPare.firstChild;
            }
            if (isBack || !oldElement) appendChild.insert(body, element);
            else appendChild.after(oldElement, element);
        }
        global[name] = element;
    } else if (isNode(name)) {
        if (name.nodeType !== 1) {
            remove(name.with);
            appendChild.after(name, element);
            name.with = [element];
        }
        else if (isBack) appendChild.insert(name, element);
        else appendChild(name, element);
    } else if (isFunction(name)) {
        name(element);
    } else if (element) {
        if (isFunction(body.layer)) {
            body.layer(element);
        } else {
            if (isBack) appendChild.insert(body, element);
            else appendChild(body, element);
        }
        rootElements.push(element);
    }
}
var _switch = zimoli.switch = function (history_name = default_history, target_body = document.body, emptyState) {
    if (!arguments.length) {
        current_history = default_history;
        body = document.body;
    }
    else {
        if (isString(history_name)) {
            current_history = history_name = history_name.replace(/\/$/, '') + "/";
        }
        if (target_body) body = target_body;
    }
    if (emptyState !== false && !history[current_history]) root_path = (history[current_history] = createEmptyHistory(emptyState))[0];
};
popup.global = zimoli.global = addGlobal;
popup.go = zimoli.go = go;
popup.prepare = prepare;
go.create = popup.create = zimoli.create = create;
user.clean = zimoli.clean = function () {
    var pathnames = [].concat.apply([], arguments);
    pathnames.forEach(pathname => popstate(pathname));
};
var rootElements_push = rootElements.push;
var rootElements_splice = rootElements.splice;
rootElements.push = function () {
    var length = rootElements_push.apply(this, arguments);
    fixurl();
    return length;
};
rootElements.splice = function () {
    var element = rootElements_splice.apply(this, arguments);
    fixurl();
    return element;
};
appendChild.transition = transition;
remove.transition = transition;
zimoli.prepare = prepare;
zimoli.setStorage = function (storage) {
    hostoryStorage = storage;
    try {
        history = JSAM.parse(hostoryStorage.getItem(history_session_object_key)) || history;
    } catch (e) {
    }
};
zimoli.register = function (pathlike) {
    var params = [];
    pathlike = pathlike.replace(/\/\:([^\/\:\-]+)/g, function (_, id) {
        params.push(id);
        return '';
    });
    pathmaped[pathlike] = params;
};
zimoli.clearHistory = function () {
    hostoryStorage.removeItem(history_session_object_key);
    history = {};
};
zimoli.getCurrentHistory = function () {
    if (!history[current_history]) history[current_history] = createEmptyHistory();
    return history[current_history];
};
zimoli.inithash = locationInitHash;
zimoli.createState = createState;
var touchEnabled = false;
zimoli.enableTouchBack = function () {
    if (touchEnabled) return;
    touchEnabled = true;
    var backwardTarget, forwardTarget, currentTarget, history_name, historyList;
    var touchId = 0;
    var ratio = 0;
    var deltaX = 0;
    bindtouch(body, {
        start(event) {
            event.preventDefault();
            touchId++;
            ratio = null;
        },
        move(a, event) {
            event.preventDefault();
            if (a !== null) {
                ratio = a.x / body.clientWidth;
                if (ratio <= -1) ratio = -0.999;
                if (ratio >= 1) ratio = 0.999;
                if (!currentTarget) {
                    history_name = current_history;
                    historyList = history[history_name];
                    if (historyList.length < 2) return;
                    currentTarget = global[history_name];
                }
                if (ratio > 0) a: {
                    if (backwardTarget) break a;
                    var id = ++touchId;
                    if (historyList.index < 1) return;
                    var path1 = historyList[historyList.index];
                    var path0 = historyList[historyList.index - 1];
                    prepare(path0, function () {
                        if (id !== touchId) return;
                        var args = getZimoliParams(path0).data;
                        backwardTarget = create(path0, args, path1);
                        setWithStyle(backwardTarget, true);
                        appendChild.insert(body, backwardTarget);
                    });
                    if (forwardTarget) remove(forwardTarget, false), forwardTarget = null;
                }
                else if (ratio < 0) a: {
                    if (forwardTarget) break a;
                    var id = ++touchId;
                    if (historyList.index >= historyList.length - 1) return;
                    var path2 = historyList[historyList.index + 1];
                    prepare(path2, function () {
                        if (id !== touchId) return;
                        var args = getZimoliParams(path2).data;
                        forwardTarget = create(path2, args, path1);
                        setWithStyle(forwardTarget, false);
                        appendChild.insert(body, forwardTarget);
                    });
                    if (backwardTarget) remove(backwardTarget, false), backwardTarget = null;
                }
                deltaX = a.deltax;
                transition(currentTarget, ratio);
                if (backwardTarget) transition(backwardTarget, ratio - 1);
                if (forwardTarget) transition(forwardTarget, ratio + 1);
            }
            return { x: ratio * body.clientWidth };
        },
        end() {
            if (ratio === null) return;
            if (historyList.index >= 1 && (deltaX > 0 && ratio > .1 || deltaX < 0 && ratio > .9 || deltaX === 0 && ratio > .4)) {
                setWithStyle(currentTarget, true);
                pushstate(historyList[historyList.index - 1], history_name);
                remove(currentTarget);
                remove(forwardTarget, false);
                transition(backwardTarget, 1);
                global[history_name] = backwardTarget;
            }
            else if (historyList.index < historyList.length - 1 && (deltaX < 0 && ratio < -.1 || deltaX > 0 && ratio < -.9 || deltaX === 0 && ratio < -.4)) {
                pushstate(historyList[historyList.index + 1], history_name);
                setWithStyle(currentTarget, false);
                remove(currentTarget);
                remove(backwardTarget, false);
                transition(forwardTarget, 1);
                global[history_name] = forwardTarget;
            }
            else {
                if (backwardTarget) setWithStyle(backwardTarget, false), remove(backwardTarget);
                if (forwardTarget) setWithStyle(forwardTarget, true), remove(forwardTarget);
                transition(currentTarget, 1);
            }
            currentTarget = null;
            backwardTarget = null;
            historyList = null;
            forwardTarget = null;
            ratio = null;
        }
    }, 'x')
};