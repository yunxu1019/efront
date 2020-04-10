function decodeStructure(object) {
    var { source, head, body } = object;
    if (body instanceof Array) {
        return body.map(function (arr) {
            var o = {};
            arr.map(function (a, cx) {
                var k = head[cx];
                var v = source[k][a];
                o[k] = v;
            });
            return o;
        })
    }
    return [];
}
function encodeStructure(array) {
    if (!array instanceof Array) return;
    var source = {};
    array.map(function (obj) {
        for (var k in obj) {
            var v = obj[k];
            if (v instanceof Object) continue;
            if (!source[k]) {
                source[k] = { inc: 0 };
            }
            var o = source[k];
            var s = JSON.stringify(v);
            if (!(s in o)) o[s] = o.inc++;
        }
    });
    var head = keys(source);
    var body = array.map(function (obj) {
        return head.map(function (k) {
            var v = JSON.stringify(obj[k]);
            return source[k][v];
        });
    });
    head.map(function (key) {
        var valuesmap = source[key];
        delete valuesmap.inc;
        source[key] = keys(valuesmap).map(JSON.parse);
    });
    return {
        source,
        head,
        body
    };
}
const pagePathName = location.pathname;
const instanceDataMap = {};
const cachedLoadingPromise = {};
const formulaters = {
    'string'(formulate, data) {
        if (data instanceof Array) {
            const keys = formulate.split(/(?:\s+|,)/);
            data = data.map(function (item) {
                if (typeof item === 'string') {
                    const res = {};
                    item.split(/(?:\s+|,)/).map((value, cx) => res[keys[cx]] = value);
                    return res;
                }
                return item;
            });
        }
        return data;
    },
    'function'(formulate, data, params) {
        return formulate(data, params);
    }
};
class LoadingArray extends Array {
    totalCount = 0;
    data = [];
    is_errored = null;
    error_message = null;
    is_loading = true;
    is_readonly = null;
    loading = null;
    loading_promise = null;
}
function getErrorMessage(error) {
    if (!(error instanceof Object)) return String(error);
    if (error instanceof Error) return String(error);
    var words = "reason,message,desc,descption,msg,err,error".split(',');
    while (words.length) {
        var a = words.shift();
        if (error[a]) {
            return String(error[a]);
        }
    }
    return JSON.stringify(error);
}
function getTranspile(url) {
    var transpile;
    var keys = ['id', 'name', 'icon'];
    url.replace(/#(.*?)$/, function (_, s) {
        s = s.split('&');
        s.forEach(function (p, cx) {
            if (p) {
                var [v, k = keys[cx] || v] = p.split("=").reverse();
                if (!transpile) transpile = {};
                transpile[k] = v;
            }
        });
        return '';
    });
    return transpile;
}

