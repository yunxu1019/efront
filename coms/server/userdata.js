var fs = require("fs");
var path = require("path");
var remoteAddress = require("./remoteAddress");
var userpath = path.join(require("os").homedir(), ".efront");
var userdatafile = 'profile';
var JSAM = require("../basic/JSAM");
var lazy = require("../basic/lazy");
var encode62 = require('../crypt/encode62');
var isEmpty = require("../basic/isEmpty");
var profile = {
    code: encode62.geta(Math.random().toString(36).slice(2)),
};

function loadAsync(pathname) {
    var fullpath = path.join(userpath, pathname);
    return new Promise(function (ok, oh) {
        if (!fs.existsSync(fullpath)) return ok(null);
        fs.readFile(fullpath, function (error, buff) {
            if (error) return oh(error);
            var data = JSAM.parse(buff);
            ok(data);
        });
    })
}
function saveAsync(pathname, data) {
    var fullpath = path.join(userpath, pathname);
    return new Promise((ok, oh) => {
        data = JSAM.stringify(data);
        fs.writeFile(fullpath, data, function (error) {
            if (error) return oh(error);
            ok();
        });
    });
}
var profile_promise = null;
var loadProfileAsync = function () {
    if (profile_promise) return profile_promise;
    return profile_promise = loadAsync(userdatafile).then(function (data) {
        Object.assign(profile, data);
    }, console.error);
};
var saveProfileAsync = lazy(async function () {
    await saveAsync(userdatafile, profile);
}, -60);
var encode = async function (data) {
    await loadProfileAsync();
    var a = encode62.geta(profile.code);
    return encode62.encodestr(data, a);
};
var decode = async function (data) {
    await loadProfileAsync();
    var a = encode62.geta(profile.code);
    return encode62.decodestr(data, a);
};
async function setItem(k, v) {
    await loadProfileAsync();
    var k0 = encode62.geta(k + profile.code);
    profile[k0] = encode62.encodestr(v, k0);
    saveProfileAsync();
    await new Promise(ok => setTimeout(ok, 160));
}
async function getItem(k) {
    await loadProfileAsync();
    var k0 = encode62.geta(k + profile.code);
    var v = profile[k0];
    if (!v) return;
    return encode62.decodestr(v, k0);
}
async function hasItem(k) {
    await loadProfileAsync();
    var k0 = encode62.geta(k + profile.code);
    return k0 in profile;
}
async function removeItem(k) {
    await loadProfileAsync();
    var k0 = encode62.geta(k + profile.code);
    if (k0 in profile) {
        delete profile[k0];
        saveProfileAsync();
        await new Promise(ok => setTimeout(ok, 160));
    }
}

async function checkPassword(p) {
    var a = encode62.geta(p);
    var c = await getItem('password-c');
    var d = await getItem('password-d');
    if (!c || !d) return false;
    var b = encode62.da2b(d, a);
    var c0 = encode62.ab2c(a, b);
    return c0 === c;
}

async function checkPasswordA(a) {
    var c = await getItem('password-c');
    var d = await getItem('password-d');
    if (!c || !d) return null;
    var b = encode62.da2b(d, a);
    var c0 = encode62.ab2c(a, b);
    if (c0 === c) return b;
    return null;
}

async function checkPasswordB(b) {
    var c = await getItem('password-c');
    var d = await getItem('password-d');
    if (!c || !d) return null;
    var a = encode62.db2a(d, b);
    var c0 = encode62.ab2c(a, b);
    return c0 === c;
}

async function setPassword(p) {
    var a = encode62.geta(p);
    var b = encode62.genb();
    var c = encode62.ab2c(a, b);
    var d = encode62.ba2d(b, a);
    await setItem('password-c', c);
    await setItem('password-d', d);
}
async function hasPassword(p) {
    return !!await getItem("password-c");
}
var listmark = "-options";
var optionmark = ":";
module.exports = {
    getStream(filename) {
        var fullpath = path.join(userpath, filename);
        return fs.createReadStream(fullpath);
    },
    getFullpath(filename) {
        return path.join(userpath, filename);
    },
    encode,
    decode,
    loadAsync,
    saveAsync,
    setItem,
    getItem,
    hasPassword,
    setPassword,
    checkPassword,
    checkPasswordA,
    checkPasswordB,
    loadtime: Date.now(),
    update(func) {
        if (!func.time || func.time < this.loadtime) {
            func.time = this.loadtime;
            return func();
        }
    },
    reload() {
        profile_promise = null;
        this.loadtime = Date.now();
    },
    getOptionStr(type, key) {
        return this.option(type, key, false);
    },
    getOptionObj(type, key) {
        return this.option(type, key, 0);
    },
    getOptionsList(type) {
        return this.option(type, false);
    },
    hasOption(type, key) {
        return this.option(type, key, null);
    },
    removeOption(type, key) {
        return this.option(type, key, '');
    },
    setOptionObj(type, key, value) {
        value = JSON.stringify(value);
        return this.option(type, key, value);
    },
    setOptionStr(type, key, value) {
        return this.option(type, key, value);
    },
    async option(type, key, value) {
        var key_privatelist = type + listmark;
        var key_privateprefix = type + optionmark;
        if (!key) {
            var options = await getItem(key_privatelist);
            if (options) options = JSON.parse(options);
            else options = [];
            var keys = options;
            options = options.map(o => getItem(key_privateprefix + o));
            options = await Promise.all(options);
            options = options.map((o, i) => {
                try {
                    if (o) return JSON.parse(o);
                } catch { };
                return { key: keys[i], value: o };
            });
            if (key === false) return options;
            return encode62.timeencode(JSAM.stringify(options));
        }
        var key0 = key_privateprefix + key;
        if (value === undefined || value === false || value === 0 || value === null) {
            if (value === null) return hasItem(key0);
            var data = await getItem(key0);
            if (value === undefined) return encode62.timeencode(data);
            if (value === false) return data;
            return data ? JSON.parse(data) : null;
        }
        var options = await getItem(key_privatelist);
        if (options) options = JSON.parse(options);
        else options = [];
        if (isEmpty(value)) {
            await removeItem(key0);
            var index = options.indexOf(key);
            if (index >= 0) {
                options.splice(index, 1);
                if (options.length) await setItem(key_privatelist, JSON.stringify(options));
                else await removeItem(key_privatelist);
            }
        }
        else {
            var index = options.indexOf(key);
            if (index < 0) {
                options.push(key);
                await setItem(key_privatelist, JSON.stringify(options));
            }
            await setItem(key0, value);
        }
    },
    async getRequestCode(req) {
        var a = encode62.geta(profile.code) + encode62.geta(process.ppid);
        return encode62.safeencode(encode62.geta(remoteAddress(req) + a), a);
    },
    async sign(a) {
        await loadProfileAsync();
        return encode62.ab2c(profile.code, a);
    },
    async unsign(c) {
        await loadProfileAsync();
        return encode62.ca2b(c, profile.code);
    },
}