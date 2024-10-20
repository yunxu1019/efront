"use strict";
var getRequired = require("../compile/required");
var getArgs = require("./getArgs");
var fs = require('fs');
var path = require("path");
var scanner2 = require("../compile/scanner2");
var strings = require("../basic/strings");
function getInitReferenced(dependence, args, argNames, data) {
    var requires = ["init", "popup"].map(a => dependence.indexOf(a)).filter(a => ~a);
    if (!requires.length) return [];
    var required = [];
    var index = dependence.indexOf('popup');
    if (index >= 0) var popup = args[index];
    var arg1 = args.slice(args.length - argNames.length);
    var scaned = scanner2(data);
    var { envs, used } = scaned;

    var get = function (u) {
        var next = u.next;
        if (!next || next.type !== scaned.SCOPED || next.entry !== "(") return;
        var a = next.first;
        if (!a) return;
        var an = a.next;
        if (an && (an.type !== scaned.STAMP || an.text !== ",")) return;
        if (a.type === scaned.QUOTED) {
            var refer = strings.decode(a.text);
        }
        else if (a.type === scaned.EXPRESS) {
            if (!(a.text in envs)) return;
            if (!used[a.text] || !~used[a.text].indexOf(a)) return;
            var index = arg1.indexOf(a.text);
            if (~index) {
                refer = argNames[index];
            }
        }
        if (refer) {
            if (u.text === popup) {
                refer = refer.replace(/^[#!@\+]+/, '');
                if (/^[\\\/]/.test(refer)) return;
            }
            required.push(refer);
        }
    };
    for (var r of requires) {
        var a = args[r];
        if (a in envs) {
            used[a].forEach(get);
        }
    }
    return required;
}
var get_relatives = function (name, required, dependence) {
    var map = dependence.requiredMap;
    if (!map) map = dependence.requiredMap = Object.create(null);
    return required.map(r => {
        map[r] = r;
        return r;
    });
};
var checkRealpath = function (realpath, required) {
    if (required.length) {
        var lacks = [];
        var base = realpath.replace(/[^\\\/]+$/, '');
        loop: for (var r of required) {
            if (/^\.+[\/\\]/.test(r)) {
                var p = path.join(base, r);
                if (fs.existsSync(p)) continue;
                for (var c of comexts) {
                    if (fs.existsSync(p + c)) continue loop;
                }
                lacks.push(r);
            }
        }
        if (lacks.length > 0) console.warn(i18n`文件${`<green>${realpath}</green>`}使用了不存在的模块${lacks.map(a => `<red2>${a}</red2>`).join(', ')}`);
    }
};
function getDependence(response) {
    if (!response.realpath) return [];
    if (response.type !== "" && response.type !== "/" && response.type !== "\\") return [];
    var { data = "" } = response;
    if (data.module) return [];
    if (data.invokes || data.procs) {
        var invokes = {};
        data.invokes.forEach(k => invokes[k] = true);
        data.procs.forEach(p => {
            p.invokes.forEach(k => invokes[k] = true);
        });
        invokes = Object.keys(invokes).map(a => a + response.extt);
        return invokes;
    }
    var ext = /\.([^\.]+)$/.exec(response.realpath);
    if (ext && !/^([cm]?[jt]sx?|vuex?|html|xht)$/i.test(ext[1])) return [];

    var startTime = new Date;
    data = String(data);
    if (response.type !== "\\") {
        var [argNames, functionBody, argsList, required, strs, offset] = getArgs(data);
        var dependence = argsList;
        dependence.args = argNames;
        var required1 = getInitReferenced(dependence, dependence.args, strs, functionBody);
        dependence.offset = offset;
        if (required) {
            required = required.split(";");
            required = required.filter(a => !/^\w+\:/i.test(a));
            required = get_relatives(response.url, required, dependence);
        }
        if (required1 && required1.length) {
            required1 = required1.filter(a => !/^\w+\:/i.test(a));
            required1 = get_relatives(response.url, required1, dependence);
        }
        dependence.require = required1.concat(required || []);
    } else {
        var dependence = [];
        console.info(i18n`正在分析`, response.realpath);
        var required = getRequired(data, required);
        required = get_relatives(response.url.slice(1), required, dependence);
        dependence.require = required || [];
    }
    checkRealpath(response.realpath, dependence.require);
    var reqdir = response.isPackaged ? response.realpath : path.dirname(response.realpath);
    dependence.dirname = reqdir;
    response.time += new Date - startTime;
    return response.dependence = dependence;
}

module.exports = getDependence;