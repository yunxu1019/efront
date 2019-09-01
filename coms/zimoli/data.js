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

function transpile(src, trans) {
    if (src instanceof Array) {
        return src.map(a => transpile(a, trans));
    }
    data = extend({}, src);
    for (var k in trans) {
        var v = trans[k];
        if (!(k in data)) {
            if (v in data) {
                data[k] = data[v];
                delete data[v];
            } else {
                data[k] = seek(src, v);
            }
        }
    }
    return data;
}

function seek(data, seeker) {
    if (data && data.querySelector) {
        return seeker ? data : data.querySelector(seeker);
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

var parseData = function (sourceText) {
    if (/^\s*([\{\[]|"|true|\d|false|null)/.test(sourceText)) {
        return JSON.parse(sourceText);
    } else {
        var doc = document.implementation.createHTMLDocument("");
        if (/^<!doctype/i.test(sourceText)) {
            doc.documentElement.innerHTML = sourceText;
        } else {
            doc.body.innerHTML = sourceText;
        }
        return doc;
    }
}
function isEmptyParam(param) {
    return param === null || param === undefined || param === '' || typeof param === 'number' && !isFinite(param);
}
function fixApi(api, href) {
    if (!reg.test(api.url)) {
        if (href) {
            if (api.url === '.') {
                api.url = href;
            } else {
                api.url = href + api.url;
            }
        }
    }
    api.method = api.method.toLowerCase();

}
function createApiMap(data) {
    const reg = /^(https?\:\/\/|\.?\/)/i;
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
                transpile(seek(parseData(e.response || e.responseText), seeker), getTranspile(url)))
            ).error(oh);
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
var data = {
    decodeStructure,
    encodeStructure,
    loadConfig(defaultConfigFile) {
        if (defaultConfigFile) {
            _configfileurl = defaultConfigFile;
            configPormise = null;
        }
        return privates.getConfigPromise();
    },
    fromURL(url) {
        privates.loadIgnoreConfig('get', url).then((data) => {
            this.setInstance(url, data);
        });
        return this.getInstance(url);
    },
    from(config) {

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