/* 
 * 不枝雀
 * 2017-3-18 16:16:20
 */
//main
var body = document.body;
var onbacks = [];
var window_history = window.history || { length: 0, go() { }, back() { } };
var historyStorage = sessionStorage;
var getLocationHash = function () {
    if ('hash' in location) return location.hash;
    return location.href.replace(/^[^#]+/, '');
};
var setLocationHash = function (hash) {
    preventNextHashChange = true;
    if ('hash' in location) location.hash = hash;
    else location.href = location.href.replace(/#[\s\S]*$/, '') + hash;
};
var locationInitHash = getLocationHash();
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
    var targetHash = getLocationHash();
    if (targetHash) {
        var currentHash = getCurrentHash();
        if (currentHash && currentHash === targetHash) return;
        var targetpath = pathFromHash(targetHash);
        if (targetpath === popupHashlessPath) return fixurl();
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
var _zimoli_params_key = `紫茉莉:${location_pathname}#`;
var _zimoli_state_prefix = `茉莉紫:${location_pathname}#`;

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
        return JSAM.parse(historyStorage.getItem(_zimoli_params_key + pagepath)) || {};
    } catch (e) {
        console.warn(i18n`存储空间被破坏`);
    }
    return {};
};
var setZimoliParams = function (pagepath, args) {
    try {
        if (!isHandled(args)) {
            historyStorage.removeItem(_zimoli_params_key + pagepath);
        }
        else {
            var stringified_args = JSAM.stringify(args);
            if (stringified_args.length === 2) historyStorage.removeItem(_zimoli_params_key + pagepath);
            else historyStorage.setItem(_zimoli_params_key + pagepath, stringified_args);
        }
    } catch (e) {
        console.warn(i18n`写入存储空间失败！`, e);
    }
};
var fullfill_is_dispatched = false;
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
    if (realpath.length > 1) var [pgpath] = realpath;
    else pgpath = pagepath;
    var params = { data: args, from: oldpagepath, options, roles, id };
    setZimoliParams(pagepath, params);
    if (!page_generators[pgpath]) {
        return zimoli(pagepath, args, history_name, oldpagepath);
    }
    var page = create(pagepath, args, oldpagepath, roles, params, history_name);
    zimoliad = zimoliid;
    var isRecover = pushstate(pagepath, history_name, oldpagepath);
    if (isNode(history_name)) {
        if (history_name.activate === pgpath && history_name.activateNode === page) return;
        else remove(history_name.activateNode);
        history_name.activate = pgpath;
        history_name.activateNode = page;
    }
    if (!page) {
        addGlobal(null, history_name, isRecover);
        return;
    }
    if (isString(pgpath)) {
        page.disptch();
    }
    if (isRecover) setWithStyle(page, false);
    page.mount(history_name, isRecover);
    return page;
}
var page_generators = {};
/**
 * 加载一个页面到document.body
 * 如果args是一个字符串，那么当下次指定一个相同的字符串时，此对象被新对象代替
 * 如果args是bool值true，那么当执行history.back()时，此对象被清除
 */
var loading_tree = {};
var pathmaped = Object.create(null);
var realmaped = Object.create(null);
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
        pagepath = realmaped[pagepath] || pagepath;
        return [pagepath, argobj];
    }
    pagepath = realmaped[pagepath] || pagepath;
    return [pagepath];
};
function createState(pgpath) {
    var [pgpath] = getpgpath(pgpath);
    var _zimoli_state_key = _zimoli_state_prefix + pgpath;
    var state = function state(condition, setAsAdditional = condition !== null) {
        var state_string = historyStorage.getItem(_zimoli_state_key);
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
            historyStorage.setItem(_zimoli_state_key, JSAM.stringify(state_object) || null);
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
    state.upwith = popup.upwith(_with_elements);
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
function create(pagepath, args, from, needroles, zimolidata) {
    if (zimolidata) {
        if (!isHandled(args)) args = zimolidata.data;
        if (!isHandled(needroles)) needroles = zimolidata.roles;
    }
    if (typeof pagepath === 'string') {
        var [pgpath, args0] = getpgpath(pagepath);
        var page_object = page_generators[pgpath];
        if (!isEmpty(args0)) page_object.state.data = args, args = args0;
    }
    else pgpath = pagepath;
    if (typeof pgpath === 'string') {
        var page_object = page_generators[pgpath];
        if (!page_object) {
            throw new Error(i18n`调用create前请确保prepare执行完毕:${pgpath}`);
        }
        var { pg, "with": _with_elements, state, onback: _pageback_listener, roles } = page_object;
    }
    else if (isFunction(pgpath)) {
        var pg = pgpath;
        var { with: _with_elements = [], state = {}, onback: _pageback_listener, roles } = pg;
    }
    var h = history[current_history];
    if (!checkroles(user.roles, roles) || !checkroles(user.roles, needroles)) {
        // 检查权限
        if (!user.isLogin && user.loginPath) {
            var pg = create(user.loginPath);
            if (h) h.wardable = false;
            return pg;
        }
        return zimoli.alert(i18n`没有权限！`, 0);
    }
    if (!pg) return;
    if (h) h.wardable = true;
    var _with_length = _with_elements.length;
    state.onback = function (handler) {
        _pageback_listener = handler;
    };
    var _page = pg.call(state, args, from);
    if (undefined === args || null === args) args = {};
    if (_page) {
        var page_with = _with_elements.splice(_with_length, _with_elements.length - _with_length);
        if (_page.with && _page.with !== _with_elements) {
            page_with = page_with.concat(_page.with);
            _with_elements.with = page_with;
        }
        _page.with = _with_elements;
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
        _page.disptch = function () {
            if (!zimolidata) return;
            zimoli.upwith = state.upwith;
            if (fullfill_is_dispatched > 0) return;
            fullfill_is_dispatched = 1;
            var event = createEvent("zimoli");
            event.$reload = _page.$reload.bind(_page);
            zimolidata.target = _page;
            zimolidata.path = pagepath;
            event.zimoli = zimolidata;
            dispatch(document, event);
            fullfill_is_dispatched = 0;
        }
        var history_name = current_history;
        var isRecover = false;
        _page.mount = function (hname, isR) {
            history_name = hname;
            isRecover = isR;
            addGlobal(this, history_name, isRecover);
        }
        _page.$reload = _page.$reload || _page.reload || function () {
            var _page = create(pagepath, undefined, from, undefined, zimolidata);
            _page.mount(history_name, isRecover);
            return _page;
        };
    }
    if (!page_object) return _page;
    var _history = history[current_history];
    if (_history) page_object.prepares.splice(0, page_object.prepares.length).forEach(function (url) {
        if (isNumber(url)) {
            url = _history[url < 2 ? _history.index + url : url];
        }
        if (isString(url)) prepare(url);
    });
    return _page;

}
var createEmptyHistory = function (emptyState, allowForward = true) {
    var h = [emptyState];
    h.index = 0;
    h.lastIndex = 0;
    h.wardable = allowForward;
    return h;
}
var zimoliid = 0, zimoliad = 0, zimolicd = 0;
function zimoli(pagepath, args, history_name, oldpagepath) {
    zimolicd = 1;
    if (arguments.length === 0) {
        if (zimoliid !== zimoliad) return;
        history_name = current_history;
        var _history = history[history_name] || createEmptyHistory('/main');
        root_path = _history[0];
        pagepath = _history[_history.index];
        try {
            var saveddata = JSAM.parse(historyStorage.getItem(_zimoli_params_key + pagepath)) || {};
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
history[current_history] = createEmptyHistory('/main', false);
var history_session_object_key = `紫茉莉:${location_pathname}`;
var setStorage = function (storage) {
    historyStorage = storage;
    try {
        var history1 = JSAM.parse(historyStorage.getItem(history_session_object_key));
        if (history1 && history1.wlength === window_history.length) history = history1;
        else savestate();
    } catch (e) {
    }
};
setStorage(historyStorage);
var root_path;
var savestate = function () {
    history.wlength = window_history.length;
    historyStorage.setItem(history_session_object_key, JSAM.stringify(history) || null);
};
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
        var index = _history.index;
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
            index = _history.index;
        }
        _history.lastIndex = index;
    }
    savestate();
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
var fixlock = false;
var fixUnlock = function () {
    fixlock = false;
}
var fixNext = function (d) {
    fixlock = true;
    var h = history[current_history];
    h.lastIndex = h.index;
    preventNextHashChange = true;
    window_history.go(d);
    setTimeout(fixUnlock, 60);
    setTimeout(fixurl, 60);
};
var fixurl = function () {
    if (fixlock) return;
    if (false === fullfill_is_dispatched) return;
    var zimoli_hash = getCurrentHash();
    var location_hash = getLocationHash();
    if (location_hash === zimoli_hash) return;
    var location_path = pathFromHash(location_hash);
    if (location_path === popupHashlessPath) {
        fixNext(-1);
        return;
    };
    var zimoli_path = pathFromHash(zimoli_hash);
    if (zimoli_path === popupHashlessPath) return setLocationHash(zimoli_hash);
    if (zimoli_hash) {
        if (!location_hash) setLocationHash(zimoli_hash);
        else {
            var _history = history[current_history];
            var d = _history.index - _history.lastIndex;
            if (d) {
                fixNext(d);
                return;
            }
            if (location_hash !== zimoli_hash) {
                setLocationHash(zimoli_hash);
            }
        }
    }
    else if (location_path !== getInitPath()) {
        var _history = history[current_history];
        var i = _history.indexOf(location_path);
        if (i === -1) i = _history.lastIndex, _history.lastIndex = _history.index;
        if (i > 0) fixNext(-i);
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
    if (hty[hty.index - 1] === pgpath) {
        backward();
        return;
    }
    if (!hty.wardable) return;
    if (hty[hty.index + 1] === pgpath) {
        go(1);
    }
    else {
        go(pgpath);
    }
};
var backward = function () {
    if (rootElements.length) {
        var onback = checkonback(rootElements.slice(rootElements.length - 1));
        if (onback === false) {
            fixurl();
            return;
        }
        remove(rootElements.pop());
        fixurl();
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
var fixLock = false;
function addGlobal(element, name = null, isBack) {
    var hasLock = !fixLock;
    if (hasLock) fixLock = true;
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
                oldElement = oldPrev || oldPare?.firstChild;
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
        var upwith = $upwith.get(element) || rootElements;
        if (upwith.indexOf(element) < 0) upwith.push(element);
    }
    if (hasLock) fixurl(), fixLock = false;
}
var _switch = zimoli.switch = function (history_name = default_history, target_body = document.body, emptyState) {
    if (!arguments.length) {
        current_history = default_history;
        body = document.body;
    }
    else {
        if (isString(history_name)) {
            current_history = history_name = history_name.replace(/\/$/, '') + "/";
            if (!zimolicd) default_history = current_history;
        }
        if (target_body) body = target_body;
    }
    if (isHandled(emptyState) && emptyState !== false) {
        if (isObject(emptyState)) {
            var { path: pagepath, need, roles = need, data: args, id, options } = emptyState;
            setZimoliParams(pagepath, { roles, data: args, id, options });
            emptyState = pagepath;
        }
    }
    if (isString(emptyState)) {
        if (!history[current_history]) root_path = (history[current_history] = createEmptyHistory(emptyState))[0];
        else {
            var _history = history[current_history];
            if (_history.index === 0 && _history.length <= 1) root_path = _history[0] = emptyState;
        }
    }
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
var upwith = [];
zimoli.upwith = popup.upwith(upwith);
zimoli.setStorage = setStorage;
zimoli.register = function (pathlike, realpath) {
    var params = [];
    pathlike = pathlike.replace(/\/\:([^\/\:\-]+)/g, function (_, id) {
        params.push(id);
        return '';
    });
    pathmaped[pathlike] = params;
    if (realpath) realmaped[pathlike] = realpath;
};
zimoli.clearHistory = function () {
    historyStorage.removeItem(history_session_object_key);
    history = {};
};
zimoli.getCurrentHistory = function () {
    var h = history[current_history];
    if (h) h = h.slice(0, h.index + 1);
    else h = [];
    return h;
};
zimoli.inithash = locationInitHash;
zimoli.createState = createState;
// 赤匪最擅长的是移花接木。别人写好的文章，它改一下作者名，就成了它写的；别人种的粮食，它抢过来，说是别人贡献的。
// 赤匪在中国设置各种语言陷井，欺压民众，不让民众发声，还说这是民众对它的信任。
// 家中进了贼，我们是把家让给它，还是找机会把贼杀了。
var getInitPath = zimoli.getInitPath = function () {
    var h = history[current_history];
    if (!h) return locationInitHash;
    if (h.length < 2) return pathFromHash(locationInitHash);
    return h[0];
};
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
                        backwardTarget = create(path0, null, path1, null, getZimoliParams(path0));
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
                        forwardTarget = create(path2, null, path1, null, getZimoliParams(path2));
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
                fixurl();
                backwardTarget.disptch();
            }
            else if (historyList.index < historyList.length - 1 && (deltaX < 0 && ratio < -.1 || deltaX > 0 && ratio < -.9 || deltaX === 0 && ratio < -.4)) {
                pushstate(historyList[historyList.index + 1], history_name);
                setWithStyle(currentTarget, false);
                remove(currentTarget);
                remove(backwardTarget, false);
                transition(forwardTarget, 1);
                global[history_name] = forwardTarget;
                fixurl();
                forwardTarget.disptch();
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
var reloadFully = function () {
    for (var k in history) {
        var h = history[k];
        if (!h) continue;
        if (h instanceof Array) h.forEach(a => {
            [a] = getpgpath(a);
            delete modules[a];
            delete page_generators[a];
        })
        var g = global[k];
        if (g) remove(g);
        delete global[k];

    }
    var loginpath = user.loginPath;
    if (loginpath) {
        delete modules[loginpath];
        delete page_generators[loginpath];
    }
    current_history = default_history;
    body = document.body;
    zimoli();
}
var reloadMounted = function () {
    for (var k in global) {
        var o = global[k];
        if (!o || !o.$reload) continue;
        if (isMounted(o)) o.$reload();
    }
}
zimoli.reload = function (reloadAll = true) {
    if (!reloadAll) reloadMounted();
    else reloadFully();
};
zimoli.alert = function () {
    var ae = alert.apply(this, arguments);
    zimoli.upwith(ae.parentNode);
    return ae;
};