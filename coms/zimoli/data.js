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
    loading_promise = null;
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

function transpile(data, trans) {
    if (data instanceof Array) {
        return data.map(a => transpile(a, trans));
    }
    data = extend({}, data);
    for (var k in trans) {
        var v = trans[k];
        if (v in data && !(k in data)) {
            data[k] = data[v];
            delete data[v];
        }
    }
    return data;
}

function seek(data, seeker) {
    seeker && seeker.split(".").forEach(function (key) {
        if (data !== null && data !== undefined && key in data) {
            data = data[key];
        }
    });
    return data;
}

function parseConfig(api) {
    // `method url?key=value&key=value#vid&vname&vicon name id?key1&key3 comment`
    var { method, url, id, name, comment } = api;
    var required = [];
    id.replace(/\?(.+?)$/, function (m, s) {
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
    return {
        method,
        url,
        id,
        name,
        comment,
        required
    };
}
function isEmptyParam(param) {
    return param === null || param === undefined || param === '' || typeof param === 'number' && !isFinite(param);
}
function createApiMap(data) {
    const reg = /^(https?\:\/\/|\.?\/)/i;
    const apiMap = {};
    var hasOwnProperty = {}.hasOwnProperty;
    function checkApi(api) {
        if (!reg.test(api.url)) {
            if (reg.test(data.href)) {
                if (api.url === '.') {
                    api.url = data.href;
                } else {
                    api.url = data.href + api.url;
                }
            }
        }
        api.method = api.method.toLowerCase();
        if (data.seek) {
            api.method += ":" + data.seek;
        }
        if (hasOwnProperty.call(apiMap, api.id)) {
            const lastApi = apiMap[api.id];
            console.warn(`多次设置的id相同的api:%c${api.id}`, 'color:red');
            console.log(`[${api.name}](${lastApi.method} ${api.url})\r\n 被 [${api.name}](${lastApi.method} ${lastApi.url}) 覆盖`);
        }
        apiMap[api.id] = api;
        return api;
    }
    data.items = formulaters.string('method url name id comment', data.items).map(parseConfig).map(checkApi);
    return apiMap;
}
var _configfileurl;
var configPormise;
var privates = {
    loadAfterConfig(serviceId, params) {
        return this.getApi(serviceId).then((api) => {
            let url = api.url;
            if (api.reauired) {
                var lacks = api.reauired;
                if (!params) {
                    lacks = lacks.filter(a => isEmptyParam(params[a]));
                }
                if (lacks.length) {
                    console.log(`跳过了缺少参数的请求:${api.uid} ${api.name} ${api.url}\r\n缺少参数：${lacks.join(', ')}`);
                    return Promise.resolve();
                }
            }
            return this.loadIgnoreConfig(api.method, url, params);
        });
    },
    getApi(serviceId) {
        return this.getConfigPromise().then((apiMap) => {
            const api = apiMap[serviceId];
            if (!api) { throw new Error(`没有找到对应的接口 id ${serviceId}.`); }
            return api;
        });
    },
    loadIgnoreConfig(method, url, params) {
        var [method, seeker] = method.split(":");
        method = method.toLowerCase();
        return new Promise(function (ok, oh) {
            cross(method, url).send(params).done(e => ok(
                transpile(seek(JSON.parse(e.response || e.responseText), seeker), getTranspile(url)))
            ).error(oh);
        });
    },

    getConfigPromise() {
        if (!configPormise) {
            configPormise = this.loadIgnoreConfig('get', _configfileurl)
                .then(createApiMap);
        }
        return configPormise;
    },

};
var data = {
    decodeStructure,
    encodeStructure,
    loadConfig(defaultConfigFile) {
        _configfileurl = defaultConfigFile;
        configPormise = null;
    },
    asyncInstance(id, params, parser) {
        privates.loadAfterConfig(id, params).then((data) => {
            this.setInstance(id, data);
        });
        return this.getInstance(id);
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
        return instanceDataMap[instanceId];
    },
    rebuildInstance(instance, data, old = instance) {
        if (instance === data) { return; }
        instance.splice(0, instance.length);
        Object.keys(old).forEach(function (k) {
            if (instance[k] === old[k]) {
                delete instance[k];
            }
        });
        extend(instance, data);
    }
};