function transpile(src, trans, apiMap) {
    if (!trans) return src;
    if (src instanceof Array) {
        return src.map(a => transpile(a, trans, apiMap));
    }
    data = extend({}, src && src.querySelector ? null : src);
    for (var k in trans) {
        var v = trans[k];
        if (!(k in data)) {
            if (v in data) {
                data[k] = data[v];
                delete data[v];
            } else {
                data[k] = seek(src, v, apiMap);
            }
        }
    }
    return data;
}
function getParamsFromUrl(url, s = "?") {
    var index = url.indexOf(s);
    if (index < 0 || index >= url.length - 1) return;
    return parseKV(url.slice(index + 1));
}
function getUrlParamsForApi(api, url) {
    var r = /([\s\S]*?)/.source;
    var cap = [];
    var base = api.url.replace(/[\?\#][\s\S]*$/, '')
        .replace(/[\.\*\+\-\[\]\{\}\(\)\\\/\!\<\>\^]/g, '\\$&')
        .replace(/\:\w+/, function (a) {
            cap.push(a.slice(1));
            return r;
        });
    var params = {};
    url = url.replace(/[\?#]*$/g, function (match) {
        match.split(/[&#\?]+/).forEach(function (s) {
            var [k, v] = s.split("=");
            params[k] = v;
        });
        return ''
    }).replace(new RegExp(`^${base}$`, 'ig'), function () {
        var args = arguments;

        cap.forEach(function (a, cx) {
            params[a] = args[cx + 1];
        });
    });
    params = serialize(params);
    return api.id + "?" + params;
}
function seek(data, seeker, apiMap = {}) {
    if (data && data.querySelector) {
        if (!seeker) return data;
        seeker = unescape(seeker);
        var reg = /^(\[\]|,)|(\[\]|,)$/g;
        if (reg.test(seeker)) {
            return [].concat.apply([], data.querySelectorAll(seeker.replace(reg, '')));
        }
        var reg = /[\|\?\!\/]/;
        if (reg.test(seeker)) {
            var [selector, prop] = seeker.split(reg);
        } else {
            var selector = seeker;
        }
        if (selector) {
            data = data.querySelector(selector);
        }
        if (data && prop) {
            var reg1 = /\:/;
            if (reg1.test(prop)) {
                var [prop, next] = prop.split(reg1);
                next = apiMap[next];
            }
            data = data.getAttribute(prop) || data[prop];
            if (isString(data) && /\|/.test(seeker)) {
                data = data.trim();
            }
            if (isString(data) && /\//.test(seeker) && /^\s*(\{[\s\S]*\}|\[[\s\S]*\]|true|false|null|[\d\.]*|"[\s\S]*")\s*$/.test(data)) {
                data = JSON.parse(data);
            }
            if (next) {
                data = getUrlParamsForApi(next, data);
            }
            return data;
        }
        return data;
    }
    if (seeker) {
        seeker.split(".").forEach(function (key) {
            if (data !== null && data !== undefined && key in data) {
                data = data[key];
            }
        });
    }
    return data;
}

function parseConfig(api) {
    // `method url(?key=value(&key=value)*)?(#vid(&vname(&vicon)?)?)? name id(?key1)?(&key3)* comment?`
    var { method = "", url = "", id = "", name = "", comment } = api;
    var required = [];
    id = id.replace(/\?(.+?)$/, function (m, s) {
        s = s.split('&');
        s.forEach(function (p) {
            if (p) {
                var [k, v = k] = p.split("=");
                if (!required[k]) {
                    required.push(k);
                }
                required[k] = v;
            }
        });
        return '';
    });
    url.replace(/[\?\#][\s\S]*$/, '').replace(/\:\w+/g, function (p) {
        p = p.slice(1);
        if (!required[p]) {
            required.push(p);
            required[p] = p;
        }
    });
    return {
        method,
        url,
        id,
        name,
        comment,
        required
    };
}
var isWorseIE = /msie\s+[2-9]/i.test(navigator.userAgent);
var parseData = function (sourceText) {
    if (/^\s*([\{\[]|"|true|\d|false|null)/.test(sourceText)) {
        // JSON 格式
        try {
            return JSON.parse(sourceText);
        } catch (e) { console.log(e); }
    }
    if (/^\s*\</i.test(sourceText)) {
        // XML 格式
        var doc = document.implementation.createHTMLDocument('');
        if (isWorseIE) {

            sourceText = sourceText
                .replace(/<!--[\s\S]*?-->|<\[CDATA\[[\s\S]*?\]\]>/ig, '')
                .replace(/^[\s\S]*?<html>([\s\S]*)<\/html>[\s\S]*?$/i, '$1')
                .replace(/^[\s\S]*?<body>([\s\S]*?)$/i, '$1')
                .replace(/<\/body>[\s\S]*?$/, '');
            doc.body.innerHTML = sourceText;
        } else {
            doc.documentElement.innerHTML = sourceText;
        }
        return doc;
    }
    if (/^[\s\_\.\w\$]+\s*\([\s\S]*\)\s*;?\s*$/.test(sourceText)) {
        // JOSNP 格式
        try {
            return JSON.parse(sourceText.replace(/^[^\(]+\(([\s\S]*)\)[^\)]*$/, "$1"));
        } catch (e) { console.log(e); }
    }
    return sourceText;
}
function fixApi(api, href) {
    if (!reg.test(api.url)) {
        if (href) {
            var paramReg = /(?:\?([\s\S]*?))?(?:#([\s\S]*))?$/;
            if (/[\?#]/.test(href)) {
                var [, extraSearch, extraHash] = paramReg.exec(href);
                href = href.replace(paramReg, '');
            }
            if (/^\.([\?\#][\s\S]*)?$/.test(api.url)) {
                api.url = href + api.url.replace(/^\./, "");
            } else {
                api.url = href + api.url;
            }
            if (extraSearch || extraHash) {
                if (/[\?#]/.test(api.url)) {
                    var [, search, hash] = paramReg.exec(api.url);
                }
                var url = api.url.replace(paramReg, '');
                if (extraSearch) {
                    search = search ? extraSearch + '&' + search : extraSearch;
                }
                if (extraHash) {
                    hash = hash ? extraHash + '&' + hash : extraHash;
                }
                if (search) url += '?' + search;
                if (hash) url += "#" + hash;
                api.url = url;
            }
        }
    }
    api.method = api.method.replace(/^\w+/, a => a.toLowerCase());
}
const reg = /^(https?\:\/\/|\.?\/)/i;
function createApiMap(data) {
    const apiMap = {};
    var hasOwnProperty = {}.hasOwnProperty;
    var href;
    function checkApi(api) {
        fixApi(api, href);
        if (hasOwnProperty.call(apiMap, api.id)) {
            const lastApi = apiMap[api.id];
            console.warn(`多次设置的id相同的api:%c${api.id}`, 'color:red');
            console.log(`[${api.name}](${lastApi.method} ${api.url})\r\n 被 [${api.name}](${lastApi.method} ${lastApi.url}) 覆盖`);
        }
        apiMap[api.id] = api;
        return api;
    }
    var items1 = data;
    for (var key in items1) {
        var [base] = key.split(/\s+/).filter(a => reg.test(a));
        if (!base) continue;
        href = /(https?\:)?|\.?\//i.test(base) ? base : '';
        var item1 = items1[key];
        var items = Object.keys(item1).map(function (k1) {
            return k1 + " " + item1[k1];
        });
        formulaters.string('id method url name comment', items).map(parseConfig).map(checkApi);
    }
    return apiMap;
}
var _configfileurl;
var configPormise;
var privates = {
    loadAfterConfig(serviceId, params) {
        var promise = this.getApi(serviceId).then((api) => {
            params = this.pack(serviceId, params);
            return this.fromApi(api, params);
        });
        return promise;
    },
    pack(serviceId, params) {
        if (/\?/.test(serviceId)) {
            params = extend({}, getParamsFromUrl(serviceId), params);
            serviceId = serviceId.replace(/\?[\s\S]*$/, '');
        }
        if (/\:/.test(serviceId)) {
            var params1 = extend({}, params);
            var temp = getParamsFromUrl(serviceId, ":");
            for (var k in temp) {
                var v = temp[k];
                if (v in params) {
                    params1[k] = params[v];
                }
                if (!(v in temp)) {
                    delete params1[v];
                }
            }
        }
        return params;
    },
    fromApi(api, params) {
        let url = api.url;
        if (this.validApi(api, params)) return this.loadIgnoreConfig(api.method, url, params, api.root);
        return Promise.resolve();
    },

    validApi(api, params) {
        if (api.required) {
            var lacks = api.required;
            if (params) {
                lacks = lacks.filter(a => isEmpty(params[a]));
            }
            if (lacks.length) {
                console.log(`跳过了缺少参数的请求:${api.id} ${api.name} ${api.url}\r\n缺少参数：${lacks.join(', ')}`);
                return false;
            }
        }
        return true;
    },
    getApi(serviceId) {
        return this.getConfigPromise().then((apiMap) => {
            serviceId = serviceId.replace(/[\?\:][\s\S]*$/, "");
            const api = apiMap[serviceId];
            if (!api) { throw new Error(`没有找到对应的接口 id ${serviceId}.`); }
            return extend({}, api, { root: apiMap });
        });
    },
    prepare(method, url, params) {
        var spliterIndex = /[\:\|\/\~\!\?]/.exec(method);
        if (spliterIndex) spliterIndex = spliterIndex.index;
        else spliterIndex = method.length;
        var coinmethod = method.slice(0, spliterIndex).toLowerCase()
        var realmethod = coinmethod.replace(/\W+$/g, '');
        var uri = url.replace(/#[\s\S]*$/, "");
        params = extend({}, params);
        if (/\?/.test(uri)) var search = uri.replace(/^[\s\S]*?\?/, "");
        var rest = [];
        var baseuri = uri.replace(/\?[\s\S]*$/, "").replace(/\:[a-z\_][\w]*/i, function (d) {
            d = d.slice(1);
            rest.push(d);
            return seek(params, d) || '';
        });
        var hasOwnProperty = {}.hasOwnProperty;
        if (search) {
            var searchParams = parseKV(search);
            for (var k in searchParams) {
                if (hasOwnProperty.call(searchParams, k) && hasOwnProperty.call(params, k)) {
                    searchParams[k] = params[k];
                    rest.push(k);
                }
            }
            search = serialize(searchParams);
            uri = baseuri + "?" + search;
        } else {
            uri = baseuri;
        }

        rest.forEach(k => delete params[k]);
        return { method: realmethod, coinmethod, selector: method.slice(spliterIndex + 1), search, baseuri, uri, params };
    },
    loadIgnoreConfig(method, url, params, apiMap) {
        var { method: realmethod, uri, baseuri, coinmethod, search, selector, params } = this.prepare(method, url, params);
        var id = realmethod + " " + baseuri;
        var promise = cachedLoadingPromise[id];
        var temp = JSON.stringify(params);
        var currentTime = +new Date;
        if (!promise || currentTime - promise.time > 60 || temp !== promise.params || promise.search !== search) {
            var promise = new Promise(function (ok, oh) {
                cross(realmethod, uri).send(params).done(e => {
                    ok(e.response || e.responseText);
                }).error(xhr => {
                    try {
                        oh(parseData(xhr.response || xhr.responseText || xhr.statusText || xhr.status));
                    } catch (error) {
                        oh(error);
                    }
                });
            });
            promise.search = search;
            promise.params = temp;
            promise.time = currentTime;
            cachedLoadingPromise[id] = promise;
        }
        return promise.then(function (response) {
            if (/\*$/.test(coinmethod)) return response;
            return transpile(seek(parseData(response), selector), getTranspile(url), apiMap);
        });
    },

    getConfigPromise() {
        if (!configPormise) {
            if (!_configfileurl) {
                throw new Error("没有指定配置文件的路径，请使用data.loadConfig加载配置");
            }
            configPormise = this.loadIgnoreConfig('get', _configfileurl)
                .then(createApiMap);
        }
        return configPormise;
    },

};
var instanceId = 0;
var getInstanceId = function () {
    if (instanceId++ === instanceId) {
        instanceId = 1;
    }
    return instanceId;
}
var error_report = isProduction ? alert : function (error, type) {
    error_report = alert;
    error_report(error, type)
    console.info("已使用默认的报错工具，您可以使用 data.setReporter(f7) 替换! 本信息在仅在开发环境显示。");
};
var data = {
    decodeStructure,
    encodeStructure,
    setReporter(report) {
        if (report instanceof Function) {
            error_report = report;
        }
    },
    loading_count: 0,
    loadConfig(defaultConfigFile) {
        if (defaultConfigFile) {
            _configfileurl = defaultConfigFile;
            configPormise = null;
        }
        return privates.getConfigPromise();
    },
    setConfig(data) {
        configPormise = Promise.resolve(data).then(createApiMap);
    },
    from(ref, params, parse) {
        if (params instanceof Function) {
            parse = params;
            params = {};
        }
        if (ref instanceof Object) {
            return this.fromApi(ref, params)
        } else
            if (/^\.*\/|\.\w+$/.test(ref)) {
                return this.fromURL(ref, parse);
            } else {
                return this.asyncInstance(ref, params, parse);
            }
    },

    enrich(config = configPormise, userAgent) {
        if (!config) return;
        if (isString(config)) {
            config = privates.loadIgnoreConfig('get', config).then(createApiMap);
        } else if (!(config instanceof Promise)) {
            if (!(config instanceof Object)) return;
            config = Promise.resolve(config);
        }
        return enrich({
            from(id, params) {
                return config.then(function (data) {
                    var a = data[id];
                    return privates.fromApi(a, params);
                });
            },
            queue(ids, params, cb) {
                ids = ids.slice(0);
                config.then(function (res) {
                    return new Promise(function (ok) {
                        var run = function (res) {
                            if (!ids.length) return ok(res);
                            var id = ids.pop();
                            var a = data[id];
                            privates.fromApi(a, res).then(run);
                        };
                        run(params);
                    });

                })
            },
        });
    },
    fromApi(api, params, parse) {
        var id = parse instanceof Function ? getInstanceId() : 0;
        if (id) this.removeInstance(id);
        var url = api.url;
        var data = this.getInstance(id || url);
        data.loading_promise = privates.fromApi(api, params).then((data) => {
            if (id) {
                this.setInstance(id, parse(data), false);
                this.removeInstance(id);
            } else {
                this.setInstance(url, data);
            }
            return data;
        });
        return data;

    },
    fromURL(url, parse) {
        var id = parse instanceof Function ? getInstanceId() : 0;
        if (id) this.removeInstance(id);
        var data = this.getInstance(id || url);
        data.loading_promise = privates.loadIgnoreConfig('get', url).then((data) => {
            if (id) {
                this.setInstance(id, parse(data), false);
                this.removeInstance(id);
            } else {
                this.setInstance(url, data);
            }
            return data;
        });
        return data;
    },
    asyncInstance(sid, params, parse) {
        // 不同参数的请求互不影响
        var id = parse instanceof Function || params ? getInstanceId() : 0;
        if (id) this.removeInstance(id);
        var response = this.getInstance(id || sid);
        response.is_loading = true;
        this.loading_count++;

        var p = response.loading_promise = privates.loadAfterConfig(sid, params).then((data) => {
            this.loading_count--;
            response.is_loading = false;
            if (id) {
                this.setInstance(id, parse instanceof Function ? parse(data) : data, false);
                this.removeInstance(id);
            } else {
                this.setInstance(sid, data);
            }
            return data;
        });
        p.catch((e) => {
            console.log(e);
            this.loading_count--;
            response.is_errored = true;
            response.is_loading = false;
            response.error_message = getErrorMessage(e);
            response.error_object = e;
            if (e instanceof Object) {
                extend(response, e);
            } else {
                response.error = e;
            }
            error_report(response.error_message, 'error');
        });
        return response;
    },

    lazyInstance() {
        var sid, params1, parse, timeout = 600;
        // 不论参数是否一样，后一个请求都会覆盖前一个请求
        [].forEach.call(arguments, function (arg) {
            switch (typeof arg) {
                case "string":
                    if (!sid) sid = arg;
                    else params1 = arg;
                    break;
                case "number":
                    timeout = arg;
                    break;
                case "function":
                    parse = arg;
                    break;
                default:
                    params1 = arg;
            }
        });
        var id = "." + sid;
        var instance = this.getInstance(id);
        var promise1 = instance.loading_promise;
        if (promise1) {
            var params = promise1.params;
            if (deepEqual.shallow(params1, params)) {
                return instance;
            }
        }
        var outdate = new Error("outdate canceled.");
        promise1 = instance.loading_promise = new Promise(function (ok) {
            setTimeout(ok, timeout);
        }).then(function () {
            if (promise1 !== instance.loading_promise) throw outdate;
            return privates.getApi(sid);
        }).then(function (api) {
            if (promise1 !== instance.loading_promise) throw outdate;
            if (instance.loading) {
                instance.loading.abort();
            }
            var params = privates.pack(sid, params1);
            if (!privates.validApi(api, params)) throw outdate;

            var { method, uri, params, selector } = privates.prepare(api.method, api.url, params);
            var promise = new Promise(function (ok, oh) {
                instance.loading = cross(method, uri).send(params).done(xhr => {
                    if (instance.loading !== xhr) return oh(outdate);
                    instance.loading = null;
                    ok(xhr.responseText || xhr.response);
                }).error(xhr => {
                    if (instance.loading !== xhr) return oh(outdate);
                    instance.loading = null;
                    try {
                        oh(parseData(xhr.response || xhr.responseText || xhr.statusText || xhr.status));
                    } catch (error) {
                        oh(error);
                    }
                });
            }).then(function (response) {
                return transpile(seek(parseData(response), selector), getTranspile(api.url), api.root);
            });
            return promise;
        }).then((data) => {
            if (instance.loading_promise !== promise1) return;
            if (id) {
                this.setInstance(id, parse instanceof Function ? parse(data) : data, false);
            } else {
                this.setInstance(sid, data);
            }
        });
        promise1.catch(function (e) {
            if (e == outdate) return;
            instance.is_errored = true;
            instance.error_message = getErrorMessage(e);
            instance.error_object = e;
            if (e instanceof Object) {
                extend(instance, e);
            } else {
                instance.error = e;
            }
            error_report(instance.error_message, 'error');
        });

        return instance;
    },
    /**
     * 返回一个延长生命周期的内存对象
     * @param instanceId 数据唯一标识
     * @param onlyFromLocalStorage 是否只从localStorage加载
     */
    getInstance(instanceId, onlyFromLocalStorage = false) {
        if (!instanceDataMap[instanceId]) {
            const data = instanceDataMap[instanceId] = new LoadingArray;
            const storageId = instanceId + pagePathName;
            extend(data, JSON.parse(localStorage.getItem(storageId)));
            if (!onlyFromLocalStorage) {
                extend(data, JSON.parse(sessionStorage.getItem(storageId)));
            }
            data.is_loading = false;
        }
        return instanceDataMap[instanceId];

    },
    removeInstance(instanceId) {
        delete instanceDataMap[instanceId];
        localStorage.removeItem(instanceId);
        sessionStorage.removeItem(instanceId);
    },
    /**
     * 设置一个延长生命周期的数据对象
     * @param {*} instanceId 数据唯一标识
     * @param {*} data 数据本体
     * @param {boolean|number} [rememberWithStorage=0] 是否存储到localStorage，默认为否，只存储到sessionStorage
     */
    setInstance(instanceId, data, rememberWithStorage = 0) {
        const instance = this.getInstance(instanceId);
        this.rebuildInstance(instance, data);
        const storageId = instanceId + pagePathName;
        if (rememberWithStorage !== false) {
            sessionStorage.setItem(storageId, JSON.stringify(data));
        }
        if (rememberWithStorage) {
            localStorage.setItem(storageId, JSON.stringify(data));
        }
        dispatch(window, 'render');
        return instanceDataMap[instanceId];
    },
    rebuildInstance(instance, data, old = instance) {
        if (instance === data) { return; }
        instance.splice(0, instance.length);
        var sample = new LoadingArray;
        Object.keys(old).forEach(function (k) {
            if (instance[k] === old[k] && !(k in sample)) {
                delete instance[k];
            }
        });
        extend(instance, data);
    }
};

care(data, 'error')