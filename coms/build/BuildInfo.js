var memery = require("../efront/memery");
var isLib = require("../efront/isLib");
var path = require('path');
var {
    comms_root,
    pages_root,
    PAGE_PATH,
    aapis_root
} = require('./environment');
var commap = null;
var backmap = null;
var filecomm = null;
var match = function (url) {
    var match = url.match(/^(.*?)(\/|\.|\*|\:|\\|~|!|\^|\?|\||\+|\-|)(.+?)(\.[^\/\\.]+|\/|\\)?$/);
    return match;
}
var BuildInfo = function () {
};
var noopbuilder = a => a;
BuildInfo.prototype = {
    toString() {
        return this.data || "";
    },
    get imported() {
        return this.data.imported;
    },
    set imported(v) {
        this.data.imported = v;
    },
    get prequoted() {
        return this.data.prequoted;
    },
    // 函数是否与异步函数返回值一致
    get isAsync() {
        return this.data.isAsync;
    },
    // 函数是否与步进函数返回值一致
    get isYield() {
        return this.data.isYield;
    },
    // 当前状态是否需要包装异步函数
    get async() {
        return this.data.async;
    },
    // 当前状态是否需要包装步进函数
    get yield() {
        return this.data.yield;
    },
    get required() {
        return this.data.required;
    },
    set required(v) {
        this.data.required = v;
    },
    get strkeeps() {
        return this.data.strkeeps;
    },
    get refered() {
        return this.data.refered;
    },
    get strkeys() {
        return this.data.strkeys;
    },
    get reqlinks() {
        return this.data.reqlinks;
    },
    get params() {
        return this.data.params;
    },
};
Object.defineProperty(BuildInfo, 'commap', {
    get() {
        return commap;
    },
    set(v) {
        commap = v;
        filecomm = commap["?"];
    }
})
Object.defineProperty(BuildInfo, 'backmap', {
    get() {
        return backmap;
    },
    set(v) {
        backmap = v;
    }
})

var realInfo = function (type, dest, rel, realpath, extt1) {
    var url = String(rel).replace(/[\\\/]+/g, "/");
    var name = url.replace(/\.[^\.]*$/, '');
    var extt = url.slice(name.length);
    if (extt1 === undefined) extt1 = extt;
    var destpath = path.join(dest, name + extt1);
    return new BuildInfo(...{
        type,
        url,
        name,
        extt,
        realpath,
        destpath,
    });
}

var fromComm = function (rel, file) {
    if (!memery.MODULES && isLib(file)) {
        return fromLlib(rel, file);
    }
    var url = String(rel).replace(/[\\\/]+/g, "$");
    var name = url.replace(/\.[^\.]*$/, '');
    var extt = url.slice(name.length);
    name = name.replace(/\-([\s\S])/g, (_, a) => a.toUpperCase());
    var destpath = path.join("comm", name + memery.EXTT);
    return new BuildInfo(...{
        type: '',
        url,
        name,
        extt,
        realpath: file,
        destpath,
    });
};
var fromNoop = function (name) {
    return new BuildInfo(...{
        type: "*",
        url: name,
        name: name,
        extt: '',
        destpath: name,
        islone: true,
    });
};
var fromPage = function (rel, file) {
    if (/\.html?$/i.test(rel, file)) {
        return realInfo("/", '', "/" + rel, file);
    }
    if (/\.(jsp|asp|php)$/i.test(file)) {
        return fromDyna(rel, file);
    }
    if (!/\.([cm]?[jt]sx?|xht|vuex?)$/i.test(file)) {
        return fromLone(rel, file);
    }
    return realInfo("/", 'page', "/" + rel, file, memery.EXTT);
};
var fromDyna = function (rel, file) {
    var info = realInfo("%", '', "/" + rel, file);
    info.islone = true;
    info.isback = true;
    return info;
};
var fromWarn = function (rel, error) {
    return new BuildInfo(...{ type: "*", url: rel, name: rel, warning: error })
}
var fromLone = function (rel, file) {
    var info = realInfo("~", '', "/" + rel, file);
    info.islone = true;
    return info;
};
var fromCopy = function (rel, file) {
    return realInfo('*', '', "/" + rel, file);
};
var fromLlib = function (rel, file) {
    return realInfo("\\", '', rel, file);
};
var fromAapi = function (rel, file) {
    var info = realInfo("-", "#aapi", rel, file, ".png");
    info.url = info.name + '.png'
    info.islone = true;
    info.isback = true;
    return info;
};
var fromAbpi = function (rel) {
    var file = backmap[rel];
    if (file) return realInfo("+", "#abpi", rel, file, '.png');
}
var fromFolder = function (folder) {
    var rel = getPathIn(comms_root, folder);
    if (rel) {
        var info = fromComm(rel, folder);
        info.isfolder = true;
        return info;
    }
    var rel = getPathIn(pages_root, folder);
    if (rel) {
        var info = fromPage(rel, folder);
        info.isfolder = true;
        return info;
    }
};

var fromFile = function (file) {
    if (file in filecomm) {
        return fromComm(filecomm[file], file);
    }
    var rel = getPathIn(aapis_root, file);
    if (rel) {
        return fromAapi(rel, file);
    }
    var rel = getPathIn(comms_root, file);
    if (rel) {
        return fromComm(rel, file);
    }
    var rel = getPathIn(pages_root, file);
    if (rel) {
        return fromPage(rel, file);
    }
    var rel = getPathIn(PAGE_PATH.split(","), file);
    if (rel) {
        return fromCopy(rel, file);
    }
}
BuildInfo.fromRoot = function (rel) {
    if (rel in commap) return fromComm(rel, commap[rel]);
    return fromNoop(rel);
};
BuildInfo.fromComm = fromComm;
BuildInfo.fromPage = fromPage;
BuildInfo.fromLlib = fromLlib;
BuildInfo.fromCopy = fromCopy;
BuildInfo.fromDyna = fromDyna;
BuildInfo.fromLone = fromLone;
BuildInfo.fromAapi = fromAapi;
BuildInfo.fromAbpi = fromAbpi;
BuildInfo.fromFile = fromFile;
BuildInfo.fromWarn = fromWarn;
BuildInfo.fromFolder = fromFolder;
BuildInfo.match = match;
BuildInfo.noopbuilder = noopbuilder;
