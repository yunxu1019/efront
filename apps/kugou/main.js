data.setConfig(api);
data.getApi("kuwo-token").then(function (api) {
    var token = cookie.getCookies(api.base);
    if (!token) cross("get", api.base);
});
zimoli.switch("", null, "/home");
zimoli.enableTouchBack();
css("body", "background-color:#323336;");
zimoli();