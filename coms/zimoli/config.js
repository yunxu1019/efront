new Promise(function (ok) {
    var config = {
        target: 'fc',
        api_domain: "efront.cc:5989",
        api_base: "http://efront.cc:5989/",
    };
    if (!/(localhost|127\.0\.0\.1)/i.test(location.hostname)) return ok(config);
    var testconfig = {
        target: 'fc',
        api_domain: "localhost:5984",
        api_base: "http://localhost:5984/",
    };
    cross("get", testconfig.api_base).done(e => ok(testconfig)).error(e => ok(config));
})