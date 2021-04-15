"use strict";
var getRequired = require("../compile/required");
var getArgs = require("./getArgs");
var getPathIn = require("./getPathIn");
var { comms_root } = require("./environment");
var path = require("path");
function getInitReferenced(dependence, args, argNames, data) {
    var requires = ["init"].map(a => dependence.indexOf(a)).filter(a => ~a);
    if (!requires.length) return [];
    var initReg = new RegExp(`\\b(?:${requires.map(a => args[a]).join("|")})${/\s*\((['"`]|)([_$\w\/\\\.\-]+)\1\s*[,\)]/.source}`, 'g');
    var required = [];
    args = args.slice(args.length - argNames.length);
    data.replace(initReg, function (match, quote, refer) {
        if (quote) {

            required.push(refer);
        } else {
            var index = args.indexOf(refer);
            if (~index) {
                required.push(argNames[index]);
            }
        }
        return match;
    });
    return required;
}
var get_relatives = function (name, required, dependence) {
    var required_base = name.replace(/[^\/\$]+$/, "");
    required_base = required_base.replace(/^\.?[\/\$]+/, "");
    var map = dependence.requiredMap = Object.assign(Object.create(null), dependence.requiredMap);

    return required.map(r => {
        map[r] = r;
        return r;
    });
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
    if (ext && !/^([cm]?[jt]sx?|vuex?|html)$/i.test(ext[1])) return [];

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
            required = get_relatives(response.url, required, dependence);
        }
        if (required1 && required1.length) {
            required1 = get_relatives(response.url, required1, dependence);
        }
        dependence.require = required1.concat(required || []);
    } else {
        var dependence = [];
        console.info("正在分析", response.realpath);
        var required = getRequired(data, required);
        required = get_relatives(response.url.slice(1), required, dependence);
        dependence.require = required || [];
    }
    var reqdir = response.isPackaged ? response.realpath : path.dirname(response.realpath);
    dependence.dirname = reqdir;
    response.time += new Date - startTime;
    return response.dependence = dependence;
}

module.exports = getDependence;