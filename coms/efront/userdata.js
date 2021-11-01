var fs = require("fs");
var path = require("path");
var userpath = path.join(require("os").homedir(), ".efront");
var userdatafile = path.join(userpath, 'profile');
var JSAM = require("../basic/JSAM");
var lazy = require("../basic/lazy");
var encode62 = require('../crypt/encode62');
var profile = {
    code: encode62.geta(Math.random().toString(36).slice(2)),
};
function save(pathname, data) {
    var fullpath = path.join(userpath, pathname);
    var folderpath = path.dirname(fullpath)
    if (!fs.existsSync(folderpath)) fs.mkdirSync(folderpath, { recursive: true });
    fs.writeFileSync(fullpath, JSAM.stringify(data));
}
function load(pathname) {
    var fullpath = path.join(userpath, pathname);
    if (!fs.existsSync(fullpath)) return;
    var data = fs.readFileSync(fullpath);
    return JSAM.parse(data);
}
var profile_promise = null;
var loadProfileAsync = function () {
    if (profile_promise || !fs.existsSync(userdatafile)) return profile_promise;
    return profile_promise = new Promise(function (ok, oh) {
        fs.readFile(userdatafile, function (error, buff) {
            if (error) return oh(error);
            ok(buff);
        });
    }).then(function (data) {
        data = String(data);
        data = JSAM.parse(data);
        Object.assign(profile, data);
    }, console.error);
};
var saveProfileAsync = lazy(async function () {
    var folderpath = path.dirname(userdatafile);
    try {
        if (!fs.existsSync(folderpath)) {
            await new Promise((ok, oh) => {
                fs.mkdir(folderpath, { recursive: true }, function (error) {
                    if (error) return oh(error);
                    ok();
                });
            });
        }
        await new Promise((ok, oh) => {
            var data = JSAM.stringify(profile);
            fs.writeFile(userdatafile, data, function (error) {
                if (error) return oh(error);
                ok();
            });
        });
    } catch (e) {
        console.error("写入文件失败！");
        return;
    }
    if (!fs.existsSync(userdatafile)) { }
}, 60);
async function setItem(k, v) {
    await loadProfileAsync();
    var k0 = encode62.geta(k + profile.code);
    profile[k0] = String(encode62.encode(v, k0));
    saveProfileAsync();
}
async function getItem(k) {
    await loadProfileAsync();
    var k0 = encode62.geta(k + profile.code);
    var v = profile[k0];
    if (!v) return;
    return String(encode62.decode(v, k0));
}

async function checkPassword(p) {
    var a = encode62.geta(p);
    var c = await getItem('password-c');
    var d = await getItem('password-d');
    var b = encode62.da2b(d, a);
    var c0 = encode62.ab2c(a, b);
    return c0 === c;
}

async function checkPasswordA(a) {
    var c = await getItem('password-c');
    var d = await getItem('password-d');
    var b = encode62.da2b(d, a);
    var c0 = encode62.ab2c(a, b);
    if (c0 === c) return b;
    return null;
}

async function checkPasswordB(b) {
    var c = await getItem('password-c');
    var d = await getItem('password-d');
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
module.exports = {
    save,
    load,
    setItem,
    getItem,
    hasPassword,
    setPassword,
    checkPassword,
    checkPasswordA,
    checkPasswordB,
    sign(a) {
        return encode62.ab2c(profile.code, a);
    },
    unsign(c) {
        return encode62.ca2b(c, profile.code);
    },
}