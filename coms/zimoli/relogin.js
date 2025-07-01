function relogin(auth_login) {
    var login_queue = [], reject_queue = [];
    return async function ({ status, url, headers }, reform, reject) {
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
            var page = await popup(auth_login, base1);
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
    }
}