var user = enrich({
    getName() {
    },
    Login(name, password) {
        return new Promise(function (ok, oh) {
            api("_session", {
                name,
                password
            }).success(ok);
        })
    },
    load(state) {
    }
});