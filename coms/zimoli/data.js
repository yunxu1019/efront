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

class LoadingArray extends Array {
    totalCount = 0;
    data = [];
    is_errored = null;
    error_message = null;
    is_loading = true;
    is_readonly = null;
    loading_promise = null;
}

var data = {
    decodeStructure,
    encodeStructure,
    /**
     * 返回一个延长生命周期的内存对象
     * @param instanceId 数据唯一标识
     * @param onlyFromLocalStorage 是否只从localStorage加载
     */
    getInstauce(instanceId, onlyFromLocalStorage = false) {
        if (!instanceDataMap[instanceId]) {
            const data = instanceDataMap[instanceId] = new LoadingArray;
            const storageId = instanceId + pagePathName;
            Object.assign(data, JSON.parse(localStorage.getItem(storageId)));
            if (!onlyFromLocalStorage) {
                Object.assign(data, JSON.parse(sessionStorage.getItem(storageId)));
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
        const instance = this.getInstauce(instanceId);
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
        Object.assign(instance, data);
    }
};