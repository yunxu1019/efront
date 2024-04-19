var globals = require("../efront/globals");
var memery = require("../efront/memery");
function reportMissing(responseTree) {
    var typeofMap = require("../efront/commbuilder").typeofMap;
    var deletedMap = Object.create(null);
    for (var k in responseTree) {
        if (!responseTree[k].realpath) {
            if (responseTree[k].warn) {
                deletedMap[k] = [];
                deletedMap[k].warn = responseTree[k].warn;
            }
            delete responseTree[k];
        }
    }
    function saveDeleted(key) {
        if (key in deletedMap) {
            if (!~deletedMap[key].indexOf(k)) {
                deletedMap[key].push(responseTree[k].realpath);
            }
        }
    }
    var typedColors = Object.create(null);
    var allDependence = Object.create(null);
    for (var k in responseTree) {
        let dependence = responseTree[k].dependence;
        if (!dependence) continue;

        dependence.forEach(saveDeleted);
        var requiredMap = dependence.requiredMap;
        for (var r in requiredMap) {
            saveDeleted(r);
            if (requiredMap[r] !== r) saveDeleted(requiredMap[r]);
        }
        var p = responseTree[k].realpath;
        var typeofs = typeofMap[p];
        if (typeofs) {
            typedColors[p] = Object.create(null);
            for (var t of typeofs) {
                if (globals[t]) typedColors[p][globals[t]] = true;
            }
        }
        allDependence[p] = dependence;
    }
    var missingMap = Object.create(null);
    var missingMap2 = Object.create(null);
    for (var k in deletedMap) {
        if (k in safeGlobals) continue;
        if (!memery.POLYFILL && k in globals) continue;
        for (var p of deletedMap[k]) {
            var typeofs = typeofMap[p];
            if (typeofs && typeofs.indexOf(p) >= 0) continue;
            var c = globals[k];
            if (c && p in typedColors && String(c) in typedColors[p]) continue;
            var map = allDependence[p].indexOf(k) >= 0 ? missingMap : missingMap2;
            if (!map[p]) map[p] = [];
            if (c) var k2 = `${c}${k}${colors.Reset}`;
            else k2 = `<red2>${k}</red2>`;
            if (map[p].indexOf(k2) < 0) map[p].push(k2);
        }
    }
    var fileNameColor = console.format(' <green>;</green> ').split(';');
    var splitPunctuator = console.format("<gray>,</gray> ");
    for (var k in missingMap) {
        console.warn(i18n`文件${fileNameColor.join(k)}用到可能不存在的外部变量: ${missingMap[k].join(splitPunctuator)}`);
    }
    for (var k in missingMap2) {
        console.warn(i18n`文件${fileNameColor.join(k)}用到可能不存在的外部模块: ${missingMap2[k].join(splitPunctuator)}`);
    }

}