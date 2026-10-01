try { var localStorage = window.localStorage; } catch { forceRequest.localStorage = forceRequest.sessionStorage = true }
var flush_to_storage_timer = 0,
    responseTree_storageKey = "zimoliAutoSavedResponseTree" + location.pathname;
var loadResponseTreeFromStorage = preventCodeStorage ? function () { } : function () {
    "use ./crc.js";
    var load = function (name) {
        var data = localStorage.getItem(responseTree_storageKey);
        if (!data) return;
        var responseTextArray = data.split("，");
        for (var cx = 0, dx = responseTextArray.length; cx < dx; cx++) {
            var kv = responseTextArray[cx].split("：");
            var [responseName, version, responseText] = kv;
            preLoadVersionTree[responseName] = version;
            preLoadResponseTree[responseName] = responseText;
        }
    };
    var preLoadResponseTree = {};
    var preLoadVersionTree = {};
    load();
    preLoad = function (responseName) {
        if (hasOwnProperty.call(responseTree, responseName)) return;
        var version = preLoadVersionTree[responseName];
        if (!version) return;
        var responseText = preLoadResponseTree[responseName];
        var sum = crc.string(responseText).toString(36);
        if (sum + version.slice(sum.length) === versionTree[responseName])
            responseTree[responseName] = responseText;
    };
};

if (localStorage) loadResponseTreeFromStorage();
var saveResponseTreeToStorage = preventCodeStorage || !localStorage ? function () { } : function () {
    var responseTextArray = [];
    for (var k in versionTree) {
        if (hasOwnProperty.call(responseTree, k)) responseTextArray.push(
            k + "：" + versionTree[k] + "：" + responseTree[k]
        );
    }
    var data = responseTextArray.join("，");
    localStorage.setItem(responseTree_storageKey, data);
};
