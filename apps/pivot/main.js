data.loadConfig("api.yml");
user.loginPath = '/auth/login';
var login_queue = [], reject_queue = [];
cross.addReform(async function ({ status, url, headers }, reform, reject) {
    if (status === 401) {
        var xhr = this;
        var abort = xhr.abort;
        xhr.abort = function () {
            removeFromList(login_queue, reform);
            removeFromList(reject_queue, reject);
            if (!login_queue.length) remove(reject_queue.splice(0, 1)[0]);
            abort.call(this);
        };

        if (login_queue.length) {
            login_queue.push(reform);
            reject_queue.push(reject);
            return false;
        }
        var base = data.getInstance("base").base;
        var { protocol, host } = parseURL(url);
        var base1 = protocol + "//" + host + "/";
        if (base !== base1) {
            data.setSource(base1, null);
        }
        login_queue.push(reform);
        var page = await popup("/auth/login", base1);
        if (!login_queue.length) return;
        reject_queue.push(page, reject);
        care(page, "login", function (info) {
            data.setSource(base1, info);
            headers.authorization = info;
            login_queue.splice(0, login_queue.length).forEach(q => q());
            reject_queue.splice(0, reject_queue.length);
        });
        on("remove")(page, function () {
            login_queue.splice(0, login_queue.length);
            if (reject_queue[0] === this) reject_queue.shift();
            reject_queue.splice(0, reject_queue.length).forEach(r => r());
        });
        return false;
    }
})
data.setReporter(function (m, t) {
    alert(m, t);
});
data.bindInstance("base", async function (base) {
    if (!base.base) return;
    cross.addDirect(base.base);
    var apimap = await data.getConfig();
    for (var k in apimap) {
        if (/options|put/.test(apimap[k].method)) apimap[k].base = base.base;
    }
});
var base = data.getInstance('base').base;
var token = base && data.getSource(base);
if (token) {
    user.login({});
}
setInterval(function () {
    var base = data.getInstance("base");
    if (!base.base) return user.token = null;
    var auth = data.getSource(base.base);
    if (!auth) return user.token = null;
    var auth1 = encode62.timeupdate(auth);
    if (auth1 !== auth) data.setSource(base.base, auth1);
    user.token = auth1;
}, 2000);
login();
var layer = layer$glance({
    left: frame$left.bind({
        head: await init("left-header")
    }),
    top: frame$top
});
on("append")(layer, function () {
    frame$route.open();
});
on("dragover")(document, function (event) {
    event.preventDefault();
});
on("drop")(document, function (event) {
    event.preventDefault();
});
function main() {
    return layer;
}